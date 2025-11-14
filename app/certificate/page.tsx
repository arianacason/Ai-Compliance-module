"use client";

import { useEffect, useState } from "react";
import { Download, Award, CheckCircle } from "lucide-react";
import { getProgress } from "@/lib/utils";

export default function CertificatePage() {
  const [userName, setUserName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [progress, setProgress] = useState<{
    completedModules: string[];
    overallProgress: number;
  }>({ completedModules: [], overallProgress: 0 });

  useEffect(() => {
    const progressData = getProgress();
    setProgress(progressData);
    
    // Check if all modules are complete
    const allModulesComplete = progressData.completedModules.length >= 7;
    if (!allModulesComplete) {
      // Redirect to modules page if not complete
      window.location.href = "/modules";
    }
  }, []);

  const handleGenerateCertificate = () => {
    if (userName.trim().length < 2) {
      alert("Please enter your name");
      return;
    }
    setShowCertificate(true);
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll use the browser's print functionality
    window.print();
  };

  if (!showCertificate) {
    return (
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-border p-8">
            <div className="text-center mb-8">
              <Award className="h-16 w-16 text-accent mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-primary mb-2">
                Congratulations!
              </h1>
              <p className="text-muted-foreground">
                You've completed all modules of the AI Compliance Training course.
                Enter your name to generate your certificate.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="bg-blue-50 border-l-4 border-primary p-4">
                <h3 className="font-bold mb-2">Your Achievements</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Completed 7 interactive modules
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Navigated complex ethical dilemmas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Mastered AI compliance frameworks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Completed capstone assessment
                  </li>
                </ul>
              </div>

              <button
                onClick={handleGenerateCertificate}
                disabled={userName.trim().length < 2}
                className="w-full bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Actions */}
        <div className="no-print mb-6 flex justify-between items-center">
          <a
            href="/modules"
            className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            ← Back to Modules
          </a>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCertificate(false)}
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Edit Name
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="certificate-container bg-white rounded-lg border-4 border-primary p-12 print-full-width shadow-2xl">
          <div className="text-center space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">AB</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-primary">Adept Blueprint</div>
                  <div className="text-xs text-muted-foreground">AI Compliance Training</div>
                </div>
              </div>
            </div>

            {/* Certificate Title */}
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                Certificate of Completion
              </h1>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>

            {/* Recipient */}
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">This certifies that</p>
              <p className="text-3xl font-bold text-primary border-b-2 border-primary pb-2 inline-block px-8">
                {userName}
              </p>
              <p className="text-lg text-muted-foreground">has successfully completed</p>
            </div>

            {/* Course Title */}
            <div className="bg-primary/5 rounded-lg p-4 border-2 border-primary">
              <h2 className="text-2xl font-bold text-primary mb-1">
                AI in Motion: Ethical Decision-Making in an Automated Workplace
              </h2>
              <p className="text-sm text-muted-foreground">
                A comprehensive training program covering AI compliance, ethics, and governance
              </p>
            </div>

            {/* Modules Completed */}
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 1</div>
                <div className="text-xs text-muted-foreground">The AI Awakening</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 2</div>
                <div className="text-xs text-muted-foreground">Rulebook Decoded</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 3</div>
                <div className="text-xs text-muted-foreground">Bias in Machine</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 4</div>
                <div className="text-xs text-muted-foreground">Decision Point</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 5</div>
                <div className="text-xs text-muted-foreground">Red Flags</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 6</div>
                <div className="text-xs text-muted-foreground">Speaking Up</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-primary text-xs">Module 7</div>
                <div className="text-xs text-muted-foreground">Staying Ahead</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="font-bold text-accent text-xs">Capstone</div>
                <div className="text-xs text-muted-foreground">Final Assessment</div>
              </div>
            </div>

            {/* Framework Alignment */}
            <div className="bg-blue-50 border-2 border-primary rounded-lg p-3">
              <p className="text-xs font-semibold text-primary mb-1">
                Aligned with NIST AI Risk Management Framework
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span>Govern</span>
                <span>•</span>
                <span>Map</span>
                <span>•</span>
                <span>Measure</span>
                <span>•</span>
                <span>Manage</span>
              </div>
            </div>

            {/* Date and Signature */}
            <div className="flex items-end justify-between pt-4 border-t-2 border-border">
              <div className="text-left">
                <div className="text-xs text-muted-foreground mb-1">Date of Completion</div>
                <div className="font-semibold text-sm">{new Date().toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Certificate ID</div>
                <div className="font-mono text-xs">
                  AB-{Date.now().toString(36).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-muted-foreground pt-2">
              This certificate demonstrates completion of scenario-based AI compliance training
              covering regulatory frameworks, bias detection, ethical decision-making, and
              communication strategies.
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="no-print mt-8 bg-white rounded-lg border border-border p-6">
          <h3 className="font-bold mb-4">What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Share your certificate on LinkedIn to showcase your AI compliance expertise</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Download the toolkit resources to use in your daily work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Set a 30-day reminder to review your personal commitment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Contact us for a custom course tailored to your organization</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}