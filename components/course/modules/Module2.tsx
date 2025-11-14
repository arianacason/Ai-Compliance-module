"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Download } from "lucide-react";

const roles = [
  { id: "technical", label: "Technical Staff", icon: "💻" },
  { id: "hr", label: "HR & Recruiting", icon: "👥" },
  { id: "management", label: "Management", icon: "📊" },
  { id: "customer", label: "Customer-Facing", icon: "🤝" },
];

const regulations = {
  technical: [
    {
      name: "GDPR - Data Processing",
      description: "AI systems processing EU citizen data must comply with GDPR principles: lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity, and confidentiality.",
      relevance: "You're responsible for ensuring AI systems have proper data processing agreements and technical safeguards.",
    },
    {
      name: "NIST AI RMF - Map Function",
      description: "Document AI system context, categorize risks, and assess impacts. Maintain inventory of AI systems and their data sources.",
      relevance: "Technical teams must map AI system architecture, data flows, and integration points.",
    },
    {
      name: "SOC 2 - System Monitoring",
      description: "AI systems must have logging, monitoring, and audit trails for security and availability.",
      relevance: "Implement monitoring for AI system performance, errors, and security events.",
    },
  ],
  hr: [
    {
      name: "EEOC - AI in Hiring",
      description: "AI hiring tools must not discriminate based on protected characteristics. Employers are liable for discriminatory outcomes even if unintentional.",
      relevance: "You must validate that AI screening tools don't create adverse impact on protected groups.",
    },
    {
      name: "GDPR - Employee Data",
      description: "Employee monitoring via AI requires transparency, legitimate purpose, and proportionality. Employees have rights to information and objection.",
      relevance: "Disclose AI monitoring to employees and provide opt-out mechanisms where legally required.",
    },
    {
      name: "ADA - Accessibility",
      description: "AI systems used in employment must be accessible to people with disabilities and not discriminate based on disability.",
      relevance: "Ensure AI tools accommodate candidates and employees with disabilities.",
    },
  ],
  management: [
    {
      name: "NIST AI RMF - Govern Function",
      description: "Establish AI governance structure, policies, and accountability. Define roles, responsibilities, and risk tolerance.",
      relevance: "You're accountable for AI governance framework and ensuring organizational compliance.",
    },
    {
      name: "SEC - AI Disclosure",
      description: "Public companies must disclose material AI-related risks in financial filings.",
      relevance: "Assess whether AI systems create material business risks requiring disclosure.",
    },
    {
      name: "FTC - Deceptive Practices",
      description: "AI-generated content and decisions must not deceive consumers. Claims about AI capabilities must be substantiated.",
      relevance: "Ensure marketing and customer communications about AI are accurate and not misleading.",
    },
  ],
  customer: [
    {
      name: "FTC - Transparency",
      description: "Consumers have right to know when interacting with AI. Disclose AI use in customer-facing applications.",
      relevance: "Inform customers when they're interacting with AI chatbots or automated systems.",
    },
    {
      name: "CCPA/CPRA - Consumer Rights",
      description: "California consumers have rights regarding automated decision-making, including right to opt-out and explanation.",
      relevance: "Provide mechanisms for customers to opt-out of AI-driven decisions and request human review.",
    },
    {
      name: "ADA - Customer Accessibility",
      description: "AI-powered customer service must be accessible to people with disabilities.",
      relevance: "Ensure AI chatbots and tools work with screen readers and provide alternative access methods.",
    },
  ],
};

