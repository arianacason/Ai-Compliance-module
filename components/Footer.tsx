import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">AB</span>
              </div>
              <span className="text-xl font-bold">Adept Blueprint</span>
            </div>
            <p className="text-primary-100 text-sm max-w-md">
              Empowering organizations with practical, scenario-driven AI compliance training
              that transforms abstract concepts into actionable workplace skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-100">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-white transition-colors">
                  Course Modules
                </Link>
              </li>
              <li>
                <Link href="/toolkit" className="hover:text-white transition-colors">
                  Toolkit
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-100">
              <li>
                <a
                  href="https://www.nist.gov/itl/ai-risk-management-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  NIST AI RMF
                </a>
              </li>
              <li>
                <Link href="/toolkit" className="hover:text-white transition-colors">
                  Policy Templates
                </Link>
              </li>
              <li>
                <Link href="/toolkit" className="hover:text-white transition-colors">
                  Compliance Checklists
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-sm text-primary-100 text-center">
          <p>&copy; {new Date().getFullYear()} Adept Blueprint. All rights reserved.</p>
          <p className="mt-2">
            Demo course platform • Built with Next.js • Aligned with NIST AI Risk Management Framework
          </p>
        </div>
      </div>
    </footer>
  );
}