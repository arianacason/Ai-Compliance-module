"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Download, ChevronRight } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  icon: string;
  scenario: string;
  context: string;
  biasType: string;
  questions: {
    question: string;
    options: {
      text: string;
      correct: boolean;
      explanation: string;
    }[];
  }[];
  keyLearning: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "hiringbot",
    title: "HiringBot X: The Gender Bias Problem",
    icon: "👔",
    scenario: "A tech company deploys an AI resume screening tool to handle their high volume of applications. After six months, HR notices that significantly fewer women are advancing to interviews compared to the previous year, despite similar application rates.",
    context: "The AI was trained on 10 years of historical hiring data from the company. During that period, the tech industry (and this company) had predominantly male employees in technical roles. The model learned to associate certain patterns with 'successful' candidates based on this historical data.",
    biasType: "Historical Bias & Gender Discrimination",
    questions: [
      {
        question: "What is the primary source of bias in this scenario?",
        options: [
          {
            text: "The AI was intentionally programmed to discriminate",
            correct: false,
            explanation: "The bias wasn't intentional. The AI learned patterns from historical data that reflected past discrimination.",
          },
          {
            text: "The training data reflected historical gender imbalances",
            correct: true,
            explanation: "Correct! The AI learned from data where men were overrepresented in successful hires, causing it to favor male candidates.",
          },
          {
            text: "Women applicants had lower qualifications",
            correct: false,
            explanation: "This assumes the problem is with applicants rather than the system. The issue is the AI's learned bias.",
          },
        ],
      },
      {
        question: "Which regulation is most directly violated here?",
        options: [
          {
            text: "GDPR - Data Protection",
            correct: false,
            explanation: "While GDPR is important, the primary violation here is employment discrimination.",
          },
          {
            text: "EEOC - Employment Discrimination",
            correct: true,
            explanation: "Correct! The EEOC prohibits employment discrimination, including when caused by AI tools. Employers are liable for discriminatory outcomes.",
          },
          {
            text: "SOC 2 - Security Controls",
            correct: false,
            explanation: "SOC 2 addresses security and availability, not discrimination in hiring.",
          },
        ],
      },
    ],
    keyLearning: [
      "AI systems can perpetuate and amplify historical biases present in training data",
      "Employers are legally liable for discriminatory outcomes, even if unintentional",
      "Regular auditing for adverse impact is essential for AI hiring tools",
      "Diverse training data and bias testing must be part of AI development",
    ],
  },
  {
    id: "predictive",
    title: "Predictive Maintenance: The Data Quality Gap",
    icon: "⚙️",
    scenario: "A manufacturing company implements an AI system to predict machine breakdowns and schedule maintenance. The system generates numerous false alarms, particularly for older machines that weren't well-represented in the training dataset.",
    context: "The AI was trained primarily on data from newer machines with modern sensors. Older equipment has different failure patterns and less comprehensive sensor data. The model struggles to accurately predict issues for these machines, leading to unnecessary maintenance shutdowns and production losses.",
    biasType: "Data Quality Bias & Model Drift",
    questions: [
      {
        question: "What type of bias is demonstrated here?",
        options: [
          {
            text: "Sampling bias - training data doesn't represent all equipment",
            correct: true,
            explanation: "Correct! The training data overrepresented newer machines, causing poor performance on older equipment.",
          },
          {
            text: "Confirmation bias - the AI confirms existing beliefs",
            correct: false,
            explanation: "Confirmation bias is a human cognitive bias, not what's happening with the AI system here.",
          },
          {
            text: "Algorithmic bias - the algorithm itself is flawed",
            correct: false,
            explanation: "The algorithm may be fine, but it's working with unrepresentative training data.",
          },
        ],
      },
      {
        question: "What is the best mitigation strategy?",
        options: [
          {
            text: "Ignore predictions for older machines",
            correct: false,
            explanation: "This defeats the purpose of the system and leaves older equipment unmonitored.",
          },
          {
            text: "Collect more data from older machines and retrain the model",
            correct: true,
            explanation: "Correct! Expanding the training data to include diverse equipment types will improve model performance across all machines.",
          },
          {
            text: "Replace all older machines with new ones",
            correct: false,
            explanation: "This is expensive and impractical. The AI system should work with existing equipment.",
          },
        ],
      },
    ],
    keyLearning: [
      "Training data must represent the full diversity of real-world scenarios",
      "Model performance should be monitored across different subgroups",
      "Data quality issues can lead to costly operational problems",
      "Regular model updates with new data help prevent drift",
    ],
  },
  {
    id: "chatbot",
    title: "Chatbot Elli: The Accessibility Failure",
    icon: "💬",
    scenario: "A retail company deploys an AI chatbot for customer service. A customer with visual impairment tries to use the chatbot but finds it incompatible with their screen reader. The chatbot also fails to provide alternative text for product images and doesn't offer a way to reach a human agent.",
    context: "The chatbot was designed and tested primarily by sighted users. Accessibility requirements weren't included in the initial specifications. The company is now facing complaints and potential ADA violations.",
    biasType: "Accessibility Bias & Regulatory Non-Compliance",
    questions: [
      {
        question: "Which law is being violated?",
        options: [
          {
            text: "Americans with Disabilities Act (ADA)",
            correct: true,
            explanation: "Correct! The ADA requires that digital services be accessible to people with disabilities. AI chatbots must work with assistive technologies.",
          },
          {
            text: "GDPR - Right to Explanation",
            correct: false,
            explanation: "While GDPR is important, the primary issue here is accessibility, not data protection.",
          },
          {
            text: "FTC - Deceptive Practices",
            correct: false,
            explanation: "The FTC addresses deception, but this is an accessibility compliance issue.",
          },
        ],
      },
      {
        question: "What should have been done during development?",
        options: [
          {
            text: "Test with diverse users including those with disabilities",
            correct: true,
            explanation: "Correct! Inclusive design requires testing with users who have various disabilities and assistive technology needs.",
          },
          {
            text: "Add a disclaimer that the chatbot isn't accessible",
            correct: false,
            explanation: "Disclaimers don't excuse non-compliance. The service must be made accessible.",
          },
          {
            text: "Offer a phone number as an alternative",
            correct: false,
            explanation: "While alternatives help, the digital service itself must be accessible under ADA.",
          },
        ],
      },
    ],
    keyLearning: [
      "AI systems must be accessible to people with disabilities",
      "Accessibility should be built in from the start, not added later",
      "Testing must include users with diverse abilities and assistive technologies",
      "Legal compliance requires proactive accessibility measures",
    ],
  },
  {
    id: "vendor",
    title: "Vendor Scoring: The Security Blind Spot",
    icon: "🏢",
    scenario: "A procurement team uses an AI system to score and rank potential vendors. The system heavily weights price (70%) while giving minimal consideration to security history. As a result, the company selects a vendor with the lowest bid but a history of data breaches.",
    context: "The AI was configured to optimize for cost savings without adequate weighting for risk factors. Six months after contract signing, the vendor experiences another breach, compromising the company's customer data.",
    biasType: "Optimization Bias & Inadequate Risk Assessment",
    questions: [
      {
        question: "What is the core problem with this AI system?",
        options: [
          {
            text: "The AI is working as designed, but the design priorities are wrong",
            correct: true,
            explanation: "Correct! The AI optimized for what it was told to optimize for (price), but the scoring criteria didn't adequately account for security risks.",
          },
          {
            text: "The AI made a calculation error",
            correct: false,
            explanation: "The AI calculated correctly based on its parameters. The problem is with how those parameters were set.",
          },
          {
            text: "The vendor lied about their security history",
            correct: false,
            explanation: "While vendors may misrepresent themselves, the AI system should have been designed to verify and weight security factors appropriately.",
          },
        ],
      },
      {
        question: "What NIST AI RMF function is most relevant here?",
        options: [
          {
            text: "Map - Understanding the AI system context and risks",
            correct: true,
            explanation: "Correct! The Map function involves understanding context and categorizing risks. The team failed to properly map vendor security risks into the AI system.",
          },
          {
            text: "Govern - Establishing policies",
            correct: false,
            explanation: "While governance is important, the specific failure here is in mapping and measuring risks appropriately.",
          },
          {
            text: "Identify - Recognizing AI use",
            correct: false,
            explanation: "The team knew they were using AI. The problem was in how they configured it to assess risks.",
          },
        ],
      },
    ],
    keyLearning: [
      "AI optimization must balance multiple factors, not just cost",
      "Security and risk history must be weighted appropriately in vendor decisions",
      "Human oversight is essential for high-stakes decisions",
      "AI systems reflect the priorities we build into them",
    ],
  },
  {
    id: "marketing",
    title: "AI Marketing Copy: The Copyright Trap",
    icon: "📝",
    scenario: "A marketing team uses an AI tool to generate promotional content. The AI produces compelling copy, but a competitor notices that portions of the text closely mirror their copyrighted marketing materials. The company faces a copyright infringement claim.",
    context: "The AI was trained on vast amounts of internet content, including competitors' marketing materials. It learned patterns and phrases from this training data and reproduced similar content without attribution or awareness of copyright.",
    biasType: "Intellectual Property Risk & Training Data Contamination",
    questions: [
      {
        question: "Who is legally liable for the copyright infringement?",
        options: [
          {
            text: "The AI tool vendor",
            correct: false,
            explanation: "While vendors may share some responsibility, the company using the AI and publishing the content is primarily liable.",
          },
          {
            text: "The company that published the AI-generated content",
            correct: true,
            explanation: "Correct! Companies are responsible for content they publish, even if AI-generated. You can't blame the tool for copyright violations.",
          },
          {
            text: "No one, because AI generated it",
            correct: false,
            explanation: "AI generation doesn't exempt you from copyright law. The publisher is still responsible.",
          },
        ],
      },
      {
        question: "What should the marketing team have done?",
        options: [
          {
            text: "Review AI outputs for originality and potential copyright issues",
            correct: true,
            explanation: "Correct! Human review of AI-generated content is essential, especially checking for plagiarism and copyright concerns.",
          },
          {
            text: "Trust that the AI wouldn't copy copyrighted material",
            correct: false,
            explanation: "AI systems can reproduce training data patterns. You can't assume outputs are original without verification.",
          },
          {
            text: "Add a disclaimer that AI generated the content",
            correct: false,
            explanation: "Disclaimers don't protect you from copyright infringement. The content must be original or properly licensed.",
          },
        ],
      },
    ],
    keyLearning: [
      "Companies are liable for AI-generated content they publish",
      "AI can reproduce patterns from training data, including copyrighted material",
      "Human review is essential for AI-generated content",
      "Plagiarism detection tools should be used on AI outputs",
    ],
  },
];

