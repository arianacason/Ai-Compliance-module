"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Download, ChevronDown, ChevronUp } from "lucide-react";

interface ChecklistItem {
  id: string;
  question: string;
  guidance: string;
  riskLevel: "high" | "medium" | "low";
}

const checklist: ChecklistItem[] = [
  {
    id: "transparency",
    question: "Can you explain how the AI system makes decisions?",
    guidance: "If you can't explain the decision-making process to a non-technical stakeholder, the system lacks transparency. This creates accountability and compliance risks. High-risk systems require explainability.",
    riskLevel: "high",
  },
  {
    id: "data-source",
    question: "Do you know what data the AI system uses and where it comes from?",
    guidance: "Unknown data sources create multiple risks: bias from unrepresentative data, privacy violations from unauthorized data use, and compliance issues from unverified data quality.",
    riskLevel: "high",
  },
  {
    id: "consent",
    question: "Was consent obtained for all data used by the AI system?",
    guidance: "Using data without proper consent violates privacy regulations (GDPR, CCPA) and creates legal liability. This is especially critical for personal data and sensitive information.",
    riskLevel: "high",
  },
  {
    id: "bias-testing",
    question: "Has the system been tested for bias across different demographic groups?",
    guidance: "Untested systems may discriminate against protected groups, violating civil rights laws. Regular bias testing is essential, especially for systems affecting employment, lending, or healthcare.",
    riskLevel: "high",
  },
  {
    id: "human-oversight",
    question: "Is there human oversight for high-stakes decisions?",
    guidance: "Fully automated decisions in high-stakes contexts (hiring, lending, healthcare) create legal and ethical risks. Human review provides accountability and catches AI errors.",
    riskLevel: "high",
  },
  {
    id: "logging",
    question: "Does the system log decisions and the data used to make them?",
    guidance: "Without logging, you can't audit decisions, investigate complaints, or demonstrate compliance. Logging is required for many regulatory frameworks and essential for accountability.",
    riskLevel: "medium",
  },
  {
    id: "error-handling",
    question: "Does the system have clear error handling when it encounters data it can't process?",
    guidance: "Poor error handling can lead to incorrect decisions or system failures. Users should have clear paths to escalate issues and receive human assistance when AI fails.",
    riskLevel: "medium",
  },
  {
    id: "update-process",
    question: "Is there a process for updating the AI system when it performs poorly?",
    guidance: "AI systems can drift over time as data patterns change. Without update processes, performance degrades and bias can emerge. Regular monitoring and retraining are essential.",
    riskLevel: "medium",
  },
  {
    id: "data-retention",
    question: "Are there clear policies for how long data is retained?",
    guidance: "Indefinite data retention violates privacy principles and regulations. Clear retention policies demonstrate compliance and reduce security risks from unnecessary data storage.",
    riskLevel: "medium",
  },
  {
    id: "access-controls",
    question: "Is access to the AI system and its data properly controlled and documented?",
    guidance: "Unrestricted access creates security and privacy risks. Access should be limited to those with legitimate need and properly documented for audit purposes.",
    riskLevel: "medium",
  },
  {
    id: "vendor-documentation",
    question: "If using a vendor system, do you have documentation of how it works?",
    guidance: "Vendor 'black boxes' create accountability gaps. You need sufficient documentation to understand risks, explain decisions, and ensure compliance even with third-party systems.",
    riskLevel: "medium",
  },
  {
    id: "user-notification",
    question: "Are users informed when they're interacting with an AI system?",
    guidance: "Transparency requires disclosing AI use. Users have a right to know when decisions are automated, especially in customer service, content moderation, or decision-making contexts.",
    riskLevel: "low",
  },
  {
    id: "feedback-mechanism",
    question: "Can users provide feedback or challenge AI decisions?",
    guidance: "Feedback mechanisms improve system quality and provide accountability. Users should be able to report errors, request human review, or challenge decisions they believe are wrong.",
    riskLevel: "low",
  },
  {
    id: "performance-monitoring",
    question: "Is system performance monitored over time?",
    guidance: "Without monitoring, you won't detect degradation, bias drift, or emerging issues. Regular performance reviews ensure the system continues to work as intended.",
    riskLevel: "low",
  },
  {
    id: "documentation",
    question: "Is there documentation of the system's purpose, limitations, and risks?",
    guidance: "Documentation is essential for training, audits, and compliance. It should cover what the system does, what it shouldn't be used for, and known limitations or risks.",
    riskLevel: "low",
  },
];

