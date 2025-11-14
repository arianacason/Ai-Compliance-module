"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Download, BookOpen, Users, Target } from "lucide-react";

const commitmentAreas = [
  {
    id: "continuous-learning",
    title: "Continuous Learning",
    icon: "📚",
    description: "Stay informed about AI developments and compliance requirements",
    actions: [
      "Subscribe to AI ethics and compliance newsletters",
      "Attend quarterly webinars on AI governance",
      "Review NIST AI RMF updates annually",
      "Participate in internal AI training sessions",
    ],
  },
  {
    id: "proactive-questioning",
    title: "Proactive Questioning",
    icon: "❓",
    description: "Ask critical questions about AI systems before issues arise",
    actions: [
      "Use the diagnostic checklist for new AI systems",
      "Question AI recommendations that seem unusual",
      "Request documentation for vendor AI systems",
      "Advocate for transparency in AI decision-making",
    ],
  },
  {
    id: "speaking-up",
    title: "Speaking Up",
    icon: "🗣️",
    description: "Raise concerns when you identify AI compliance issues",
    actions: [
      "Document concerns with data and evidence",
      "Follow proper escalation channels",
      "Support colleagues who raise concerns",
      "Maintain professional communication",
    ],
  },
  {
    id: "ethical-leadership",
    title: "Ethical Leadership",
    icon: "⚖️",
    description: "Model responsible AI practices in your work",
    actions: [
      "Prioritize fairness alongside performance",
      "Consider diverse perspectives in AI decisions",
      "Advocate for human oversight of AI systems",
      "Share lessons learned with your team",
    ],
  },
];

const resources = [
  {
    category: "Industry Resources",
    items: [
      {
        title: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
        description: "Comprehensive framework for managing AI risks",
      },
      {
        title: "Partnership on AI",
        url: "https://partnershiponai.org",
        description: "Multi-stakeholder organization advancing responsible AI",
      },
      {
        title: "AI Ethics Guidelines Global Inventory",
        url: "https://algorithmwatch.org/en/ai-ethics-guidelines-global-inventory/",
        description: "Collection of AI ethics guidelines worldwide",
      },
    ],
  },
  {
    category: "Regulatory Updates",
    items: [
      {
        title: "EU AI Act Updates",
        url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        description: "Latest developments in EU AI regulation",
      },
      {
        title: "EEOC AI Guidance",
        url: "https://www.eeoc.gov/ai",
        description: "Employment discrimination and AI systems",
      },
      {
        title: "FTC AI Blog",
        url: "https://www.ftc.gov/news-events/blogs/business-blog",
        description: "Consumer protection and AI",
      },
    ],
  },
  {
    category: "Learning Communities",
    items: [
      {
        title: "AI Ethics Community",
        description: "Join discussions on responsible AI development",
      },
      {
        title: "Compliance Professionals Network",
        description: "Connect with AI compliance practitioners",
      },
      {
        title: "Internal AI Working Group",
        description: "Participate in your organization's AI governance",
      },
    ],
  },
];

interface Module7Props {
  onComplete: () => void;
}

