'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, GraduationCap } from 'lucide-react';

interface Experience {
  _id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
  order: number;
}

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: '',
    achievements: '',
    order: 0,
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portfolio/experience');
      const data = await response.json();
      setExperiences(data.experience || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setMessage({ type: 'error', text: 'Failed to load experiences' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token');
    
    const experienceData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      achievements: formData.achievements.split('\n').map(ach => ach.trim()).filter(ach => ach),
    };
    
    try {
      const url = editingExperience 
        ? `/api/portfolio/experience/${editingExperience._id}`
        : '/api/portfolio/experience';
      
      const method = editingExperience ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingExperience ? 'Experience updated successfully!' : 'Experience created successfully!' 
        });
        fetchExperiences();
        resetForm();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save experience' });
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location || '',
      startDate: experience.startDate.split('T')[0],
      endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
      current: experience.current,
      description: experience.description,
      technologies: experience.technologies.join(', '),
      achievements: experience.achievements.join('\n'),
      order: experience.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    const token = localStorage.getItem('auth-token');
    
    try {
      const response = await fetch(`/api/portfolio/experience/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Experience deleted successfully!' });
        fetchExperiences();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete experience' });
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      technologies: '',
      achievements: '',
      order: 0,
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Experience Management</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your work experience and career history</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-4 border-b border-gray-200 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., PRYM AEROSPACE"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Faridabad, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                  Currently working here
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your role and responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB, Express"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Achievements (one per line)</label>
                <textarea
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="• Developed and optimized APIs&#10;• Implemented real-time features&#10;• Led a team of developers"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingExperience ? 'Update' : 'Add'} Experience
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Experience List */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No experience added yet. Add your first experience!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((experience) => (
                <div key={experience._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{experience.position}</h4>
                      <p className="text-blue-600 font-medium">{experience.company}</p>
                      <p className="text-sm text-gray-600">
                        {experience.location && `${experience.location} • `}
                        {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {experience.current ? ' Present' : ` ${new Date(experience.endDate!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(experience)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(experience._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{experience.description}</p>
                  
                  {experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.technologies.map((tech, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {experience.achievements.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {experience.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
