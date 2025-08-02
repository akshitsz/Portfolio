'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Github, Database, Server, Smartphone, Globe } from 'lucide-react';
import OrbitingElements from './OrbitingElements';
import FloatingCard from './FloatingCard';

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  status: string;
  order: number;
  createdAt: string;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/portfolio/projects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);



  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'completed', label: 'Completed' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'featured', label: 'Featured' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : activeFilter === 'featured'
    ? projects.filter(project => project.featured)
    : projects.filter(project => project.status === activeFilter);

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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="modern-card animate-pulse"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-light)'
                  }}
                >
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Projects will appear here once they are added through the admin panel.</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <div
                  key={project._id}
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
                      {project.shortDescription || project.description}
                    </p>
                  </div>
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
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 ${
                          project.liveUrl ? '' : 'flex-1'
                        }`}
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
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
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
