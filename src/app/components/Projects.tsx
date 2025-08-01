'use client';

import { useState } from 'react';
import { ExternalLink, Github, Database, Server, Smartphone, Globe } from 'lucide-react';
import OrbitingElements from './OrbitingElements';
import FloatingCard from './FloatingCard';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'SHAKTI - Drone Monitoring System',
      description: 'A comprehensive drone monitoring platform built for PRYM AEROSPACE featuring real-time GPS tracking, telemetry data visualization, and deployment history management.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'WebSocket', 'Tailwind CSS'],
      category: 'fullstack',
      features: [
        'Real-time GPS tracking and location monitoring',
        'Interactive dashboard for drone activity visualization',
        'Battery and temperature monitoring systems',
        'Deployment history and analytics',
        'WebSocket integration for live data streaming',
        'MongoDB schemas for drone records and alerts',
        'Scalable architecture for aerospace applications'
      ],
      liveUrl: 'https://shakti-demo.vercel.app',
      githubUrl: 'https://github.com/akshitsz/shakti-drone-monitoring',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Elite Mart - E-commerce Website',
      description: 'A dynamic and interactive e-commerce web application for trending clothes shopping with comprehensive product management and user-friendly interface.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      category: 'frontend',
      features: [
        'Dynamic product catalog with trending clothes',
        'Advanced search functionality for easy product discovery',
        'Detailed product listings with specifications',
        'Secure buying process and checkout system',
        'User review and rating system',
        'Responsive design for all devices',
        'Interactive user interface with smooth animations'
      ],
      liveUrl: 'https://elite-mart-demo.vercel.app',
      githubUrl: 'https://github.com/akshitsz/elite-mart-ecommerce',
      status: 'completed'
    },
    {
      id: 3,
      title: 'EV Web-app',
      description: 'A comprehensive electric vehicle web application for selling and buying new electric cars with detailed specifications and latest industry news.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js'],
      category: 'frontend',
      features: [
        'Comprehensive EV model showcase and comparison',
        'Latest electric vehicle news and updates',
        'Interactive charging port locator and information',
        'Detailed battery technology specifications',
        'Advanced filtering and search capabilities',
        'Responsive design for optimal user experience',
        'Modern UI with smooth animations and transitions'
      ],
      liveUrl: 'https://ev-webapp-demo.vercel.app',
      githubUrl: 'https://github.com/akshitsz/ev-webapp',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Blood Management System',
      description: 'A comprehensive blood bank management system using MongoDB for efficient tracking of blood inventory, donors, and recipients.',
      image: '/api/placeholder/600/400',
      technologies: ['MongoDB', 'Database Design', 'Data Management'],
      category: 'backend',
      features: [
        'Comprehensive blood bank dataset management',
        'Blood type classification and tracking',
        'Donor information management system',
        'Recipient records and matching system',
        'Real-time blood availability tracking',
        'Unit management and inventory control',
        'Efficient database queries and operations'
      ],
      liveUrl: 'https://blood-management-demo.vercel.app',
      githubUrl: 'https://github.com/akshitsz/blood-management-system',
      status: 'completed'
    },

  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border border-green-200';
      case 'in-progress': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <OrbitingElements>
      <section
        id="projects"
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
              Featured Projects
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              A showcase of my recent work in full-stack development, featuring modern web applications built with the MERN stack.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center mb-8 sm:mb-12 gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  activeFilter === filter.key
                    ? 'btn-modern-primary'
                    : 'btn-modern-secondary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid - Enhanced & Consistent Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="modern-card group flex flex-col h-full"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
              >
                {/* Project Header - Fixed Height */}
                <div className="p-6 border-b flex-shrink-0" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-lg font-semibold leading-tight pr-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <div
                      className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${getStatusColor(project.status)}`}
                    >
                      {project.status === 'completed' ? 'Live' : 'WIP'}
                    </div>
                  </div>

                  <p
                    className="text-sm leading-relaxed min-h-[3.5rem]"
                    style={{
                      color: 'var(--text-secondary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Technologies - Flexible Height */}
                <div className="p-6 border-b flex-grow" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Fixed at Bottom */}
                <div className="p-6 flex-shrink-0">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-light)',
                        color: 'var(--text-secondary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-medium)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                      }}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p
              className="mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Interested in seeing more of my work or discussing a project?
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-modern-primary px-8 py-3"
            >
              Let's Work Together
            </button>
          </div>
        </div>
        </div>
      </section>
    </OrbitingElements>
  );
}
