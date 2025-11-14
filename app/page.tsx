import Link from "next/link";
import { ArrowRight, BookOpen, Award, Download, CheckCircle } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              AI in Motion: Ethical Decision-Making in an Automated Workplace
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              A practical, scenario-driven exploration of AI compliance for diverse organizational teams.
              Transform abstract concepts into actionable workplace skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/modules"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Start Demo Course
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/toolkit"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                View Toolkit
                <Download className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="bg-white py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Your Progress</h3>
            <span className="text-sm text-muted-foreground">7 Modules</span>
          </div>
          <ProgressBar />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why This Course Stands Out
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Based on industry best practices, this course employs proven instructional design principles
              to deliver engaging, memorable, and actionable compliance training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scenario-Based Learning</h3>
              <p className="text-muted-foreground text-sm">
                Real-world dilemmas and storytelling approaches make abstract concepts tangible and memorable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Problem-Solving Focus</h3>
              <p className="text-muted-foreground text-sm">
                Address genuine workplace challenges employees actually face, not just theoretical information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">NIST Framework Aligned</h3>
              <p className="text-muted-foreground text-sm">
                Every module maps to the NIST AI Risk Management Framework for comprehensive coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Practical Toolkits</h3>
              <p className="text-muted-foreground text-sm">
                Downloadable templates, checklists, and policies you can use immediately in your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Course Modules
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seven interactive modules covering everything from AI fundamentals to ethical decision-making
              and communication strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {module.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                <div className="flex items-center text-xs text-primary font-medium">
                  <span className="bg-primary/10 px-2 py-1 rounded">{module.nist}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/modules"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Explore All Modules
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Team's AI Compliance?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            This demo showcases what a custom AI compliance training course can look like for your organization.
            Get a personalized version tailored to your industry, tools, and specific compliance requirements.
          </p>
          <div className="flex justify-center">
            <Link
              href="/modules"
              className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Start Demo Course
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const modules = [
  {
    id: "module-1",
    title: "The AI Awakening",
    description: "Setting the stage with an engaging introduction to AI in the workplace through interactive storytelling.",
    duration: "15 min",
    nist: "NIST: Identify",
  },
  {
    id: "module-2",
    title: "The Rulebook Decoded",
    description: "Transform dense regulations into accessible, role-specific guidance with interactive filters.",
    duration: "20 min",
    nist: "NIST: Govern",
  },
  {
    id: "module-3",
    title: "Bias in the Machine",
    description: "Explore real case studies to identify ethical risks and bias in AI systems.",
    duration: "25 min",
    nist: "NIST: Measure",
  },
  {
    id: "module-4",
    title: "The Decision Point",
    description: "Navigate complex ethical dilemmas through branching scenario simulations.",
    duration: "30 min",
    nist: "NIST: Manage",
  },
  {
    id: "module-5",
    title: "Spotting the Red Flags",
    description: "Learn to identify AI compliance risks with practical checklists and tools.",
    duration: "20 min",
    nist: "NIST: Measure",
  },
  {
    id: "module-6",
    title: "Speaking Up",
    description: "Master communication and escalation strategies for AI compliance concerns.",
    duration: "15 min",
    nist: "NIST: Manage",
  },
  {
    id: "module-7",
    title: "Staying Ahead",
    description: "Establish continuous learning practices and accountability for ongoing compliance.",
    duration: "10 min",
    nist: "NIST: Govern",
  },
];