export default function Module7({ onComplete }: Module7Props) {
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>([]);
  const [personalGoal, setPersonalGoal] = useState("");
  const [commitmentSaved, setCommitmentSaved] = useState(false);

  const handleCommitmentToggle = (commitmentId: string) => {
    if (selectedCommitments.includes(commitmentId)) {
      setSelectedCommitments(selectedCommitments.filter((id) => id !== commitmentId));
    } else {
      setSelectedCommitments([...selectedCommitments, commitmentId]);
    }
  };

  const handleSaveCommitment = () => {
    if (selectedCommitments.length === 0) {
      alert("Please select at least one commitment area");
      return;
    }
    if (personalGoal.trim().length < 20) {
      alert("Please provide a more detailed personal goal (at least 20 characters)");
      return;
    }
    setCommitmentSaved(true);
  };

  // Auto-complete module when commitment is saved
  useEffect(() => {
    if (commitmentSaved) {
      onComplete();
    }
  }, [commitmentSaved, onComplete]);

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-lg border border-border p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            7
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Staying Ahead</h2>
            <p className="text-muted-foreground">
              Continuous Learning & Accountability - Your Ongoing Journey
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-primary p-4">
          <p className="text-sm text-primary-900">
            <strong>Module Goal:</strong> Frame AI compliance as an ongoing practice rather than a
            one-time training. Establish your personal commitment and connect with resources for
            continuous learning.
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-primary to-primary-900 text-white rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6">🎯 What You've Learned</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="font-bold mb-2">AI Is Already Here</h4>
            <p className="text-sm text-primary-100">
              AI systems are present in many workplaces, often without clear disclosure. Proactive
              engagement is essential.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl mb-2">⚖️</div>
            <h4 className="font-bold mb-2">Compliance Isn't Optional</h4>
            <p className="text-sm text-primary-100">
              Regulations like GDPR, EEOC, and ADA apply to AI systems. Violations have real
              consequences.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl mb-2">🔍</div>
            <h4 className="font-bold mb-2">Bias Is Pervasive</h4>
            <p className="text-sm text-primary-100">
              AI systems can perpetuate and amplify bias from training data. Regular testing and
              monitoring are essential.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl mb-2">👥</div>
            <h4 className="font-bold mb-2">Human Judgment Matters</h4>
            <p className="text-sm text-primary-100">
              AI provides insights, but human oversight is critical for context, nuance, and
              accountability.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Commitment */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">🎯 Your Personal Commitment</h3>
        <p className="text-muted-foreground mb-6">
          Select the areas where you'll focus your efforts. This is your commitment to responsible AI
          practices in your work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {commitmentAreas.map((area) => {
            const isSelected = selectedCommitments.includes(area.id);
            return (
              <button
                key={area.id}
                onClick={() => handleCommitmentToggle(area.id)}
                className={`text-left p-6 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary hover:bg-primary/5"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{area.icon}</div>
                  {isSelected && <CheckCircle2 className="h-6 w-6 text-primary" />}
                </div>
                <h4 className="font-bold mb-2">{area.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                <div className="space-y-1">
                  {area.actions.slice(0, 2).map((action, idx) => (
                    <div key={idx} className="text-xs flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      {action}
                    </div>
                  ))}
                  {area.actions.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{area.actions.length - 2} more actions
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-blue-50 border-2 border-primary rounded-lg p-6">
          <h4 className="font-bold mb-3">📝 Your Specific Goal</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Write one specific action you'll take in the next 30 days to support responsible AI use in
            your organization.
          </p>
          <textarea
            value={personalGoal}
            onChange={(e) => setPersonalGoal(e.target.value)}
            placeholder="Example: I will use the diagnostic checklist to evaluate our new customer service AI tool and document any concerns I identify..."
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-muted-foreground">
              {personalGoal.length} / 20 characters minimum
            </span>
            <button
              onClick={handleSaveCommitment}
              disabled={selectedCommitments.length === 0 || personalGoal.trim().length < 20}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save My Commitment
            </button>
          </div>
        </div>

        {commitmentSaved && (
          <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-green-900 mb-2">Commitment Saved! 🎉</h4>
                <p className="text-sm text-green-800 mb-3">
                  You've committed to {selectedCommitments.length} focus area
                  {selectedCommitments.length > 1 ? "s" : ""} and set a specific 30-day goal. This is
                  the start of your ongoing journey in responsible AI.
                </p>
                <p className="text-sm text-green-800 italic">
                  "Your goal: {personalGoal}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resources */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">📚 Continuous Learning Resources</h3>
        <p className="text-muted-foreground mb-6">
          Stay informed and connected with these curated resources for ongoing AI compliance learning.
        </p>

        <div className="space-y-6">
          {resources.map((category, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                {category.category === "Industry Resources" && <BookOpen className="h-5 w-5 text-primary" />}
                {category.category === "Regulatory Updates" && <Target className="h-5 w-5 text-primary" />}
                {category.category === "Learning Communities" && <Users className="h-5 w-5 text-primary" />}
                {category.category}
              </h4>
              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-800 text-sm font-medium ml-4 flex-shrink-0"
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Check-In */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
        <h4 className="font-bold mb-2">📅 30-Day Check-In Reminder</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Set a calendar reminder for 30 days from now to reflect on your progress:
        </p>
        <ul className="text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">•</span>
            <span>Did you complete your 30-day goal?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">•</span>
            <span>What AI compliance issues did you encounter?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">•</span>
            <span>What did you learn that wasn't covered in this course?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600">•</span>
            <span>What will be your focus for the next 30 days?</span>
          </li>
        </ul>
      </div>

      {/* Downloads */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">📥 Take These With You</h3>
        <div className="space-y-3">
          <a
            href="/downloads/commitment-card.pdf"
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            download
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Personal Commitment Card</div>
                <div className="text-sm text-muted-foreground">
                  Printable reminder of your commitments
                </div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">PDF</span>
          </a>
          <a
            href="/downloads/resource-guide.pdf"
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            download
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Continuous Learning Resource Guide</div>
                <div className="text-sm text-muted-foreground">
                  Curated list of resources for ongoing learning
                </div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">PDF</span>
          </a>
        </div>
      </div>

      
    </div>
  );
}