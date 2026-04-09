import { Users, GraduationCap, Shield, Award } from 'lucide-react';

export const metadata = {
  title: 'Board and Advisory Council - Sufi Science Center',
  description: 'Leadership structure and academic oversight of the Sufi Science Center',
};

const boardMembers = [
  {
    name: 'Dr. Fayaz Ahmad Khan',
    role: 'Founder and Director',
    expertise: 'Consciousness Studies, Sufi Philosophy',
    affiliation: 'Sufi Science Center USA',
    bio: 'Leading research at the intersection of traditional Sufi wisdom and contemporary consciousness science.',
  },
];

const advisoryCouncil = [
  {
    name: 'Advisory Council',
    role: 'Academic Oversight',
    expertise: 'Multi-disciplinary Review',
    affiliation: 'Various Institutions',
    bio: 'Distinguished scholars providing guidance on research methodology, ethical standards, and academic rigor.',
  },
];

const researchFellows = [
  {
    name: 'Research Fellowship Program',
    role: 'Contributing Scholars',
    expertise: 'Specialized Research Areas',
    affiliation: 'Collaborative Network',
    bio: 'Active researchers contributing to ongoing projects and knowledge development.',
  },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-[#C8A75E] mr-3" />
            <h1 className="text-4xl font-light text-white">Board and Advisory Council</h1>
          </div>
          <p className="text-xl text-[#AAB0D6] max-w-3xl">
            Leadership structure, academic oversight, and institutional accountability
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Board of Directors</h2>
            </div>
            <div className="grid md:grid-cols-1 gap-6">
              {boardMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8 hover:border-[#C8A75E]/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                      <p className="text-[#C8A75E] mb-2">{member.role}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-sm">
                      <span className="text-[#AAB0D6]/60 mr-2 min-w-[120px]">Expertise:</span>
                      <span className="text-[#AAB0D6]">{member.expertise}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <span className="text-[#AAB0D6]/60 mr-2 min-w-[120px]">Affiliation:</span>
                      <span className="text-[#AAB0D6]">{member.affiliation}</span>
                    </div>
                  </div>
                  <p className="text-[#AAB0D6]/80 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Academic Advisory Council</h2>
            </div>
            <p className="text-[#AAB0D6] mb-6">
              Distinguished scholars from multiple disciplines providing guidance on research methodology,
              ethical standards, and academic rigor. The council ensures intellectual integrity and
              maintains alignment with both traditional scholarship and contemporary research standards.
            </p>
            <div className="grid md:grid-cols-1 gap-6">
              {advisoryCouncil.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                      <p className="text-[#C8A75E] mb-2">{member.role}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-sm">
                      <span className="text-[#AAB0D6]/60 mr-2 min-w-[120px]">Expertise:</span>
                      <span className="text-[#AAB0D6]">{member.expertise}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <span className="text-[#AAB0D6]/60 mr-2 min-w-[120px]">Network:</span>
                      <span className="text-[#AAB0D6]">{member.affiliation}</span>
                    </div>
                  </div>
                  <p className="text-[#AAB0D6]/80 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-[#C8A75E] mr-3" />
              <h2 className="text-2xl font-light text-white">Research Fellows</h2>
            </div>
            <p className="text-[#AAB0D6] mb-6">
              Active scholars contributing to ongoing research projects, publications, and knowledge
              development. Fellows bring specialized expertise in areas spanning traditional texts,
              consciousness studies, physics, psychology, and contemplative practices.
            </p>
            <div className="grid md:grid-cols-1 gap-6">
              {researchFellows.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                      <p className="text-[#C8A75E] mb-2">{member.role}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C8A75E]/20 to-[#C8A75E]/5 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#C8A75E]" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-sm">
                      <span className="text-[#AAB0D6]/60 mr-2 min-w-[120px]">Focus Areas:</span>
                      <span className="text-[#AAB0D6]">{member.expertise}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <span className="text-[#AAB0D6]/60 mr-2 min-w-[120px]">Network:</span>
                      <span className="text-[#AAB0D6]">{member.affiliation}</span>
                    </div>
                  </div>
                  <p className="text-[#AAB0D6]/80 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1b2e]/60 to-[#16213e]/60 backdrop-blur-sm border border-[#2A2F4F]/30 rounded-xl p-8">
            <h3 className="text-xl font-medium text-white mb-4">Ethics and Review</h3>
            <p className="text-[#AAB0D6] leading-relaxed mb-4">
              All research and content undergoes rigorous review to ensure:
            </p>
            <ul className="space-y-2 text-[#AAB0D6]">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>Intellectual integrity and academic rigor</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>Cultural and spiritual respect in interpretation</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>Transparency in methodology and sourcing</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-[#C8A75E] rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>Alignment with both traditional scholarship and contemporary standards</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
