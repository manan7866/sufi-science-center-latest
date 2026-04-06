'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface PortalSession {
  id: string;
  sessionToken: string;
  displayName: string | null;
  assessmentStage: string;
  completedModules: string[];
  currentFocus: string | null;
  lastActivityAt: string;
  createdAt: string;
}

export interface PortalProfile {
  fullName: string;
  displayName: string;
  location: string;
  bio: string;
  interests: string[];
  avatarUrl: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postalCode: string;
  completedModules: string[];
}

export interface MembershipEnrollment {
  id: string;
  tier: string;
  status: string;
  appliedAt: string;
  activatedAt: string;
  cancelledAt: string | null;
}

export interface SurahView {
  surahNumber: number;
  viewedAt: string;
}

export interface ReflectionEntry {
  surahNumber: number;
  reflectionText: string;
  updatedAt: string;
}

export interface ActivityEvent {
  id: string;
  eventType: string;
  eventLabel: string;
  eventMetadata: Record<string, unknown>;
  occurredAt: string;
}

const SESSION_KEY = 'ssc_portal_session_token';

function getOrCreateToken(): string {
  let token = localStorage.getItem(SESSION_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, token);
  }
  return token;
}

const DEFAULT_PROFILE: PortalProfile = {
  fullName: '',
  displayName: '',
  location: '',
  bio: '',
  interests: [],
  avatarUrl: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  postalCode: '',
  completedModules: [],
};

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(path, options);
  if (!res.ok) return null;
  return res.json();
}

export function usePortalSession() {
  const [session, setSession] = useState<PortalSession | null>(null);
  const [profile, setProfile] = useState<PortalProfile>(DEFAULT_PROFILE);
  const [membership, setMembership] = useState<MembershipEnrollment | null>(null);
  const [surahViews, setSurahViews] = useState<SurahView[]>([]);
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function loadSession() {
      const token = getOrCreateToken();

      const [sessionRes, profileRes, membershipRes, viewsRes, reflectionsRes, activityRes] = await Promise.all([
        apiFetch('/api/portal/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken: token }),
        }),
        apiFetch(`/api/portal/profile?sessionToken=${encodeURIComponent(token)}`),
        apiFetch(`/api/portal/membership?sessionToken=${encodeURIComponent(token)}`),
        apiFetch(`/api/portal/surah-views?sessionToken=${encodeURIComponent(token)}`),
        apiFetch(`/api/portal/reflections?sessionToken=${encodeURIComponent(token)}`),
        apiFetch(`/api/portal/activity?sessionToken=${encodeURIComponent(token)}`),
      ]);

      if (sessionRes?.session) setSession(sessionRes.session);

      if (profileRes?.profile) {
        const p = profileRes.profile;
        setProfile({
          fullName: p.fullName || '',
          displayName: p.displayName || '',
          location: p.location || '',
          bio: p.bio || '',
          interests: p.interests || [],
          avatarUrl: p.avatarUrl || '',
          email: p.email || '',
          phone: p.phone || '',
          addressLine1: p.addressLine1 || '',
          addressLine2: p.addressLine2 || '',
          city: p.city || '',
          country: p.country || '',
          postalCode: p.postalCode || '',
          completedModules: p.completedModules || [],
        });
      }

      if (membershipRes?.enrollment) setMembership(membershipRes.enrollment);
      if (viewsRes?.views) setSurahViews(viewsRes.views);
      if (reflectionsRes?.reflections) setReflections(reflectionsRes.reflections);
      if (activityRes?.events) setActivityEvents(activityRes.events);

      setLoading(false);
    }

    loadSession();
  }, []);

  const saveProfile = useCallback(async (updates: Partial<PortalProfile>) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;
    const merged = { ...profile, ...updates };
    setProfile(merged);

    await apiFetch('/api/portal/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken: token, ...merged }),
    });

    if (merged.displayName) {
      setSession((prev) => prev ? { ...prev, displayName: merged.displayName } : prev);
    }
  }, [profile]);

  const enrollMembership = useCallback(async (tier: string) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;

    const res = await apiFetch('/api/portal/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken: token, action: 'enroll', tier }),
    });

    if (res?.enrollment) setMembership(res.enrollment);
  }, []);

  const cancelMembership = useCallback(async () => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;

    await apiFetch('/api/portal/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken: token, action: 'cancel' }),
    });

    setMembership(null);
  }, []);

  const recordSurahView = useCallback(async (surahNumber: number, arabicName: string) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;

    await Promise.all([
      apiFetch('/api/portal/surah-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken: token, surahNumber }),
      }),
      apiFetch('/api/portal/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken: token,
          eventType: 'viewed_surah',
          eventLabel: `Viewed Surah ${surahNumber}: ${arabicName}`,
          eventMetadata: { surahNumber, arabicName },
        }),
      }),
    ]);

    setSurahViews((prev) => {
      const exists = prev.find((v) => v.surahNumber === surahNumber);
      if (exists) return prev;
      return [{ surahNumber, viewedAt: new Date().toISOString() }, ...prev];
    });

    setActivityEvents((prev) => [
      {
        id: crypto.randomUUID(),
        eventType: 'viewed_surah',
        eventLabel: `Viewed Surah ${surahNumber}: ${arabicName}`,
        eventMetadata: { surahNumber },
        occurredAt: new Date().toISOString(),
      },
      ...prev.slice(0, 19),
    ]);
  }, []);

  const saveReflection = useCallback(async (surahNumber: number, text: string) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;

    await apiFetch('/api/portal/reflections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken: token, surahNumber, reflectionText: text }),
    });

    const now = new Date().toISOString();
    setReflections((prev) => {
      const existing = prev.findIndex((r) => r.surahNumber === surahNumber);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { surahNumber, reflectionText: text, updatedAt: now };
        return updated;
      }
      return [...prev, { surahNumber, reflectionText: text, updatedAt: now }];
    });
  }, []);

  const logActivity = useCallback(async (eventType: string, label: string, metadata?: Record<string, unknown>) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;

    await apiFetch('/api/portal/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken: token, eventType, eventLabel: label, eventMetadata: metadata ?? {} }),
    });

    setActivityEvents((prev) => [
      {
        id: crypto.randomUUID(),
        eventType,
        eventLabel: label,
        eventMetadata: metadata ?? {},
        occurredAt: new Date().toISOString(),
      },
      ...prev.slice(0, 19),
    ]);
  }, []);

  const saveModules = useCallback(async (modules: string[]) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (!token) return;
    setProfile((prev) => ({ ...prev, completedModules: modules }));

    await apiFetch('/api/portal/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken: token, completedModules: modules }),
    });
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('ssc_profile_data');
    localStorage.removeItem('ssc_contact_data');
    localStorage.removeItem('ssc_completed_modules');
    localStorage.removeItem('ssc_profile_avatar');
    localStorage.removeItem('ssc_donor_email');
  }, []);

  return {
    session,
    profile,
    membership,
    surahViews,
    reflections,
    activityEvents,
    loading,
    saveProfile,
    enrollMembership,
    cancelMembership,
    recordSurahView,
    saveReflection,
    logActivity,
    saveModules,
    clearSession,
  };
}
