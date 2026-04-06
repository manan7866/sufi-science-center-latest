import Link from 'next/link';
import { ShieldCheck, Lock, KeyRound, ArrowRight } from 'lucide-react';

const CARDS = [
  {
    href: '/security/ssl',
    icon: ShieldCheck,
    title: 'SSL Secured',
    summary:
      'All communications between users and system infrastructure are encrypted using modern Transport Layer Security standards.',
    label: 'Transmission Integrity',
  },
  {
    href: '/security/encryption',
    icon: Lock,
    title: 'Data Encryption',
    summary:
      'Sensitive information is protected through structured encryption practices applied both in transit and at rest.',
    label: 'Data Governance',
  },
  {
    href: '/security/authentication',
    icon: KeyRound,
    title: 'Secure Authentication Framework',
    summary:
      'System access is governed through layered authentication protocols and role-based authorization controls.',
    label: 'Access & Identity Controls',
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0B0F2A]">
      <section className="py-20 px-4 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C8A75E',
              marginBottom: '20px',
              fontWeight: 600,
            }}
          >
            Governance &amp; Infrastructure
          </p>
          <h1
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', color: '#F5F3EE', lineHeight: 1.2, marginBottom: '20px' }}
          >
            Security &amp; Trust Framework
          </h1>
          <p style={{ fontSize: '15px', color: '#AAB0D6', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto' }}>
            The platform operates within a structured security architecture designed to protect data
            integrity, transmission confidentiality, and controlled system access.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARDS.map(({ href, icon: Icon, title, summary, label }) => (
              <Link key={href} href={href} className="group block no-underline">
                <div
                  style={{
                    background: '#1C1F4A',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '32px 28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.2s',
                  }}
                  className="group-hover:border-[rgba(200,167,94,0.25)]"
                >
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
                      marginBottom: '20px',
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: '22px', height: '22px', color: '#C8A75E' }} />
                  </div>

                  <p
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(200,167,94,0.6)',
                      marginBottom: '8px',
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </p>

                  <h2
                    className="font-serif"
                    style={{ fontSize: '17px', fontWeight: 700, color: '#F5F3EE', marginBottom: '12px', lineHeight: 1.3 }}
                  >
                    {title}
                  </h2>

                  <p style={{ fontSize: '13px', color: 'rgba(170,176,214,0.65)', lineHeight: 1.75, flexGrow: 1 }}>
                    {summary}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '20px',
                      fontSize: '12px',
                      color: 'rgba(200,167,94,0.6)',
                      fontWeight: 600,
                    }}
                    className="group-hover:text-[#C8A75E] transition-colors"
                  >
                    View Details
                    <ArrowRight style={{ width: '13px', height: '13px' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div
            style={{
              marginTop: '64px',
              background: '#1C1F4A',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '36px 40px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(200,167,94,0.5)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Operational Disclosure
            </p>
            <p style={{ fontSize: '14px', color: '#AAB0D6', lineHeight: 1.85 }}>
              This platform is developed and maintained by Prime Logic Solutions on behalf of the
              Sufi Science Center initiative. Payment infrastructure is operated by PLS LLC USA on
              behalf of Dr Kumar Foundation USA. Security practices are reviewed and aligned with
              applicable industry standards on an ongoing basis. No security architecture eliminates
              all risk; this documentation reflects the structural controls currently in operation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
