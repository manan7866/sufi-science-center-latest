import Link from 'next/link';
import { ObservatoryHero } from '@/components/observatory-hero';
import { Users, ArrowLeft, GraduationCap, BookOpen, Globe } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Dr. Gulam Mohmad Kumar',
    role: 'Founder and Director of Research',
    affiliation: 'Sufi Science Center',
    location: 'USA',
    specialisations: [
      'Consciousness Studies',
      'Sufi Psychology',
      'Integrative Epistemology',
      'Inner Development',
    ],
    bio: 'Dr. Gulam Mohmad Kumar is the founding director of the Sufi Science Center and architect of its research programme. With graduate training in both classical Islamic sciences and contemporary consciousness research, he has dedicated his scholarly career to developing rigorous methodologies for the integrative study of Sufi knowledge traditions. His work challenges conventional boundaries between sacred science and secular inquiry.',
    publications: 12,
    projects: 4,
  },
  {
    name: 'Dr. Fayaz Ahmad Khan',
    role: 'Co-Founder',
    affiliation: 'Sufi Science Center',
    location: 'USA',
    specialisations: [
      'Islamic Sciences',
      'Sufi Epistemology',
      'Spiritual Psychology',
      'Knowledge Integration',
    ],
    bio: 'Dr. Fayaz Ahmad Khan is the Co-Founder of the Sufi Science Center, bringing deep expertise in classical Islamic sciences and their integration with contemporary research frameworks. His foundational contributions have shaped the scholarly vision and institutional direction of the Center, fostering a rigorous yet spiritually grounded approach to integrative inquiry.',
    publications: 10,
    projects: 3,
  },
  {
    name: 'Dr. Amina Hassan',
    role: 'Senior Research Fellow — Contemplative Neuroscience',
    affiliation: 'Sufi Science Center / University of California Berkeley',
    location: 'USA',
    specialisations: [
      'Contemplative Neuroscience',
      'Phenomenological Research Methods',
      'Attention and Awareness Studies',
      'Sufi Practice Traditions',
    ],
    bio: 'Dr. Hassan holds dual appointments at the Sufi Science Center and UC Berkeley\'s Greater Good Science Center. Her interdisciplinary research bridges first-person phenomenological inquiry with third-person neuroimaging methodologies, with particular focus on the neurological correlates of advanced contemplative states in Muslim practitioners.',
    publications: 8,
    projects: 3,
  },
  {
    name: 'Prof. Sarah Chen',
    role: 'Research Fellow — Complexity Science and Knowledge Systems',
    affiliation: 'Sufi Science Center / Santa Fe Institute',
    location: 'USA',
    specialisations: [
      'Complexity and Systems Theory',
      'Sufi Manuscript Studies',
      'Cross-Traditional Comparison',
      'Digital Humanities',
    ],
    bio: 'Prof. Chen brings expertise in complexity science and digital humanities to the Sufi Science Center\'s research programme. She leads the Sufi Lineage Preservation and Digital Archive project and is currently developing a complexity-theoretic framework for understanding emergent properties of contemplative systems.',
    publications: 9,
    projects: 2,
  },
  {
    name: 'Omar Farid',
    role: 'Research Associate — Islamic Philosophy',
    affiliation: 'Sufi Science Center',
    location: 'UK',
    specialisations: [
      'Islamic Philosophy',
      'Epistemology',
      'Sufi Literary Traditions',
      'Ethics of Knowledge',
    ],
    bio: 'Omar Farid is a doctoral researcher specialising in the epistemological dimensions of classical Sufi thought. His work examines the philosophical coherence of kashf (illuminative knowledge) as an epistemological category and its implications for contemporary philosophy of mind. He is completing his doctoral thesis at Oxford University.',
    publications: 3,
    projects: 2,
  },
];

