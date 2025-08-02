'use client';

import { useState, useEffect, useRef } from 'react';
import OrbitingElements from './OrbitingElements';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
  icon?: string;
  order: number;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [isVisible, setIsVisible] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/portfolio/skills');
        const data = await response.json();
        setSkills(data.skills || []);

        // Set default active category to the first available category
        if (data.skills && data.skills.length > 0) {
          const categories = [...new Set(data.skills.map((skill: Skill) => skill.category))];
          setActiveCategory((categories[0] as string) || 'Frontend');
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

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

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Get available categories
  const categories = Object.keys(skillsByCategory);

  // Convert skill level text to percentage for progress bar
  const getLevelPercentage = (level: string): number => {
    switch (level.toLowerCase()) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'expert': return 90;
      default: return 50;
    }
  };

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
          {!isLoading && categories.length > 0 && (
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
                  <span>{category}</span>
                </button>
              ))}
            </div>
          )}

          {/* Skills Grid - Enhanced & Consistent Layout */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Skills Added Yet</h3>
              <p className="text-gray-500">Skills will appear here once they are added through the admin panel.</p>
            </div>
          ) : skillsByCategory[activeCategory] ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {skillsByCategory[activeCategory]
                .sort((a, b) => a.order - b.order)
                .map((skill, index) => {
                  const levelPercentage = getLevelPercentage(skill.level);
                  return (
                    <div
                      key={skill._id}
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
                            {skill.level}
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
                                width: isVisible ? `${levelPercentage}%` : '0%',
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
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No skills found in this category.</p>
            </div>
          )}
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
