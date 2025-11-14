"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, Circle, Lock, Unlock, ArrowRight, Clock, Info } from "lucide-react";
import { getProgress } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

const modules = [
  {
    id: "module-1",
    slug: "ai-awakening",
    title: "The AI Awakening",
    subtitle: "Setting the Stage",
    description: "An engaging introduction that moves beyond typical compliance framing. Discover AI systems already influencing your daily work through an interactive branching narrative.",
    duration: "15 min",
    nist: "NIST: Identify",
    color: "bg-blue-500",
  },
  {
    id: "module-2",
    slug: "rulebook-decoded",
    title: "The Rulebook Decoded",
    subtitle: "Regulatory & Policy Framework",
    description: "Transform dense regulatory information into accessible, role-specific guidance. Filter by your role to see only what matters to you.",
    duration: "20 min",
    nist: "NIST: Govern",
    color: "bg-indigo-500",
  },
  {
    id: "module-3",
    slug: "bias-in-machine",
    title: "Bias in the Machine",
    subtitle: "Recognizing Ethical Risks",
    description: "Examine real business case studies to understand how AI systems can perpetuate bias and create unintended consequences.",
    duration: "25 min",
    nist: "NIST: Measure",
    color: "bg-purple-500",
  },
  {
    id: "module-4",
    slug: "decision-point",
    title: "The Decision Point",
    subtitle: "Ethical Dilemma Simulations",
    description: "Navigate complex situations where compliance, business pressure, and ethics intersect through interactive decision trees.",
    duration: "30 min",
    nist: "NIST: Manage",
    color: "bg-pink-500",
  },
  {
    id: "module-5",
    slug: "spotting-red-flags",
    title: "Spotting the Red Flags",
    subtitle: "Practical Risk Recognition",
    description: "Equip yourself with practical tools to identify AI compliance risks in your daily work through checklists and exercises.",
    duration: "20 min",
    nist: "NIST: Measure",
    color: "bg-orange-500",
  },
  {
    id: "module-6",
    slug: "speaking-up",
    title: "Speaking Up",
    subtitle: "Communication & Escalation",
    description: "Learn how to communicate concerns effectively without fear through conversation simulations and templates.",
    duration: "15 min",
    nist: "NIST: Manage",
    color: "bg-green-500",
  },
  {
    id: "module-7",
    slug: "staying-ahead",
    title: "Staying Ahead",
    subtitle: "Continuous Learning & Accountability",
    description: "Frame compliance as an ongoing practice and establish your personal commitment to responsible AI use.",
    duration: "10 min",
    nist: "NIST: Govern",
    color: "bg-teal-500",
  },
];

