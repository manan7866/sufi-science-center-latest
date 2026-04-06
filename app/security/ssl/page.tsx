import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

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

export default function SSLPage() {
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
              <ShieldCheck style={{ width: '22px', height: '22px', color: '#C8A75E' }} />
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
              Transmission Integrity
            </p>
          </div>

          <h1
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#F5F3EE', lineHeight: 1.2, marginBottom: '18px' }}
          >
            SSL Secured Platform
          </h1>
          <p style={{ fontSize: '15px', color: '#AAB0D6', lineHeight: 1.8 }}>
            All communications between users and system infrastructure are encrypted using modern
            Transport Layer Security (TLS) standards.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionCard
            label="HTTPS Enforcement"
            title="Transport Layer Security"
            items={[
              'HTTPS enforced across all public and access-restricted routes without exception.',
              'TLS 1.2 and TLS 1.3 encryption protocols are supported; older versions are not permitted.',
              'Certificates are issued by globally trusted Certificate Authorities and maintained through automated lifecycle management.',
              'HTTP Strict Transport Security (HSTS) is enabled to prevent protocol downgrade attacks.',
              'All HTTP requests are redirected to HTTPS at the infrastructure level before reaching application logic.',
            ]}
          />

          <SectionCard
            label="Secure Transaction Flow"
            title="Payment Transmission Handling"
            items={[
              'Donation sessions are redirected to a hosted payment checkout environment operated by PLS LLC USA.',
              'No raw payment credentials are processed by, transmitted through, or stored within this platform.',
              'API communication between platform services and external processors is conducted over encrypted channels.',
              'Server-to-server communication involving sensitive data is authenticated and integrity-verified.',
              'Checkout sessions are bound to a specific donation record and invalidated upon completion or cancellation.',
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
              "The platform maintains encrypted transmission protocols to ensure confidentiality and
              integrity of all data exchanges between users and platform infrastructure."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