const riskScenarios = [
  {
    id: "scenario-1",
    title: "Chatbot Recommending Medical Advice",
    description: "A customer service chatbot starts providing medical advice to users asking health-related questions, despite not being designed or validated for medical use.",
    risks: [
      { risk: "Unauthorized medical advice", severity: "Critical", likelihood: "High" },
      { risk: "Liability for harm", severity: "Critical", likelihood: "Medium" },
      { risk: "Regulatory violations", severity: "High", likelihood: "High" },
      { risk: "Reputational damage", severity: "High", likelihood: "High" },
    ],
    correctRanking: ["Unauthorized medical advice", "Liability for harm", "Regulatory violations", "Reputational damage"],
  },
  {
    id: "scenario-2",
    title: "AI Hiring Tool Without Bias Testing",
    description: "An AI resume screening tool is deployed without testing for bias. It was trained on 5 years of historical hiring data from the company.",
    risks: [
      { risk: "Discriminatory hiring outcomes", severity: "Critical", likelihood: "High" },
      { risk: "EEOC violations", severity: "Critical", likelihood: "High" },
      { risk: "Lawsuits from applicants", severity: "High", likelihood: "Medium" },
      { risk: "Loss of diverse talent", severity: "Medium", likelihood: "High" },
    ],
    correctRanking: ["Discriminatory hiring outcomes", "EEOC violations", "Lawsuits from applicants", "Loss of diverse talent"],
  },
];

interface Module5Props {
  onComplete: () => void;
}

