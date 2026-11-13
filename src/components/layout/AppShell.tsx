import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const { desktopFrameMode } = useAppStore();
  const mainRef = useRef<HTMLElement>(null);

  // Automatically scroll main content to top on navigation
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Bottom nav is always visible across the entire app for native navigation, hidden only on splash
  const isSplash = location.pathname === '/splash';
  const hideBottomNav = isSplash;

  return (
    <div className="h-screen h-[100dvh] max-h-[100dvh] w-full bg-[#F2F3F5] lg:bg-gradient-to-br lg:from-[#B7C3DA]/40 lg:via-[#F2F3F5] lg:to-[#7D90B5]/30 flex flex-col items-center justify-start py-0 lg:py-6 px-0 lg:px-4 overflow-hidden">
      {/* Main Container - edge-to-edge native on mobile, framed only on desktop */}
      <div
        className={`w-full h-full max-h-[100dvh] transition-all duration-300 relative flex flex-col overflow-hidden border-0 rounded-none shadow-none ${
          desktopFrameMode
            ? 'lg:max-w-[430px] lg:min-h-0 lg:h-[890px] lg:max-h-[92vh] lg:rounded-[44px] lg:shadow-[0_25px_70px_rgba(31,42,68,0.24)] lg:border-[8px] lg:border-[#1F2A44]'
            : 'lg:max-w-2xl lg:h-full lg:shadow-md'
        }`}
      >
        {/* Fixed full-screen soft ambient background layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 45%), radial-gradient(circle at 10% 25%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 35%), linear-gradient(180deg, #F2F3F5 0%, #F5F7FA 50%, #EBF0F7 80%, #DFE7F2 100%)',
          }}
        />

        {/* Dynamic Island / Speaker cutout in desktop frame mode */}
        {desktopFrameMode && (
          <div className="hidden lg:flex w-full justify-center pt-2.5 pb-1 sticky top-0 z-50 pointer-events-none flex-shrink-0">
            <div className="w-28 h-4 bg-[#1F2A44] rounded-full shadow-inner flex items-center justify-end px-3">
              <div className="w-2 h-2 rounded-full bg-[#3D4D7C]/60" />
            </div>
          </div>
        )}

        {/* Scrollable Content Container (hides ugly desktop scrollbars, native momentum scrolling) */}
        <main
          ref={mainRef}
          className="flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col relative z-10 overscroll-contain"
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
