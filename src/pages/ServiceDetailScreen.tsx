import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Heart,
  Users,
  Clock,
  FileCheck,
  Headphones,
  CheckCircle,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useAppStore } from '../store/useAppStore';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';
import AppHeader from '../components/layout/AppHeader';

export const ServiceDetailScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, toggleSavedService } = useAppStore();

  const service = SERVICES_DATA.find((s) => s.slug === slug) || SERVICES_DATA[0];
  const isSaved = user.savedServiceIds.includes(service.id);

  const [isExpanded, setIsExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const days = [
    { day: 'Mon', date: '24 Nov' },
    { day: 'Tue', date: '25 Nov' },
    { day: 'Wed', date: '26 Nov' },
    { day: 'Thu', date: '27 Nov' },
    { day: 'Fri', date: '28 Nov' },
  ];

  const times = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44]">
      {/* 1. Global Brand AppHeader */}
      <AppHeader showBack />

      {/* Top Floating Glass Bar over Hero Image */}
      <div className="relative w-full h-72 bg-[#1F2A44]">
        <ImageWithFallback
          imageKey={service.imageKey}
          aspectRatio="aspect-auto h-full w-full"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44] via-[#1F2A44]/30 to-black/40" />

        {/* Floating Top Controls (Back, Share, Heart) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-10 h-10 rounded-full liquid-glass-chip text-[#1F2A44] flex items-center justify-center shadow-md active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share service"
              className="w-10 h-10 rounded-full liquid-glass-chip text-[#1F2A44] flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={() => toggleSavedService(service.id)}
              aria-label={isSaved ? 'Remove from saved' : 'Save service'}
              className={`w-10 h-10 rounded-full border shadow-md flex items-center justify-center active:scale-95 transition-all ${
                isSaved
                  ? 'bg-[#E5484D] text-white border-[#E5484D]'
                  : 'liquid-glass-chip text-[#1F2A44]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : 'stroke-[2]'}`} />
            </button>
          </div>
        </div>

        {/* Gallery / Image Count Tag */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
          Chicago Zoning &bull; 1/4
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-4 -mt-6 relative z-10 space-y-6 pb-28">
        {/* Title, Category & Location Card */}
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D4D7C] bg-[#3D4D7C]/10 px-2.5 py-1 rounded-full">
                {service.category}
              </span>
              <h1 className="font-heading text-2xl font-bold text-[#1F2A44] mt-2 leading-tight">
                {service.title}
              </h1>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 liquid-glass-chip px-2.5 py-1 rounded-full text-xs font-bold text-[#1F2A44]">
                <span className="text-amber-500">★</span>
                <span>4.9</span>
              </div>
              <span className="text-[10px] text-[#8A93A6] mt-0.5">(28 verified cases)</span>
            </div>
          </div>

          <p className="text-xs text-[#8A93A6] font-medium leading-relaxed">
            {service.shortDescription}
          </p>

          {/* 4-Icon Stats Row (Reference Layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/60">
            <div className="liquid-glass-card rounded-xl p-2.5 flex flex-col items-center text-center">
              <Users className="w-4 h-4 text-[#3D4D7C] mb-1" />
              <span className="text-[10px] text-[#8A93A6]">Target</span>
              <span className="text-[11px] font-semibold text-[#1F2A44] line-clamp-1">
                {service.stats.whoItsFor.split(',')[0]}
              </span>
            </div>

            <div className="liquid-glass-card rounded-xl p-2.5 flex flex-col items-center text-center">
              <Clock className="w-4 h-4 text-[#3D4D7C] mb-1" />
              <span className="text-[10px] text-[#8A93A6]">Timeline</span>
              <span className="text-[11px] font-semibold text-[#1F2A44] line-clamp-1">
                {service.stats.typicalTimeline}
              </span>
            </div>

            <div className="liquid-glass-card rounded-xl p-2.5 flex flex-col items-center text-center">
              <FileCheck className="w-4 h-4 text-[#3D4D7C] mb-1" />
              <span className="text-[10px] text-[#8A93A6]">Documents</span>
              <span className="text-[11px] font-semibold text-[#1F2A44] line-clamp-1">
                Plat / Plans
              </span>
            </div>

            <div className="liquid-glass-card rounded-xl p-2.5 flex flex-col items-center text-center">
              <Headphones className="w-4 h-4 text-[#3D4D7C] mb-1" />
              <span className="text-[10px] text-[#8A93A6]">Support</span>
              <span className="text-[11px] font-semibold text-[#1F2A44] line-clamp-1">
                1-on-1 Lead
              </span>
            </div>
          </div>
        </GlassCard>

        {/* About This Service Section */}
        <GlassCard className="p-5 space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
            About this Service
          </h2>
          <div className="text-xs text-[#1F2A44]/90 leading-relaxed space-y-2">
            <p>{service.fullDescription}</p>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 pt-2 text-[#8A93A6]"
              >
                <p>
                  Williams &amp; Williams LLC conducts an extensive review of municipal databases, prior board decisions, and Cook County recorder filings to identify precedents supporting your application.
                </p>
                <div className="p-3 bg-white/70 rounded-xl border border-[#3D4D7C]/20 text-[#1F2A44]">
                  <span className="font-semibold block mb-1 text-[11px]">Notice of Legal Advice:</span>
                  <p className="text-[10px] text-[#8A93A6] leading-tight">
                    {BUSINESS_INFO.disclaimer}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-[#3D4D7C] hover:underline flex items-center gap-1 pt-1"
          >
            <span>{isExpanded ? 'Read less' : 'Read more'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </GlassCard>

        {/* What's Included */}
        <GlassCard className="p-5 space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
            What’s Included
          </h2>
          <ul className="space-y-2.5">
            {service.whatsIncluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1F2A44]">
                <CheckCircle className="w-4 h-4 text-[#3FA66B] flex-shrink-0 mt-0.5 stroke-[2]" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Schedule a Visit / Book Consultation Widget (From Reference Image) */}
        <GlassCard className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
              Schedule a Consultation
            </h2>
            <Badge variant="primary" size="sm">
              Chicago Time (CST)
            </Badge>
          </div>

          {/* Date Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
              Select Date (Mon–Fri)
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {days.map((d) => {
                const isSelected = selectedDay === d.day;
                return (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDay(d.day)}
                    className={`min-w-[64px] py-2.5 px-2 rounded-xl flex flex-col items-center transition-all select-none ${
                      isSelected
                        ? 'btn-glossy-navy shadow-sm'
                        : 'liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/40'
                    }`}
                  >
                    <span className="text-[11px] font-bold">{d.day}</span>
                    <span className="text-[10px] opacity-80 mt-0.5">{d.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
              Select Time
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {times.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all select-none ${
                      isSelected
                        ? 'btn-glossy-navy shadow-sm'
                        : 'liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/40'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>

        {/* FAQs */}
        <GlassCard className="p-5 space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
            Service FAQ
          </h2>
          <div className="space-y-2">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-white/60 pb-2.5">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-[#1F2A44] py-1 gap-2"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[11px] text-[#8A93A6] pt-1.5 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Sticky Bottom Action Bar (Reference Layout) */}
      <div className="sticky bottom-0 left-0 right-0 z-40 liquid-glass-bar border-t border-white/70 px-4 py-3 shadow-[0_-8px_25px_rgba(31,42,68,0.12)] mt-auto">
        <div className="max-w-[430px] mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A93A6] block">
              Consultation
            </span>
            <span className="font-heading text-base font-bold text-[#1F2A44]">
              {service.priceNote}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <GlassButton
              variant="outline"
              size="md"
              onClick={() => navigate('/quote')}
              className="px-3 text-xs"
            >
              Free Quote
            </GlassButton>

            <GlassButton
              variant="primary"
              size="md"
              onClick={() =>
                navigate(
                  `/book-consultation?service=${encodeURIComponent(
                    service.title
                  )}&day=${selectedDay}&time=${selectedTime}`
                )
              }
              className="flex items-center gap-2 px-4"
            >
              <span>Confirm Booking</span>
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailScreen;
