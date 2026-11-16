import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#323232] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'h-9 px-4 text-xs rounded-full min-h-[36px]',
    md: 'h-11 px-5 text-sm rounded-full min-h-[44px]',
    lg: 'h-13 px-6 text-base rounded-full min-h-[48px]',
    icon: 'h-11 w-11 rounded-full min-h-[44px] min-w-[44px] p-0',
  };

  const variantClasses = {
    primary:
      'btn-glossy-primary font-semibold text-[#FEFEFE]',
    secondary:
      'btn-glossy-secondary font-semibold text-[#191919]',
    glass:
      'liquid-glass-chip text-[#191919] hover:bg-white active:bg-white/90',
    outline:
      'bg-transparent text-[#191919] border border-[#D8D8D8] hover:bg-white/60 active:bg-white/80',
    danger:
      'bg-rose-600 text-white shadow-[0_4px_14px_rgba(225,29,72,0.30)] hover:bg-rose-700 active:bg-rose-800',
    ghost:
      'bg-transparent text-[#191919] hover:bg-black/5 active:bg-black/10',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.1 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

