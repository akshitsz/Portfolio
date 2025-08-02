'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Code } from 'lucide-react';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
  icon?: string;
  order: number;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 'Intermediate',
    icon: '',
    order: 0,
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portfolio/skills');
      const data = await response.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setMessage({ type: 'error', text: 'Failed to load skills' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token');
    
    try {
      const url = editingSkill 
        ? `/api/portfolio/skills/${editingSkill._id}`
        : '/api/portfolio/skills';
      
      const method = editingSkill ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingSkill ? 'Skill updated successfully!' : 'Skill created successfully!' 
        });
        fetchSkills();
        resetForm();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save skill' });
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon || '',
      order: skill.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    const token = localStorage.getItem('auth-token');
    
    try {
      const response = await fetch(`/api/portfolio/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Skill deleted successfully!' });
        fetchSkills();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete skill' });
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      level: 'Intermediate',
      icon: '',
      order: 0,
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Code className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">Skills Management</h3>
                <p className="text-sm text-gray-500 mt-0.5">Add, edit, or remove your technical skills</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex-shrink-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Skill</span>
              <span className="sm:hidden">Add</span>
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
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  placeholder="e.g., React.js"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-3">
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
                  {editingSkill ? 'Update' : 'Add'} Skill
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills List */}
        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-8">
              <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No skills added yet. Add your first skill!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill._id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all duration-200 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 text-sm">{skill.name}</h4>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                        title="Edit skill"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium">{skill.category}</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
