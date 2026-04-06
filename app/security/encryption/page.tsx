import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

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

export default function EncryptionPage() {
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
              <Lock style={{ width: '22px', height: '22px', color: '#C8A75E' }} />
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
              Data Governance
            </p>
          </div>

          <h1
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: '#F5F3EE', lineHeight: 1.2, marginBottom: '18px' }}
          >
            Data Encryption Standards
          </h1>
          <p style={{ fontSize: '15px', color: '#AAB0D6', lineHeight: 1.8 }}>
            Sensitive information is protected through structured encryption practices both in
            transit and at rest, consistent with current infrastructure and operational standards.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionCard
            label="Encryption in Transit"
            title="Data Transmission Protection"
            items={[
              'All data transmitted between users, the platform, and external services is encrypted via TLS-secured communication channels.',
              'API endpoints serving authenticated or sensitive content are exclusively accessible over HTTPS.',
              'Webhook payloads received from external processors are signature-verified before processing.',
              'Server-to-server data exchanges involving donation and membership operations are conducted through encrypted and authenticated channels.',
            ]}
          />

          <SectionCard
            label="Encryption at Rest"
            title="Stored Data Handling"
            items={[
              'The platform database is hosted within a managed PostgreSQL environment with access controls applied at the infrastructure level.',
              'Database access is restricted by role-based permissions; no unrestricted public access to data tables is permitted.',
              'Application secrets, API credentials, and service keys are stored as environment variables and are not embedded in source code or version control.',
              'Server-side validation is applied to all incoming data before persistence; inputs are sanitized and bounded.',
              'Raw payment card data is never requested by, transmitted through, or stored within this platform.',
            ]}
          />

          <SectionCard
            label="Third-Party Payment Infrastructure"
            title="Hosted Payment Processing"
            items={[
              'Donation payments are processed through a PCI-compliant hosted checkout environment maintained by PLS LLC USA on behalf of Dr Kumar Foundation USA.',
              'Payment instrument data is tokenized within the external processing environment and is not exposed to this platform.',
              'Payment processing infrastructure is operationally isolated from the research and knowledge management components of this platform.',
              'Webhook events confirming payment completion are received and verified before updating donor records.',
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
              "Data protection practices are integrated into the platform architecture and
              continuously aligned with applicable industry standards."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
