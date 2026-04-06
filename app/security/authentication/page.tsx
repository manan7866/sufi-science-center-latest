import Link from 'next/link';
import { ArrowLeft, KeyRound } from 'lucide-react';

function SectionCard({ label, title, items }: { label: string; title: string; items: string[] }) {
  return (
    <div
      style={{
        background: '#1C1F4A',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '36px 40px',
        marginBottom: '24px',
      }}
    >
      <p
        style={{
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(200,167,94,0.55)',
          marginBottom: '10px',
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <h2
        className="font-serif"
        style={{ fontSize: '18px', fontWeight: 700, color: '#F5F3EE', marginBottom: '24px' }}
      >
        {title}
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '13px 0',
              borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#C8A75E',
                flexShrink: 0,
                marginTop: '7px',
                opacity: 0.7,
              }}
            />
            <span style={{ fontSize: '14px', color: '#AAB0D6', lineHeight: 1.75 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <section className="py-20 px-4 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/security"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'rgba(170,176,214,0.5)',
              textDecoration: 'none',
              marginBottom: '32px',
              transition: 'color 0.2s',
            }}
            className="hover:text-[#AAB0D6]"
          >
            <ArrowLeft style={{ width: '13px', height: '13px' }} />
            Security &amp; Trust Framework
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(200,167,94,0.08)',
                border: '1px solid rgba(200,167,94,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <KeyRound style={{ width: '22px', height: '22px', color: '#C8A75E' }} />
            </div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C8A75E',
                fontWeight: 600,
              }}
            >
              Access &amp; Identity Controls
            </p>
          </div>

          <h1
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#F5F3EE', lineHeight: 1.2, marginBottom: '18px' }}
          >
            Secure Authentication Framework
          </h1>
          <p style={{ fontSize: '15px', color: '#AAB0D6', lineHeight: 1.8 }}>
            System access is governed through layered authentication protocols and role-based
            authorization controls applied across all user-facing and administrative interfaces.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionCard
            label="User Authentication"
            title="Identity Verification Controls"
            items={[
              'User passwords are processed through secure hashing mechanisms; plaintext passwords are never stored or logged.',
              'Session state is managed using HTTPOnly and Secure-flagged cookies to prevent client-side script access.',
              'Cross-Site Request Forgery (CSRF) protections are applied to state-changing operations.',
              'Authentication endpoints are subject to rate limiting to restrict automated credential probing.',
              'Session lifecycle is actively managed, with token expiry and invalidation on explicit logout or detected anomalies.',
            ]}
          />

          <SectionCard
            label="Administrative Governance"
            title="Role-Based Access Controls"
            items={[
              'Administrative access is governed by role-based permissions defined at both the application and database levels.',
              'Middleware-level authorization gates enforce access restrictions before requests reach protected data or logic layers.',
              'Server-side validation is applied independently of client-side checks; client assertions alone do not grant access.',
              'Administrative APIs are restricted to authenticated personnel with verified role assignments.',
              'Changes to sensitive configuration or access roles are subject to controlled review and logging.',
            ]}
          />

          <SectionCard
            label="Payment Integrity Controls"
            title="Financial Interaction Safeguards"
            items={[
              'Donation amounts and parameters are validated server-side before any payment session is initiated; client-submitted values are not trusted without verification.',
              'Webhook events from the payment processor are verified against a shared secret signature before their contents are acted upon.',
              'Frontend and financial processing logic are architecturally separated; the user interface has no direct access to payment processing APIs.',
              'All donation records are created with an initial status of pending and only updated to confirmed upon verified payment completion via webhook.',
            ]}
          />

          <div
            style={{
              background: 'rgba(200,167,94,0.04)',
              border: '1px solid rgba(200,167,94,0.12)',
              borderRadius: '12px',
              padding: '24px 28px',
            }}
          >
            <p style={{ fontSize: '13px', color: 'rgba(170,176,214,0.7)', lineHeight: 1.85, fontStyle: 'italic' }}>
              "The authentication framework is structured to preserve system integrity,
              administrative accountability, and controlled access across all operational layers."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
