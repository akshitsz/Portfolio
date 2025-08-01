'use client';

import { Code, Database, Server, Smartphone, Calendar, GraduationCap, Award } from 'lucide-react';
import OrbitingElements from './OrbitingElements';

export default function About() {
  const highlights = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Frontend Development",
      description: "Expert in React.js, Next.js, TypeScript, and modern CSS frameworks for creating responsive and interactive user interfaces."
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      description: "Proficient in Node.js, Express.js, RESTful APIs, and microservices architecture for scalable server-side solutions."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Management",
      description: "Experienced with MongoDB, PostgreSQL, and Redis for efficient data storage, retrieval, and caching strategies."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-First Design",
      description: "Creating responsive, mobile-optimized applications that provide seamless experiences across all devices."
    }
  ];

  return (
    <OrbitingElements>
      <section
        id="about"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div
            className="modern-card-elevated p-6 sm:p-8 lg:p-12"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-light)'
            }}
          >
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              About Me
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I'm a passionate Full Stack Developer with a strong foundation in the MERN stack and modern web technologies.
            </p>
          </div>

          {/* About Content - Clean Layout */}
          <div className="space-y-8 sm:space-y-12">
            {/* Introduction */}
            <div
              className="modern-card p-6 sm:p-8"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-light)'
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Crafting Digital Experiences with Modern Technologies
              </h3>

              <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
                <p className="leading-relaxed">
                  Dynamic and detail-oriented IT professional with a strong foundation in Python, React.js, and MySQL.
                  Currently working as Full Stack Developer at PRYM AEROSPACE, where I focus on building innovative
                  solutions for drone monitoring systems and real-time data streaming applications.
                </p>

                <p className="leading-relaxed">
                  I have hands-on experience with the SHAKTI project, developing interactive dashboards for drone activity
                  monitoring, implementing WebSocket connections for live data streaming, and designing MongoDB schemas
                  for aerospace applications.
                </p>

                <p className="leading-relaxed">
                  I'm passionate about solving complex problems and optimizing processes to enhance efficiency.
                  My approach combines technical expertise with critical thinking to deliver user-centric designs
                  and scalable solutions while continuously learning and adapting to emerging technologies.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div
                className="modern-card text-center p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  5+
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Projects Completed
                </div>
              </div>

              <div
                className="modern-card text-center p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  1+
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Years Experience
                </div>
              </div>

              <div
                className="modern-card text-center p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  8+
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Technologies
                </div>
              </div>
            </div>

            {/* Professional Journey & Education */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Professional Experience */}
              <div
                className="modern-card p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Experience
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div
                      className="font-medium text-sm"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Full Stack Developer
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      PRYM AEROSPACE • Jul 2025 - Present
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-medium text-sm"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Software Intern
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      PRYM AEROSPACE • Jan 2025 - Jun 2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div
                className="modern-card p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Education
                  </h4>
                </div>
                <div>
                  <div
                    className="font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    B.Tech in Information Technology
                  </div>
                  <div
                    className="text-xs mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    2020 - 2024
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    J.C. Bose University of Science and Technology
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div
                className="modern-card p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Certifications
                  </h4>
                </div>
                <div className="space-y-2">
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    • MERN Stack Development
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    • Entrepreneurship Essentials
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    • Training of Trainers
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="modern-card p-6"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-light)'
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      {highlight.icon}
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-lg font-semibold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {highlight.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div
              className="modern-card p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-light)'
              }}
            >
              <div className="text-center sm:text-left">
                <h4
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Ready to work together?
                </h4>
                <p
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Let's create something amazing!
                </p>
              </div>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-modern-primary px-6 py-3"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </OrbitingElements>
  );
}
