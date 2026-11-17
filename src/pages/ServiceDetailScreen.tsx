import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Share2,
  Heart,
  Users,
  Clock,
  FileCheck,
  Headphones,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building,
  Check,
  Calendar,
  Sparkles,
  Phone,
  Video,
  MapPin,
  FileText,
  AlertCircle,
  Loader2,
  X,
  Building2,
  Lock,
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem, getServiceGallery } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useAppStore } from '../store/useAppStore';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import PhonePortal from '../components/ui/PhonePortal';
import BackButton from '../components/ui/BackButton';

type PackageType = 'Site Visit' | 'Standard' | 'Full Plan';
type MeetingType = 'Video' | 'Phone' | 'Office' | 'Site visit';

interface PackageDetails {
  type: PackageType;
  title: string;
  price: number;
  coverage: string;
  badge?: string;
}

const PACKAGES: PackageDetails[] = [
  {
    type: 'Site Visit',
    title: 'Site Visit',
    price: 200,
    coverage: 'On-site property inspection & code feasibility walkthrough',
  },
  {
    type: 'Standard',
    title: 'Standard',
    price: 450,
    coverage: 'Comprehensive analysis & architect advisory report',
    badge: 'POPULAR',
  },
  {
    type: 'Full Plan',
    title: 'Full Plan',
    price: 1200,
    coverage: 'End-to-end drawings, filing strategy & direct representation',
  },
];

