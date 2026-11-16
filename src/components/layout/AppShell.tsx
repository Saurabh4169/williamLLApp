import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { AppHeader } from './AppHeader';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const { desktopFrameMode } = useAppStore();
  const mainRef = useRef<HTMLElement>(null);

  // Automatically scroll main content to top on navigation
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Top header and bottom nav are always fixed across the entire app, hidden only on splash
  const isSplash = location.pathname === '/splash';
  const hideBottomNav = isSplash;
  const hideTopBar = isSplash;

  return (
    <div className="h-screen h-[100dvh] max-h-[100dvh] w-full bg-[#F4F5F5] lg:bg-gradient-to-br lg:from-[#C0D0E1]/20 lg:via-[#F4F5F5] lg:to-[#A4B3BE]/20 flex flex-col items-center justify-start py-0 lg:py-6 px-0 lg:px-4 overflow-hidden">
      {/* Main Container - edge-to-edge native on mobile, framed only on desktop */}
      <div
        className={`w-full h-full max-h-[100dvh] transition-all duration-300 relative flex flex-col overflow-hidden border-0 rounded-none shadow-none ${
          desktopFrameMode
            ? 'lg:max-w-[430px] lg:min-h-0 lg:h-[890px] lg:max-h-[92vh] lg:rounded-[44px] lg:shadow-[0_25px_70px_rgba(25,25,25,0.12)] lg:border-[8px] lg:border-[#191919]'
            : 'lg:max-w-2xl lg:h-full lg:shadow-md'
        }`}
      >
        {/* Fixed full-screen soft ambient liquid-glass canvas with misty-blue reflections */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% -10%, rgba(192, 208, 225, 0.40) 0%, rgba(164, 179, 190, 0.15) 35%, rgba(244, 245, 245, 0) 70%), radial-gradient(circle at 85% 15%, rgba(192, 208, 225, 0.25) 0%, rgba(244, 245, 245, 0) 45%), radial-gradient(circle at 15% 65%, rgba(164, 179, 190, 0.18) 0%, rgba(244, 245, 245, 0) 50%), linear-gradient(180deg, #FFFFFF 0%, #F4F5F5 30%, #ECEEF0 100%)',
          }}
        />

        {/* Dynamic Island / Speaker cutout in desktop frame mode */}
        {desktopFrameMode && (
          <div className="hidden lg:flex w-full justify-center pt-2.5 pb-1 sticky top-0 z-50 pointer-events-none flex-shrink-0">
            <div className="w-28 h-4 bg-[#121214] rounded-full shadow-inner flex items-center justify-end px-3">
              <div className="w-2 h-2 rounded-full bg-[#18181A]/60" />
            </div>
          </div>
        )}

        {/* Docked Edge-to-Edge Liquid-Glass Top Header (Always Permanently Fixed at Top) */}
        {!hideTopBar && (
          <div className="w-full flex-shrink-0 z-40 select-none">
            <AppHeader isMaster />
          </div>
        )}

        {/* Scrollable Content Container (hides ugly desktop scrollbars, native momentum scrolling) */}
        <main
          ref={mainRef}
          className="flex-1 w-full overflow-y-auto overflow-x-clip no-scrollbar flex flex-col relative z-10 overscroll-contain"
        >
          <Outlet />
        </main>

        {/* Docked Edge-to-Edge Liquid-Glass Bottom Nav (Always Fixed at Bottom) */}
        {!hideBottomNav && (
          <div className="w-full flex-shrink-0 z-30 select-none">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppShell;
