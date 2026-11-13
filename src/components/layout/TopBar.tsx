import React from 'react';
import { AppHeader } from './AppHeader';
import { Share2 } from 'lucide-react';

export interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showShare?: boolean;
  onShare?: () => void;
  rightAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  showBack,
  showShare = false,
  onShare,
  rightAction,
}) => {
  let finalRightAction = rightAction;
  if (!finalRightAction && showShare) {
    finalRightAction = (
      <button
        onClick={onShare}
        className="flex items-center justify-center w-10 h-10 rounded-full liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/50 active:scale-95 transition-all"
        aria-label="Share page"
      >
        <Share2 className="w-4 h-4 stroke-[2]" />
      </button>
    );
  }

  return (
    <AppHeader
      title={title}
      showBack={showBack}
      rightAction={finalRightAction}
    />
  );
};

export default TopBar;
