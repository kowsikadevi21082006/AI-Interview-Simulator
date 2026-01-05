'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted';
}

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition duration-200';
  const variants = {
    default: 'bg-white shadow-sm hover:shadow-md border border-gray-100',
    highlighted: 'bg-linear-to-br from-blue-50 to-purple-50 border border-blue-100 shadow-sm',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
