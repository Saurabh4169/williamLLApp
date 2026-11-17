import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface DraggableAskAiButtonProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const DraggableAskAiButton: React.FC<DraggableAskAiButtonProps> = ({
  scrollContainerRef,
  containerRef,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Route visibility logic:
  // Show on: Home, Services, Service Details, Construction, Track Cases, and More.
  // Hide on: AI chat, Payment screens, forms (Free Quote, Project Assessment, Book a Service, Chat enquiry), success screens.
  const path = location.pathname;
  const isAiAssistant = path.startsWith('/ai-assistant') || path.startsWith('/ai-chat');
  const isPayment = path.includes('/payment') || path.includes('/checkout');
  const isForm =
    path.startsWith('/quote') ||
    path.startsWith('/project-assessment') ||
    path.startsWith('/assessment') ||
    path.startsWith('/book-consultation');
  const isSuccess = location.search.includes('success=true');

  const shouldShow =
    !isAiAssistant &&
    !isPayment &&
    !isForm &&
    !isSuccess &&
    (path === '/' ||
      path === '/home' ||
      path.startsWith('/services') ||
      path.startsWith('/cases') ||
      path.startsWith('/construction') ||
      path.startsWith('/portfolio') ||
      path.startsWith('/projects') ||
      path === '/profile');

  // Scrolling state: 60% opacity while scrolling, 100% when stopped
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const target = scrollContainerRef?.current || window;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 180);
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollContainerRef]);

  // Position state
  const BUTTON_SIZE = 56;
  const MARGIN = 16;
  const TOP_SAFE = 72; // Below master header & notch
  const BOTTOM_SAFE = 96; // 80px bottom nav + 16px margin

  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem('ask_ai_float_pos_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.y === 'number') {
          return {
            x: parsed.side === 'left' ? MARGIN : 9999, // 9999 will be resolved in first effect
            y: parsed.y,
          };
        }
      }
    } catch {
      // fallback
    }
    return { x: 9999, y: 9999 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number; moved: boolean }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
    moved: false,
  });

  // Calculate container bounds
  const getBounds = () => {
    const parent = containerRef?.current || document.getElementById('phone-frame') || document.body;
    const rect = parent.getBoundingClientRect();
    return {
      width: rect.width || window.innerWidth,
      height: rect.height || window.innerHeight,
    };
  };

  // Initialize default position on mount or resize
  useEffect(() => {
    const updateDefaultPos = () => {
      const { width, height } = getBounds();
      setPosition((prev) => {
        const targetY = prev.y > 9000 ? Math.max(TOP_SAFE, height - BOTTOM_SAFE - BUTTON_SIZE) : prev.y;
        const clampedY = Math.min(Math.max(TOP_SAFE, targetY), height - BOTTOM_SAFE - BUTTON_SIZE);

        let targetX = prev.x;
        if (prev.x > 9000) {
          targetX = width - MARGIN - BUTTON_SIZE; // Default: right edge
        } else {
          // Keep snapped to current side
          targetX = prev.x < width / 2 ? MARGIN : width - MARGIN - BUTTON_SIZE;
        }

        return { x: targetX, y: clampedY };
      });
    };

    updateDefaultPos();
    window.addEventListener('resize', updateDefaultPos);
    return () => window.removeEventListener('resize', updateDefaultPos);
  }, []);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Only left click or single touch
    if (e.button !== 0) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    if (Math.hypot(deltaX, deltaY) > 5) {
      dragStartRef.current.moved = true;
    }

    const { width, height } = getBounds();
    const newX = Math.min(Math.max(MARGIN, dragStartRef.current.initX + deltaX), width - MARGIN - BUTTON_SIZE);
    const newY = Math.min(
      Math.max(TOP_SAFE, dragStartRef.current.initY + deltaY),
      height - BOTTOM_SAFE - BUTTON_SIZE
    );

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const { width, height } = getBounds();

    if (!dragStartRef.current.moved) {
      // Single tap -> Navigate to AI Assistant
      navigate('/ai-assistant');
      return;
    }

    // Snap to nearest left or right edge
    const midX = width / 2;
    const snapToLeft = position.x + BUTTON_SIZE / 2 < midX;
    const finalX = snapToLeft ? MARGIN : width - MARGIN - BUTTON_SIZE;
    const finalY = Math.min(Math.max(TOP_SAFE, position.y), height - BOTTOM_SAFE - BUTTON_SIZE);

    setPosition({ x: finalX, y: finalY });

    // Remember in localStorage
    try {
      localStorage.setItem(
        'ask_ai_float_pos_v2',
        JSON.stringify({
          side: snapToLeft ? 'left' : 'right',
          y: finalY,
        })
      );
    } catch {
      // ignore
    }
  };

  if (!shouldShow) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${BUTTON_SIZE}px`,
        height: `${BUTTON_SIZE}px`,
        zIndex: 45,
        touchAction: 'none',
        transition: isDragging ? 'none' : 'left 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.2s ease',
      }}
      className={`select-none ${isScrolling ? 'opacity-60' : 'opacity-100'}`}
    >
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="Ask AI Assistant"
        className="w-14 h-14 rounded-full bg-[#191919] hover:bg-[#252525] active:scale-95 text-white flex items-center justify-center border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.35)] cursor-grab active:cursor-grabbing relative transition-transform"
      >
        {/* Centered Sparkle Icon */}
        <Sparkles className="w-6 h-6 text-white stroke-[2.2]" />

        {/* Online Indicator Green Dot */}
        <span
          aria-label="Online"
          className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#191919] ring-1 ring-emerald-500/50"
        />
      </button>
    </div>
  );
};

export default DraggableAskAiButton;
