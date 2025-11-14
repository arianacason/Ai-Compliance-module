"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Download, MessageSquare, AlertCircle } from "lucide-react";

interface ConversationScenario {
  id: string;
  title: string;
  context: string;
  yourRole: string;
  concern: string;
  options: {
    id: string;
    approach: string;
    message: string;
    feedback: {
      tone: "professional" | "too-aggressive" | "too-passive";
      clarity: "clear" | "vague" | "confusing";
      effectiveness: "high" | "medium" | "low";
      commentary: string;
    };
  }[];
}

const scenarios: ConversationScenario[] = [
  {
    id: "manager-bias",
    title: "Reporting Bias to Your Manager",
    context: "You've discovered that the AI hiring tool your team uses appears to be biased against candidates from certain universities. You need to raise this with your manager.",
    yourRole: "Data Analyst",
    concern: "AI hiring tool shows bias against certain universities",
    options: [
      {
        id: "direct-data",
        approach: "Direct with Data",
        message: "Hi [Manager], I've been analyzing our AI hiring tool's performance and found a concerning pattern. Candidates from historically Black colleges and universities (HBCUs) are being screened out at 3x the rate of candidates from other schools with similar qualifications. I've documented the analysis in the attached report. This could create EEOC compliance issues and cause us to miss qualified candidates. Can we schedule time to discuss next steps?",
        feedback: {
          tone: "professional",
          clarity: "clear",
          effectiveness: "high",
          commentary: "Excellent approach. You lead with data, clearly state the problem, identify the compliance risk, and propose a concrete next step. The tone is professional and solution-oriented rather than accusatory.",
        },
      },
      {
        id: "vague-concern",
        approach: "Vague Concern",
        message: "Hey, I think there might be something wrong with the hiring tool. It seems like it's not working right for some candidates. We should probably look into it at some point.",
        feedback: {
          tone: "too-passive",
          clarity: "vague",
          effectiveness: "low",
          commentary: "This is too vague to prompt action. You haven't specified what's wrong, why it matters, or what you want done about it. Managers receive many vague concerns—specific, data-backed issues get attention.",
        },
      },
      {
        id: "accusatory",
        approach: "Accusatory",
        message: "I can't believe we're using a discriminatory AI tool! This is going to get us sued. Someone should have caught this before deployment. We need to shut it down immediately.",
        feedback: {
          tone: "too-aggressive",
          clarity: "clear",
          effectiveness: "medium",
          commentary: "While the urgency is appropriate, the accusatory tone may make your manager defensive. This approach can damage relationships and make people less receptive to your concerns, even when you're right about the issue.",
        },
      },
      {
        id: "solution-focused",
        approach: "Solution-Focused",
        message: "Hi [Manager], I've identified a bias issue in our hiring tool that needs attention. I've also researched potential solutions: we could retrain the model with more diverse data, implement bias correction algorithms, or add human review for affected candidates. I've outlined the options with pros/cons in the attached doc. Can we discuss which approach makes sense for our timeline and resources?",
        feedback: {
          tone: "professional",
          clarity: "clear",
          effectiveness: "high",
          commentary: "Outstanding approach. You identify the problem and immediately offer solutions, making it easy for your manager to take action. This demonstrates initiative and makes you a problem-solver rather than just a problem-identifier.",
        },
      },
    ],
  },
  {
    id: "compliance-concern",
    title: "Escalating to Compliance",
    context: "Your manager dismissed your concerns about the AI tool's bias. You need to escalate to the compliance team.",
    yourRole: "Data Analyst",
    concern: "Manager dismissed bias concerns about AI hiring tool",
    options: [
      {
        id: "formal-escalation",
        approach: "Formal Escalation",
        message: "Dear Compliance Team, I'm writing to report a potential EEOC compliance issue with our AI hiring tool. I identified bias against HBCU candidates (documented in attached analysis) and raised this with my manager on [date]. The concern was not addressed, and the tool remains in use. Given the legal and ethical implications, I believe this requires compliance review. I'm available to provide additional information or analysis as needed. Thank you for your attention to this matter.",
        feedback: {
          tone: "professional",
          clarity: "clear",
          effectiveness: "high",
          commentary: "Perfect escalation. You clearly state the issue, document your previous attempt to resolve it, explain why compliance involvement is needed, and offer to help. This creates a clear paper trail and demonstrates you followed proper channels.",
        },
      },
      {
        id: "emotional",
        approach: "Emotional Appeal",
        message: "I'm really worried about our hiring tool and my manager won't listen. I think we're discriminating against people and it's not right. Can you please do something about this? I don't want to get in trouble but I can't just ignore it.",
        feedback: {
          tone: "too-passive",
          clarity: "vague",
          effectiveness: "low",
          commentary: "This focuses on your feelings rather than the facts. Compliance teams need specific information to act. The apologetic tone and focus on not getting in trouble undermines the seriousness of the issue.",
        },
      },
      {
        id: "threatening",
        approach: "Threatening",
        message: "I've identified serious bias in our hiring tool and my manager is ignoring it. If this isn't addressed immediately, I'll have no choice but to report it to the EEOC myself. This is a major liability and heads will roll if we get sued.",
        feedback: {
          tone: "too-aggressive",
          clarity: "clear",
          effectiveness: "medium",
          commentary: "While this will likely get attention, the threatening tone is counterproductive. You're positioning yourself as adversarial rather than as someone trying to help the company. This can damage your career and make people less likely to work with you.",
        },
      },
      {
        id: "documented",
        approach: "Well-Documented",
        message: "Dear Compliance Team, I'm reporting a potential fair lending violation in our AI hiring system. Attached you'll find: (1) Statistical analysis showing disparate impact, (2) Email chain with my manager documenting my concerns and their response, (3) Relevant EEOC guidelines, (4) Proposed remediation options. This requires urgent attention as the system is currently in production. I'm available for a call to discuss. Best regards, [Your name]",
        feedback: {
          tone: "professional",
          clarity: "clear",
          effectiveness: "high",
          commentary: "Exceptional escalation. You provide everything compliance needs to act: evidence, documentation of previous attempts to resolve, relevant regulations, and solutions. This makes it easy for them to take action and shows you've done your homework.",
        },
      },
    ],
  },
  {
    id: "client-concern",
    title: "Addressing Client Concerns",
    context: "A client has expressed concerns about how your company's AI system makes decisions affecting their customers.",
    yourRole: "Account Manager",
    concern: "Client worried about AI decision-making transparency",
    options: [
      {
        id: "transparent",
        approach: "Transparent Explanation",
        message: "Thank you for raising this concern. I understand the importance of transparency in AI decision-making. Our system uses [specific factors] to make recommendations, and we've implemented several safeguards: human review for high-stakes decisions, regular bias testing, and audit trails for all decisions. I'd like to schedule a call with our technical team to walk through exactly how the system works and address your specific questions. Would that be helpful?",
        feedback: {
          tone: "professional",
          clarity: "clear",
          effectiveness: "high",
          commentary: "Excellent response. You acknowledge their concern, provide specific information about safeguards, and offer to provide more detail. This builds trust and demonstrates your company takes transparency seriously.",
        },
      },
      {
        id: "dismissive",
        approach: "Dismissive",
        message: "Our AI system is industry-leading and used by many companies. You don't need to worry about how it works—just trust that it's doing its job correctly. We wouldn't use it if it wasn't reliable.",
        feedback: {
          tone: "too-aggressive",
          clarity: "vague",
          effectiveness: "low",
          commentary: "This dismisses legitimate concerns and asks for blind trust. Clients have a right to understand systems affecting their customers. This response damages trust and may lead to contract issues or client loss.",
        },
      },
      {
        id: "overly-technical",
        approach: "Overly Technical",
        message: "Our system uses a gradient-boosted decision tree ensemble with SHAP values for explainability. The model was trained on 10 million data points with cross-validation and achieves 94% accuracy on our test set. The architecture includes...",
        feedback: {
          tone: "professional",
          clarity: "confusing",
          effectiveness: "low",
          commentary: "While technically accurate, this is too complex for most clients. You need to translate technical details into business language that addresses their actual concerns about fairness, accuracy, and accountability.",
        },
      },
      {
        id: "balanced",
        approach: "Balanced & Honest",
        message: "That's a great question and I appreciate you raising it. Our AI system analyzes [business-relevant factors] to make recommendations. We've built in safeguards like bias testing and human oversight, but I want to be honest: no AI system is perfect. We continuously monitor performance and have processes to address issues when they arise. I'd like to understand your specific concerns so we can address them directly. What aspects of the decision-making are most important to you?",
        feedback: {
          tone: "professional",
          clarity: "clear",
          effectiveness: "high",
          commentary: "Outstanding response. You're transparent about both capabilities and limitations, which builds trust. By asking about their specific concerns, you can provide targeted information rather than overwhelming them with details.",
        },
      },
    ],
  },
];

