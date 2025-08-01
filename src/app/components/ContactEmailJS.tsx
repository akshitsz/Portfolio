'use client';

import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';
import OrbitingElements from './OrbitingElements';
import FloatingCard from './FloatingCard';
import StatCard from './StatCard';

export default function ContactEmailJS() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Add timestamp for the email
      const currentTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      if (form.current) {
        // Add timestamp to form data
        const formElement = form.current;
        const timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = 'time';
        timeInput.value = currentTime;
        formElement.appendChild(timeInput);

        const result = await emailjs.sendForm(
          serviceId,
          templateId,
          formElement,
          publicKey
        );

        // Remove the temporary input
        formElement.removeChild(timeInput);
        
        console.log('Email sent successfully:', result.text);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'akshit1742@gmail.com',
      link: 'mailto:akshit1742@gmail.com'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      value: '+91 9310475910',
      link: 'tel:+919310475910'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: 'Faridabad, India',
      link: 'https://maps.google.com/?q=Faridabad,India'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: 'GitHub',
      url: 'https://github.com/akshitsz',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/akshitsingh8',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <OrbitingElements>
      <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Get In Touch
            </h2>
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="mt-8 sm:mt-12">
            <div
              className="modern-card-elevated p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-light)'
              }}
            >
              <div className="text-center mb-8">
                <h3
                  className="text-xl sm:text-2xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Send a Message
                </h3>
                <p
                  className="text-sm sm:text-base mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Have a project in mind? Let's discuss how we can work together.
                </p>

                {/* Contact Icons and Social Links - Single Row */}
                <div className="flex justify-center items-center space-x-6">
                  {/* Email */}
                  <a
                    href="mailto:akshit1742@gmail.com"
                    className="group flex flex-col items-center"
                    title="Email me"
                  >
                    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 group-hover:border-gray-500 group-hover:text-gray-900 transition-all duration-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Email
                    </span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+919310475910"
                    className="group flex flex-col items-center"
                    title="Call me"
                  >
                    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 group-hover:border-gray-500 group-hover:text-gray-900 transition-all duration-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Call
                    </span>
                  </a>

                  {/* Location */}
                  <a
                    href="https://maps.google.com/?q=Faridabad,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center"
                    title="My location"
                  >
                    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 group-hover:border-gray-500 group-hover:text-gray-900 transition-all duration-200">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Location
                    </span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/akshitsz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center"
                    title="GitHub"
                  >
                    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 group-hover:border-gray-500 group-hover:text-gray-900 transition-all duration-200">
                      <Github className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                      GitHub
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/akshitsingh8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center"
                    title="LinkedIn"
                  >
                    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 group-hover:border-gray-500 group-hover:text-gray-900 transition-all duration-200">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                      LinkedIn
                    </span>
                  </a>
                </div>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-light)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-light)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-modern-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      color: 'rgb(34, 197, 94)',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}
                  >
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: 'rgb(239, 68, 68)',
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    Sorry, there was an error sending your message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </OrbitingElements>
  );
}
