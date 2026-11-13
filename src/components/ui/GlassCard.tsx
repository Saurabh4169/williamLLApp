import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type GlassVariant = 'card' | 'chip' | 'bar' | 'nav';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: GlassVariant;
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'card',
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  const variantClass = {
    card: 'liquid-glass-card p-4 sm:p-5',
    chip: 'liquid-glass-chip px-3 py-1.5',
    bar: 'liquid-glass-bar px-4 py-3',
    nav: 'liquid-glass-nav px-3 py-2',
  }[variant];

  return (
    <motion.div
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={`${variantClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