const templates = [
  {
    category: "Email Templates",
    items: [
      {
        title: "Bias Concern to Manager",
        description: "Template for reporting AI bias to your direct manager",
      },
      {
        title: "Compliance Escalation",
        description: "Formal escalation to compliance team",
      },
      {
        title: "Cross-Team Collaboration",
        description: "Requesting help from other teams on AI issues",
      },
    ],
  },
  {
    category: "Talking Points",
    items: [
      {
        title: "Executive Briefing",
        description: "Key points for presenting AI risks to leadership",
      },
      {
        title: "Client Communication",
        description: "Explaining AI systems to external stakeholders",
      },
      {
        title: "Team Training",
        description: "Introducing AI compliance to your team",
      },
    ],
  },
];

interface Module6Props {
  onComplete: () => void;
}

export default function Module6({ onComplete }: Module6Props) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  const currentScenario = scenarios.find((s) => s.id === selectedScenario);
  const currentOption = currentScenario?.options.find((o) => o.id === selectedOption);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowFeedback(true);
    if (currentScenario && !completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios([...completedScenarios, currentScenario.id]);
    }
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const allScenariosComplete = completedScenarios.length === scenarios.length;

  // Auto-complete module when all scenarios are done
  useEffect(() => {
    if (allScenariosComplete) {
      onComplete();
    }
  }, [allScenariosComplete, onComplete]);

  if (!selectedScenario) {
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg border border-border p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              6
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Speaking Up</h2>
              <p className="text-muted-foreground">
                Communication & Escalation - How to Raise Concerns Effectively
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-primary p-4">
            <p className="text-sm text-primary-900">
              <strong>Module Goal:</strong> Learn how to communicate AI compliance concerns effectively
              without fear. Practice difficult conversations and understand escalation pathways.
            </p>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="bg-white rounded-lg border border-border p-8">
          <h3 className="text-xl font-bold mb-4">💬 Conversation Scenarios</h3>
          <p className="text-muted-foreground mb-6">
            Practice communicating concerns in realistic workplace situations. See how different
            approaches affect outcomes.
          </p>

          <div className="space-y-4">
            {scenarios.map((scenario) => {
              const isComplete = completedScenarios.includes(scenario.id);
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario.id)}
                  className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                    isComplete
                      ? "border-green-500 bg-green-50"
                      : "border-border hover:border-primary hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg">{scenario.title}</h4>
                    {isComplete && <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{scenario.context}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      Your Role: {scenario.yourRole}
                    </span>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded">
                      {scenario.options.length} approaches to try
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates */}
        <div className="bg-white rounded-lg border border-border p-8">
          <h3 className="text-xl font-bold mb-4">📄 Communication Templates</h3>
          <p className="text-muted-foreground mb-6">
            Ready-to-use templates for common AI compliance communication scenarios.
          </p>

          <div className="space-y-6">
            {templates.map((category, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-3">{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.items.map((item, itemIdx) => (
                    <a
                      key={itemIdx}
                      href={`/downloads/${item.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                      className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                      download
                    >
                      <div className="flex items-start gap-3">
                        <Download className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm mb-1">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Module */}
        {allScenariosComplete && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  All Scenarios Complete! 🎉
                </h3>
                <p className="text-green-800">
                  You've practiced communicating concerns in different contexts and learned effective
                  approaches for each situation. Module automatically marked complete - use the navigation above to continue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Scenario View
  return (
    <div className="space-y-8">
      {/* Scenario Header */}
      <div className="bg-white rounded-lg border border-border p-8">
        <button
          onClick={handleBackToScenarios}
          className="text-sm text-muted-foreground hover:text-primary mb-4 flex items-center gap-2"
        >
          ← Back to Scenarios
        </button>

        <h2 className="text-2xl font-bold text-primary mb-4">{currentScenario?.title}</h2>

        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-semibold mb-2">Context</h3>
            <p className="text-sm mb-3">{currentScenario?.context}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                Your Role: {currentScenario?.yourRole}
              </span>
              <span className="bg-accent/10 text-accent px-2 py-1 rounded">
                Concern: {currentScenario?.concern}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">Choose Your Approach</h3>
        <p className="text-muted-foreground mb-6">
          Select how you would communicate this concern. Each approach has different strengths and weaknesses.
        </p>

        <div className="space-y-4">
          {currentScenario?.options.map((option) => (
            <div key={option.id} className="border-2 border-border rounded-lg overflow-hidden">
              <button
                onClick={() => handleOptionSelect(option.id)}
                className="w-full text-left p-4 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{option.approach}</h4>
                  {selectedOption === option.id && showFeedback && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="bg-muted p-3 rounded text-sm">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mb-2" />
                  <p className="italic">{option.message}</p>
                </div>
              </button>

              {selectedOption === option.id && showFeedback && (
                <div className="border-t-2 border-border p-4 bg-blue-50">
                  <h4 className="font-bold mb-3">📊 Communication Analysis</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Tone</div>
                      <div
                        className={`text-sm font-medium ${
                          option.feedback.tone === "professional"
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {option.feedback.tone === "professional"
                          ? "✓ Professional"
                          : option.feedback.tone === "too-aggressive"
                          ? "⚠ Too Aggressive"
                          : "⚠ Too Passive"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Clarity</div>
                      <div
                        className={`text-sm font-medium ${
                          option.feedback.clarity === "clear" ? "text-green-700" : "text-yellow-700"
                        }`}
                      >
                        {option.feedback.clarity === "clear"
                          ? "✓ Clear"
                          : option.feedback.clarity === "vague"
                          ? "⚠ Vague"
                          : "⚠ Confusing"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">
                        Effectiveness
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          option.feedback.effectiveness === "high"
                            ? "text-green-700"
                            : option.feedback.effectiveness === "medium"
                            ? "text-yellow-700"
                            : "text-red-700"
                        }`}
                      >
                        {option.feedback.effectiveness === "high"
                          ? "✓ High"
                          : option.feedback.effectiveness === "medium"
                          ? "⚠ Medium"
                          : "✗ Low"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-border">
                    <p className="text-sm">{option.feedback.commentary}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className="bg-primary/10 rounded-lg border-2 border-primary p-6">
          <h4 className="font-bold mb-3">💡 Key Principles for Speaking Up</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Lead with data and facts, not emotions or accusations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Clearly state the problem, the risk, and proposed solutions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Maintain a professional, solution-oriented tone</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Document everything and follow proper escalation channels</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Frame concerns as helping the company, not criticizing it</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}