interface Module3Props {
  onComplete: () => void;
}

export default function Module3({ onComplete }: Module3Props) {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  const currentCaseStudy = caseStudies.find((cs) => cs.id === selectedCase);

  const handleCaseSelect = (caseId: string) => {
    setSelectedCase(caseId);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    });
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentCaseStudy && currentQuestion < currentCaseStudy.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  // Auto-mark case as complete when final question is answered
  useEffect(() => {
    if (currentCaseStudy && 
        currentQuestion === currentCaseStudy.questions.length - 1 && 
        showExplanation &&
        !completedCases.includes(currentCaseStudy.id)) {
      setCompletedCases([...completedCases, currentCaseStudy.id]);
    }
  }, [currentQuestion, showExplanation, currentCaseStudy, completedCases]);

  const handleBackToCases = () => {
    setSelectedCase(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const allCasesComplete = completedCases.length === caseStudies.length;

  // Auto-complete module when all cases are done
  useEffect(() => {
    if (allCasesComplete) {
      onComplete();
    }
  }, [allCasesComplete, onComplete]);

  if (!selectedCase) {
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg border border-border p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              3
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Bias in the Machine</h2>
              <p className="text-muted-foreground">
                Recognizing Ethical Risks through Real Case Studies
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-primary p-4">
            <p className="text-sm text-primary-900">
              <strong>Module Goal:</strong> Examine real business case studies to understand how AI systems
              can perpetuate bias and create unintended consequences. Learn to identify bias patterns and
              apply mitigation strategies.
            </p>
          </div>
        </div>

        {/* Case Study Selection */}
        <div className="bg-white rounded-lg border border-border p-8">
          <h3 className="text-xl font-bold mb-4">Select a Case Study</h3>
          <p className="text-muted-foreground mb-6">
            Explore five real-world scenarios where AI systems created bias or compliance issues.
            Complete all cases to finish this module.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((caseStudy) => {
              const isComplete = completedCases.includes(caseStudy.id);
              return (
                <button
                  key={caseStudy.id}
                  onClick={() => handleCaseSelect(caseStudy.id)}
                  className={`text-left p-6 rounded-lg border-2 transition-all ${
                    isComplete
                      ? "border-green-500 bg-green-50"
                      : "border-border hover:border-primary hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{caseStudy.icon}</div>
                    {isComplete && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{caseStudy.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{caseStudy.scenario}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {caseStudy.biasType}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        {completedCases.length > 0 && (
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Your Progress</h3>
              <span className="text-sm text-muted-foreground">
                {completedCases.length} of {caseStudies.length} Complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-green-500 h-full rounded-full transition-all"
                style={{ width: `${(completedCases.length / caseStudies.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Complete Module */}
        {allCasesComplete && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  All Case Studies Complete! 🎉
                </h3>
                <p className="text-green-800">
                  You've explored all five scenarios and learned to identify different types of bias
                  in AI systems. Module automatically marked complete - use the navigation above to continue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Case Study View
  const question = currentCaseStudy?.questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer !== undefined && question?.options[selectedAnswer].correct;
  const isCaseComplete = currentCaseStudy && currentQuestion === currentCaseStudy.questions.length - 1 && showExplanation;

  return (
    <div className="space-y-8">
      {/* Case Header */}
      <div className="bg-white rounded-lg border border-border p-8">
        <button
          onClick={handleBackToCases}
          className="text-sm text-muted-foreground hover:text-primary mb-4 flex items-center gap-2"
        >
          ← Back to Case Studies
        </button>
        
        <div className="flex items-start gap-4">
          <div className="text-5xl">{currentCaseStudy?.icon}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-2">{currentCaseStudy?.title}</h2>
            <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {currentCaseStudy?.biasType}
            </span>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-2">📋 Scenario</h3>
        <p className="text-sm mb-4">{currentCaseStudy?.scenario}</p>
        <h4 className="font-semibold text-sm mb-2">Context:</h4>
        <p className="text-sm text-muted-foreground">{currentCaseStudy?.context}</p>
      </div>

      {/* Question */}
      {question && (
        <div className="bg-white rounded-lg border border-border p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              Question {currentQuestion + 1} of {currentCaseStudy?.questions.length}
            </h3>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1}/{currentCaseStudy?.questions.length}
            </span>
          </div>

          <p className="text-lg mb-6">{question.question}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showResult = showExplanation && isSelected;

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showResult && option.correct
                      ? "border-green-500 bg-green-50"
                      : showResult && !option.correct
                      ? "border-red-500 bg-red-50"
                      : isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  } ${showExplanation ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-start gap-3">
                    {showResult && (
                      option.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )
                    )}
                    <span className={showResult && option.correct ? "font-semibold" : ""}>
                      {option.text}
                    </span>
                  </div>
                  {showResult && (
                    <p className="text-sm mt-2 ml-8 text-muted-foreground">{option.explanation}</p>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && !isCaseComplete && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-800 transition-colors flex items-center gap-2"
              >
                Next Question
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Key Learnings */}
      {isCaseComplete && (
        <div className="bg-primary/10 rounded-lg border-2 border-primary p-8">
          <h3 className="text-xl font-bold text-primary mb-4">🎯 Key Learnings</h3>
          <ul className="space-y-3">
            {currentCaseStudy?.keyLearning.map((learning, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{learning}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleBackToCases}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Back to Case Studies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}