import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, PhoneCall } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { APP_IMAGES } from '../data/images';
import Button from '../components/ui/Button';

export const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      image: APP_IMAGES.onboarding1.src,
      tag: 'CHICAGO ZONING CONSULTING',
      title: 'NAVIGATING COMPLEX ZONING WITH EASE',
      description:
        'Tailored zoning solutions in Chicago. Helping homeowners, developers and businesses understand land-use rules, get permits, and win zoning appeals.',
      icon: MapPin,
    },
    {
      id: 'slide-2',
      image: APP_IMAGES.onboarding2.src,
      tag: 'REAL-TIME TRACKING',
      title: 'TRACK EVERY PERMIT AND APPEAL',
      description:
        'Monitor your case timeline, hearing schedules, city plan examiner reviews, and uploaded architectural documents from one secure dashboard.',
      icon: ShieldCheck,
    },
    {
      id: 'slide-3',
      image: APP_IMAGES.onboarding3.src,
      tag: 'EXPERT ADVISORY',
      title: 'TALK TO A DEDICATED ZONING EXPERT',
      description:
        'Experienced. Knowledgeable. Dedicated. Book a 1-on-1 consultation or get a free quote for your next residential or commercial project.',
      icon: PhoneCall,
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    completeOnboarding();
    navigate('/');
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-screen w-full bg-[#1F2A44] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Image Carousel with smooth crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          {/* Deep Navy Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44] via-[#1F2A44]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2A44]/80 via-transparent to-[#1F2A44]" />
        </motion.div>
      </AnimatePresence>

      {/* Top Header: Logo + Skip Button */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/brand-icon-white.png"
            alt="Williams & Williams LLC"
            className="w-8 h-8 object-contain"
          />
          <div>
            <div className="font-heading text-xs font-bold tracking-widest text-[#B7C3DA]">
              WILLIAMS &amp; WILLIAMS LLC
            </div>
            <div className="text-[10px] tracking-wider uppercase text-white/70">
              Chicago Zoning Solutions
            </div>
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:scale-95 transition-all"
        >
          Skip
        </button>
      </header>

      {/* Center / Bottom Content Card */}
      <div className="relative z-10 px-6 pb-10 flex flex-col">
        {/* Progress Pill */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold tracking-wider text-[#B7C3DA] bg-white/10 px-3 py-1 rounded-full border border-white/15">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-6 bg-[#B7C3DA]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-3"
          >
            <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#B7C3DA]">
              {slide.tag}
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {currentSlide > 0 ? (
            <button
              onClick={() => setCurrentSlide((prev) => prev - 1)}
              className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white px-4 py-3 min-h-[44px]"
            >
              Back
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-white/60">
              <CheckCircle2 className="w-4 h-4 text-[#3FA66B]" />
              <span>Chicago Municipal Ordinance</span>
            </div>
          )}

          <Button
            onClick={handleNext}
            variant="primary"
            size="lg"
            className="flex-1 bg-gradient-to-r from-[#3D4D7C] to-[#2E3D60] border-t border-white/20 shadow-lg text-white font-semibold flex items-center justify-center gap-2"
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