export default function Module5({ onComplete }: Module5Props) {
  const [checklistAnswers, setChecklistAnswers] = useState<{ [key: string]: boolean }>({});
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [rankedRisks, setRankedRisks] = useState<string[]>([]);
  const [showRanking, setShowRanking] = useState(false);

  const handleChecklistAnswer = (itemId: string, answer: boolean) => {
    setChecklistAnswers({ ...checklistAnswers, [itemId]: answer });
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems({ ...expandedItems, [itemId]: !expandedItems[itemId] });
  };

  const calculateRiskScore = () => {
    const highRiskItems = checklist.filter((item) => item.riskLevel === "high");
    const failedHighRisk = highRiskItems.filter((item) => checklistAnswers[item.id] === false).length;
    
    const mediumRiskItems = checklist.filter((item) => item.riskLevel === "medium");
    const failedMediumRisk = mediumRiskItems.filter((item) => checklistAnswers[item.id] === false).length;

    const totalAnswered = Object.keys(checklistAnswers).length;
    const checklistComplete = totalAnswered === checklist.length;

    return { failedHighRisk, failedMediumRisk, checklistComplete };
  };

  const { failedHighRisk, failedMediumRisk, checklistComplete } = calculateRiskScore();

  // Auto-complete module when checklist is complete
  useEffect(() => {
    if (checklistComplete) {
      onComplete();
    }
  }, [checklistComplete, onComplete]);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setRankedRisks([]);
    setShowRanking(false);
  };

  const currentScenario = riskScenarios.find((s) => s.id === selectedScenario);

  const handleRiskRank = (risk: string) => {
    if (rankedRisks.includes(risk)) {
      setRankedRisks(rankedRisks.filter((r) => r !== risk));
    } else {
      setRankedRisks([...rankedRisks, risk]);
    }
  };

  const handleSubmitRanking = () => {
    if (rankedRisks.length !== currentScenario?.risks.length) {
      alert("Please rank all risks before submitting");
      return;
    }
    setShowRanking(true);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-lg border border-border p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            5
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Spotting the Red Flags</h2>
            <p className="text-muted-foreground">
              Practical Risk Recognition - Tools and Checklists for Daily Work
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-primary p-4">
          <p className="text-sm text-primary-900">
            <strong>Module Goal:</strong> Equip yourself with practical tools to identify AI compliance
            risks in your daily work. Learn to use diagnostic checklists and prioritize risks effectively.
          </p>
        </div>
      </div>

      {/* Diagnostic Checklist */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">🔍 AI System Diagnostic Checklist</h3>
        <p className="text-muted-foreground mb-6">
          Use this checklist to evaluate any AI system you encounter. Answer each question honestly
          based on what you know about the system.
        </p>

        <div className="space-y-3">
          {checklist.map((item) => {
            const isAnswered = checklistAnswers[item.id] !== undefined;
            const answer = checklistAnswers[item.id];
            const isExpanded = expandedItems[item.id];

            return (
              <div
                key={item.id}
                className={`border-2 rounded-lg transition-all ${
                  isAnswered
                    ? answer
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-border"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{item.question}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            item.riskLevel === "high"
                              ? "bg-red-100 text-red-700"
                              : item.riskLevel === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleChecklistAnswer(item.id, true)}
                        className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                          answer === true
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-green-100"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleChecklistAnswer(item.id, false)}
                        className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                          answer === false
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-red-100"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary-800 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Hide guidance
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Show guidance
                      </>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">{item.guidance}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Assessment */}
        {checklistComplete && (
          <div className="mt-8 p-6 bg-gradient-to-br from-primary to-primary-900 text-white rounded-lg">
            <h4 className="text-xl font-bold mb-4">📊 Risk Assessment Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{failedHighRisk}</div>
                <div className="text-sm text-primary-100">Critical Risks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{failedMediumRisk}</div>
                <div className="text-sm text-primary-100">Medium Risks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {failedHighRisk === 0 && failedMediumRisk <= 2 ? "Low" : failedHighRisk >= 3 ? "Critical" : "High"}
                </div>
                <div className="text-sm text-primary-100">Overall Risk Level</div>
              </div>
            </div>
            <div className="text-sm">
              {failedHighRisk === 0 && failedMediumRisk === 0 ? (
                <p>✅ Excellent! This system shows strong compliance practices.</p>
              ) : failedHighRisk >= 3 ? (
                <p>⚠️ Critical: This system has major compliance gaps that need immediate attention.</p>
              ) : failedHighRisk > 0 ? (
                <p>⚠️ Warning: This system has high-risk compliance issues that should be addressed.</p>
              ) : (
                <p>⚠️ Moderate: This system has some compliance gaps to address.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Risk Ranking Exercise */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">🎯 Risk Ranking Exercise</h3>
        <p className="text-muted-foreground mb-6">
          Practice prioritizing risks by ranking them from most to least severe. This helps you
          focus on the most critical issues first.
        </p>

        {!selectedScenario ? (
          <div className="space-y-4">
            {riskScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className="w-full text-left p-6 border-2 border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-lg mb-2">{scenario.title}</h4>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h4 className="font-bold mb-2">{currentScenario?.title}</h4>
              <p className="text-sm">{currentScenario?.description}</p>
            </div>

            {!showRanking ? (
              <>
                <div>
                  <h4 className="font-semibold mb-3">
                    Rank these risks from most to least severe (click to select in order):
                  </h4>
                  <div className="space-y-2">
                    {currentScenario?.risks.map((risk, index) => {
                      const rankPosition = rankedRisks.indexOf(risk.risk);
                      const isRanked = rankPosition !== -1;

                      return (
                        <button
                          key={index}
                          onClick={() => handleRiskRank(risk.risk)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            isRanked
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary hover:bg-primary/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{risk.risk}</span>
                            {isRanked && (
                              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                {rankPosition + 1}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedScenario(null)}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    ← Back to scenarios
                  </button>
                  <button
                    onClick={handleSubmitRanking}
                    disabled={rankedRisks.length !== currentScenario?.risks.length}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Ranking
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Your Ranking vs. Expert Ranking</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-3 text-sm text-muted-foreground">Your Ranking</h5>
                    <div className="space-y-2">
                      {rankedRisks.map((risk, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded">
                          <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3 text-sm text-muted-foreground">Expert Ranking</h5>
                    <div className="space-y-2">
                      {currentScenario?.correctRanking.map((risk, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
                          <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-primary p-4">
                  <p className="text-sm">
                    <strong>Expert Rationale:</strong> The ranking prioritizes risks by combining severity
                    and likelihood. Critical risks with high likelihood (like discriminatory outcomes or
                    unauthorized medical advice) rank highest because they're both severe and likely to occur.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedScenario(null)}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
                >
                  Try Another Scenario
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Downloads */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">📥 Downloadable Resources</h3>
        <div className="space-y-3">
          <a
            href="/downloads/ai-risk-checklist.pdf"
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            download
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">AI Risk Checklist (Printable)</div>
                <div className="text-sm text-muted-foreground">Use this in your daily work</div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">PDF</span>
          </a>
          <a
            href="/downloads/risk-assessment-template.pdf"
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            download
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Risk Assessment Template</div>
                <div className="text-sm text-muted-foreground">Document and prioritize risks</div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">PDF</span>
          </a>
        </div>
      </div>

      
    </div>
  );
}