'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AuthHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't show on auth pages
  if (pathname?.startsWith('/auth')) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F2A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center">
            <span className="text-sm font-bold text-[#C8A75E]">SSC</span>
          </div>
          <span className="text-sm font-medium text-[#F5F3EE] hidden sm:block">Sufi Science Center</span>
        </Link>

        {user ? (
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#C8A75E]/20 flex items-center justify-center">
                <User className="w-4 h-4 text-[#C8A75E]" />
              </div>
              <span className="text-sm text-[#F5F3EE] hidden sm:block">{user.name}</span>
              <ChevronDown className={`w-3 h-3 text-[#AAB0D6]/40 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#141A3A] border border-white/10 shadow-xl overflow-hidden">
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-[#F5F3EE]">{user.name}</p>
                  <p className="text-xs text-[#AAB0D6] truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-[#AAB0D6] hover:text-[#F5F3EE] text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A] text-sm font-semibold h-9 px-4">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
