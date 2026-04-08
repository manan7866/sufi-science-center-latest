'use client';

import { useState, useEffect, useCallback } from 'react';
import { Shield, Search, RefreshCw, CircleCheck as CheckCircle2, Loader as Loader2, UserCheck, ChevronDown, ChevronUp, Key, Ban, CircleAlert as AlertCircle, X, Save } from 'lucide-react';

interface UserRecord {
  id: string;
  email: string;
  createdAt: string;
  lastActivityAt: string | null;
  sessionToken: string;
  displayName: string | null;
  assessmentStage: string | null;
  profile?: {
    fullName: string | null;
    email: string | null;
    completedModules: string[];
  };
}

interface RoleGrant {
  id: string;
  email: string;
  granted_role: string;
  is_blocked: boolean;
  block_reason: string | null;
  permissions: Record<string, boolean>;
  notes: string | null;
  granted_by: string | null;
  granted_at: string;
}

const ALL_ROLES = ['seeker', 'fellow', 'scholar', 'moderator', 'admin'] as const;

const ROLE_STYLES: Record<string, { color: string; bg: string }> = {
  seeker: { color: 'text-[#AAB0D6]', bg: 'bg-white/5 border-white/8' },
  fellow: { color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  scholar: { color: 'text-[#C8A75E]', bg: 'bg-[#C8A75E]/10 border-[#C8A75E]/20' },
  moderator: { color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  admin: { color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' },
  user: { color: 'text-[#AAB0D6]/50', bg: 'bg-white/3 border-white/5' },
};

const AVAILABLE_PERMISSIONS = [
  { key: 'can_post_comments', label: 'Post Comments' },
  { key: 'can_access_research', label: 'Access Research' },
  { key: 'can_submit_papers', label: 'Submit Papers' },
  { key: 'can_join_circles', label: 'Join Circles' },
  { key: 'can_access_advanced', label: 'Advanced Content' },
  { key: 'can_manage_content', label: 'Manage Content' },
];

function RoleBadge({ role }: { role: string }) {
  const style = ROLE_STYLES[role] || ROLE_STYLES.user;
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize ${style.bg} ${style.color}`}>
      {role}
    </span>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [grants, setGrants] = useState<Record<string, RoleGrant>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 25;
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingGrant, setEditingGrant] = useState<string | null>(null);
  const [grantForm, setGrantForm] = useState<Partial<RoleGrant>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [blockModal, setBlockModal] = useState<{ user: UserRecord } | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [blocking, setBlocking] = useState(false);
  const [apiError, setApiError] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch(`/api/admin/users?page=${page}&search=${encodeURIComponent(search)}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users ?? []);
      } else if (res.status === 500) {
        setApiError('Database error. Please check the server logs.');
        setUsers([]);
      } else {
        setUsers([]);
      }
    } catch {
      setUsers([]);
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function getRole(u: UserRecord): string {
    const email = u.profile?.email ?? u.email ?? '';
    if (grants[email]?.granted_role) return grants[email].granted_role;
    return 'user';
  }

  function isBlocked(u: UserRecord): boolean {
    const email = u.profile?.email ?? u.email ?? '';
    if (grants[email]?.is_blocked) return true;
    return false;
  }

  function openEdit(user: UserRecord) {
    const email = user.profile?.email ?? user.email ?? '';
    const grant = grants[email];
    setGrantForm({
      email,
      granted_role: grant?.granted_role || getRole(user),
      permissions: grant?.permissions || {},
      notes: grant?.notes || '',
    });
    setEditingGrant(user.id);
    setExpanded(user.id);
  }

  async function saveGrant(user: UserRecord) {
    setSaving(user.id);
    // Role grant management via API would go here
    setEditingGrant(null);
    setSaving(null);
  }

  async function handleBlock(user: UserRecord) {
    setBlocking(true);
    // Block management via API would go here
    setBlockModal(null);
    setBlockReason('');
    setBlocking(false);
  }

  async function handleUnblock(user: UserRecord) {
    // Unblock management via API would go here
  }

  const displayEmail = (u: UserRecord) => u.profile?.email ?? u.email ?? u.sessionToken ?? '';

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F3EE] flex items-center gap-2">
            <Shield size={20} className="text-[#C8A75E]" />
            User Management
          </h1>
          <p className="text-[#AAB0D6] text-sm mt-1">Manage roles, permissions, and access control</p>
        </div>
        <button onClick={() => { loadUsers(); }} className="text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors p-2">
          <RefreshCw size={15} />
        </button>
      </div>

      {apiError && (
        <div className="bg-[#0B0F2A] border border-amber-500/20 rounded-xl px-5 py-4">
          <p className="text-amber-400 text-sm font-medium flex items-center gap-2">
            <AlertCircle size={14} />
            Service Role Key Required
          </p>
          <p className="text-[#AAB0D6] text-xs mt-1">{apiError}</p>
        </div>
      )}

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAB0D6]" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          placeholder="Search by email..."
          className="w-full bg-[#0B0F2A] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#F5F3EE] placeholder-[#AAB0D6]/50 focus:outline-none focus:border-[#C8A75E]/50"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-5 h-5 text-[#C8A75E] animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-[#0B0F2A] border border-white/10 rounded-xl px-4 py-10 text-center">
          <Shield size={32} className="mx-auto mb-3 text-[#AAB0D6] opacity-40" />
          <p className="text-[#AAB0D6] text-sm">No users found or API endpoint not configured</p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.filter((u) => !search || displayEmail(u).toLowerCase().includes(search.toLowerCase())).map((u) => {
            const role = getRole(u);
            const blocked = isBlocked(u);
            const isOpen = expanded === u.id;
            const isEditing = editingGrant === u.id;
            const email = displayEmail(u);
            const grant = grants[email];

            return (
              <div key={u.id} className={`bg-[#0B0F2A] border rounded-xl overflow-hidden ${blocked ? 'border-rose-500/20' : 'border-white/8'}`}>
                <div className="flex items-center gap-4 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/8">
                    <span className="text-xs font-semibold text-[#C8A75E]">{email?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-[#F5F3EE] truncate">{email}</span>
                      <RoleBadge role={role} />
                      {blocked && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-400/10 border border-rose-400/20 text-rose-400">
                          Blocked
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#AAB0D6]/30 mt-0.5">
                      Joined {formatDate(u.createdAt)}
                      {u.lastActivityAt && <> · Last active {formatDate(u.lastActivityAt)}</>}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => openEdit(u)} className="p-1.5 text-[#AAB0D6]/40 hover:text-[#C8A75E] hover:bg-[#C8A75E]/5 rounded-lg transition-colors" title="Edit role & permissions">
                      <Key size={13} />
                    </button>
                    {blocked ? (
                      <button onClick={() => handleUnblock(u)} className="p-1.5 text-emerald-400/60 hover:text-emerald-400 hover:bg-emerald-400/5 rounded-lg transition-colors" title="Unblock user">
                        <UserCheck size={13} />
                      </button>
                    ) : (
                      <button onClick={() => { setBlockModal({ user: u }); setBlockReason(''); }} className="p-1.5 text-[#AAB0D6]/40 hover:text-rose-400 hover:bg-rose-400/5 rounded-lg transition-colors" title="Block user">
                        <Ban size={13} />
                      </button>
                    )}
                    <button onClick={() => setExpanded(isOpen ? null : u.id)} className="p-1.5 text-[#AAB0D6]/30 hover:text-[#AAB0D6] rounded-lg transition-colors">
                      {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                {isOpen && !isEditing && (
                  <div className="border-t border-white/5 px-4 py-4 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { label: 'Session ID', value: u.id.slice(0, 12) + '…' },
                        { label: 'Role', value: role },
                        { label: 'Blocked', value: blocked ? 'Yes' : 'No' },
                        { label: 'Display Name', value: u.displayName ?? '—' },
                        { label: 'Last Active', value: formatDate(u.lastActivityAt) },
                        { label: 'Joined', value: formatDate(u.createdAt) },
                      ].map((item) => (
                        <div key={item.label} className="bg-white/2 rounded-lg p-2.5 border border-white/4">
                          <p className="text-[10px] text-[#AAB0D6]/30 uppercase tracking-widest mb-0.5">{item.label}</p>
                          <p className="text-[#AAB0D6]">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    {grant?.permissions && Object.keys(grant.permissions).filter(k => grant.permissions[k]).length > 0 && (
                      <div>
                        <p className="text-[10px] text-[#AAB0D6]/30 uppercase tracking-widest mb-2">Active Permissions</p>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(grant.permissions).filter(([, v]) => v).map(([k]) => (
                            <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]">
                              {k.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {grant?.notes && (
                      <div className="p-3 rounded-lg bg-white/2 border border-white/5">
                        <p className="text-[10px] text-[#AAB0D6]/30 uppercase tracking-widest mb-1">Admin Notes</p>
                        <p className="text-xs text-[#AAB0D6]">{grant.notes}</p>
                      </div>
                    )}
                    {blocked && grant?.block_reason && (
                      <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/15">
                        <p className="text-[10px] text-rose-400/60 uppercase tracking-widest mb-1">Block Reason</p>
                        <p className="text-xs text-rose-400">{grant.block_reason}</p>
                      </div>
                    )}
                    <button onClick={() => openEdit(u)} className="flex items-center gap-2 text-xs text-[#C8A75E] hover:text-[#D4B86A] transition-colors">
                      <Key size={11} />
                      Edit Role &amp; Permissions
                    </button>
                  </div>
                )}

                {isEditing && (
                  <div className="border-t border-white/5 px-4 py-4 space-y-4">
                    <p className="text-xs font-semibold text-[#F5F3EE] uppercase tracking-widest">Edit Access</p>
                    <div>
                      <label className="block text-xs text-[#AAB0D6] mb-2">Role</label>
                      <div className="flex flex-wrap gap-1.5">
                        {ALL_ROLES.map((r) => (
                          <button key={r} onClick={() => setGrantForm((f) => ({ ...f, granted_role: r }))}
                            className={`text-xs px-3 py-1.5 rounded-lg border capitalize transition-all ${
                              grantForm.granted_role === r
                                ? `${ROLE_STYLES[r].bg} ${ROLE_STYLES[r].color}`
                                : 'border-white/8 text-[#AAB0D6]/50 hover:border-white/15 hover:text-[#AAB0D6]'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAB0D6] mb-2">Permissions</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {AVAILABLE_PERMISSIONS.map((p) => {
                          const checked = grantForm.permissions?.[p.key] ?? false;
                          return (
                            <label key={p.key} className="flex items-center gap-2 cursor-pointer group" onClick={() => setGrantForm((f) => ({ ...f, permissions: { ...(f.permissions || {}), [p.key]: !checked } }))}>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${checked ? 'bg-[#C8A75E] border-[#C8A75E]' : 'border-white/20 hover:border-white/40'}`}>
                                {checked && <CheckCircle2 size={10} className="text-[#0B0F2A]" />}
                              </div>
                              <span className="text-xs text-[#AAB0D6] group-hover:text-[#F5F3EE] transition-colors">{p.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAB0D6] mb-1.5">Admin Notes</label>
                      <textarea
                        value={grantForm.notes || ''}
                        onChange={(e) => setGrantForm((f) => ({ ...f, notes: e.target.value }))}
                        rows={2}
                        placeholder="Internal notes about this user..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F5F3EE] resize-none focus:outline-none focus:border-[#C8A75E]/50"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => setEditingGrant(null)} className="px-3 py-1.5 text-xs text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors">Cancel</button>
                      <button onClick={() => saveGrant(u)} disabled={saving === u.id}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C8A75E] text-[#080A18] rounded-lg text-xs font-medium hover:bg-[#D4B86A] transition-colors disabled:opacity-50"
                      >
                        {saving === u.id ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        {saving === u.id ? 'Saving…' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#AAB0D6]/40">Page {page + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-3 py-1 text-xs text-[#AAB0D6] bg-white/5 rounded-lg disabled:opacity-30 hover:bg-white/10">Previous</button>
          <button onClick={() => setPage(p => p + 1)} disabled={users.length < PAGE_SIZE} className="px-3 py-1 text-xs text-[#AAB0D6] bg-white/5 rounded-lg disabled:opacity-30 hover:bg-white/10">Next</button>
        </div>
      </div>

      {blockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0B0F2A] border border-rose-500/20 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-rose-400/10 flex items-center justify-center">
                <Ban className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F5F3EE]">Block User</p>
                <p className="text-xs text-[#AAB0D6]/50">{displayEmail(blockModal.user)}</p>
              </div>
              <button onClick={() => setBlockModal(null)} className="ml-auto text-[#AAB0D6] hover:text-[#F5F3EE]"><X size={16} /></button>
            </div>
            <p className="text-xs text-[#AAB0D6]/70 mb-4">This will prevent the user from accessing the portal. You can unblock them at any time.</p>
            <div className="mb-4">
              <label className="block text-xs text-[#AAB0D6] mb-1.5">Reason (optional)</label>
              <textarea value={blockReason} onChange={(e) => setBlockReason(e.target.value)} rows={2} placeholder="Reason for blocking..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F5F3EE] resize-none focus:outline-none focus:border-rose-400/40" />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setBlockModal(null)} className="px-4 py-2 text-sm text-[#AAB0D6] hover:text-[#F5F3EE] transition-colors">Cancel</button>
              <button onClick={() => handleBlock(blockModal.user)} disabled={blocking}
                className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm font-medium rounded-lg hover:bg-rose-500/22 transition-colors disabled:opacity-50"
              >
                {blocking ? <Loader2 size={14} className="animate-spin" /> : <Ban size={14} />}
                {blocking ? 'Blocking…' : 'Block User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
