import { ObservatoryHero } from '@/components/observatory-hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import {
  FileText,
  Shield,
  ArrowLeft,
  Scale
} from 'lucide-react';

export const metadata = {
  title: "Submission Terms and Policies | Sufi Science Center",
  description: "Copyright, licensing, attribution, and publication rights for contributions to the Sufi Science Center.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20">
      <ObservatoryHero
        subtitle="Contribute"
        title="Submission Terms and Policies"
        description="Copyright, licensing, and publication rights for your contributions."
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
                <Shield className="w-6 h-6 text-[#C8A75E]" />
                <CardTitle className="text-2xl text-[#F5F3EE]">Copyright and Licensing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <p className="leading-relaxed">
                By submitting your work to the Sufi Science Center, you retain copyright to your original
                content while granting us a non-exclusive license to publish, distribute, and display your
                work as part of our knowledge ecosystem.
              </p>

              <div className="bg-[#C8A75E]/5 p-4 rounded-lg border border-[#C8A75E]/20">
                <p className="text-[#F5F3EE] font-semibold mb-2">What You Retain:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Full copyright ownership of your work
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Right to republish elsewhere with attribution
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Right to include in your portfolio or CV
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Right to create derivative works
                  </li>
                </ul>
              </div>

              <div className="bg-[#C8A75E]/5 p-4 rounded-lg border border-[#C8A75E]/20">
                <p className="text-[#F5F3EE] font-semibold mb-2">What You Grant to Us:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Non-exclusive right to publish on our platform
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Right to edit for clarity, style, and formatting
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Right to translate into other languages
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">✓</span>
                    Right to include in compilations or anthologies
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-[#C8A75E]" />
                <CardTitle className="text-2xl text-[#F5F3EE]">Attribution and Authorship</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <p className="leading-relaxed">
                All published work will be attributed to you as the author with your name, affiliation
                (if provided), and biographical note. Attribution standards follow academic norms.
              </p>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-2">How We Attribute:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Author name prominently displayed
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Professional affiliation or credentials included
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Brief biographical note (if provided)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Publication date clearly marked
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Optional link to your website or professional profile
                  </li>
                </ul>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-2">Collaborative Works:</h3>
                <p className="text-sm">
                  For multi-author submissions, all contributors must be listed and must consent to publication.
                  Primary contact person should be designated in the submission.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <Scale className="w-6 h-6 text-[#C8A75E]" />
                <CardTitle className="text-2xl text-[#F5F3EE]">Editorial Rights and Responsibilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-2">Our Editorial Rights:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Make stylistic and formatting changes for consistency
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Correct grammatical errors and typos
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Request revisions or clarifications
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Add editorial notes for clarity or context
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Decline publication if content doesn't meet standards
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Remove or archive published content if necessary
                  </li>
                </ul>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-[#F5F3EE] font-semibold mb-2">Your Rights as Contributor:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Review and approve substantive editorial changes
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Request corrections to published work
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Request removal of content (with notice period)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C8A75E] mr-2">•</span>
                    Receive notification before any major changes
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F5F3EE]">Warranties and Representations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <p className="leading-relaxed">
                By submitting your work, you warrant and represent that:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">1.</span>
                  The work is your original creation or you have obtained all necessary permissions
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">2.</span>
                  The work does not infringe on any copyright, trademark, or other intellectual property rights
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">3.</span>
                  The work does not contain defamatory, libelous, or unlawful content
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">4.</span>
                  All factual claims are accurate to the best of your knowledge
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">5.</span>
                  Proper citations have been provided for all quoted or referenced material
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">6.</span>
                  You have authority to grant the rights specified in these terms
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F5F3EE]">Open Access and Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#AAB0D6]">
              <p className="leading-relaxed">
                The Sufi Science Center operates on an open access model. All published content is freely
                accessible to the public for educational and research purposes. This means:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">•</span>
                  No paywalls or subscription fees for readers
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">•</span>
                  Content may be freely shared with proper attribution
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">•</span>
                  Works may be included in educational curricula
                </li>
                <li className="flex items-start">
                  <span className="text-[#C8A75E] mr-2">•</span>
                  Content is indexed by search engines and academic databases
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-8">
            <Link href="/contribute/submit" className="flex-1">
              <Button className="w-full bg-[#C8A75E] hover:bg-[#C8A75E]/90 text-[#0B0F2A]">
                <FileText className="w-4 h-4 mr-2" />
                I Agree - Submit My Work
              </Button>
            </Link>
            <Link href="/contribute/guidelines" className="flex-1">
              <Button variant="outline" className="w-full border-[#C8A75E]/30 text-[#C8A75E] hover:bg-[#C8A75E]/10">
                View Submission Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