export const ServiceDetailScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, toggleSavedService, showToast, addBooking, darkMode } = useAppStore();

  const service: ServiceItem =
    SERVICES_DATA.find((s) => s.slug === slug || s.id === slug) || SERVICES_DATA[0];

  const isSaved = (user.savedServiceIds || []).includes(service.id);

  // Service Gallery & Fullscreen Lightbox state
  const gallery = getServiceGallery(service);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    } else if (distance < -minSwipeDistance) {
      setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  // Section 4 state
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Package & Add-ons state
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('Standard');
  const [rendering3D, setRendering3D] = useState(false);
  const [rushService, setRushService] = useState(false);
  const [spanishTranslator, setSpanishTranslator] = useState(false);

  // Schedule state (used on Booking Screen)
  const days = [
    { day: 'Mon', date: '24 Nov' },
    { day: 'Tue', date: '25 Nov' },
    { day: 'Wed', date: '26 Nov' },
    { day: 'Thu', date: '27 Nov' },
    { day: 'Fri', date: '28 Nov' },
  ];
  const timeSlots = [
    { time: '09:30 AM', booked: false },
    { time: '11:00 AM', booked: false },
    { time: '02:00 PM', booked: true }, // Struck through booked slot
    { time: '04:30 PM', booked: false },
  ];
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [meetingType, setMeetingType] = useState<MeetingType>('Video');
  const selectedDate = `${selectedDay}, ${days.find((d) => d.day === selectedDay)?.date || '24 Nov'}`;

  // Booking Form & Project Details state
  const [fullName] = useState(user.name || 'Alex Sterling');
  const [email] = useState(user.email || 'alex.sterling@example.com');
  const [phone] = useState(user.phone || '(312) 555-0198');
  const [propertyAddress, setPropertyAddress] = useState('2144 N. Damen Ave, Chicago, IL 60647');
  const [projectType, setProjectType] = useState(
    service.division === 'construction'
      ? 'Architectural Design & Permit Review'
      : 'ZBA Variance & Setback Evaluation'
  );
  const [description, setDescription] = useState(
    service.division === 'construction'
      ? 'Need initial site inspection, blueprint alignment, and DOB milestone scheduling.'
      : 'Need setback relief evaluation and Title 17 ordinance zoning audit.'
  );

  // Screen flow states
  const [showBookingScreen, setShowBookingScreen] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'ach'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8912');
  const [expiry, setExpiry] = useState('08/29');
  const [cvc, setCvc] = useState('842');
  const [cardName, setCardName] = useState(user.name || 'Alex Sterling');

  // Success screen state
  const [confirmedBookingData, setConfirmedBookingData] = useState<{
    bookingId: string;
    invoiceId: string;
    totalPaid: number;
    packageName: string;
    date: string;
    time: string;
    meetingType: MeetingType;
  } | null>(null);

  // Price Calculation
  const activePkg = PACKAGES.find((p) => p.type === selectedPackage) || PACKAGES[1];
  const packageCost = activePkg.price;
  const renderingCost = rendering3D ? 250 : 0;
  const rushCost = rushService ? 100 : 0;
  const translatorCost = spanishTranslator ? 50 : 0;
  const addOnsTotal = renderingCost + rushCost + translatorCost;
  const totalAmount = packageCost + addOnsTotal;

  // Formats available: Site visit is only for Construction & Design
  const availableFormats: { id: MeetingType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'Video', label: 'Video Call', icon: Video },
    { id: 'Phone', label: 'Phone Call', icon: Phone },
    { id: 'Office', label: 'In-Office', icon: Building2 },
    ...(service.division === 'construction'
      ? [{ id: 'Site visit' as MeetingType, label: 'Site Visit', icon: MapPin }]
      : []),
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${service.title} | Williams & Williams`,
          text: service.shortDescription,
          url: window.location.href,
        });
      } catch {
        // user dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Service link copied to clipboard');
    }
  };

  const handleToggleSave = () => {
    toggleSavedService(service.id);
    showToast(isSaved ? 'Service removed from Saved' : 'Service saved to Saved Items');
  };

  const handleOpenBookingScreen = () => {
    setShowBookingScreen(true);
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyAddress.trim()) {
      showToast('Please provide a property address');
      return;
    }
    setShowPaymentSheet(true);
  };

  const handlePayAndConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    await new Promise((resolve) => setTimeout(resolve, 950));

    setIsProcessingPayment(false);
    setShowPaymentSheet(false);
    setShowBookingScreen(false);

    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const invoiceId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedDateObj = days.find((d) => d.day === selectedDay);
    const dateFormatted = matchedDateObj ? `${selectedDay} ${matchedDateObj.date}, 2026` : selectedDay;

    addBooking({
      serviceId: service.id,
      serviceTitle: service.title,
      serviceCode: service.serviceCode,
      serviceCategory: service.division || 'zoning',
      packageType: selectedPackage,
      amount: totalAmount,
      date: dateFormatted,
      time: selectedTime,
      meetingType,
      propertyAddress,
      projectType,
      description: description || undefined,
      clientName: fullName,
      clientEmail: email,
      clientPhone: phone,
    });

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#323232', '#191919', '#A4B3BE', '#C0D0E1', '#3FA66B'],
      });
    } catch {
      // fallback
    }

    setConfirmedBookingData({
      bookingId,
      invoiceId,
      totalPaid: totalAmount,
      packageName: activePkg.title,
      date: dateFormatted,
      time: selectedTime,
      meetingType,
    });

    showToast('Payment successful. Your booking is confirmed.');
  };

  return (
    <div className="min-h-full flex flex-col text-[#191919] dark:text-[#FEFEFE] relative pb-28">
      {/* ========================================================
          1. TOP PHOTO WITH BACK, SHARE AND SAVE BUTTONS & SWIPE GALLERY
      ======================================================== */}
      <div
        className="relative w-full h-64 sm:h-72 bg-[#191919] flex-shrink-0 overflow-hidden cursor-pointer group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setShowLightbox(true)}
      >
        <ImageWithFallback
          imageKey={gallery[activeImageIndex]?.imageKey || service.imageKey}
          aspectRatio="aspect-auto h-full w-full"
          className="w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/90 via-[#191919]/25 to-black/50" />

        {/* Floating Top Header Controls (Exact 44px tap / 40px round button / 20px icon, 16px from edges, 12px below top) */}
        <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <BackButton variant="photo" ariaLabel="Back to Services" />
          </div>

          <div className="flex items-center gap-2.5 pointer-events-auto">
            <div className="w-11 h-11 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                aria-label="Share service"
                className="w-10 h-10 rounded-full bg-white/95 dark:bg-black/75 backdrop-blur-md border border-white/60 dark:border-white/20 text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-white active:scale-95 transition-all"
              >
                <Share2 className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            <div className="w-11 h-11 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleSave();
                }}
                aria-label={isSaved ? 'Remove from saved' : 'Save service'}
                className={`w-10 h-10 rounded-full border shadow-[0_4px_14px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-all ${
                  isSaved
                    ? 'bg-[#E52E3A] text-white border-[#E52E3A]'
                    : 'bg-white/95 dark:bg-black/75 backdrop-blur-md border-white/60 dark:border-white/20 text-[#191919] dark:text-[#FEFEFE] hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : 'stroke-[2.2]'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Next / Prev Hover Controls */}
        <button
          type="button"
          onClick={handlePrevImage}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/25 flex items-center justify-center active:scale-90 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <button
          type="button"
          onClick={handleNextImage}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/25 flex items-center justify-center active:scale-90 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Bottom Hero Elements: Badge on left, Dots in center, Counter pill on right */}
        <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Chicago Certification Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FEFEFE] text-[10px] font-semibold">
            <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span className="truncate max-w-[150px]">
              {service.division === 'construction'
                ? 'Chicago Architectural & DOB'
                : 'Chicago Title 17 Certified'}
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {gallery.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Image Counter Pill */}
          <div className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider font-mono">
            {activeImageIndex + 1} / {gallery.length}
          </div>
        </div>
      </div>

      {/* Main Content Sections (16px side padding, 16-20px vertical space) */}
      <div className="px-4 -mt-5 relative z-10 space-y-5">
        {/* ========================================================
            2. TITLE BLOCK: CATEGORY TAG, SERVICE NAME, SERVICE CODE, RATING
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#323232] dark:text-[#C7D3DC] bg-[#C0D0E1]/30 dark:bg-white/10 border border-[#A4B3BE]/40 dark:border-white/20 px-2.5 py-0.5 rounded-full">
                {service.category}
              </span>
              <span className="text-[11px] font-bold text-[#8C9DAA] tracking-wider">
                {service.serviceCode}
              </span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-400">
              <span className="text-amber-500">★</span>
              <span>4.9 · 28 verified cases</span>
            </div>
          </div>

          <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#191919] dark:text-[#FEFEFE] leading-tight">
            {service.title}
          </h1>

          <p className="text-xs text-[#82807A] dark:text-[#A0B0BC] leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* ========================================================
            2.1 SERVICE GALLERY THUMBNAIL STRIP (Like Architectural Angles)
        ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold px-0.5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919] dark:text-[#FEFEFE]">
              Service Gallery
            </h3>
            <span className="text-[10px] text-[#82807A] dark:text-[#A0B0BC]">
              Tap to switch image
            </span>
          </div>

          <div className={`grid gap-2 ${gallery.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
            {gallery.map((item, idx) => {
              const isSelected = activeImageIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-[14px] overflow-hidden aspect-[80/64] border-2 transition-all active:scale-95 group shadow-2xs ${
                    isSelected
                      ? 'border-[#191919] dark:border-white ring-2 ring-[#191919]/40 dark:ring-white/40 shadow-sm scale-[1.02]'
                      : 'border-[#D8D8D8] dark:border-white/10 hover:border-[#191919]/40'
                  }`}
                >
                  <ImageWithFallback
                    imageKey={item.imageKey}
                    aspectRatio="aspect-auto h-full w-full"
                    className="w-full h-full object-cover brightness-[0.98]"
                  />
                  <div className="absolute inset-x-0 bottom-0 pt-2 pb-0.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-center">
                    <span className="text-[8px] sm:text-[9px] font-bold text-white px-0.5 truncate text-center">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2.2 ASK AI ABOUT THIS SERVICE BUTTON */}
        <button
          type="button"
          onClick={() =>
            navigate(
              `/ai-assistant?service=${encodeURIComponent(service.slug)}&serviceName=${encodeURIComponent(
                service.title
              )}`
            )
          }
          className="w-full py-2.5 px-3.5 rounded-full bg-white dark:bg-white/10 border border-[#D8D8D8] dark:border-white/15 flex items-center justify-between text-xs font-semibold text-[#191919] dark:text-white shadow-2xs hover:border-[#191919] active:scale-[0.99] transition-all group"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span>Ask AI about this service</span>
          </span>
          <span className="text-[11px] text-[#82807A] dark:text-[#A0B0BC] flex items-center gap-1 group-hover:text-[#191919] dark:group-hover:text-white transition-colors">
            <span>Instant guidance</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* ========================================================
            3. FOUR QUICK INFO BOXES (Real values, never placeholders)
        ======================================================== */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[#82807A] dark:text-[#A0B0BC]">
              <Users className="w-3.5 h-3.5 text-[#191919] dark:text-[#FEFEFE]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Who it is for</span>
            </div>
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] truncate">
              {service.stats.whoItsFor.split(',')[0]}
            </span>
          </div>

          <div className="p-3 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[#82807A] dark:text-[#A0B0BC]">
              <Clock className="w-3.5 h-3.5 text-[#191919] dark:text-[#FEFEFE]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Timeline</span>
            </div>
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">
              {service.stats.typicalTimeline || '3 to 5 days'}
            </span>
          </div>

          <div className="p-3 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[#82807A] dark:text-[#A0B0BC]">
              <FileCheck className="w-3.5 h-3.5 text-[#191919] dark:text-[#FEFEFE]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Bring (documents)</span>
            </div>
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] truncate">
              {service.stats.documentsNeeded.split(',')[0]}
            </span>
          </div>

          <div className="p-3 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[#82807A] dark:text-[#A0B0BC]">
              <Headphones className="w-3.5 h-3.5 text-[#191919] dark:text-[#FEFEFE]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Support</span>
            </div>
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] truncate">
              {service.stats.supportLevel.split(',')[0]}
            </span>
          </div>
        </div>

        {/* ========================================================
            4. ABOUT THIS SERVICE (3 to 4 lines with "Read more")
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-3">
          <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
            About this service
          </h2>

          <div className="text-xs text-[#191919]/90 dark:text-[#FEFEFE]/90 leading-relaxed space-y-2">
            <p>{service.fullDescription}</p>

            {isAboutExpanded && (
              <div className="pt-2 space-y-2 text-[#82807A] dark:text-[#A0B0BC] animate-in fade-in duration-200">
                <p>
                  Williams &amp; Williams Solutions coordinates directly with municipal examiners, licensed engineers, and local Chicago aldermen to verify feasibility before capital commitment.
                </p>
                <div className="p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 text-[11px] text-[#191919] dark:text-[#FEFEFE]">
                  <span className="font-bold block mb-0.5">Municipal Notice:</span>
                  <p className="text-[10.5px] text-[#82807A] dark:text-[#A0B0BC] leading-snug">
                    {BUSINESS_INFO.disclaimer}
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="text-xs font-bold text-[#191919] dark:text-[#C7D3DC] hover:underline flex items-center gap-1 pt-1"
          >
            <span>{isAboutExpanded ? 'Read less' : 'Read more'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isAboutExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* ========================================================
            5. WHAT'S INCLUDED: A list with green ticks
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-3">
          <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
            What’s included
          </h2>

          <ul className="space-y-2.5">
            {service.whatsIncluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#191919] dark:text-[#FEFEFE]">
                <CheckCircle2 className="w-4 h-4 text-[#3FA66B] flex-shrink-0 mt-0.5 stroke-[2.2]" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ========================================================
            6. PRICING SECTION: 3 Package Cards, Add-ons, Fee Breakdown
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
                Select Package
              </h2>
              <span className="text-[11px] text-[#8C9DAA]">
                Tailored consultation &amp; advisory packages
              </span>
            </div>
            <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Verified Advisory
            </span>
          </div>

          {/* Three Package Cards: Site Visit $200, Standard $450 (POPULAR), Full Plan $1,200 */}
          <div className="space-y-2.5">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.type;
              return (
                <div
                  key={pkg.type}
                  onClick={() => setSelectedPackage(pkg.type)}
                  className={`p-3.5 rounded-[18px] transition-all cursor-pointer relative select-none ${
                    isSelected
                      ? 'bg-[#191919] text-white border-2 border-[#191919] shadow-md'
                      : 'bg-white/80 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 hover:border-[#8C9DAA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-heading text-sm font-bold ${isSelected ? 'text-white' : 'text-[#191919] dark:text-[#FEFEFE]'}`}>
                        {pkg.title}
                      </h3>
                      {pkg.badge && (
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white text-[#191919]' : 'bg-[#191919] text-white'
                        }`}>
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-base font-bold ${isSelected ? 'text-white' : 'text-[#191919] dark:text-[#FEFEFE]'}`}>
                        ${pkg.price.toLocaleString()}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-white text-[#191919] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 1 line of what it covers */}
                  <p className={`text-[11px] mt-1.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#82807A] dark:text-[#A0B0BC]'}`}>
                    {pkg.coverage}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Optional Add-ons with Checkboxes */}
          <div className="pt-2 border-t border-[#D8D8D8] dark:border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] block">
              Optional Add-ons
            </span>

            {/* 3D rendering +$250 */}
            <label className="flex items-center justify-between p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 cursor-pointer hover:bg-white transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rendering3D}
                  onChange={(e) => setRendering3D(e.target.checked)}
                  className="w-4 h-4 rounded text-[#191919] accent-[#191919] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] block">
                    3D rendering (+$250)
                  </span>
                  <span className="text-[10px] text-[#8C9DAA]">
                    Photorealistic spatial massing and exterior rendering
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">+$250</span>
            </label>

            {/* Rush (48 hrs) +$100 */}
            <label className="flex items-center justify-between p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 cursor-pointer hover:bg-white transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rushService}
                  onChange={(e) => setRushService(e.target.checked)}
                  className="w-4 h-4 rounded text-[#191919] accent-[#191919] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] block">
                    Rush (48 hrs) (+$100)
                  </span>
                  <span className="text-[10px] text-[#8C9DAA]">
                    Expedited turnaround for urgent filing deadlines
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">+$100</span>
            </label>

            {/* Spanish translator +$50 */}
            <label className="flex items-center justify-between p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 cursor-pointer hover:bg-white transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={spanishTranslator}
                  onChange={(e) => setSpanishTranslator(e.target.checked)}
                  className="w-4 h-4 rounded text-[#191919] accent-[#191919] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] block">
                    Spanish translator (+$50)
                  </span>
                  <span className="text-[10px] text-[#8C9DAA]">
                    Sesión bilingüe en español para propietarios y contratistas
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">+$50</span>
            </label>
          </div>

          {/* Fee Breakdown (Live update) */}
          <div className="p-3.5 rounded-[16px] bg-[#F4F6F8] dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[#82807A] dark:text-[#A0B0BC]">
              <span>Package fee ({activePkg.title})</span>
              <span>${packageCost.toFixed(2)}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="flex items-center justify-between text-[#82807A] dark:text-[#A0B0BC]">
                <span>Selected add-ons</span>
                <span>+${addOnsTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[#82807A] dark:text-[#A0B0BC]">
              <span>City / Admin processing fee</span>
              <span>$0.00</span>
            </div>
            <div className="pt-2 border-t border-[#D8D8D8] dark:border-white/10 flex items-center justify-between font-bold text-sm text-[#191919] dark:text-[#FEFEFE]">
              <span>Total due</span>
              <span className="text-base">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* IOLA Escrow Protection & Confidentiality Card */}
          <div className="p-3 rounded-2xl bg-white/90 dark:bg-white/5 border border-emerald-500/20 shadow-2xs flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div>
              <h5 className="font-heading text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">
                IOLA Escrow Protection &amp; Confidentiality
              </h5>
              <p className="text-[11px] text-[#82807A] dark:text-[#A0B0BC] mt-0.5 leading-snug">
                Protected under Illinois Rules of Professional Conduct &amp; Attorney-Client privilege.
              </p>
            </div>
          </div>

          {/* Note: City permit fees */}
          <div className="p-2.5 rounded-[12px] bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>City permit fees are paid separately to the City of Chicago.</span>
          </div>

          {/* Request Free Quote Alternative */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/quote?service=${encodeURIComponent(service.slug)}&item=${encodeURIComponent(
                    service.title
                  )}&code=${encodeURIComponent(service.code)}&tags=${encodeURIComponent(
                    service.category
                  )}`
                )
              }
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191919] dark:text-white underline hover:opacity-85 active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Prefer a preliminary estimate? Request Free Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          STICKY BOTTOM CONFIRM DOCK (Per design spec)
      ======================================================== */}
      <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 px-4 pt-3 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] mt-auto flex-shrink-0">
        <div className="max-w-md mx-auto space-y-2">
          {/* Main Black Pill Button */}
          <button
            type="button"
            onClick={handleOpenBookingScreen}
            className="w-full h-12 px-4 rounded-[16px] bg-[#000000] text-white flex items-center justify-between shadow-md active:scale-98 transition-all hover:bg-[#191919]"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#34D399] stroke-[2.4]" />
              <span className="font-heading font-bold text-[13.5px] tracking-tight">
                Proceed to Escrow
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-sm">
              <span>{totalAmount === 0 ? 'Free' : `$${totalAmount.toFixed(2)}`}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>

          {/* Sub-row: Date/Time + Free Rescheduling */}
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-medium px-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] stroke-[2.5] flex-shrink-0" />
              <span className="truncate">
                {selectedDate} &bull; {selectedTime} CST
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#9CA3AF] stroke-[2] flex-shrink-0" />
              <span>Free rescheduling</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. BOOKING SCREEN (Full-screen sub-view inside PhonePortal)
      ======================================================== */}
      {showBookingScreen && (
        <PhonePortal>
          <div className="absolute inset-0 z-40 bg-[#FAFBFC] dark:bg-[#18181A] text-[#191919] dark:text-[#FEFEFE] flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Booking Header */}
            <div className="flex-shrink-0 px-4 py-3.5 border-b border-[#D8D8D8] dark:border-white/10 flex items-center justify-between bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <BackButton onClick={() => setShowBookingScreen(false)} ariaLabel="Back" />
                <div>
                  <h2 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                    Book a Service
                  </h2>
                  <span className="text-[10px] text-[#8C9DAA] font-medium block">
                    {service.serviceCode} &bull; {service.division === 'construction' ? 'Construction & Design' : 'Zoning Consultation'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBookingScreen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center active:scale-95"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Booking Form Body */}
            <form onSubmit={handleContinueToPayment} className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div className="p-4 space-y-4 text-xs">
                {/* Summary Card with Service Name, Code, Package, Add-ons */}
                <div className="p-3.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] dark:text-[#A0B0BC]">
                      Selected Service &amp; Tier
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#323232] dark:text-[#C7D3DC] bg-[#C0D0E1]/30 dark:bg-white/10 px-2 py-0.5 rounded-md">
                      {service.serviceCode}
                    </span>
                  </div>

                  <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                    {service.title}
                  </h3>

                  <div className="pt-2 border-t border-[#D8D8D8]/60 dark:border-white/10 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#82807A] dark:text-[#A0B0BC]">Package:</span>
                      <span className="font-semibold text-[#191919] dark:text-[#FEFEFE]">
                        {activePkg.title} (${packageCost})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#82807A] dark:text-[#A0B0BC]">Add-ons:</span>
                      <span className="font-semibold text-[#191919] dark:text-[#FEFEFE]">
                        {addOnsTotal > 0
                          ? [
                              rendering3D && '3D rendering (+$250)',
                              rushService && 'Rush (+$100)',
                              spanishTranslator && 'Translator (+$50)',
                            ]
                              .filter(Boolean)
                              .join(', ')
                          : 'None'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#D8D8D8]/40 dark:border-white/10 font-bold">
                      <span className="text-[#191919] dark:text-[#FEFEFE]">Total Estimate:</span>
                      <span className="text-sm font-heading font-extrabold text-[#191919] dark:text-[#FEFEFE]">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1. Consultation Format */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] block">
                    1. Consultation Format
                  </label>
                  <div className={`grid ${availableFormats.length === 4 ? 'grid-cols-2 gap-2' : 'grid-cols-3 gap-2'}`}>
                    {availableFormats.map(({ id, label, icon: Icon }) => {
                      const isSelected = meetingType === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setMeetingType(id)}
                          className={`p-2.5 rounded-[14px] text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-2xs'
                              : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {service.division === 'construction' && (
                    <span className="text-[10px] text-[#8C9DAA] block">
                      &bull; Site visits include on-site laser measurements across Cook County.
                    </span>
                  )}
                </div>

                {/* 2. Date: Monday to Friday Chips */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] block">
                    2. Date (Monday–Friday)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {days.map((d) => {
                      const isSelected = selectedDay === d.day;
                      return (
                        <button
                          key={d.day}
                          type="button"
                          onClick={() => setSelectedDay(d.day)}
                          className={`py-2 rounded-[12px] flex flex-col items-center justify-center border transition-all ${
                            isSelected
                              ? 'btn-glossy-primary text-[#FEFEFE] border-[#191919] shadow-2xs'
                              : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase">{d.day}</span>
                          <span className="text-[10px] font-medium opacity-80 mt-0.5">{d.date.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Time Slots (Chicago CST, booked slot struck through) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0]">
                      3. Time (Chicago CST)
                    </label>
                    <span className="text-[10px] text-[#8C9DAA] font-medium">
                      Central Standard Time
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time && !slot.booked;
                      if (slot.booked) {
                        return (
                          <div
                            key={slot.time}
                            className="p-2.5 rounded-[12px] border border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-white/5 text-slate-400 dark:text-white/30 flex items-center justify-center gap-1.5 cursor-not-allowed select-none"
                            title="Slot already booked"
                          >
                            <span className="line-through text-xs font-medium">{slot.time}</span>
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-white/10 px-1.5 py-0.2 rounded">
                              Booked
                            </span>
                          </div>
                        );
                      }
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-2.5 rounded-[12px] text-xs font-bold transition-all border flex items-center justify-center ${
                            isSelected
                              ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-2xs'
                              : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] hover:bg-slate-50'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Your Project: Property Address, Project Type, Short Description */}
                <div className="space-y-3 pt-1">
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] block">
                    4. Your Project Details
                  </label>

                  <div>
                    <label className="text-[10.5px] font-medium text-[#82807A] dark:text-[#A0B0BC] mb-1 block">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      placeholder="e.g. 2144 N. Damen Ave, Chicago, IL"
                      className="w-full h-10 rounded-[12px] px-3 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-medium text-[#82807A] dark:text-[#A0B0BC] mb-1 block">
                      Project Type
                    </label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="e.g. Architectural Renovation, ZBA Variance"
                      className="w-full h-10 rounded-[12px] px-3 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-medium text-[#82807A] dark:text-[#A0B0BC] mb-1 block">
                      Short Description / Scope
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe parcel PIN, expansion goals, or design needs..."
                      className="w-full rounded-[12px] p-2.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Bar on Booking Screen: Proceed to Escrow */}
              <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 px-4 pt-3 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] mt-auto flex-shrink-0">
                <div className="max-w-md mx-auto space-y-2">
                  <button
                    type="submit"
                    className="w-full h-12 px-4 rounded-[16px] bg-[#000000] text-white flex items-center justify-between shadow-md active:scale-98 transition-all hover:bg-[#191919]"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#34D399] stroke-[2.4]" />
                      <span className="font-heading font-bold text-[13.5px] tracking-tight">
                        Confirm &amp; Proceed to Escrow
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <span>{totalAmount === 0 ? 'Free' : `$${totalAmount.toFixed(2)}`}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-medium px-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] stroke-[2.5] flex-shrink-0" />
                      <span className="truncate">
                        {selectedDate} &bull; {selectedTime} CST
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF] stroke-[2] flex-shrink-0" />
                      <span>Free rescheduling</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </PhonePortal>
      )}

      {/* ========================================================
          PAYMENT SHEET (Inside PhonePortal)
      ======================================================== */}
      {showPaymentSheet && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 bg-[#FAFBFC] dark:bg-[#18181A] text-[#191919] dark:text-[#FEFEFE] flex flex-col overflow-hidden animate-in fade-in duration-200">
            {/* Payment Header */}
            <div className="flex-shrink-0 px-4 py-3.5 border-b border-[#D8D8D8] dark:border-white/10 flex items-center justify-between bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <BackButton onClick={() => setShowPaymentSheet(false)} ariaLabel="Back" />
                <h2 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                  Payment &amp; Checkout
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowPaymentSheet(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center active:scale-95"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Payment Body */}
            <form onSubmit={handlePayAndConfirm} className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div className="p-4 space-y-4 text-xs">
                {/* Mandatory Demo Note */}
                <div className="p-3 rounded-[14px] bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 flex items-center gap-2 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Demo only. No real payment is taken.</span>
                </div>

                {/* Order Total Card */}
                <div className="p-3.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] dark:text-[#A0B0BC]">
                      Order Summary
                    </span>
                    <span className="text-xs font-bold text-[#8C9DAA]">{service.serviceCode}</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                    {service.title} ({activePkg.title})
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-[#D8D8D8]/60 dark:border-white/10">
                    <span className="text-xs text-[#82807A] dark:text-[#A0B0BC]">
                      Scheduled: {selectedDay} {days.find((d) => d.day === selectedDay)?.date} at {selectedTime} ({meetingType})
                    </span>
                    <span className="text-base font-heading font-bold text-[#191919] dark:text-[#FEFEFE]">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-2 block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card' as const, label: 'Credit/Debit', icon: CreditCard },
                      { id: 'apple' as const, label: 'Apple Pay', icon: Sparkles },
                      { id: 'ach' as const, label: 'Bank transfer', icon: Building },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`h-11 rounded-[14px] text-xs font-bold transition-all border flex flex-col items-center justify-center gap-0.5 ${
                          paymentMethod === id
                            ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-2xs'
                            : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px]">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-11 rounded-[12px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                        Expiry
                      </label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full h-11 rounded-[12px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                        CVC
                      </label>
                      <input
                        type="text"
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full h-11 rounded-[12px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full h-11 rounded-[12px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                    />
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Action: Pay & confirm */}
              <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 px-4 pt-3 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] mt-auto flex-shrink-0">
                <div className="max-w-md mx-auto space-y-2">
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full h-12 px-4 rounded-[16px] bg-[#000000] text-white flex items-center justify-between shadow-md active:scale-98 transition-all disabled:opacity-50 hover:bg-[#191919]"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#34D399] stroke-[2.4]" />
                      <span className="font-heading font-bold text-[13.5px] tracking-tight">
                        {isProcessingPayment ? 'Processing Escrow Deposit...' : 'Pay & Deposit to Escrow'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      {isProcessingPayment ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>${totalAmount.toFixed(2)}</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-medium px-1">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] stroke-[2.5] flex-shrink-0" />
                      <span>IOLA Escrow Protected</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF] stroke-[2] flex-shrink-0" />
                      <span>Free rescheduling</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </PhonePortal>
      )}

      {/* ========================================================
          SUCCESS SCREEN (Inside PhonePortal)
      ======================================================== */}
      {confirmedBookingData && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 bg-[#FAFBFC] dark:bg-[#18181A] text-[#191919] dark:text-[#FEFEFE] flex flex-col justify-between p-5 overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-200">
            {/* Top Close */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setConfirmedBookingData(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center active:scale-95"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Central Success Badge & Confirmation Text */}
            <div className="text-center space-y-3.5 my-auto py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h2 className="font-heading text-lg font-bold text-[#191919] dark:text-[#FEFEFE]">
                  Payment successful. Your booking is confirmed.
                </h2>
                <p className="text-xs text-[#82807A] dark:text-[#A0B0BC]">
                  Your consultation docket has been queued with Williams &amp; Williams Solutions.
                </p>
              </div>

              {/* Booking Info Card */}
              <div className="p-3.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 text-left space-y-2 max-w-sm mx-auto shadow-2xs text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#D8D8D8]/60 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] dark:text-[#A0B0BC]">
                    Booking ID
                  </span>
                  <span className="font-mono font-bold text-[#191919] dark:text-[#FEFEFE]">
                    {confirmedBookingData.bookingId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#82807A] dark:text-[#A0B0BC]">Service:</span>
                  <span className="font-semibold text-right text-[#191919] dark:text-[#FEFEFE]">
                    {service.title}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#82807A] dark:text-[#A0B0BC]">Package:</span>
                  <span className="font-semibold text-[#191919] dark:text-[#FEFEFE]">
                    {confirmedBookingData.packageName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#82807A] dark:text-[#A0B0BC]">Date &amp; Time:</span>
                  <span className="font-semibold text-[#191919] dark:text-[#FEFEFE]">
                    {confirmedBookingData.date} at {confirmedBookingData.time} ({confirmedBookingData.meetingType})
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-[#D8D8D8]/60 dark:border-white/10">
                  <span className="font-bold text-[#191919] dark:text-[#FEFEFE]">Amount Paid:</span>
                  <span className="font-heading font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    ${confirmedBookingData.totalPaid.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Action Buttons: "View booking" and "Add to calendar" */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmedBookingData(null);
                  const targetCategory = service.division === 'construction' ? 'construction' : 'zoning';
                  navigate(`/profile?tab=bookings&category=${targetCategory}`);
                }}
                className="h-[42px] w-full rounded-full btn-glossy-primary font-heading font-semibold text-xs text-[#FEFEFE] flex items-center justify-center gap-2 shadow-2xs active:scale-98 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>View booking</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast('Consultation added to Chicago calendar.');
                }}
                className="h-[42px] w-full rounded-full bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/10 font-heading font-semibold text-xs text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-98 transition-all"
              >
                <span>Add to calendar</span>
              </button>
            </div>
          </div>
        </PhonePortal>
      )}

      {/* ========================================================
          FULL-SCREEN IMAGE VIEWER (PHOTOS ONLY, NO VIDEO)
      ======================================================== */}
      {showLightbox && (
        <PhonePortal>
          <div
            className="absolute inset-0 z-50 bg-[#0B0B0C]/98 text-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Close (X) button at top left, Counter at top center, Zoom at top right */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setShowLightbox(false);
                  setIsZoomed(false);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="text-center">
                <span className="font-mono text-xs font-bold text-white/90 tracking-wider">
                  {activeImageIndex + 1} / {gallery.length}
                </span>
                <span className="text-[10px] text-[#A0B0BC] block">
                  {gallery[activeImageIndex]?.label}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
            </div>

            {/* Main Image Area with Pinch/Double-Click Zoom & Swipe */}
            <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
              <div
                className={`transition-transform duration-300 max-w-full max-h-full flex items-center justify-center ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ImageWithFallback
                  imageKey={gallery[activeImageIndex]?.imageKey || service.imageKey}
                  aspectRatio="aspect-auto max-h-[65vh] w-auto max-w-full"
                  className="rounded-2xl object-contain shadow-2xl"
                />
              </div>

              {/* Prev / Next Chevrons */}
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white border border-white/20 flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white border border-white/20 flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* Bottom Caption and Thumbnail Mini-Strip */}
            <div className="flex-shrink-0 p-3 bg-black/60 backdrop-blur-md border-t border-white/10 space-y-2">
              <div className="text-center">
                <span className="text-xs font-bold text-white block">
                  {gallery[activeImageIndex]?.label} &bull; {service.title}
                </span>
                <span className="text-[10px] text-white/60">
                  Swipe left or right &bull; Tap photo to zoom
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
                {gallery.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-white ring-2 ring-white/50 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      imageKey={item.imageKey}
                      aspectRatio="aspect-auto h-full w-full"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PhonePortal>
      )}
    </div>
  );
};

export default ServiceDetailScreen;
