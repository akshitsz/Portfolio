'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import OrbitingElements from './OrbitingElements';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'React.js Developer',
    'Node.js Developer',
    'Python Developer',
    'UI/UX Designer'
  ];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <OrbitingElements>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <div
            className="modern-card p-8 sm:p-12 lg:p-16 space-y-8"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-light)'
            }}
          >
            {/* Profile Image */}
            <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold shadow-lg">
                AS
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span
                  className="block mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Akshit
                  </span>
                </span>
              </h1>

              <div
                className="text-lg sm:text-xl md:text-2xl font-medium h-10 sm:h-12 flex items-center justify-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="border-r-2 border-blue-500 pr-2 animate-pulse">
                  {text}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Passionate Software Developer with a strong IT background, specializing in creating innovative
                web applications and scalable solutions. Proficient in modern technologies including React.js,
                Node.js, and Python, with expertise in full-stack development and database management.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToProjects}
                className="btn-modern-primary px-8 py-3 text-base font-medium"
              >
                View My Work
              </button>

              <button
                onClick={scrollToContact}
                className="btn-modern-secondary px-8 py-3 text-base font-medium"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/akshitsz"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-card p-2 hover:scale-105 transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/akshitsingh8"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-card p-2 hover:scale-105 transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
              </a>
              <a
                href="mailto:akshit1742@gmail.com"
                className="modern-card p-2 hover:scale-105 transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
              </a>
              <a
                href="/Resume_08.pdf"
                download
                className="modern-card p-2 hover:scale-105 transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-light)'
                }}
                aria-label="Download Resume"
              >
                <Download className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown
              className="h-6 w-6"
              style={{ color: 'var(--text-muted)' }}
            />
          </div>
        </div>
      </section>
    </OrbitingElements>
  );
}
