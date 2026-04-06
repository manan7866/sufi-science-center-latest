import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  FileText,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

export const metadata = {
  title: "Submission Guidelines | Sufi Science Center",
  description: "Editorial standards, formatting requirements, and content guidelines for submissions to the Sufi Science Center.",
};

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Contribute"
        title="Submission Guidelines"
        description="Standards for academic rigor, cultural authenticity, and editorial quality."
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/contribute">
          <Button variant="ghost" className="mb-8 text-[#AAB0D6] hover:text-[#C8A75E]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contribute Portal
          </Button>
        </Link>

        <div className="space-y-8">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-[#C8A75E]" />
                <CardTitle className="text-2xl text-[#F5F3EE]">Editorial Philosophy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <p className="leading-relaxed">
                The Sufi Science Center maintains rigorous editorial standards to ensure all published content
                meets criteria for academic integrity, cultural sensitivity, and intellectual depth. We seek
                contributions that advance understanding at the intersection of science and spirituality while
                respecting the integrity of both domains.
              </p>
              <p className="leading-relaxed">
                Our editorial process balances scholarly rigor with accessibility, ensuring content is both
                academically sound and publicly engaging. We value clarity, precision, and the courage to
                explore complex questions without resorting to oversimplification.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-[#F5F3EE]">General Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F5F3EE] font-medium mb-1">Original Content</p>
                    <p className="text-[#AAB0D6] text-sm">
                      Submissions must be original work not previously published elsewhere. Proper citation
                      is required for all referenced material.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F5F3EE] font-medium mb-1">Clear Language</p>
                    <p className="text-[#AAB0D6] text-sm">
                      Write clearly for educated non-specialist audiences. Define technical terms,
                      avoid unnecessary jargon, and explain complex concepts accessibly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F5F3EE] font-medium mb-1">Cultural Authenticity</p>
                    <p className="text-[#AAB0D6] text-sm">
                      Represent spiritual traditions accurately and respectfully. Cite authoritative sources
                      and acknowledge cultural context.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C8A75E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F5F3EE] font-medium mb-1">Evidence-Based</p>
                    <p className="text-[#AAB0D6] text-sm">
                      Support claims with evidence, whether empirical research, textual analysis,
                      or documented contemplative experience. Distinguish fact from interpretation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-[#F5F3EE]">Format and Style</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-3">Research Papers</h3>
                <ul className="space-y-2 text-[#AAB0D6] text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Abstract (150-300 words)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Main content (3,000-8,000 words)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    References in APA, MLA, or Chicago style
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Supplementary materials (optional)
                  </li>
                </ul>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-3">Articles and Essays</h3>
                <ul className="space-y-2 text-[#AAB0D6] text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Length: 1,500-4,000 words
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Engaging opening that frames the inquiry
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Clear argument or narrative structure
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Key sources cited appropriately
                  </li>
                </ul>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-3">Sacred Texts and Poetry</h3>
                <ul className="space-y-2 text-[#AAB0D6] text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Original text with proper attribution
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Translation (if applicable) with translator credits
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Commentary explaining context, themes, and significance
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Cultural and historical background
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-[#F5F3EE]">Review Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <div className="space-y-3">
                <div>
                  <p className="text-[#F5F3EE] font-medium mb-1">1. Initial Review (1-2 weeks)</p>
                  <p className="text-sm">
                    Editorial team assesses submission for alignment with mission, quality standards,
                    and completeness.
                  </p>
                </div>

                <div>
                  <p className="text-[#F5F3EE] font-medium mb-1">2. Peer Review (2-4 weeks)</p>
                  <p className="text-sm">
                    Qualified reviewers evaluate content for accuracy, rigor, and contribution to the field.
                    Feedback provided for revisions if needed.
                  </p>
                </div>

                <div>
                  <p className="text-[#F5F3EE] font-medium mb-1">3. Editorial Decision</p>
                  <p className="text-sm">
                    Final decision: accept, request revision, or decline. All submitters receive detailed
                    feedback regardless of outcome.
                  </p>
                </div>

                <div>
                  <p className="text-[#F5F3EE] font-medium mb-1">4. Publication</p>
                  <p className="text-sm">
                    Approved content is edited for style, formatted for web, and published in the appropriate
                    knowledge module with full attribution.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-[#C8A75E]/30 bg-[#C8A75E]/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#C8A75E]" />
                <CardTitle className="text-xl text-[#F5F3EE]">What We Cannot Accept</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-[#AAB0D6]">
              <p className="flex items-start text-sm">
                <span className="text-[#C8A75E] mr-2">•</span>
                Plagiarized or non-original content
              </p>
              <p className="flex items-start text-sm">
                <span className="text-[#C8A75E] mr-2">•</span>
                Content promoting pseudoscience or making unfounded claims
              </p>
              <p className="flex items-start text-sm">
                <span className="text-[#C8A75E] mr-2">•</span>
                Material that misrepresents or appropriates spiritual traditions
              </p>
              <p className="flex items-start text-sm">
                <span className="text-[#C8A75E] mr-2">•</span>
                Promotional content or commercial advertising
              </p>
              <p className="flex items-start text-sm">
                <span className="text-[#C8A75E] mr-2">•</span>
                Content violating copyright or intellectual property rights
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-8">
            <Link href="/contribute/submit" className="flex-1">
              <Button className="w-full bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                <FileText className="w-4 h-4 mr-2" />
                Submit Your Work
              </Button>
            </Link>
            <Link href="/contribute/terms" className="flex-1">
              <Button variant="outline" className="w-full border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10">
                View Terms and Policies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
