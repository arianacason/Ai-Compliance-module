"use client";

import { useState, useEffect } from "react";
import { ChevronRight, AlertCircle, CheckCircle2, Download } from "lucide-react";

interface Choice {
  id: string;
  text: string;
  outcome: string;
  consequence: "positive" | "negative" | "neutral";
  nextNode?: string;
}

interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices: Choice[];
}

const storyNodes: StoryNode[] = [
  {
    id: "start",
    title: "Monday Morning Discovery",
    content: "You arrive at work Monday morning to find an email from IT: 'New AI Assistant Deployed - Productivity Tool Now Available.' You open your project management dashboard and notice a new 'AI Suggestions' panel you've never seen before. It's already populated with task recommendations, priority rankings, and resource allocation suggestions for your team's projects.",
    choices: [
      {
        id: "investigate",
        text: "Click through the AI suggestions to understand what it's doing",
        outcome: "You discover the AI has been analyzing your team's communication patterns, project timelines, and individual work habits. Some suggestions are helpful, but you notice it's making assumptions about team members' availability based on their email response times.",
        consequence: "positive",
        nextNode: "discovery",
      },
      {
        id: "ignore",
        text: "Ignore it for now and focus on your regular work",
        outcome: "By Wednesday, your manager asks why you haven't implemented any of the AI's 'high-priority' recommendations. Apparently, leadership is tracking adoption metrics.",
        consequence: "negative",
        nextNode: "pressure",
      },
      {
        id: "ask-it",
        text: "Ask IT about the new system before using it",
        outcome: "IT sends you a brief FAQ but admits they don't know much about how the AI makes decisions. The vendor documentation is vague about data usage and decision-making processes.",
        consequence: "neutral",
        nextNode: "questions",
      },
    ],
  },
  {
    id: "discovery",
    title: "Digging Deeper",
    content: "As you explore the AI's suggestions, you realize it has access to: team calendars, email metadata (not content, supposedly), project management data, and performance metrics. One suggestion particularly concerns you: it recommends reassigning a critical task from Sarah to Tom because 'Sarah's response time has decreased 40% this month.' You happen to know Sarah is dealing with a family medical situation she hasn't disclosed to the team.",
    choices: [
      {
        id: "follow-ai",
        text: "Follow the AI's recommendation and reassign the task",
        outcome: "Sarah feels blindsided and hurt. She later reveals her situation to HR, questioning whether the AI's monitoring violates her privacy. HR opens an investigation.",
        consequence: "negative",
        nextNode: "hr-issue",
      },
      {
        id: "talk-sarah",
        text: "Talk to Sarah privately before making any changes",
        outcome: "Sarah appreciates the check-in and explains her situation. Together, you adjust the workload temporarily. You document this as a case where human judgment was essential.",
        consequence: "positive",
        nextNode: "human-judgment",
      },
      {
        id: "question-ai",
        text: "Question the AI's recommendation and ask for transparency",
        outcome: "You submit a request to IT asking how the AI makes these decisions. They forward it to the vendor, who provides a generic response about 'proprietary algorithms' and 'machine learning models.'",
        consequence: "neutral",
        nextNode: "transparency-gap",
      },
    ],
  },
  {
    id: "pressure",
    title: "Leadership Expectations",
    content: "Your manager schedules a one-on-one: 'The executive team is excited about our AI adoption rates. They're comparing teams, and we need to show we're leveraging these tools. What's your plan for implementation?' You realize the organization is pushing AI adoption without clear guidelines on when and how to use it appropriately.",
    choices: [
      {
        id: "comply-quickly",
        text: "Agree to implement AI suggestions immediately to meet expectations",
        outcome: "You start following AI recommendations without vetting them. Within two weeks, a client complains that their project priorities were changed without consultation, based on 'algorithm recommendations.'",
        consequence: "negative",
        nextNode: "client-complaint",
      },
      {
        id: "request-guidelines",
        text: "Request clear guidelines and policies before full implementation",
        outcome: "Your manager appreciates the thoughtful approach. You're asked to join a working group developing AI usage policies for the organization.",
        consequence: "positive",
        nextNode: "policy-development",
      },
      {
        id: "pilot-approach",
        text: "Propose a pilot approach with specific use cases",
        outcome: "You suggest testing the AI on non-critical tasks first, documenting what works and what doesn't. Leadership agrees to a 30-day pilot with clear success metrics.",
        consequence: "positive",
        nextNode: "pilot-program",
      },
    ],
  },
  {
    id: "questions",
    title: "The Documentation Gap",
    content: "The vendor documentation raises more questions than it answers. You learn the AI was trained on 'industry-standard datasets' but there's no information about: what data it collects from your organization, how long data is retained, whether it shares insights across clients, or how to audit its decisions. Your IT contact admits they signed the contract based on a sales demo without a thorough technical review.",
    choices: [
      {
        id: "use-anyway",
        text: "Use the tool anyway since it's already deployed",
        outcome: "Six months later, during a compliance audit, the auditor asks for documentation about AI systems and data processing. You have no answers, and the organization faces potential regulatory issues.",
        consequence: "negative",
        nextNode: "audit-problem",
      },
      {
        id: "escalate-concerns",
        text: "Escalate your concerns to leadership and compliance",
        outcome: "You draft a memo outlining the documentation gaps and potential risks. Compliance thanks you and initiates a vendor review process. The AI is temporarily restricted until proper documentation is obtained.",
        consequence: "positive",
        nextNode: "compliance-review",
      },
      {
        id: "document-yourself",
        text: "Start documenting your own observations and concerns",
        outcome: "You create a log of how the AI behaves, what data it seems to access, and where its recommendations seem questionable. This becomes valuable when the organization later needs to assess the system.",
        consequence: "positive",
        nextNode: "personal-documentation",
      },
    ],
  },
  {
    id: "hr-issue",
    title: "The Privacy Investigation",
    content: "HR's investigation reveals the AI has been monitoring employee activity patterns in ways that weren't disclosed during deployment. Several employees express concerns about privacy and the lack of transparency. The organization faces potential legal issues and employee trust has been damaged.",
    choices: [
      {
        id: "learn-lesson",
        text: "Participate in developing better AI governance policies",
        outcome: "You help create guidelines for AI deployment that include: employee notification, data privacy protections, human oversight requirements, and clear escalation paths for concerns.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "human-judgment",
    title: "The Value of Human Context",
    content: "Your decision to check with Sarah before following the AI's recommendation demonstrates an important principle: AI can provide data-driven insights, but human judgment is essential for understanding context, nuance, and individual circumstances. You document this case as an example for future training.",
    choices: [
      {
        id: "share-learning",
        text: "Share this experience with your team and leadership",
        outcome: "Your case study becomes part of the organization's AI training materials, illustrating when human oversight is critical. You're recognized for thoughtful AI adoption.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "transparency-gap",
    title: "The Black Box Problem",
    content: "The vendor's vague response highlights a common challenge: many AI systems operate as 'black boxes' where even the deploying organization doesn't fully understand how decisions are made. This creates accountability and compliance risks.",
    choices: [
      {
        id: "demand-transparency",
        text: "Work with procurement to demand better vendor transparency",
        outcome: "Your organization develops new vendor requirements for AI systems, including explainability standards and audit rights. This becomes a model for other departments.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "client-complaint",
    title: "Client Trust Damaged",
    content: "The client complaint escalates. They're concerned that an algorithm made decisions about their project without human oversight or their input. They question whether your organization is prioritizing efficiency over service quality and relationship management.",
    choices: [
      {
        id: "fix-process",
        text: "Implement human review checkpoints for AI recommendations",
        outcome: "You establish a process where AI suggestions are reviewed by humans before implementation, especially for client-facing decisions. The client relationship is repaired, and you've created a better workflow.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "policy-development",
    title: "Building Better Governance",
    content: "As part of the policy working group, you help develop comprehensive AI governance guidelines that balance innovation with responsibility. Your practical experience with the AI system provides valuable insights for the policies.",
    choices: [
      {
        id: "complete-policies",
        text: "Complete the policy development and implementation",
        outcome: "The organization adopts clear AI usage policies that include: transparency requirements, human oversight protocols, data privacy protections, and employee training. You've helped create a framework for responsible AI adoption.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "pilot-program",
    title: "Measured Adoption",
    content: "Your pilot program provides valuable data about where AI adds value and where it falls short. You document successes, failures, and lessons learned, creating a roadmap for broader adoption.",
    choices: [
      {
        id: "expand-thoughtfully",
        text: "Expand AI usage based on pilot learnings",
        outcome: "The organization adopts AI more broadly but with clear guidelines based on your pilot findings. You've demonstrated how to balance innovation with responsibility.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "audit-problem",
    title: "Compliance Consequences",
    content: "The audit reveals significant gaps in AI governance. The organization faces regulatory scrutiny and must implement emergency compliance measures. The lack of documentation and oversight creates legal and reputational risks.",
    choices: [
      {
        id: "emergency-response",
        text: "Help develop emergency compliance response",
        outcome: "You work with legal and compliance to document existing AI systems and implement proper governance. It's more difficult and expensive than if it had been done proactively, but the organization learns an important lesson.",
        consequence: "neutral",
        nextNode: "end-neutral",
      },
    ],
  },
  {
    id: "compliance-review",
    title: "Proactive Risk Management",
    content: "Your escalation triggers a comprehensive review of all AI systems in the organization. Compliance works with vendors to obtain proper documentation and implements governance frameworks before issues arise.",
    choices: [
      {
        id: "implement-governance",
        text: "Help implement the new governance framework",
        outcome: "You become a key resource in implementing AI governance across the organization. Your proactive approach prevented potential compliance issues and established you as a thoughtful leader.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "personal-documentation",
    title: "Building Institutional Knowledge",
    content: "Your documentation becomes invaluable when the organization needs to assess AI systems. You've created a practical record of how AI actually operates in your environment, including its limitations and risks.",
    choices: [
      {
        id: "share-documentation",
        text: "Share your documentation with compliance and IT",
        outcome: "Your documentation helps the organization understand its AI systems better and informs policy development. You've demonstrated the value of careful observation and documentation.",
        consequence: "positive",
        nextNode: "end-positive",
      },
    ],
  },
  {
    id: "end-positive",
    title: "Lesson Learned: Proactive Engagement",
    content: "Your journey demonstrates key principles of responsible AI adoption: questioning assumptions, seeking transparency, prioritizing human judgment, and advocating for proper governance. AI is already here, but how we implement and oversee it makes all the difference. By engaging thoughtfully rather than blindly adopting or completely resisting, you've helped your organization navigate AI responsibly.",
    choices: [],
  },
  {
    id: "end-neutral",
    title: "Lesson Learned: Reactive Compliance",
    content: "This path illustrates the costs of reactive rather than proactive AI governance. While the organization eventually implements proper controls, it's more difficult, expensive, and risky than if governance had been built in from the start. The key lesson: AI compliance isn't optional or something to address 'later' – it must be part of the adoption process from day one.",
    choices: [],
  },
];

interface Module1Props {
  onComplete: () => void;
}

export default function Module1({ onComplete }: Module1Props) {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<string[]>(["start"]);
  const [selectedChoices, setSelectedChoices] = useState<{ [key: string]: Choice }>({});

  const currentNode = storyNodes.find((node) => node.id === currentNodeId);

  const handleChoice = (choice: Choice) => {
    setSelectedChoices({ ...selectedChoices, [currentNodeId]: choice });
    
    if (choice.nextNode) {
      setCurrentNodeId(choice.nextNode);
      setHistory([...history, choice.nextNode]);
    } else {
      // End of story
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentNodeId(newHistory[newHistory.length - 1]);
    }
  };

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  const selectedChoice = selectedChoices[currentNodeId];
  const isEndNode = currentNode.choices.length === 0;

  // Auto-complete module when reaching an end node
  useEffect(() => {
    if (isEndNode) {
      onComplete();
    }
  }, [isEndNode, onComplete]);

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-lg border border-border p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            1
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">The AI Awakening</h2>
            <p className="text-muted-foreground">
              An interactive narrative exploring AI systems already present in your workplace
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
          <p className="text-sm text-primary-900">
            <strong>How this works:</strong> You'll make decisions as an employee discovering AI in your
            workplace. Each choice leads to different outcomes, illustrating real compliance challenges.
            There's no single "right" path – the goal is to explore different scenarios and their consequences.
          </p>
        </div>
      </div>

      {/* Story Progress */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Story Progress</h3>
          <span className="text-sm text-muted-foreground">
            Step {history.length} of your journey
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {history.map((nodeId, index) => {
            const node = storyNodes.find((n) => n.id === nodeId);
            return (
              <div key={nodeId} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    nodeId === currentNodeId
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {node?.title || nodeId}
                </div>
                {index < history.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Story Node */}
      <div className="bg-white rounded-lg border-2 border-primary p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">{currentNode.title}</h3>
        <p className="text-lg text-foreground leading-relaxed mb-6">{currentNode.content}</p>

        {/* Show outcome if choice was made */}
        {selectedChoice && (
          <div
            className={`mb-6 p-4 rounded-lg border-l-4 ${
              selectedChoice.consequence === "positive"
                ? "bg-green-50 border-green-500"
                : selectedChoice.consequence === "negative"
                ? "bg-red-50 border-red-500"
                : "bg-yellow-50 border-yellow-500"
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedChoice.consequence === "positive" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold mb-1">
                  {selectedChoice.consequence === "positive"
                    ? "Positive Outcome"
                    : selectedChoice.consequence === "negative"
                    ? "Challenging Outcome"
                    : "Mixed Outcome"}
                </p>
                <p className="text-sm">{selectedChoice.outcome}</p>
              </div>
            </div>
          </div>
        )}

        {/* Choices */}
        {!isEndNode && (
          <div className="space-y-3">
            <p className="font-semibold text-sm text-muted-foreground mb-3">What do you do?</p>
            {currentNode.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
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
        )}

        {/* End of story */}
        {isEndNode && (
          <div className="bg-primary/10 rounded-lg p-6 border-2 border-primary">
            <h4 className="font-bold text-lg text-primary mb-3">🎯 Key Takeaways</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>AI systems are already present in many workplaces, often without clear disclosure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Proactive engagement and questioning are essential for responsible AI adoption</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Human judgment and context remain critical even with AI-driven insights</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Compliance isn't optional – it must be built into AI adoption from the start</span>
              </li>
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          {history.length > 1 && !isEndNode && (
            <button
              onClick={goBack}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Go Back
            </button>
          )}
          {isEndNode && (
            <div className="w-full">
              <a
                href="/downloads/ai-awakening-reference.pdf"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-800 transition-colors"
                download
              >
                <Download className="h-4 w-4" />
                Download Quick Reference: "AI Is Already Here"
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}