import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size?: 'default' | 'wide' | 'narrow';
}

export default function SectionContainer({
  children,
  className = '',
  id,
  size = 'default',
}: SectionContainerProps) {
  const maxWidthClass =
    size === 'wide'
      ? 'max-w-site'
      : size === 'narrow'
      ? 'max-w-3xl'
      : 'max-w-content';

  return (
    <div
      id={id}
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${className}`}
    >
      {children}
    </div>
  );
}
