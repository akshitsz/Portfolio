'use client';

interface StatCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function StatCard({ 
  children, 
  className = '', 
  delay = 0 
}: StatCardProps) {
  return (
    <div
      className={`stat-card ${className}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
