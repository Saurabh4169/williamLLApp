import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'misty' | 'success' | 'danger' | 'warning' | 'neutral' | 'glass' | 'solid-primary' | 'solid-success' | 'solid-danger';
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
    primary: 'bg-gradient-to-r from-[#C7D3DC]/40 to-[#A5B5C1]/30 text-[#191919] border border-[#A5B5C1]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)]',
    misty: 'bg-gradient-to-r from-[#C7D3DC] to-[#A5B5C1] text-[#191919] border border-[#A0B0BC] shadow-xs',
    success: 'bg-[#22C55E]/15 text-[#16A34A] border border-[#22C55E]/30',
    danger: 'bg-rose-500/15 text-rose-700 border border-rose-500/25',
    warning: 'bg-amber-500/15 text-amber-800 border border-amber-500/25',
    neutral: 'bg-[#D8D8D8]/50 text-[#323232] border border-[#D8D8D8]',
    glass: 'bg-white/85 backdrop-blur-md text-[#191919] border border-white/90 shadow-xs',
    'solid-primary': 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border border-[#191919]/50 shadow-xs',
    'solid-success': 'bg-[#22C55E] text-white border border-white/30 shadow-xs',
    'solid-danger': 'bg-rose-600 text-white border border-white/30 shadow-xs',
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
