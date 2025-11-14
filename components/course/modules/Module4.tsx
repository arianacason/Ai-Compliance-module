"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, ChevronRight, Lightbulb } from "lucide-react";

interface DilemmaChoice {
  id: string;
  text: string;
  consequence: string;
  score: number;
  expertCommentary: {
    compliance: string;
    legal: string;
    ethics: string;
  };
}

interface DilemmaScenario {
  id: string;
  title: string;
  context: string;
  situation: string;
  stakeholders: string[];
  pressures: string[];
  choices: DilemmaChoice[];
}

const dilemmas: DilemmaScenario[] = [
  {
    id: "deploy-pressure",
    title: "Deploy Under Pressure",
    context: "You're a product manager at a SaaS company. Your team has developed an AI-powered customer support chatbot that's scheduled to launch next week.",
    situation: "Three days before launch, your compliance team flags concerns: the chatbot hasn't completed bias testing, data retention policies aren't finalized, and there's no clear escalation path when the AI can't help. Your CEO is adamant about the launch date because it was promised to investors and featured in marketing campaigns. Delaying could affect the company's valuation and your team's bonuses.",
    stakeholders: ["Customers", "Investors", "Your team", "Compliance team", "Company reputation"],
    pressures: ["Executive pressure to launch", "Financial incentives", "Marketing commitments", "Compliance concerns", "Customer safety"],
    choices: [
      {
        id: "launch-anyway",
        text: "Launch as planned and address issues post-launch",
        consequence: "The chatbot launches successfully and investors are pleased. However, within two weeks, customers report that the chatbot provides inconsistent information and sometimes gives advice that contradicts company policies. A customer with a disability files an ADA complaint because the chatbot isn't compatible with screen readers. The compliance issues you ignored become public, damaging trust and requiring expensive remediation. Your company faces regulatory scrutiny and potential fines.",
        score: -2,
        expertCommentary: {
          compliance: "This is a high-risk decision. Launching without completing compliance reviews exposes the company to regulatory violations, particularly around accessibility (ADA) and data handling. The 'move fast and fix later' approach doesn't work for compliance—violations can result in fines, lawsuits, and mandatory audits that are far more expensive than a brief delay.",
          legal: "From a legal perspective, this creates significant liability. If customers are harmed by incorrect AI advice or if protected groups face discrimination, the company is liable regardless of intent. The pressure from executives doesn't shield you from legal consequences. Document your concerns in writing to protect yourself.",
          ethics: "This prioritizes short-term business interests over customer safety and fairness. You're knowingly deploying a system that may harm users, particularly vulnerable populations like those with disabilities. Ethical AI development requires ensuring systems are safe and fair before deployment, not after problems emerge.",
        },
      },
      {
        id: "limited-launch",
        text: "Propose a limited beta launch with select customers while completing compliance work",
        consequence: "You negotiate a compromise: launch to a small group of beta customers (who are informed it's a beta) while your team completes compliance testing. This satisfies the CEO's need to show progress to investors while managing risk. The beta reveals several issues that would have been problematic at full scale, including bias in how the chatbot handles certain customer segments. You fix these before the full launch two weeks later. Investors appreciate the transparency, and the full launch is more successful because you avoided major issues.",
        score: 2,
        expertCommentary: {
          compliance: "This is a much better approach. A limited beta with informed consent allows you to test in production while managing risk. Make sure beta participants understand they're testing an AI system and have easy access to human support. Document everything for your compliance records. This demonstrates due diligence.",
          legal: "This significantly reduces legal risk. By clearly labeling it as a beta and limiting exposure, you're managing liability while still making progress. Ensure your beta terms of service explicitly state this is a test and that users can opt out. Keep detailed records of issues discovered and how you addressed them.",
          ethics: "This balances business needs with responsibility to users. You're being transparent about the system's status, limiting potential harm, and using the beta to improve the system before full deployment. This shows respect for customers as partners in development rather than unwitting test subjects.",
        },
      },
      {
        id: "delay-launch",
        text: "Delay the launch until all compliance requirements are met",
        consequence: "You stand firm on delaying the launch, presenting data on the risks of proceeding. The CEO is initially angry, but you frame it as protecting the company from regulatory and reputational risk. You work with marketing to reframe the delay as 'ensuring the highest quality AI experience.' The compliance work takes two additional weeks. When you do launch, the system works well and you avoid the problems that would have occurred. Six months later, a competitor launches a similar product hastily and faces the exact issues you avoided—their problems validate your decision and your CEO thanks you for protecting the company.",
        score: 3,
        expertCommentary: {
          compliance: "This is the gold standard. You're prioritizing compliance over convenience, which is exactly what responsible AI deployment requires. While it may feel like you're slowing things down, you're actually preventing much more significant delays that would come from having to fix problems post-launch while under regulatory scrutiny.",
          legal: "This is the legally safest approach. By ensuring compliance before launch, you minimize legal exposure and demonstrate that the company takes its obligations seriously. If issues do arise later, you can show you did due diligence, which significantly affects how regulators and courts view your actions.",
          ethics: "This demonstrates ethical leadership. You're willing to face short-term pressure to ensure the right outcome for customers. This builds a culture where safety and fairness aren't negotiable, which leads to better products and more sustainable business practices long-term.",
        },
      },
      {
        id: "escalate-board",
        text: "Escalate to the board of directors with a formal risk assessment",
        consequence: "You prepare a detailed risk assessment documenting the compliance gaps and potential consequences (regulatory fines, lawsuits, reputational damage). You request that the board review the launch decision given the risks. This is a bold move that could damage your relationship with the CEO. The board reviews your assessment and sides with caution, mandating the launch be delayed until compliance is complete. The CEO is frustrated but can't override the board. Your relationship with the CEO is strained, but you've protected the company and established yourself as someone who prioritizes doing things right.",
        score: 2,
        expertCommentary: {
          compliance: "This shows strong compliance leadership. When you identify significant risks and can't resolve them at your level, escalation is appropriate. The board has a fiduciary duty to understand major risks, and AI compliance issues qualify. Your documentation of risks is exactly what boards need to make informed decisions.",
          legal: "This is legally sound and protects you personally. By escalating with documentation, you create a record that you identified risks and sought appropriate oversight. If the company had proceeded and faced consequences, your escalation would demonstrate you acted responsibly. This is good corporate governance.",
          ethics: "This demonstrates moral courage. You're willing to risk your career advancement to do what's right. While it may create short-term friction, it establishes important precedents about how the company handles AI ethics and compliance. Leaders who speak up, even when it's uncomfortable, build stronger organizations.",
        },
      },
    ],
  },
  {
    id: "bias-discovery",
    title: "The Bias Discovery",
    context: "You're a data scientist at a healthcare company. Your team has built an AI model to predict patient health risks and prioritize care interventions.",
    situation: "During final testing, you discover the model performs significantly worse for patients from certain ethnic minorities—it underpredicts their health risks, meaning they're less likely to be flagged for preventive care. You investigate and find the training data had fewer examples from these populations, and the model learned patterns that don't generalize well. Your manager says the model is 'good enough' and that fixing it would delay the project by months. The model will be used to allocate limited healthcare resources, meaning the bias could result in minority patients receiving less preventive care.",
    stakeholders: ["Patients (especially minority populations)", "Healthcare providers", "Your company", "Your career", "Healthcare equity"],
    pressures: ["Project timeline", "Manager expectations", "Career advancement", "Patient safety", "Healthcare equity"],
    choices: [
      {
        id: "deploy-biased",
        text: "Deploy the model as-is and plan to improve it in the next version",
        consequence: "The model is deployed and initially seems successful—it helps identify high-risk patients and improves care coordination. However, after six months, a healthcare equity researcher analyzes the model's recommendations and publishes findings showing it systematically underpredicts risk for minority patients. The story is picked up by major media outlets. Your company faces lawsuits, regulatory investigations, and loss of contracts with healthcare systems. The damage to your company's reputation is severe, and several executives lose their jobs. You're haunted by knowing you identified the problem but didn't stop it.",
        score: -3,
        expertCommentary: {
          compliance: "This is a compliance failure with serious consequences. Healthcare AI systems that create disparate impact violate civil rights laws and healthcare regulations. The 'we'll fix it later' approach doesn't work when the system is actively harming people. Regulators will ask why you deployed a system you knew was biased.",
          legal: "This creates massive legal liability. Deploying a system you know discriminates against protected groups is indefensible in court. Your documentation of the bias (which you should have created) becomes evidence that the company knowingly deployed a discriminatory system. This could result in significant damages and penalties.",
          ethics: "This is ethically indefensible. You're knowingly deploying a system that will result in minority patients receiving worse care. The harm is predictable and preventable. 'Good enough' is not acceptable when the consequence is people not receiving healthcare they need. This violates basic principles of healthcare ethics and equity.",
        },
      },
      {
        id: "fix-model",
        text: "Refuse to deploy until the bias is fixed, even if it delays the project",
        consequence: "You document the bias and refuse to sign off on deployment. Your manager is angry and threatens your performance review. You escalate to the VP of Engineering with your findings. The VP reviews the data and agrees the bias is unacceptable. The project is delayed three months while you collect more diverse training data and retrain the model. Your manager remains frustrated, but the VP recognizes your integrity. When the model finally deploys, it performs equitably across populations. A year later, when competitors face bias scandals, your company's commitment to equity becomes a competitive advantage.",
        score: 3,
        expertCommentary: {
          compliance: "This is the right decision. Healthcare AI must meet equity standards, and deploying a system with known bias violates those standards. The delay is unfortunate but necessary. Your documentation of the bias and the remediation process demonstrates compliance with healthcare regulations and civil rights laws.",
          legal: "This protects the company from significant legal risk. By refusing to deploy a biased system, you prevent discrimination claims and regulatory violations. Your documentation of the issue and the fix demonstrates due diligence. If questions arise later, you can show the company took bias seriously and fixed it before deployment.",
          ethics: "This demonstrates ethical courage and commitment to healthcare equity. You're prioritizing patient welfare over project timelines. This is exactly what ethical AI development requires—being willing to delay or stop when you discover the system could cause harm. Your actions protect vulnerable populations.",
        },
      },
      {
        id: "limited-deployment",
        text: "Deploy only in populations where the model performs well, while fixing the bias",
        consequence: "You propose deploying the model only for populations where it's been validated, while continuing to use traditional methods for populations where the model is biased. This allows the project to move forward while you work on fixing the bias. However, this creates a two-tier system where some patients benefit from AI-enhanced care while others don't. Healthcare providers find this confusing and difficult to implement. After a few months, the limited deployment is deemed too complex and the model is pulled entirely until the bias is fixed. The delay ends up being longer than if you'd fixed it first.",
        score: 0,
        expertCommentary: {
          compliance: "This is well-intentioned but problematic. Creating different care pathways based on demographics raises its own equity concerns. Healthcare regulations require consistent standards of care. While you're trying to avoid harm, you're creating a system that explicitly treats populations differently, which could itself be seen as discriminatory.",
          legal: "This creates legal ambiguity. While you're trying to avoid deploying a biased system, you're creating documented evidence that you're providing different levels of care to different populations. This could be interpreted as intentional discrimination. The legal risk may actually be higher than delaying deployment entirely.",
          ethics: "This is ethically complex. You're trying to balance providing benefits to some while avoiding harm to others, but you're creating explicit inequality in care. Healthcare ethics generally requires that innovations be available equitably or not at all. The two-tier system you're creating may be worse than waiting to deploy a system that works for everyone.",
        },
      },
      {
        id: "transparency-approach",
        text: "Deploy with clear disclosure of limitations and human oversight for affected populations",
        consequence: "You propose deploying the model with explicit documentation of its limitations and requiring human review of all recommendations for populations where the model is less accurate. Healthcare providers are trained on the bias and told to exercise extra caution. This allows the project to proceed while managing risk. However, in practice, the human oversight is inconsistent—some providers carefully review recommendations while others trust the AI. Within a year, patterns emerge showing minority patients still receive less preventive care. The transparency didn't prevent the harm because the system design itself was flawed.",
        score: -1,
        expertCommentary: {
          compliance: "Transparency is important, but it doesn't excuse deploying a biased system. Compliance requires that systems work equitably, not just that you disclose they don't. Human oversight is valuable but unreliable—research shows humans often defer to AI recommendations even when told to be cautious. This approach doesn't adequately address the compliance issues.",
          legal: "Disclosure reduces but doesn't eliminate legal risk. You're still deploying a system you know is biased. If patients are harmed, your disclosure may show you knew about the problem, which could actually strengthen claims against you. Courts may view this as knowingly creating a discriminatory system and trying to use disclosure as a shield.",
          ethics: "This is an attempt at ethical compromise, but it's insufficient. Transparency is valuable, but it doesn't justify deploying a system that will predictably harm people. The research on human-AI interaction shows that disclosure often doesn't prevent over-reliance on AI. You're essentially asking humans to compensate for a flawed system, which is unlikely to work consistently.",
        },
      },
    ],
  },
  {
    id: "data-request",
    title: "The Data Request Dilemma",
    context: "You're an AI engineer at a financial services company. Your team is building a credit risk model to automate loan decisions.",
    situation: "Your manager asks you to include social media data in the model to improve predictions. The data science team has scraped public social media profiles and found that including this data improves the model's accuracy by 3%. However, you realize this data includes information that could serve as proxies for protected characteristics (race, religion, political views) even though those characteristics aren't explicitly in the dataset. Using this data could result in the model discriminating against protected groups in ways that are hard to detect and explain. Your manager argues that since the data is public and improves accuracy, there's no problem.",
    stakeholders: ["Loan applicants", "Your company", "Regulators", "Shareholders", "Fair lending principles"],
    pressures: ["Model performance metrics", "Manager expectations", "Competitive pressure", "Fair lending laws", "Explainability requirements"],
    choices: [
      {
        id: "use-social-data",
        text: "Include the social media data since it improves accuracy and is publicly available",
        consequence: "You include the social media data and the model's accuracy improves. The model is deployed and initially performs well. However, a year later, a fair lending audit reveals that the model approves loans for white applicants at significantly higher rates than minority applicants with similar financial profiles. Investigators trace this to the social media data, which included proxies for race and religion. Your company faces a major fair lending lawsuit, regulatory fines, and is required to provide remediation to affected applicants. The 3% accuracy improvement cost millions in legal fees and settlements.",
        score: -3,
        expertCommentary: {
          compliance: "This violates fair lending laws. Just because data is public doesn't mean it's legal to use for credit decisions. The Equal Credit Opportunity Act prohibits using protected characteristics or proxies for them in lending decisions. The fact that the discrimination is indirect (through proxies) doesn't make it legal. Regulators will view this as discriminatory lending.",
          legal: "This creates severe legal liability. Fair lending laws are strict, and violations can result in significant penalties. The argument that the data is public is irrelevant—what matters is whether it results in discrimination. Your company could face lawsuits from affected applicants, regulatory enforcement actions, and requirements to change your entire lending process.",
          ethics: "This prioritizes a small accuracy gain over fairness and equity. Using data that serves as a proxy for protected characteristics perpetuates systemic discrimination in lending. Even if the discrimination is unintentional, the harm is real—people are denied loans based on characteristics that shouldn't matter. Ethical AI requires considering fairness alongside accuracy.",
        },
      },
      {
        id: "reject-social-data",
        text: "Refuse to use the social media data due to discrimination risks",
        consequence: "You explain the fair lending risks to your manager and refuse to include the social media data. Your manager is frustrated about the accuracy loss but escalates to legal, who confirms your concerns. The model is deployed without the social media data. While the accuracy is slightly lower, the model is explainable and doesn't create fair lending risks. During a regulatory audit two years later, examiners praise your company's approach to fair lending. Your decision to prioritize fairness over a marginal accuracy gain is cited as a best practice.",
        score: 3,
        expertCommentary: {
          compliance: "This is the correct compliance decision. Fair lending laws require that credit decisions not discriminate based on protected characteristics, even indirectly. By refusing to use data that could serve as proxies, you're ensuring compliance. The 3% accuracy improvement isn't worth the legal and regulatory risk.",
          legal: "This protects the company from significant legal risk. Fair lending violations can be extremely costly, and the penalties far outweigh any benefit from improved accuracy. Your decision demonstrates that the company takes fair lending seriously, which is valuable if you're ever audited or investigated.",
          ethics: "This demonstrates ethical leadership in AI development. You're prioritizing fairness over performance metrics, which is exactly what responsible AI requires. The small accuracy loss is acceptable when the alternative is perpetuating discrimination in lending. This shows commitment to equity in financial services.",
        },
      },
      {
        id: "test-for-bias",
        text: "Include the data but implement rigorous bias testing and monitoring",
        consequence: "You agree to include the social media data but insist on comprehensive bias testing before and after deployment. Your testing reveals that the model does create disparate impact on protected groups. You implement bias mitigation techniques, but they reduce the accuracy gain to less than 1% while not fully eliminating the disparate impact. You present these findings to leadership, who decide the minimal accuracy gain isn't worth the residual bias risk. The social media data is removed. The testing process takes three months and delays the project, but it provides valuable data on bias risks.",
        score: 1,
        expertCommentary: {
          compliance: "This is a reasonable approach to investigating the risk, but it's not ideal. You're essentially testing whether you can get away with using potentially discriminatory data. The better approach is to avoid the risk entirely. However, the rigorous testing does demonstrate due diligence, and your willingness to remove the data when bias is detected shows good compliance practices.",
          legal: "This reduces but doesn't eliminate legal risk. You're still experimenting with data that could violate fair lending laws. If your bias testing misses something and the model discriminates, you could still face legal consequences. The testing does show you took the risk seriously, which could be valuable in your defense, but prevention is better than mitigation.",
          ethics: "This shows you're taking fairness seriously, but it's a reactive rather than proactive approach. You're essentially asking 'can we use this data without discriminating?' rather than 'should we use this data given the discrimination risk?' The testing is valuable, but the ethical approach is to avoid data with known discrimination risks from the start.",
        },
      },
      {
        id: "alternative-data",
        text: "Propose alternative data sources that improve accuracy without discrimination risk",
        consequence: "You research alternative data sources that could improve the model without fair lending risks. You find that including utility payment history and rental payment data (with applicant consent) improves accuracy by 2% without creating proxies for protected characteristics. This data actually helps applicants with thin credit files, including many minority applicants. You present this alternative to your manager, who agrees to pursue it. The model performs nearly as well as it would have with social media data, but without the discrimination risk. Your creative solution is recognized as innovative and responsible.",
        score: 3,
        expertCommentary: {
          compliance: "This is excellent compliance thinking. You're finding ways to improve model performance while ensuring fair lending compliance. Alternative data like utility and rental payments can actually promote financial inclusion when used appropriately. This demonstrates that compliance and innovation aren't opposed—creative thinking can achieve both.",
          legal: "This is legally sound and innovative. You're using data that's relevant to creditworthiness, obtained with consent, and doesn't create discrimination risks. This approach could actually strengthen your fair lending position by helping applicants who are underserved by traditional credit scoring. This is the kind of innovation regulators want to see.",
          ethics: "This demonstrates ethical creativity. Rather than accepting a false choice between accuracy and fairness, you found a solution that advances both. The alternative data you proposed actually promotes financial inclusion, which aligns with the ethical goals of fair lending. This shows that ethical AI development can drive innovation.",
        },
      },
    ],
  },
];

