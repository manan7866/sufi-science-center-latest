'use client';

import { useAuth } from '@/lib/auth-context';
import AuthGuard from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

function DashboardContent() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0B0F2A] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#F5F3EE] mb-2">Dashboard</h1>
          <p className="text-[#AAB0D6]">Welcome back, {user.name}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#C8A75E]" />
              </div>
              <h2 className="text-lg font-semibold text-[#F5F3EE]">Profile</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#AAB0D6]">
                <User className="w-4 h-4 text-[#AAB0D6]/40" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#AAB0D6]">
                <Mail className="w-4 h-4 text-[#AAB0D6]/40" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#AAB0D6]">
                <Calendar className="w-4 h-4 text-[#AAB0D6]/40" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C8A75E]/10 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-[#C8A75E]" />
              </div>
              <h2 className="text-lg font-semibold text-[#F5F3EE]">Account</h2>
            </div>
            <p className="text-sm text-[#AAB0D6] mb-4">
              Manage your account settings and preferences.
            </p>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold text-[#F5F3EE] mb-4">Quick Links</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {['My Courses', 'Bookmarks', 'Settings'].map((item) => (
              <div
                key={item}
                className="p-4 rounded-xl bg-white/2 border border-white/5 hover:border-[#C8A75E]/20 transition-colors cursor-pointer"
              >
                <p className="text-sm text-[#F5F3EE] font-medium">{item}</p>
                <p className="text-xs text-[#AAB0D6]/50 mt-1">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
