'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Footer Separator Line */}
      <div
        className="w-full h-px"
        style={{ backgroundColor: 'var(--border-medium)' }}
      />

      <footer
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)'
        }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div
            className="modern-card p-8 sm:p-10 lg:p-12"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-light)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <h3
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Akshit Singh
              </h3>
              <p
                className="leading-relaxed text-sm sm:text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                Full Stack Developer at PRYM AEROSPACE specializing in React.js, Node.js, and Python.
                Building innovative drone monitoring systems and real-time data streaming applications.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4
                className="text-base sm:text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-2">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left text-sm sm:text-base py-1 transition-colors duration-200 hover:scale-105"
                    style={{
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Technologies */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <h4
                className="text-base sm:text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'React.js', 'Next.js', 'Node.js', 'MongoDB',
                  'Express.js', 'TypeScript', 'PostgreSQL', 'Socket.io'
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs sm:text-sm rounded-lg border transition-colors duration-200 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--border-light)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t pt-8"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-4">
              {/* Copyright */}
              <div
                className="text-sm sm:text-base text-center sm:text-left"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span>© {currentYear} Akshit Singh. All rights reserved.</span>
              </div>

              {/* Back to Top Button - Enhanced */}
              <button
                onClick={scrollToTop}
                className="btn-modern-primary flex items-center space-x-2 px-6 py-3 text-sm font-medium"
                aria-label="Back to top"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