interface Module4Props {
  onComplete: () => void;
}

export default function Module4({ onComplete }: Module4Props) {
  const [selectedDilemma, setSelectedDilemma] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [completedDilemmas, setCompletedDilemmas] = useState<string[]>([]);

  const currentDilemma = dilemmas.find((d) => d.id === selectedDilemma);
  const currentChoice = currentDilemma?.choices.find((c) => c.id === selectedChoice);

  const handleDilemmaSelect = (dilemmaId: string) => {
    setSelectedDilemma(dilemmaId);
    setSelectedChoice(null);
    setReasoning("");
    setShowResults(false);
  };

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    setShowResults(false);
  };

  const handleSubmitReasoning = () => {
    if (reasoning.trim().length < 50) {
      alert("Please provide more detailed reasoning (at least 50 characters)");
      return;
    }
    setShowResults(true);
    if (currentDilemma && !completedDilemmas.includes(currentDilemma.id)) {
      setCompletedDilemmas([...completedDilemmas, currentDilemma.id]);
    }
  };

  const handleBackToDilemmas = () => {
    setSelectedDilemma(null);
    setSelectedChoice(null);
    setReasoning("");
    setShowResults(false);
  };

  const allDilemmasComplete = completedDilemmas.length === dilemmas.length;

  // Auto-complete module when all dilemmas are done
  useEffect(() => {
    if (allDilemmasComplete) {
      onComplete();
    }
  }, [allDilemmasComplete, onComplete]);

  if (!selectedDilemma) {
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg border border-border p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              4
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">The Decision Point</h2>
              <p className="text-muted-foreground">
                Ethical Dilemma Simulations - Navigate Complex Real-World Scenarios
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-primary p-4">
            <p className="text-sm text-primary-900">
              <strong>Module Goal:</strong> Navigate complex situations where compliance, business pressure,
              and ethics intersect. Learn to make difficult decisions and understand their consequences through
              realistic workplace dilemmas.
            </p>
          </div>
        </div>

        {/* Dilemma Selection */}
        <div className="bg-white rounded-lg border border-border p-8">
          <h3 className="text-xl font-bold mb-4">Select a Dilemma</h3>
          <p className="text-muted-foreground mb-6">
            Each scenario presents a realistic workplace situation with competing pressures. You'll make a
            decision, explain your reasoning, and see expert perspectives on the consequences.
          </p>

          <div className="space-y-4">
            {dilemmas.map((dilemma) => {
              const isComplete = completedDilemmas.includes(dilemma.id);
              return (
                <button
                  key={dilemma.id}
                  onClick={() => handleDilemmaSelect(dilemma.id)}
                  className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                    isComplete
                      ? "border-green-500 bg-green-50"
                      : "border-border hover:border-primary hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg">{dilemma.title}</h4>
                    {isComplete && <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{dilemma.situation}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {dilemma.pressures.slice(0, 3).map((pressure, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {pressure}
                      </span>
                    ))}
                    {dilemma.pressures.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{dilemma.pressures.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        {completedDilemmas.length > 0 && (
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Your Progress</h3>
              <span className="text-sm text-muted-foreground">
                {completedDilemmas.length} of {dilemmas.length} Complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-green-500 h-full rounded-full transition-all"
                style={{ width: `${(completedDilemmas.length / dilemmas.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Complete Module */}
        {allDilemmasComplete && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  All Dilemmas Complete! 🎉
                </h3>
                <p className="text-green-800">
                  You've navigated all three complex scenarios and explored different decision-making
                  approaches. Module automatically marked complete - use the navigation above to continue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dilemma View
  return (
    <div className="space-y-8">
      {/* Dilemma Header */}
      <div className="bg-white rounded-lg border border-border p-8">
        <button
          onClick={handleBackToDilemmas}
          className="text-sm text-muted-foreground hover:text-primary mb-4 flex items-center gap-2"
        >
          ← Back to Dilemmas
        </button>

        <h2 className="text-2xl font-bold text-primary mb-4">{currentDilemma?.title}</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">Context</h3>
            <p className="text-sm">{currentDilemma?.context}</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-semibold mb-2">The Situation</h3>
            <p className="text-sm">{currentDilemma?.situation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Stakeholders</h3>
              <ul className="text-sm space-y-1">
                {currentDilemma?.stakeholders.map((stakeholder, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {stakeholder}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Competing Pressures</h3>
              <ul className="text-sm space-y-1">
                {currentDilemma?.pressures.map((pressure, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    {pressure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className="bg-white rounded-lg border border-border p-8">
        <h3 className="text-xl font-bold mb-4">What do you do?</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select your decision. There's no single "right" answer—each choice has trade-offs.
        </p>

        <div className="space-y-3">
          {currentDilemma?.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
              disabled={showResults}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedChoice === choice.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary hover:bg-primary/5"
              } ${showResults ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-start justify-between">
                <span className="font-medium">{choice.text}</span>
                {selectedChoice === choice.id && (
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reasoning Input */}
      {selectedChoice && !showResults && (
        <div className="bg-blue-50 border-2 border-primary rounded-lg p-8">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Explain Your Reasoning</h3>
              <p className="text-sm text-muted-foreground">
                Before seeing the consequences, explain why you made this choice. What factors did you
                consider? What trade-offs did you weigh?
              </p>
            </div>
          </div>

          <textarea
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            placeholder="I chose this option because..."
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              {reasoning.length} / 50 characters minimum
            </span>
            <button
              onClick={handleSubmitReasoning}
              disabled={reasoning.trim().length < 50}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              See Consequences
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && currentChoice && (
        <div className="space-y-6">
          {/* Consequence */}
          <div
            className={`rounded-lg border-2 p-8 ${
              currentChoice.score >= 2
                ? "border-green-500 bg-green-50"
                : currentChoice.score <= -1
                ? "border-red-500 bg-red-50"
                : "border-yellow-500 bg-yellow-50"
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              {currentChoice.score >= 2 ? (
                <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">What Happens Next</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold">Decision Score:</span>
                  <span
                    className={`text-sm font-bold ${
                      currentChoice.score >= 2
                        ? "text-green-700"
                        : currentChoice.score <= -1
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {currentChoice.score > 0 ? "+" : ""}
                    {currentChoice.score}/3
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{currentChoice.consequence}</p>
          </div>

          {/* Expert Commentary */}
          <div className="bg-white rounded-lg border border-border p-8">
            <h3 className="text-xl font-bold mb-6">Expert Perspectives</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">C</span>
                  </div>
                  <h4 className="font-bold">Compliance Perspective</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {currentChoice.expertCommentary.compliance}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-700">L</span>
                  </div>
                  <h4 className="font-bold">Legal Perspective</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {currentChoice.expertCommentary.legal}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-700">E</span>
                  </div>
                  <h4 className="font-bold">Ethics Perspective</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {currentChoice.expertCommentary.ethics}
                </p>
              </div>
            </div>
          </div>

          {/* Your Reasoning */}
          <div className="bg-muted rounded-lg p-6">
            <h4 className="font-bold mb-2">Your Reasoning</h4>
            <p className="text-sm text-muted-foreground italic">"{reasoning}"</p>
          </div>

          {/* Back Button */}
          <div className="flex justify-end">
            <button
              onClick={handleBackToDilemmas}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Back to Dilemmas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}