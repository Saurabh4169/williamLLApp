import React from 'react';

export interface StatTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  icon,
  label,
  value,
  className = '',
}) => {
  return (
    <div
      className={`liquid-glass-chip p-2.5 rounded-tile flex flex-col items-center text-center justify-center border border-white/80 min-h-[64px] ${className}`}
    >
      <div className="text-[#3D4D7C] mb-1">{icon}</div>
      <span className="text-[10px] text-[#8A93A6] uppercase font-semibold tracking-wider">
        {label}
      </span>
      <span className="text-xs font-bold text-[#1F2A44] truncate max-w-full mt-0.5">
        {value}
      </span>
    </div>
  );
};

export default StatTile;

