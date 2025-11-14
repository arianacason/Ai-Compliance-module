import { Download, FileText, CheckSquare, Shield, AlertTriangle, BookOpen } from "lucide-react";

const toolkitItems = [
  {
    category: "Policies & Frameworks",
    icon: Shield,
    items: [
      {
        name: "AI Use Policy Template",
        description: "Comprehensive policy framework covering acceptable use, data handling, and governance",
        file: "ai-use-policy.pdf",
        pages: "8 pages",
      },
      {
        name: "Data Classification & Handling Guide",
        description: "Visual guide for classifying and handling different types of data in AI systems",
        file: "data-classification-guide.pdf",
        pages: "2 pages",
      },
    ],
  },
  {
    category: "Checklists & Assessments",
    icon: CheckSquare,
    items: [
      {
        name: "DPIA/PIA Checklist",
        description: "Data Protection Impact Assessment checklist for AI systems processing personal data",
        file: "dpia-checklist.pdf",
        pages: "1 page",
      },
      {
        name: "Vendor Due Diligence Checklist",
        description: "Comprehensive checklist for evaluating AI vendors and third-party systems",
        file: "vendor-checklist.pdf",
        pages: "2 pages",
      },
    ],
  },
  {
    category: "Operational Procedures",
    icon: FileText,
    items: [
      {
        name: "Logging & Monitoring SOP",
        description: "Standard operating procedure for AI system logging, monitoring, and audit trails",
        file: "logging-sop.pdf",
        pages: "1 page",
      },
      {
        name: "Incident Response Playbook",
        description: "Step-by-step guide for responding to AI-related incidents and compliance issues",
        file: "incident-playbook.pdf",
        pages: "1 page",
      },
    ],
  },
  {
    category: "Templates & Resources",
    icon: BookOpen,
    items: [
      {
        name: "Disclosure & Consent Templates",
        description: "Ready-to-use templates for AI disclosure statements and consent forms",
        file: "disclosure-templates.pdf",
        pages: "1 page",
      },
      {
        name: "Role-Based Prompt Library",
        description: "Safe prompting examples and best practices organized by role",
        file: "prompt-library.pdf",
        pages: "1 page",
      },
      {
        name: "Redaction Macro & Snippet Library",
        description: "Code snippets and macros for redacting sensitive data from AI prompts",
        file: "redaction-library.pdf",
        pages: "1 page",
      },
    ],
  },
];

export default function ToolkitPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Compliance Toolkit</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Downloadable templates, checklists, and policies you can customize and use immediately
            in your organization. All resources are aligned with the NIST AI Risk Management Framework.
          </p>
        </div>
      </section>

      {/* Toolkit Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {toolkitItems.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">{category.category}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-white rounded-lg border border-border p-6 hover:border-primary hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {item.pages}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <a
                          href={`/downloads/${item.file}`}
                          download
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-800 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Note about customization */}
          <div className="mt-12 bg-blue-50 border-l-4 border-primary rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-primary mb-2">Customization Required</h3>
                <p className="text-sm text-primary-900">
                  These templates are starting points designed to be customized for your organization's
                  specific needs, industry requirements, and regulatory context. Always consult with
                  legal and compliance professionals before implementing policies and procedures.
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </div>
  );
}