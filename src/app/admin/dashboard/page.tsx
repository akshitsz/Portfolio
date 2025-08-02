'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Import dashboard components
import BioManager from '@/components/admin/BioManager';
import SkillsManager from '@/components/admin/SkillsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ExperienceManager from '@/components/admin/ExperienceManager';
import ContactInfoManager from '@/components/admin/ContactInfoManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bio');
  const [user, setUser] = useState<{name: string; email: string} | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth-token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { id: 'bio', label: 'Bio & Introduction', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: GraduationCap },
    { id: 'contact', label: 'Contact Info', icon: Mail },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'bio':
        return <BioManager />;
      case 'skills':
        return <SkillsManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'contact':
        return <ContactInfoManager />;
      default:
        return <BioManager />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col lg:w-64`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User info and logout */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center mb-3 p-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 mr-2 flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Manage your portfolio content
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                <FileText className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">View Portfolio</span>
                <span className="sm:hidden">View</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
