'use client';

import { useEffect, useState } from 'react';

interface OrbitingElementsProps {
  children: React.ReactNode;
  className?: string;
}

export default function OrbitingElements({ children, className = '' }: OrbitingElementsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Floating Background Elements - Subtle and Modern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating circles - More subtle */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl animate-float-slow"
          style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
            top: '5%',
            left: '0%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-4 blur-2xl animate-float-medium"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            top: '50%',
            right: '5%',
            transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * -0.008}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-6 blur-xl animate-float-fast"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
            top: '25%',
            right: '15%',
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />

        {/* Small orbiting dots - More subtle */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-orbit-1" />
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-15 animate-orbit-2" />
        <div className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-cyan-400 rounded-full opacity-18 animate-orbit-3" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-22 animate-orbit-4" />

        {/* Geometric shapes - More subtle */}
        <div
          className="absolute top-1/4 left-1/3 w-6 h-6 border border-blue-300 rotate-45 opacity-10 animate-spin-slow"
          style={{
            transform: `rotate(45deg) translate(${mousePosition.x * 0.003}px, ${mousePosition.y * 0.003}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-4 h-4 border border-purple-300 opacity-8 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.004}px, ${mousePosition.y * -0.004}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