// Compliance Bingo scenarios by role
const bingoScenarios = {
  technical: {
    scenario: "AI Model Data Breach",
    description: "Your team's AI model was trained on customer data from the EU. A security incident exposed the training dataset, including personal information of 50,000 EU citizens. You need to determine your compliance obligations.",
    options: [
      { id: "gdpr", text: "GDPR - Data Processing & Breach Notification", correct: true },
      { id: "soc2", text: "SOC 2 - System Monitoring", correct: false },
      { id: "nist", text: "NIST AI RMF - Map Function", correct: false },
    ],
    explanation: "This is a GDPR breach notification scenario. Under GDPR Article 33, you must notify the supervisory authority within 72 hours of becoming aware of a personal data breach. The breach involves EU citizen data, triggering GDPR's strict breach notification and remediation requirements. Technical teams must have incident response procedures that account for GDPR timelines.",
  },
  hr: {
    scenario: "AI Hiring Tool Discrimination",
    description: "Your company deploys an AI tool that screens resumes and ranks candidates. After six months, you notice that significantly fewer women are making it to the interview stage compared to the previous year.",
    options: [
      { id: "eeoc", text: "EEOC - AI in Hiring", correct: true },
      { id: "gdpr", text: "GDPR - Data Processing", correct: false },
      { id: "ada", text: "ADA - Accessibility", correct: false },
    ],
    explanation: "This scenario involves potential discrimination in hiring, which falls under EEOC jurisdiction. Even if the AI tool wasn't intentionally designed to discriminate, employers are liable for discriminatory outcomes (disparate impact). The significant drop in women advancing to interviews suggests adverse impact on a protected class. This is why testing AI hiring tools for bias and adverse impact is critical before deployment.",
  },
  management: {
    scenario: "AI Risk Disclosure Decision",
    description: "Your publicly-traded company is deploying AI systems that will automate 30% of customer service decisions and significantly impact revenue forecasts. The board is debating whether this constitutes a material risk that must be disclosed in the next 10-K filing.",
    options: [
      { id: "sec", text: "SEC - AI Disclosure Requirements", correct: true },
      { id: "ftc", text: "FTC - Deceptive Practices", correct: false },
      { id: "nist", text: "NIST AI RMF - Govern Function", correct: false },
    ],
    explanation: "This is an SEC disclosure scenario. Public companies must disclose material risks in their financial filings. AI systems that significantly impact operations, revenue, or create new risk exposures may constitute material information that investors need to make informed decisions. The SEC has issued guidance that AI-related risks should be disclosed when material. Management must assess materiality and ensure proper disclosure.",
  },
  customer: {
    scenario: "AI Chatbot Transparency",
    description: "Your company launches an AI-powered customer service chatbot that handles product inquiries and complaints. Several customers have complained that they didn't realize they were talking to a bot and feel misled. Some are threatening legal action.",
    options: [
      { id: "ftc", text: "FTC - Transparency & Deceptive Practices", correct: true },
      { id: "ccpa", text: "CCPA/CPRA - Consumer Rights", correct: false },
      { id: "ada", text: "ADA - Customer Accessibility", correct: false },
    ],
    explanation: "This is an FTC transparency violation. The FTC requires that consumers be clearly informed when they're interacting with AI or automated systems, not humans. Failing to disclose AI use can constitute a deceptive practice under Section 5 of the FTC Act. Customer-facing teams must ensure AI interactions are clearly labeled and customers aren't misled about whether they're communicating with a human or machine.",
  },
};

// Key frameworks by role
const keyFrameworks = {
  technical: [
    {
      title: "🔒 SOC 2 (Global)",
      description: "Security framework requiring controls for AI system monitoring, logging, access management, and change control. Essential for technical operations.",
    },
    {
      title: "🇪🇺 GDPR - Technical Measures (EU)",
      description: "Requires technical safeguards like encryption, pseudonymization, and access controls for AI systems processing personal data.",
    },
    {
      title: "🇺🇸 NIST AI RMF - Map & Measure (US)",
      description: "Technical documentation of AI system architecture, data flows, performance metrics, and risk assessments.",
    },
    {
      title: "🔐 ISO 27001 (Global)",
      description: "Information security management system standards applicable to AI system development and deployment.",
    },
  ],
  hr: [
    {
      title: "⚖️ EEOC Guidelines (US)",
      description: "Prohibits employment discrimination. AI tools must not create adverse impact on protected groups (race, gender, age, disability, etc.).",
    },
    {
      title: "🇪🇺 GDPR - Employee Data (EU)",
      description: "Employee monitoring via AI requires transparency, legitimate purpose, and proportionality. Employees have rights to information and objection.",
    },
    {
      title: "♿ ADA - Employment (US)",
      description: "AI systems used in employment must be accessible to people with disabilities and not discriminate based on disability.",
    },
    {
      title: "📋 OFCCP - Affirmative Action (US)",
      description: "Federal contractors must ensure AI hiring tools don't undermine affirmative action obligations.",
    },
  ],
  management: [
    {
      title: "🇺🇸 NIST AI RMF - Govern (US)",
      description: "Establish AI governance structure, policies, accountability, and risk tolerance. Leadership responsibility for AI oversight.",
    },
    {
      title: "📊 SEC - AI Disclosure (US)",
      description: "Public companies must disclose material AI-related risks in financial filings (10-K, 10-Q).",
    },
    {
      title: "🛡️ FTC - Deceptive Practices (US)",
      description: "AI-generated content and decisions must not deceive consumers. Claims about AI capabilities must be substantiated.",
    },
    {
      title: "🌍 EU AI Act (EU)",
      description: "Risk-based regulation of AI systems. High-risk AI requires conformity assessments, documentation, and ongoing monitoring.",
    },
  ],
  customer: [
    {
      title: "🛡️ FTC - Transparency (US)",
      description: "Consumers have right to know when interacting with AI. Disclose AI use in customer-facing applications clearly.",
    },
    {
      title: "🇺🇸 CCPA/CPRA - Consumer Rights (California)",
      description: "California consumers have rights regarding automated decision-making, including right to opt-out and explanation.",
    },
    {
      title: "♿ ADA - Customer Accessibility (US)",
      description: "AI-powered customer service must be accessible to people with disabilities (screen readers, alternative formats).",
    },
    {
      title: "🇪🇺 GDPR - Consumer Data (EU)",
      description: "Right to explanation for automated decisions. Consumers can object to AI-only decision-making in certain contexts.",
    },
  ],
};

interface Module2Props {
  onComplete: () => void;
}

