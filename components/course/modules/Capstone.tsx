"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Trophy, ChevronRight } from "lucide-react";

interface CapstoneChoice {
  id: string;
  text: string;
  scores: {
    knowledge: number;
    judgment: number;
    communication: number;
  };
  feedback: string;
  nextStep?: string;
}

interface CapstoneStep {
  id: string;
  title: string;
  context: string;
  question: string;
  choices: CapstoneChoice[];
}

const capstoneScenario: CapstoneStep[] = [
  {
    id: "discovery",
    title: "The Discovery",
    context: "You're a Senior Product Manager at HealthTech Solutions, a company that provides AI-powered patient risk assessment tools to hospitals. During a routine review, you discover that your flagship AI model has been making systematically different predictions for patients based on their zip codes—areas with predominantly minority populations are being flagged as 'lower risk' even when their medical indicators suggest otherwise. This means these patients are less likely to be prioritized for preventive care interventions.",
    question: "What is your immediate first step?",
    choices: [
      {
        id: "investigate",
        text: "Conduct a thorough analysis to understand the scope and cause of the bias before taking action",
        scores: { knowledge: 2, judgment: 2, communication: 1 },
        feedback: "Good start. Understanding the full scope is important, but you should also immediately flag this as a critical issue to prevent ongoing harm while you investigate.",
        nextStep: "analysis",
      },
      {
        id: "immediate-stop",
        text: "Immediately recommend suspending the system and notify all stakeholders",
        scores: { knowledge: 1, judgment: 3, communication: 2 },
        feedback: "Strong judgment prioritizing patient safety. However, you need data to support your recommendation and a plan for what happens next.",
        nextStep: "stakeholder",
      },
      {
        id: "document-first",
        text: "Document your findings thoroughly, then escalate to compliance and legal teams",
        scores: { knowledge: 3, judgment: 2, communication: 3 },
        feedback: "Excellent approach. Documentation creates a paper trail and involving compliance/legal early is critical for healthcare AI issues.",
        nextStep: "compliance",
      },
      {
        id: "fix-quietly",
        text: "Work with the data science team to fix the issue before it becomes widely known",
        scores: { knowledge: 0, judgment: 0, communication: 0 },
        feedback: "This is problematic. Healthcare AI bias is a serious compliance issue that requires formal escalation. Trying to fix it quietly could be seen as a cover-up and violates transparency obligations.",
        nextStep: "consequences",
      },
    ],
  },
  {
    id: "analysis",
    title: "The Analysis",
    context: "Your analysis reveals that the model was trained on historical data where patients from certain zip codes had lower rates of hospital readmission—not because they were healthier, but because they had less access to healthcare and were less likely to return to the hospital. The AI learned to associate these zip codes with 'lower risk' when in reality, these patients may have greater unmet healthcare needs.",
    question: "How do you present these findings?",
    choices: [
      {
        id: "technical-report",
        text: "Create a detailed technical report for the data science team to review",
        scores: { knowledge: 2, judgment: 1, communication: 1 },
        feedback: "Too narrow. This is a business, legal, and ethical issue, not just a technical one. You need to communicate to non-technical stakeholders.",
        nextStep: "stakeholder",
      },
      {
        id: "multi-audience",
        text: "Prepare different versions: technical analysis for data science, business impact for executives, compliance implications for legal",
        scores: { knowledge: 3, judgment: 3, communication: 3 },
        feedback: "Excellent. You're tailoring communication to different audiences while ensuring everyone understands the severity.",
        nextStep: "stakeholder",
      },
      {
        id: "executive-summary",
        text: "Create a one-page executive summary focusing on the business and legal risks",
        scores: { knowledge: 2, judgment: 2, communication: 2 },
        feedback: "Good for getting executive attention, but you also need technical details for the teams who will fix it.",
        nextStep: "stakeholder",
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance Review",
    context: "The compliance team confirms this is a serious issue. The system potentially violates civil rights laws and healthcare equity regulations. They need to know: How many patients have been affected? What's the plan to remediate? How will you prevent this in the future?",
    question: "What remediation plan do you propose?",
    choices: [
      {
        id: "comprehensive-plan",
        text: "Propose a comprehensive plan: immediate system suspension, patient impact analysis, bias correction, enhanced testing protocols, and affected patient notification",
        scores: { knowledge: 3, judgment: 3, communication: 3 },
        feedback: "Outstanding. You're addressing immediate harm, understanding the scope, fixing the root cause, preventing recurrence, and being transparent with affected parties.",
        nextStep: "stakeholder",
      },
      {
        id: "technical-fix",
        text: "Focus on the technical fix: retrain the model with corrected data and implement bias detection algorithms",
        scores: { knowledge: 2, judgment: 1, communication: 1 },
        feedback: "The technical fix is necessary but insufficient. You're not addressing the patients already affected or the systemic issues that allowed this to happen.",
        nextStep: "stakeholder",
      },
      {
        id: "gradual-approach",
        text: "Propose a gradual approach: continue using the system while implementing fixes to avoid disrupting hospital operations",
        scores: { knowledge: 1, judgment: 0, communication: 1 },
        feedback: "This prioritizes operational continuity over patient safety and equity. When you know a system is causing harm, continuing to use it is ethically and legally problematic.",
        nextStep: "consequences",
      },
    ],
  },
  {
    id: "stakeholder",
    title: "Stakeholder Meeting",
    context: "You're in a meeting with the CEO, CTO, Chief Medical Officer, and General Counsel. The CEO is concerned about the business impact: 'This system is used by 50 hospitals. If we suspend it, we'll face contract penalties and lose revenue. Can't we just fix it quietly and move on?'",
    question: "How do you respond?",
    choices: [
      {
        id: "business-case",
        text: "Present the business case for transparency: 'The cost of fixing this quietly is much higher if it becomes public. Proactive disclosure shows integrity and protects our reputation.'",
        scores: { knowledge: 2, judgment: 3, communication: 3 },
        feedback: "Strong response. You're reframing the issue in business terms the CEO understands while maintaining ethical principles.",
        nextStep: "resolution",
      },
      {
        id: "legal-obligation",
        text: "Emphasize legal obligations: 'We have a legal duty to disclose this. Healthcare regulations require transparency about AI systems affecting patient care.'",
        scores: { knowledge: 3, judgment: 2, communication: 2 },
        feedback: "Correct on the legal requirements, but you could strengthen this by also addressing the CEO's business concerns.",
        nextStep: "resolution",
      },
      {
        id: "defer-to-legal",
        text: "Defer to the General Counsel: 'This is a legal question. I'll let our counsel advise on the disclosure requirements.'",
        scores: { knowledge: 1, judgment: 1, communication: 1 },
        feedback: "While legal input is important, you're the one who discovered the issue and understands it best. You need to advocate for the right course of action.",
        nextStep: "resolution",
      },
      {
        id: "patient-focus",
        text: "Refocus on patients: 'Our mission is patient care. We've potentially denied preventive care to vulnerable populations. The right thing to do is acknowledge this, fix it, and ensure it doesn't happen again.'",
        scores: { knowledge: 2, judgment: 3, communication: 3 },
        feedback: "Powerful ethical appeal that aligns with the company's mission. This can be very effective with healthcare organizations.",
        nextStep: "resolution",
      },
    ],
  },
  {
    id: "consequences",
    title: "Consequences of Inaction",
    context: "Six months later, a healthcare equity researcher publishes a study showing that your company's AI system systematically underpredicts risk for minority patients. The story goes viral. Hospitals suspend their contracts. The company faces lawsuits and regulatory investigations. Your CEO asks, 'Why didn't anyone tell us about this sooner?'",
    question: "What do you say?",
    choices: [
      {
        id: "accountability",
        text: "Take accountability: 'I identified this issue six months ago and recommended immediate action. Here's the documentation of my concerns and recommendations.'",
        scores: { knowledge: 2, judgment: 2, communication: 3 },
        feedback: "You're protecting yourself with documentation, but this scenario shows why early escalation and persistence are critical.",
        nextStep: "resolution",
      },
      {
        id: "systemic-failure",
        text: "Point to systemic failures: 'This reflects gaps in our AI governance processes. We need better mechanisms for identifying and addressing these issues.'",
        scores: { knowledge: 3, judgment: 2, communication: 2 },
        feedback: "True, but this doesn't address the immediate question about why leadership wasn't informed. You need to own your role in the communication chain.",
        nextStep: "resolution",
      },
    ],
  },
  {
    id: "resolution",
    title: "The Path Forward",
    context: "The company decides to take your recommendations: suspend the system, conduct a full impact analysis, implement bias correction, and proactively notify affected hospitals. You're asked to lead the remediation effort and develop new AI governance policies to prevent future issues.",
    question: "What's your top priority for the new governance framework?",
    choices: [
      {
        id: "bias-testing",
        text: "Mandatory bias testing before any AI system deployment, with regular audits",
        scores: { knowledge: 3, judgment: 2, communication: 2 },
        feedback: "Critical component, but governance needs to be broader than just testing.",
        nextStep: "complete",
      },
      {
        id: "oversight-committee",
        text: "Create an AI ethics committee with diverse stakeholders to review high-risk systems",
        scores: { knowledge: 2, judgment: 3, communication: 2 },
        feedback: "Excellent governance structure that brings multiple perspectives to AI decisions.",
        nextStep: "complete",
      },
      {
        id: "comprehensive-framework",
        text: "Implement a comprehensive framework covering: risk assessment, bias testing, human oversight, transparency, and incident response",
        scores: { knowledge: 3, judgment: 3, communication: 3 },
        feedback: "Outstanding. You're building a complete governance system that addresses prevention, detection, and response.",
        nextStep: "complete",
      },
      {
        id: "training",
        text: "Require AI ethics training for all employees working with AI systems",
        scores: { knowledge: 2, judgment: 2, communication: 3 },
        feedback: "Important component, but training alone isn't enough. You need structural governance mechanisms.",
        nextStep: "complete",
      },
    ],
  },
];

interface CapstoneProps {
  onComplete: () => void;
}

export default function Capstone({ onComplete }: CapstoneProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [choices, setChoices] = useState<{ [key: string]: string }>({});
  const [scores, setScores] = useState({ knowledge: 0, judgment: 0, communication: 0 });
  const [showResults, setShowResults] = useState(false);

  const step = capstoneScenario[currentStep];
  const selectedChoice = step?.choices.find((c) => c.id === choices[step.id]);

  const handleChoiceSelect = (choiceId: string) => {
    const choice = step.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    setChoices({ ...choices, [step.id]: choiceId });
    setScores({
      knowledge: scores.knowledge + choice.scores.knowledge,
      judgment: scores.judgment + choice.scores.judgment,
      communication: scores.communication + choice.scores.communication,
    });

    // Move to next step after a delay
    setTimeout(() => {
      if (choice.nextStep === "complete" || currentStep === capstoneScenario.length - 1) {
        setShowResults(true);
      } else {
        const nextStepIndex = capstoneScenario.findIndex((s) => s.id === choice.nextStep);
        if (nextStepIndex !== -1) {
          setCurrentStep(nextStepIndex);
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    }, 3000);
  };

  const maxScores = {
    knowledge: capstoneScenario.length * 3,
    judgment: capstoneScenario.length * 3,
    communication: capstoneScenario.length * 3,
  };

  const totalScore = scores.knowledge + scores.judgment + scores.communication;
  const maxTotal = maxScores.knowledge + maxScores.judgment + maxScores.communication;
  const percentage = Math.round((totalScore / maxTotal) * 100);

  if (showResults) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="bg-gradient-to-br from-accent to-orange-600 text-white rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <Trophy className="h-12 w-12 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Capstone Complete!</h2>
              <p className="text-accent-50">
                You've navigated a complex, multi-layered AI compliance scenario
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-lg border border-border p-8">
          <h3 className="text-2xl font-bold mb-6">Your Performance</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {scores.knowledge}/{maxScores.knowledge}
              </div>
              <div className="text-sm text-muted-foreground">Knowledge</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl font-bold text-purple-700 mb-2">
                {scores.judgment}/{maxScores.judgment}
              </div>
              <div className="text-sm text-muted-foreground">Judgment</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-700 mb-2">
                {scores.communication}/{maxScores.communication}
              </div>
              <div className="text-sm text-muted-foreground">Communication</div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">📚 Knowledge</h4>
              <p className="text-sm text-muted-foreground">
                {scores.knowledge >= maxScores.knowledge * 0.8
                  ? "Excellent understanding of AI compliance requirements, regulations, and best practices."
                  : scores.knowledge >= maxScores.knowledge * 0.6
                  ? "Good grasp of compliance fundamentals. Review NIST AI RMF and regulatory frameworks."
                  : "Review course modules on regulations, bias detection, and governance frameworks."}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">⚖️ Judgment</h4>
              <p className="text-sm text-muted-foreground">
                {scores.judgment >= maxScores.judgment * 0.8
                  ? "Strong decision-making that balances ethics, business needs, and compliance."
                  : scores.judgment >= maxScores.judgment * 0.6
                  ? "Solid judgment with room to improve on prioritizing patient/user safety."
                  : "Focus on ethical decision-making frameworks and stakeholder impact analysis."}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">💬 Communication</h4>
              <p className="text-sm text-muted-foreground">
                {scores.communication >= maxScores.communication * 0.8
                  ? "Excellent ability to communicate concerns effectively to different audiences."
                  : scores.communication >= maxScores.communication * 0.6
                  ? "Good communication skills. Practice tailoring messages to different stakeholders."
                  : "Review Module 6 on effective escalation and stakeholder communication."}
              </p>
            </div>
          </div>
        </div>

        {/* Key Lessons */}
        <div className="bg-primary/10 rounded-lg border-2 border-primary p-8">
          <h3 className="text-xl font-bold mb-4">🎯 Key Lessons from This Scenario</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">
                <strong>Early detection matters:</strong> The sooner you identify and escalate issues,
                the less harm occurs and the easier remediation becomes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">
                <strong>Documentation is critical:</strong> Paper trails protect you and provide
                evidence that you acted responsibly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">
                <strong>Communicate to multiple audiences:</strong> Technical, business, and legal
                stakeholders all need to understand the issue in their terms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">
                <strong>Transparency beats cover-ups:</strong> Proactive disclosure demonstrates
                integrity and limits legal/reputational damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">
                <strong>Governance prevents crises:</strong> Comprehensive AI governance frameworks
                catch issues before they become emergencies.
              </span>
            </li>
          </ul>
        </div>

        {/* Complete */}
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-green-800 mb-6">
                You've completed the entire AI Compliance Training course. You're now equipped with
                the knowledge, judgment, and communication skills to navigate AI compliance challenges
                in your organization.
              </p>
              <button
                onClick={() => {
                  onComplete();
                  window.location.href = "/certificate";
                }}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Complete Course & Get Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      {currentStep === 0 && (
        <div className="bg-gradient-to-br from-accent to-orange-600 text-white rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <Trophy className="h-12 w-12 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Final Capstone Assessment</h2>
              <p className="text-accent-50">
                Apply everything you've learned in a complex, realistic scenario
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold mb-3">What You'll Be Assessed On:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-2xl mb-1">📚</div>
                <div className="font-semibold mb-1">Knowledge</div>
                <div className="text-sm text-accent-100">
                  Understanding of regulations, frameworks, and best practices
                </div>
              </div>
              <div>
                <div className="text-2xl mb-1">⚖️</div>
                <div className="font-semibold mb-1">Judgment</div>
                <div className="text-sm text-accent-100">
                  Decision-making that balances ethics, compliance, and business needs
                </div>
              </div>
              <div>
                <div className="text-2xl mb-1">💬</div>
                <div className="font-semibold mb-1">Communication</div>
                <div className="text-sm text-accent-100">
                  Effective escalation and stakeholder communication
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Scenario Progress</h3>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {capstoneScenario.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent h-full rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / capstoneScenario.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-lg border-2 border-primary p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm leading-relaxed">{step.context}</p>
        </div>

        <h4 className="font-bold text-lg mb-4">{step.question}</h4>

        {!selectedChoice ? (
          <div className="space-y-3">
            {step.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.id)}
                className="w-full text-left p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {choice.text}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border-2 border-primary rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-medium">{selectedChoice.text}</span>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-primary p-4">
              <h5 className="font-bold mb-2">Feedback</h5>
              <p className="text-sm">{selectedChoice.feedback}</p>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="animate-pulse text-muted-foreground text-sm">
                Moving to next step...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}