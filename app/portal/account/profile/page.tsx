'use client';

import { useState, useEffect, useRef } from 'react';
import { CircleUser as UserCircle, Save, Camera, X, CircleCheck as CheckCircle2 } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';
import Image from 'next/image';

const STUDY_INTERESTS = [
  'Sufi Metaphysics', 'Quranic Studies', 'Comparative Religion',
  'Inner Development', 'Islamic Philosophy', 'Consciousness Studies',
  'Applied Spirituality', 'Knowledge Systems', 'Interfaith Dialogue',
];

const INPUT_CLS = `w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF]
  border border-white/10 rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30
  shadow-inner shadow-black/20 transition-all`;

const LABEL_CLS = 'block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase';

export default function ProfilePage() {
  const { session, profile, saveProfile, loading } = usePortalSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    fullName: '',
    displayName: '',
    location: '',
    bio: '',
    interests: [] as string[],
  });

  useEffect(() => {
    if (!loading) {
      setForm({
        fullName: profile.fullName,
        displayName: profile.displayName || session?.displayName || '',
        location: profile.location,
        bio: profile.bio,
        interests: profile.interests,
      });
      const storedAvatar = localStorage.getItem('ssc_profile_avatar');
      if (storedAvatar) setAvatar(storedAvatar);
    }
  }, [loading, profile, session]);

  async function handleSave() {
    setSaving(true);
    await saveProfile({
      fullName: form.fullName,
      displayName: form.displayName,
      location: form.location,
      bio: form.bio,
      interests: form.interests,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setAvatar(dataUrl);
      localStorage.setItem('ssc_profile_avatar', dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatar(null);
    localStorage.removeItem('ssc_profile_avatar');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const displayName = form.displayName || session?.displayName || 'S';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#C8A75E]/20 border-t-[#C8A75E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-[#C8A75E]" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-[#F5F3EE]">Profile Information</h1>
          <p className="text-xs text-[#AAB0D6]/50 mt-0.5">Manage your personal details and areas of study</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-[#C8A75E]/25 overflow-hidden bg-[#141A3A] flex items-center justify-center">
                {avatar ? (
                  <Image src={avatar} alt="Profile photo" width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold font-serif text-[#C8A75E]">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-xs font-semibold text-[#C8A75E] bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-4 py-2 rounded-lg hover:bg-[#C8A75E]/16 hover:border-[#C8A75E]/40 transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                {avatar ? 'Change Photo' : 'Upload Photo'}
              </button>
              {avatar && (
                <button
                  onClick={removeAvatar}
                  className="flex items-center gap-1.5 text-xs text-[#AAB0D6]/40 hover:text-red-400/70 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Remove
                </button>
              )}
              <p className="text-[10px] text-[#AAB0D6]/30">JPG, PNG or WebP · max 5 MB</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Personal Details</h2>
          <div className="space-y-5">
            <div>
              <label className={LABEL_CLS}>Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Your full name"
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Display Name</label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))}
                placeholder="How you appear in the portal"
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="City, Country"
                className={INPUT_CLS}
              />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Areas of Study Interest</h2>
          <div className="flex flex-wrap gap-2">
            {STUDY_INTERESTS.map((interest) => {
              const selected = form.interests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                    selected
                      ? 'bg-[#1C1F4A] border-[#C8A75E] text-white'
                      : 'bg-[#121838] border-white/10 text-[#9CA3AF] hover:border-[#C8A75E]/50 hover:text-white'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Short Bio</h2>
          <textarea
            value={form.bio}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            placeholder="A brief introduction to your spiritual and intellectual background..."
            rows={4}
            className={`${INPUT_CLS} resize-none min-h-[120px]`}
          />
          <p className="text-[10px] text-[#AAB0D6]/25 mt-2">{form.bio.length} characters</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            saved
              ? 'bg-[#27AE60]/15 border border-[#27AE60]/30 text-[#27AE60]'
              : 'bg-[#C8A75E]/12 border border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/45'
          }`}
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : saved ? 'Profile Saved' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
