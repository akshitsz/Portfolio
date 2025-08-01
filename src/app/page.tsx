'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/ContactEmailJS';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollProgress from './components/ScrollProgress';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}
      data-theme={darkMode ? 'dark' : 'light'}
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <ScrollProgress />
      <div className="relative">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
