'use client';

import { useState, useEffect } from 'react';
import { Phone, Save, Info, CircleCheck as CheckCircle2 } from 'lucide-react';
import { usePortalSession } from '@/hooks/use-portal-session';

const INPUT_CLS = `w-full bg-[#141A3A] text-[#F5F7FA] placeholder:text-[#9CA3AF]
  border border-white/10 rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:border-[#C8A75E] focus:ring-1 focus:ring-[#C8A75E]/30
  shadow-inner shadow-black/20 transition-all`;

const LABEL_CLS = 'block text-xs font-medium text-[#AAB0D6]/70 mb-2 tracking-wide uppercase';

export default function ContactPage() {
  const { profile, saveProfile, loading } = usePortalSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    postalCode: '',
  });

  useEffect(() => {
    if (!loading) {
      setForm({
        email: profile.email,
        phone: profile.phone,
        addressLine1: profile.addressLine1,
        addressLine2: profile.addressLine2,
        city: profile.city,
        country: profile.country,
        postalCode: profile.postalCode,
      });
    }
  }, [loading, profile]);

  async function handleSave() {
    setSaving(true);
    await saveProfile({
      email: form.email,
      phone: form.phone,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      city: form.city,
      country: form.country,
      postalCode: form.postalCode,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

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
        <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/10 border border-[#6B9BD1]/20 flex items-center justify-center">
          <Phone className="w-5 h-5 text-[#6B9BD1]" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-[#F5F3EE]">Contact Information</h1>
          <p className="text-xs text-[#AAB0D6]/50 mt-0.5">Update your email, phone, and address details</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Email Address</h2>
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="your@email.com"
              className={INPUT_CLS}
            />
          </div>
          <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-[#6B9BD1]/5 border border-[#6B9BD1]/15">
            <Info className="w-3.5 h-3.5 text-[#6B9BD1] flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#AAB0D6]/50 leading-relaxed">
              This email is used for donation receipts and support correspondence.
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Phone</h2>
          <div>
            <label className={LABEL_CLS}>Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+1 (555) 000-0000"
              className={INPUT_CLS}
            />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-5">Mailing Address</h2>
          <div className="space-y-4">
            <div>
              <label className={LABEL_CLS}>Address Line 1</label>
              <input
                type="text"
                value={form.addressLine1}
                onChange={(e) => setForm((p) => ({ ...p, addressLine1: e.target.value }))}
                placeholder="Street address"
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Address Line 2 <span className="text-[#AAB0D6]/25">(optional)</span></label>
              <input
                type="text"
                value={form.addressLine2}
                onChange={(e) => setForm((p) => ({ ...p, addressLine2: e.target.value }))}
                placeholder="Apartment, suite, unit, etc."
                className={INPUT_CLS}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  placeholder="City"
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className={LABEL_CLS}>Postal Code</label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))}
                  placeholder="00000"
                  className={INPUT_CLS}
                />
              </div>
            </div>
            <div>
              <label className={LABEL_CLS}>Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                placeholder="United States"
                className={INPUT_CLS}
              />
            </div>
          </div>
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
          {saving ? 'Saving…' : saved ? 'Contact Info Saved' : 'Save Contact Info'}
        </button>
      </div>
    </div>
  );
}
