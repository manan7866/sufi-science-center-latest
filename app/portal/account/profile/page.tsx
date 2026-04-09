'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { CircleUser as UserCircle, Save, Camera, X, CircleCheck as CheckCircle2, Loader2 } from 'lucide-react';
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
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    fullName: '',
    location: '',
    bio: '',
    interests: [] as string[],
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.name || '',
        location: '',
        bio: '',
        interests: [],
      });
      if (user.avatarUrl) setAvatar(user.avatarUrl);
    }
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: form.fullName,
          location: form.location,
          bio: form.bio,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('ssc_user_token');
      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const data = await res.json();

      // Save URL to database (works with Cloudinary URL or base64 data URL)
      await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          avatarUrl: data.url,
        }),
      });

      setAvatar(data.url);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  async function removeAvatar() {
    if (!user) return;
    try {
      await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, avatarUrl: null }),
      });
      setAvatar(null);
    } catch (error) {
      console.error('Failed to remove avatar:', error);
    }
  }

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  if (!user) return null;

  const displayName = form.fullName || user.name || 'User';

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
        {/* Profile Photo */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-[#C8A75E]/25 overflow-hidden bg-[#141A3A] flex items-center justify-center">
                {uploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-[#C8A75E]" />
                ) : avatar ? (
                  <Image src={avatar} alt="Profile" width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold font-serif text-[#C8A75E]">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
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
                disabled={uploading}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 text-xs font-semibold text-[#C8A75E] bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-4 py-2 rounded-lg hover:bg-[#C8A75E]/16 hover:border-[#C8A75E]/40 transition-all disabled:opacity-50"
              >
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                {uploading ? 'Uploading...' : avatar ? 'Change Photo' : 'Upload Photo'}
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

        {/* Personal Details */}
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
              <label className={LABEL_CLS}>Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-white/3 border-white/5 text-[#AAB0D6]/50 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
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

        {/* Areas of Study Interest */}
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

        {/* Short Bio */}
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

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            saved
              ? 'bg-[#27AE60]/15 border border-[#27AE60]/30 text-[#27AE60]'
              : 'bg-[#C8A75E]/12 border border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/18 hover:border-[#C8A75E]/45'
          }`}
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : saved ? 'Profile Saved' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