const ADVISORY_BOARD = [
  {
    name: 'Prof. William Chittick',
    role: 'Professor Emeritus, Stony Brook University',
    expertise: 'Islamic Mysticism and Sufi Philosophy',
  },
  {
    name: 'Dr. Laleh Bakhtiar',
    role: 'Scholar and Translator',
    expertise: 'Sufi Psychology and Islamic Ethics',
  },
  {
    name: 'Prof. Richard Davids',
    role: 'University of Chicago Divinity School',
    expertise: 'Comparative Mysticism',
  },
  {
    name: 'Dr. Sara Walker',
    role: 'Arizona State University',
    expertise: 'Complexity Theory and Origins of Life',
  },
];

export const metadata = {
  title: 'Research Team — Sufi Science Center',
  description: 'Meet the scholars and researchers of the Sufi Science Center.',
};

export default function ResearchTeamPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Our Scholars"
        title="Research Team"
        description="A community of dedicated scholars advancing rigorous integrative inquiry at the intersection of classical Sufi knowledge and contemporary science."
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 hover:text-[#C8A75E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </div>

          <div className="mb-12">
            <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-6">
              Core Research Team
            </p>
            <div className="space-y-5">
              {TEAM_MEMBERS.map((member, i) => (
                <article
                  key={i}
                  className="glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C8A75E]/15 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C8A75E]/10 border border-[#C8A75E]/20 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-[#C8A75E]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-bold text-[#F5F3EE]">
                          {member.name}
                        </h3>
                        <p className="text-sm text-[#C8A75E]/80 mt-0.5">{member.role}</p>
                        <div className="flex items-center gap-3 text-xs text-[#AAB0D6]/50 mt-1">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            {member.affiliation}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {member.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-center sm:text-right">
                      <div>
                        <p className="text-xl font-bold font-serif text-[#C8A75E]">
                          {member.publications}
                        </p>
                        <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-wider">
                          Papers
                        </p>
                      </div>
                      <div>
                        <p className="text-xl font-bold font-serif text-[#C8A75E]">
                          {member.projects}
                        </p>
                        <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-wider">
                          Projects
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#AAB0D6]/70 leading-relaxed mb-5">{member.bio}</p>

                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#AAB0D6]/30 mb-2">
                      Specialisations
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialisations.map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A75E]/8 border border-[#C8A75E]/15 text-[#C8A75E]/70"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.18em] text-[#AAB0D6]/40 uppercase mb-6">
              Advisory Board
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADVISORY_BOARD.map((advisor, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-xl p-5 border border-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C8A75E]/8 border border-[#C8A75E]/15 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-[#C8A75E]/60" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#F5F3EE]">{advisor.name}</h4>
                      <p className="text-xs text-[#AAB0D6]/50 mt-0.5">{advisor.role}</p>
                      <p className="text-xs text-[#C8A75E]/60 mt-1">{advisor.expertise}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 glass-panel rounded-2xl p-8 border border-[#C8A75E]/10 text-center">
            <h3 className="text-lg font-serif font-semibold text-[#F5F3EE] mb-2">
              Join the Research Community
            </h3>
            <p className="text-sm text-[#AAB0D6]/60 mb-5 max-w-xl mx-auto">
              We are building a community of scholars dedicated to integrative inquiry. Explore
              fellowship, collaboration, and membership opportunities.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/support/membership"
                className="inline-flex items-center gap-2 text-sm text-[#C8A75E] font-semibold bg-[#C8A75E]/10 border border-[#C8A75E]/25 px-5 py-2.5 rounded-lg hover:bg-[#C8A75E]/16 transition-all"
              >
                Apply for Fellowship
              </Link>
              <Link
                href="/institute/collaborations"
                className="inline-flex items-center gap-2 text-sm text-[#AAB0D6]/60 border border-white/10 px-5 py-2.5 rounded-lg hover:border-[#C8A75E]/25 hover:text-[#C8A75E] transition-all"
              >
                Institutional Collaboration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
