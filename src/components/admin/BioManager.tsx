'use client';

import { useState, useEffect } from 'react';
import { Save, Upload, Link, User } from 'lucide-react';

export default function BioManager() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    profileImage: '',
    resumeLink: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState({ image: false, resume: false });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portfolio/bio');
      const data = await response.json();
      
      if (data.bio) {
        setFormData({
          title: data.bio.title || '',
          subtitle: data.bio.subtitle || '',
          description: data.bio.description || '',
          profileImage: data.bio.profileImage || '',
          resumeLink: data.bio.resumeLink || '',
        });
      }
    } catch (error) {
      console.error('Error fetching bio:', error);
      setMessage({ type: 'error', text: 'Failed to load bio data' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ type: '', text: '' }); // Clear message when user types
  };

  const handleFileUpload = async (file: File, type: 'image' | 'resume') => {
    setIsUploading({ ...isUploading, [type]: true });
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Update the form data with the uploaded file URL
        const fieldName = type === 'image' ? 'profileImage' : 'resumeLink';
        setFormData(prev => ({
          ...prev,
          [fieldName]: data.url
        }));
        setMessage({
          type: 'success',
          text: `${type === 'image' ? 'Profile image' : 'Resume'} uploaded successfully!`
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
    } finally {
      setIsUploading({ ...isUploading, [type]: false });
    }
  };

  const triggerFileUpload = (type: 'image' | 'resume') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image'
      ? 'image/jpeg,image/jpg,image/png,image/webp'
      : '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file, type);
      }
    };

    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/portfolio/bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Bio updated successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update bio' });
      }
    } catch (error) {
      console.error('Error updating bio:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900">Bio & Introduction</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your personal introduction and profile information
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title/Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="e.g., Akshit Singh"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle/Role
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="e.g., Full Stack MERN Developer"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200"
                placeholder="Write a compelling description about yourself, your skills, and what you do..."
              />
            </div>

            {/* Profile Image URL */}
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL
              </label>
              <div className="flex">
                <input
                  type="url"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="https://example.com/profile-image.jpg"
                />
                <button
                  type="button"
                  onClick={() => triggerFileUpload('image')}
                  disabled={isUploading.image}
                  className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-md transition-colors duration-200 ${
                    isUploading.image
                      ? 'bg-blue-50 cursor-not-allowed'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  title="Upload Image"
                >
                  {isUploading.image ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Upload className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
              {/* Profile Image Preview */}
              {formData.profileImage && (
                <div className="mt-2">
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Resume Link */}
            <div>
              <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-2">
                Resume/CV Link
              </label>
              <div className="flex">
                <input
                  type="url"
                  id="resumeLink"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="https://drive.google.com/file/d/your-resume-link"
                />
                <button
                  type="button"
                  onClick={() => triggerFileUpload('resume')}
                  disabled={isUploading.resume}
                  className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-md transition-colors duration-200 ${
                    isUploading.resume
                      ? 'bg-blue-50 cursor-not-allowed'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  title="Upload Resume"
                >
                  {isUploading.resume ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Link className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
              {/* Resume Preview */}
              {formData.resumeLink && (
                <div className="mt-2">
                  <a
                    href={formData.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    View Resume
                  </a>
                </div>
              )}
            </div>

          {/* Message */}
          {message.text && (
            <div className={`p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