export default function Module2({ onComplete }: Module2Props) {
  const [selectedRole, setSelectedRole] = useState<string>("technical");
  const [completedBingo, setCompletedBingo] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Auto-complete module when bingo is completed
  useEffect(() => {
    if (completedBingo) {
      onComplete();
    }
  }, [completedBingo, onComplete]);

  // Reset bingo state when role changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCompletedBingo(false);
  }, [selectedRole]);

  const currentRegulations = regulations[selectedRole as keyof typeof regulations] || [];
  const currentBingoScenario = bingoScenarios[selectedRole as keyof typeof bingoScenarios];
  const currentFrameworks = keyFrameworks[selectedRole as keyof typeof keyFrameworks];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    
    const selectedOption = currentBingoScenario.options.find(opt => opt.id === optionId);
    if (selectedOption?.correct) {
      setCompletedBingo(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-lg border border-border p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            2
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">The Rulebook Decoded</h2>
            <p className="text-muted-foreground">
              Regulatory & Policy Framework - Contextual, role-specific guidance
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-primary p-4">
          <p className="text-sm text-primary-900">
            <strong>Module Goal:</strong> Transform dense regulatory information into accessible guidance.
            Select your role to see only the regulations most relevant to your responsibilities.
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">Select Your Role</h3>
        <p className="text-muted-foreground mb-6">
          Choose your primary role to filter regulations and see what matters most to you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-6 rounded-lg border-2 transition-all text-center ${
                selectedRole === role.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-4xl mb-2">{role.icon}</div>
              <div className="font-semibold">{role.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Regulations for Selected Role */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-2">
          Regulations for {roles.find((r) => r.id === selectedRole)?.label}
        </h3>
        <p className="text-muted-foreground mb-6">
          These are the key regulations and frameworks most relevant to your role.
        </p>

        <div className="space-y-4">
          {currentRegulations.map((reg, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <h4 className="font-bold text-lg text-primary mb-2">{reg.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{reg.description}</p>
              <div className="bg-blue-50 border-l-4 border-primary p-3">
                <p className="text-sm font-medium text-primary-900">
                  <strong>Why this matters to you:</strong> {reg.relevance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Bingo Game */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">🎯 Compliance Bingo</h3>
        <p className="text-muted-foreground mb-6">
          Match the scenario to the correct regulation. This helps reinforce your understanding
          of when different regulations apply to your role.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-3">{currentBingoScenario.scenario}</h4>
          <p className="text-sm mb-4">
            {currentBingoScenario.description}
          </p>
          <div className="space-y-2">
            {currentBingoScenario.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.correct;
              const showAsCorrect = isSelected && isCorrect;
              const showAsIncorrect = isSelected && !isCorrect;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-3 rounded border-2 transition-colors ${
                    showAsCorrect
                      ? "border-green-500 bg-green-50"
                      : showAsIncorrect
                      ? "border-red-500 bg-red-50"
                      : selectedAnswer !== null
                      ? "border-border bg-muted opacity-50 cursor-not-allowed"
                      : "border-border hover:bg-muted hover:border-primary"
                  }`}
                >
                  {showAsCorrect && "✓ "}
                  {showAsIncorrect && "✗ "}
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className={`border-2 rounded-lg p-6 ${
            completedBingo 
              ? "bg-green-50 border-green-500" 
              : "bg-red-50 border-red-500"
          }`}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className={`h-6 w-6 flex-shrink-0 mt-1 ${
                completedBingo ? "text-green-600" : "text-red-600"
              }`} />
              <div>
                <h4 className={`font-bold mb-2 ${
                  completedBingo ? "text-green-900" : "text-red-900"
                }`}>
                  {completedBingo ? "Correct! 🎉" : "Not quite. Try again!"}
                </h4>
                <p className={`text-sm ${
                  completedBingo ? "text-green-800" : "text-red-800"
                }`}>
                  {currentBingoScenario.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Frameworks Overview */}
      <div className="bg-gradient-to-br from-primary to-primary-900 text-white rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">
          Key Frameworks for {roles.find((r) => r.id === selectedRole)?.label}
        </h3>
        <p className="text-sm text-primary-100 mb-6">
          These frameworks are most relevant to your role and responsibilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentFrameworks.map((framework, index) => (
            <div key={index}>
              <h4 className="font-bold mb-2">{framework.title}</h4>
              <p className="text-sm text-primary-100">
                {framework.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Downloads */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">📥 Downloadable Resources</h3>
        <div className="space-y-3">
          <a
            href="/downloads/ai-use-policy.pdf"
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            download
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">AI Use Policy Template</div>
                <div className="text-sm text-muted-foreground">Customizable policy framework</div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">PDF</span>
          </a>
          <a
            href="/downloads/prompt-library.pdf"
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            download
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Role-Based Prompt Library</div>
                <div className="text-sm text-muted-foreground">Safe prompting examples by role</div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">PDF</span>
          </a>
        </div>
      </div>

      
    </div>
  );
}