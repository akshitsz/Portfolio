'use client';

import { useState, useRef, useEffect } from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: number;
}

export default function FloatingCard({ 
  children, 
  className = '', 
  delay = 0, 
  intensity = 1 
}: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) * 0.1 * intensity,
          y: (e.clientY - centerY) * 0.1 * intensity
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, intensity]);

  return (
    <div
      ref={cardRef}
      className={`
        relative group cursor-pointer
        transform transition-all duration-300 ease-out
        hover:scale-102 hover:-translate-y-1
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
        transform: isHovered
          ? `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 0) scale(1.02) translateY(-4px)`
          : 'translate3d(0, 0, 0) scale(1) translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* Card glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      {/* Main card */}
      <div
        className="relative modern-card-elevated overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-light)'
        }}
      >
        {/* Floating particles inside card */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40 animate-float-particle-1" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-float-particle-2" />
          <div className="absolute top-1/2 left-4 w-1 h-1 bg-cyan-400 rounded-full opacity-35 animate-float-particle-3" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)'
          }}
        />
      </div>
    </div>
  );
}
