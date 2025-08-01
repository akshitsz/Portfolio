'use client';

import { useState, useEffect, useRef } from 'react';
import OrbitingElements from './OrbitingElements';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'HTML5 & CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Responsive Design', level: 88 },
        { name: 'TypeScript', level: 75 }
      ]
    },
    backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express.js', level: 82 },
        { name: 'MongoDB', level: 78 },
        { name: 'MySQL', level: 75 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'WebSocket', level: 70 }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'Figma', level: 70 },
        { name: 'Problem Solving', level: 90 },
        { name: 'Team Collaboration', level: 85 },
        { name: 'Agile Development', level: 75 },
        { name: 'Communication', level: 80 }
      ]
    }
  };

  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

  return (
    <OrbitingElements>
      <section
        ref={sectionRef}
        id="skills"
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
              Skills & Expertise
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              A comprehensive overview of my technical skills and proficiency levels across different areas of development.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-8 sm:mb-12 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  activeCategory === category
                    ? 'btn-modern-primary'
                    : 'btn-modern-secondary'
                }`}
              >
                <span className="hidden sm:inline">{skillCategories[category].title}</span>
                <span className="sm:hidden">
                  {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Tools'}
                </span>
              </button>
            ))}
          </div>

          {/* Skills Grid - Enhanced & Consistent Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="modern-card group"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <div className="p-6">
                  {/* Skill Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="text-base font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {skill.name}
                    </h3>
                    <span
                      className="text-sm font-medium px-2 py-1 rounded-md"
                      style={{
                        color: 'var(--text-primary)',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div
                      className="w-full rounded-full h-2 overflow-hidden"
                      style={{ backgroundColor: 'var(--bg-primary)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>

                    {/* Skill Level Indicator */}
                    <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div
              className="modern-card p-8"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-light)'
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Always Learning & Growing
              </h3>
              <p
                className="max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Technology evolves rapidly, and I'm committed to continuous learning. I regularly explore new frameworks,
                tools, and best practices to stay current with industry trends and deliver cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </OrbitingElements>
  );
}