export default function ModulesPage() {
  const [progress, setProgress] = useState<{
    completedModules: string[];
    currentModule: string | null;
    overallProgress: number;
  }>({ completedModules: [], currentModule: null, overallProgress: 0 });
  const [mounted, setMounted] = useState(false);
  const [lockedModules, setLockedModules] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    setProgress(getProgress());
    
    // Load locked modules from localStorage
    const savedLocks = localStorage.getItem('moduleLocks');
    if (savedLocks) {
      setLockedModules(new Set(JSON.parse(savedLocks)));
    }
  }, []);

  const isModuleComplete = (moduleId: string) => {
    return progress.completedModules.includes(moduleId);
  };

  const isModuleLocked = (index: number) => {
    // First module is always unlocked
    if (index === 0) return false;
    
    // Check if this module is in the locked set
    if (!lockedModules.has(index)) return false;
    
    // If locked, check if previous module is complete
    return !isModuleComplete(modules[index - 1].id);
  };

  const toggleModuleLock = (index: number) => {
    const newLocks = new Set(lockedModules);
    
    if (newLocks.has(index)) {
      // Unlock this module and all below it
      for (let i = index; i < modules.length; i++) {
        newLocks.delete(i);
      }
    } else {
      // Lock this module and all below it
      for (let i = index; i < modules.length; i++) {
        newLocks.add(i);
      }
    }
    
    setLockedModules(newLocks);
    localStorage.setItem('moduleLocks', JSON.stringify(Array.from(newLocks)));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Course Modules</h1>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl">
            Work through seven interactive modules at your own pace. Each module builds on the previous one,
            guiding you from AI fundamentals to practical compliance skills.
          </p>
          
          {/* Demo Feature Notice */}
          <div className="bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-100 mb-1">Demo Feature: Module Locking</p>
                <p className="text-blue-200">
                  Use the lock toggles on each module to enable sequential completion requirements. 
                  When locked, modules require the previous module to be completed before access is granted.
                  This feature demonstrates how the course can enforce a structured learning path.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Your Progress</h3>
              <span className="text-sm">{progress.completedModules.length} of 7 Complete</span>
            </div>
            <ProgressBar />
          </div>
        </div>
      </section>

      {/* Modules List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {modules.map((module, index) => {
              const isComplete = isModuleComplete(module.id);
              const isLocked = isModuleLocked(index);
              const isCurrent = progress.currentModule === module.id;

              return (
                <div
                  key={module.id}
                  className={`bg-white rounded-lg border-2 transition-all relative ${
                    isCurrent
                      ? "border-primary shadow-lg"
                      : isComplete
                      ? "border-green-500"
                      : isLocked
                      ? "border-border opacity-60"
                      : "border-border hover:border-primary hover:shadow-md"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Module Number & Status */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl ${
                            isComplete ? "bg-green-500" : isLocked ? "bg-gray-400" : module.color
                          }`}
                        >
                          {isComplete ? (
                            <CheckCircle className="h-8 w-8" />
                          ) : isLocked ? (
                            <Lock className="h-8 w-8" />
                          ) : (
                            index + 1
                          )}
                        </div>
                      </div>

                      {/* Module Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 pr-4">
                            <h2 className="text-2xl font-bold text-primary mb-1">
                              {module.title}
                            </h2>
                            <p className="text-sm text-muted-foreground font-medium">
                              {module.subtitle}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {module.duration}
                              </span>
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                {module.nist}
                              </span>
                            </div>
                            {/* Lock Toggle */}
                            {index > 0 && (
                              <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={lockedModules.has(index)}
                                  onChange={() => toggleModuleLock(index)}
                                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                                  {lockedModules.has(index) ? (
                                    <>
                                      <Lock className="h-3.5 w-3.5" />
                                      <span>Locked</span>
                                    </>
                                  ) : (
                                    <>
                                      <Unlock className="h-3.5 w-3.5" />
                                      <span>Unlocked</span>
                                    </>
                                  )}
                                </div>
                              </label>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{module.description}</p>

                        {/* Action Button */}
                        {isLocked ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lock className="h-4 w-4" />
                            <span>Complete previous module to unlock</span>
                          </div>
                        ) : (
                          <Link
                            href={`/modules/${module.slug}`}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                              isComplete
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-primary text-white hover:bg-primary-800"
                            }`}
                          >
                            {isComplete ? "Review Module" : isCurrent ? "Continue" : "Start Module"}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Capstone Section */}
          <div className="mt-12 bg-gradient-to-br from-accent to-orange-600 rounded-lg p-8 text-white">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-3xl font-bold">
                🏆
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Final Capstone Assessment</h2>
                <p className="text-accent-50 mb-4">
                  Apply everything you've learned in a complex, multi-layered scenario that tests your
                  knowledge, judgment, and communication skills.
                </p>
                {progress.completedModules.length >= 6 ? (
                  <Link
                    href="/modules/capstone"
                    className="inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors"
                  >
                    Start Capstone
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-accent-100">
                    <Lock className="h-4 w-4" />
                    <span>Complete at least 6 modules to unlock (80% progress)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}