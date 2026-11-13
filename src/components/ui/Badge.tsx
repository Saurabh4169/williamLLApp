import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'glass' | 'solid-primary' | 'solid-success' | 'solid-danger';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
    md: 'px-3 py-1 text-xs font-bold tracking-wide',
  };

  const variantClasses = {
    primary: 'bg-[#3D4D7C]/12 text-[#3D4D7C] border border-[#3D4D7C]/20',
    success: 'bg-[#3FA66B]/15 text-[#2C784C] border border-[#3FA66B]/25',
    danger: 'bg-[#E5484D]/15 text-[#B82B30] border border-[#E5484D]/25',
    warning: 'bg-amber-500/15 text-amber-800 border border-amber-500/25',
    neutral: 'bg-[#DDE2EA]/60 text-[#1F2A44] border border-[#DDE2EA]',
    glass: 'bg-white/85 backdrop-blur-md text-[#1F2A44] border border-white/90 shadow-xs',
    'solid-primary': 'bg-[#3D4D7C] text-white border border-white/30 shadow-xs',
    'solid-success': 'bg-[#3FA66B] text-white border border-white/30 shadow-xs',
    'solid-danger': 'bg-[#E5484D] text-white border border-white/30 shadow-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
