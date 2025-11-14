"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { markModuleComplete, setCurrentModule } from "@/lib/utils";

// Import module components
import Module1 from "./modules/Module1";
import Module2 from "./modules/Module2";
import Module3 from "./modules/Module3";
import Module4 from "./modules/Module4";
import Module5 from "./modules/Module5";
import Module6 from "./modules/Module6";
import Module7 from "./modules/Module7";
import Capstone from "./modules/Capstone";

const moduleComponents: { [key: string]: React.ComponentType<any> } = {
  "module-1": Module1,
  "module-2": Module2,
  "module-3": Module3,
  "module-4": Module4,
  "module-5": Module5,
  "module-6": Module6,
  "module-7": Module7,
  "capstone": Capstone,
};

const moduleInfo: { [key: string]: { title: string; nist: string; nextSlug?: string } } = {
  "module-1": { title: "The AI Awakening", nist: "NIST: Identify", nextSlug: "rulebook-decoded" },
  "module-2": { title: "The Rulebook Decoded", nist: "NIST: Govern", nextSlug: "bias-in-machine" },
  "module-3": { title: "Bias in the Machine", nist: "NIST: Measure", nextSlug: "decision-point" },
  "module-4": { title: "The Decision Point", nist: "NIST: Manage", nextSlug: "spotting-red-flags" },
  "module-5": { title: "Spotting the Red Flags", nist: "NIST: Measure", nextSlug: "speaking-up" },
  "module-6": { title: "Speaking Up", nist: "NIST: Manage", nextSlug: "staying-ahead" },
  "module-7": { title: "Staying Ahead", nist: "NIST: Govern", nextSlug: "capstone" },
  "capstone": { title: "Final Capstone Assessment", nist: "NIST: All Functions" },
};

interface ModuleContentProps {
  moduleId: string;
  slug: string;
}

export default function ModuleContent({ moduleId, slug }: ModuleContentProps) {
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const ModuleComponent = moduleComponents[moduleId];
  const info = moduleInfo[moduleId];

  useEffect(() => {
    setCurrentModule(moduleId);
  }, [moduleId]);

  const handleComplete = () => {
    markModuleComplete(moduleId);
    setIsComplete(true);
  };

  if (!ModuleComponent || !info) {
    return <div>Module not found</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Module Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/modules"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All Modules
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold text-primary">{info.title}</h1>
            </div>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {info.nist}
            </span>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ModuleComponent onComplete={handleComplete} />

        {/* Completion Section */}
        {isComplete && (
          <div className="mt-12 bg-green-50 border-2 border-green-500 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  Module Complete! 🎉
                </h3>
                <p className="text-green-800 mb-6">
                  Great work! You've completed this module. {info.nextSlug ? 'Continue to the next module to keep building your AI compliance skills.' : 'You can now proceed to the Capstone Assessment or review other modules.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  {info.nextSlug ? (
                    <Link
                      href={`/modules/${info.nextSlug}`}
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Continue to Next Module
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/modules/capstone"
                      className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Take Capstone Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <Link
                    href="/modules"
                    className="inline-flex items-center gap-2 bg-white text-green-700 border-2 border-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    Back to All Modules
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}