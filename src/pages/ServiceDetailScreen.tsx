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
  Upload,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useAppStore } from '../store/useAppStore';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import PhonePortal from '../components/ui/PhonePortal';

type PackageType = 'Basic' | 'Standard' | 'Full analysis';
type MeetingType = 'In person' | 'Phone' | 'Video';

interface PackageDetails {
  type: PackageType;
  title: string;
  price: number;
  timeline: string;
  features: string[];
}

const PACKAGES: PackageDetails[] = [
  {
    type: 'Basic',
    title: 'Basic Review',
    price: 150,
    timeline: '24–48 hours',
    features: [
      'Preliminary zoning classification check',
      'Allowable FAR & height limits summary',
      'Non-conforming use verification',
      'Summary PDF review memo',
    ],
  },
  {
    type: 'Standard',
    title: 'Standard Strategy',
    price: 450,
    timeline: '3–5 days',
    features: [
      'Comprehensive district code analysis',
      'Setback & lot coverage calculations',
      'Parking & loading requirement audit',
      '45-minute attorney strategy session',
    ],
  },
  {
    type: 'Full analysis',
    title: 'Full Ordinance Analysis',
    price: 900,
    timeline: '5–7 days',
    features: [
      'Complete municipal code ordinance dossier',
      'ZBA variance / special use feasibility study',
      'Aldermanic & neighbor protocol guidelines',
      'Prior board decision precedents review',
    ],
  },
];

export const ServiceDetailScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, toggleSavedService, showToast, addBooking, darkMode } = useAppStore();

  const service: ServiceItem =
    SERVICES_DATA.find((s) => s.slug === slug || s.id === slug) || SERVICES_DATA[0];

  const isSaved = (user.savedServiceIds || []).includes(service.id);

  // Section 4 state
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Section 6: Package & Add-ons state
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('Standard');
  const [rushService, setRushService] = useState(false);
  const [extraSiteVisit, setExtraSiteVisit] = useState(false);
  const [spanishTranslator, setSpanishTranslator] = useState(false);

  // Section 7: Schedule state
  const days = [
    { day: 'Mon', date: '24 Nov' },
    { day: 'Tue', date: '25 Nov' },
    { day: 'Wed', date: '26 Nov' },
    { day: 'Thu', date: '27 Nov' },
    { day: 'Fri', date: '28 Nov' },
  ];
  const times = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'];
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [meetingType, setMeetingType] = useState<MeetingType>('Video');

  // Section 8: Booking Form state
  const [fullName, setFullName] = useState(user.name || 'Alex Sterling');
  const [email, setEmail] = useState(user.email || 'alex.sterling@example.com');
  const [phone, setPhone] = useState(user.phone || '(312) 555-0198');
  const [propertyAddress, setPropertyAddress] = useState('2144 N. Damen Ave, Chicago, IL 60647');
  const [pin, setPin] = useState('14-31-100-022-0000');
  const [zoningDistrict, setZoningDistrict] = useState('B3-2 Community Shopping District');
  const [projectType, setProjectType] = useState('Rear Yard Setback Variance');
  const [description, setDescription] = useState(
    'Need setback relief and FAR evaluation for second-story rear addition.'
  );
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(
    'Plat_Of_Survey_Damen_Ave.pdf'
  );
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Modal / Flow state
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
  const isFreeService = service.priceNote.toLowerCase().includes('complimentary') && false; // Showcase real packages
  const packageCost = isFreeService ? 0 : activePkg.price;
  const rushCost = rushService ? 100 : 0;
  const visitCost = extraSiteVisit ? 200 : 0;
  const translatorCost = spanishTranslator ? 50 : 0;
  const addOnsTotal = rushCost + visitCost + translatorCost;
  const totalAmount = packageCost + addOnsTotal;

  // Actions
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: service.title,
          text: service.shortDescription,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Service link copied to clipboard');
    }
  };

  const handleToggleSave = () => {
    toggleSavedService(service.id);
    showToast(isSaved ? 'Service removed from saved items' : 'Service saved to your profile');
  };

  const handleConfirmBookingClick = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!agreedToTerms) {
      setFormError('Please agree to the Terms and Privacy Policy to continue.');
      showToast('Please accept the Terms to continue');
      return;
    }
    if (!propertyAddress.trim()) {
      setFormError('Please provide the property address.');
      showToast('Property address is required');
      return;
    }

    if (totalAmount === 0) {
      // Free service: skip payment immediately
      executeBookingConfirmation(0);
    } else {
      setShowPaymentSheet(true);
    }
  };

  const handlePayAndConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentSheet(false);
      executeBookingConfirmation(totalAmount);
    }, 850);
  };

  const executeBookingConfirmation = (amount: number) => {
    const selectedDateObj = days.find((d) => d.day === selectedDay);
    const dateFormatted = `${selectedDay} ${selectedDateObj?.date || '24 Nov 2026'}`;

    const { bookingId, invoiceId } = addBooking({
      serviceTitle: service.title,
      packageType: selectedPackage,
      amount,
      date: dateFormatted,
      time: selectedTime,
      meetingType,
      propertyAddress,
      pin: pin || undefined,
      zoningDistrict: zoningDistrict || undefined,
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
      totalPaid: amount,
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
          1. TOP IMAGE WITH BACK, SHARE AND SAVE BUTTONS
      ======================================================== */}
      <div className="relative w-full h-64 sm:h-72 bg-[#191919] flex-shrink-0 overflow-hidden">
        <ImageWithFallback
          imageKey={service.imageKey}
          aspectRatio="aspect-auto h-full w-full"
          className="w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/90 via-[#191919]/30 to-black/50" />

        {/* Floating Top Header Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back to Services"
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/60 dark:border-white/20 text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center shadow-md active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share service"
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/60 dark:border-white/20 text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4 stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={handleToggleSave}
              aria-label={isSaved ? 'Remove from saved' : 'Save service'}
              className={`w-10 h-10 rounded-full border shadow-md flex items-center justify-center active:scale-95 transition-all ${
                isSaved
                  ? 'bg-[#E52E3A] text-white border-[#E52E3A]'
                  : 'bg-white/90 dark:bg-black/70 backdrop-blur-md border-white/60 dark:border-white/20 text-[#191919] dark:text-[#FEFEFE]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : 'stroke-[2.2]'}`} />
            </button>
          </div>
        </div>

        {/* Chicago Ordinance Badge */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FEFEFE] text-[11px] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Chicago Title 17 Certified</span>
        </div>
      </div>

      {/* Main Content Sections (16px side padding, 16-20px vertical space) */}
      <div className="px-4 -mt-5 relative z-10 space-y-5">
        {/* ========================================================
            2. TITLE BLOCK: SERVICE NAME, CODE, CATEGORY, RATING
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#323232] dark:text-[#C7D3DC] bg-[#C0D0E1]/30 dark:bg-white/10 border border-[#A4B3BE]/40 dark:border-white/20 px-2.5 py-0.5 rounded-full">
                {service.category}
              </span>
              <span className="text-[11px] font-bold text-[#8C9DAA] tracking-wider">
                {service.serviceCode || 'WW-SRV-01'}
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
            3. FOUR QUICK INFO BOXES (Real values, no placeholders)
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
              {service.stats.typicalTimeline || '5 to 7 days'}
            </span>
          </div>

          <div className="p-3 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[#82807A] dark:text-[#A0B0BC]">
              <FileCheck className="w-3.5 h-3.5 text-[#191919] dark:text-[#FEFEFE]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Documents needed</span>
            </div>
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] truncate">
              {service.stats.documentsNeeded.split(',')[0]} &amp; Plat
            </span>
          </div>

          <div className="p-3 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 flex flex-col justify-between space-y-1">
            <div className="flex items-center gap-1.5 text-[#82807A] dark:text-[#A0B0BC]">
              <Headphones className="w-3.5 h-3.5 text-[#191919] dark:text-[#FEFEFE]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Support type</span>
            </div>
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] truncate">
              {service.stats.supportLevel.split(',')[0]}
            </span>
          </div>
        </div>

        {/* ========================================================
            4. ABOUT THIS SERVICE: 3 to 4 lines with "Read more"
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
                  Williams &amp; Williams Zoning Solutions conducts an exhaustive review of municipal databases, prior board decisions, and Cook County recorder filings to identify precedents supporting your development.
                </p>
                <div className="p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 text-[11px] text-[#191919] dark:text-[#FEFEFE]">
                  <span className="font-bold block mb-0.5">Municipal Disclaimer:</span>
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
            6. PRICING SECTION: 3 Cards, Add-ons, Fee Breakdown, Note
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
                Select Package
              </h2>
              <span className="text-[11px] text-[#8C9DAA]">
                Tiered flat-fee legal &amp; zoning analysis
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Money-back guarantee
            </span>
          </div>

          {/* Three Package Cards */}
          <div className="space-y-3">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.type;
              return (
                <div
                  key={pkg.type}
                  onClick={() => setSelectedPackage(pkg.type)}
                  className={`p-4 rounded-[18px] transition-all cursor-pointer relative select-none ${
                    isSelected
                      ? 'border-2 border-[#191919] dark:border-white bg-white dark:bg-[#202023] shadow-md ring-2 ring-[#191919]/10'
                      : 'border border-[#D8D8D8] dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-[#8C9DAA]'
                  }`}
                >
                  {/* Selected check circle tick badge */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#191919] dark:bg-white text-white dark:text-[#191919] flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <div className="flex items-baseline justify-between pr-8">
                    <div>
                      <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                        {pkg.title}
                      </h3>
                      <span className="text-[11px] text-[#8C9DAA] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>Turnaround: {pkg.timeline}</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-bold text-[#191919] dark:text-[#FEFEFE]">
                        ${pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* 3 to 4 covered deliverables */}
                  <div className="mt-3 pt-3 border-t border-[#D8D8D8]/60 dark:border-white/10 space-y-1.5">
                    {pkg.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-[11px] text-[#555] dark:text-[#CCC]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white flex-shrink-0" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Add-ons */}
          <div className="pt-2 border-t border-[#D8D8D8] dark:border-white/10 space-y-2.5">
            <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE] block">
              Optional Add-ons
            </span>

            <label className="flex items-center justify-between p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 cursor-pointer hover:bg-white">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rushService}
                  onChange={(e) => setRushService(e.target.checked)}
                  className="w-4 h-4 rounded text-[#191919] accent-[#191919] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] block">
                    Rush service (+$100)
                  </span>
                  <span className="text-[10px] text-[#8C9DAA]">
                    24-hour priority expedited report turnaround
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">+$100</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 cursor-pointer hover:bg-white">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={extraSiteVisit}
                  onChange={(e) => setExtraSiteVisit(e.target.checked)}
                  className="w-4 h-4 rounded text-[#191919] accent-[#191919] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] block">
                    Extra site visit (+$200)
                  </span>
                  <span className="text-[10px] text-[#8C9DAA]">
                    On-site physical inspection &amp; parcel laser measurements
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">+$200</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-[14px] bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 cursor-pointer hover:bg-white">
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
                    Bilingual certified consultation translation &amp; briefing
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">+$50</span>
            </label>
          </div>

          {/* Fee Breakdown */}
          <div className="p-3.5 rounded-[16px] bg-[#F4F6F8] dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#82807A] dark:text-[#A0B0BC]">
              <span>Service fee ({activePkg.title})</span>
              <span>${packageCost.toFixed(2)}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="flex items-center justify-between text-[#82807A] dark:text-[#A0B0BC]">
                <span>Selected add-ons</span>
                <span>+${addOnsTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[#82807A] dark:text-[#A0B0BC]">
              <span>Tax / Municipal admin fee</span>
              <span>$0.00 (Exempt)</span>
            </div>
            <div className="pt-2 border-t border-[#D8D8D8] dark:border-white/10 flex items-center justify-between font-bold text-sm text-[#191919] dark:text-[#FEFEFE]">
              <span>Total amount</span>
              <span className="text-base">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Mandatory Note */}
          <div className="p-2.5 rounded-[12px] bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>City filing fees are paid separately to the City of Chicago.</span>
          </div>
        </div>

        {/* ========================================================
            7. SCHEDULE: DATE CHIPS, TIME CHIPS, MEETING TYPE
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
              Schedule Consultation
            </h2>
            <span className="text-[10px] font-bold text-[#8C9DAA] bg-white/70 dark:bg-white/10 px-2 py-0.5 rounded-full border border-[#D8D8D8] dark:border-white/10">
              Chicago CST
            </span>
          </div>

          {/* Date Chips (Mon to Fri) */}
          <div>
            <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-2 block">
              Select Date (Mon–Fri)
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {days.map((d) => {
                const isSelected = selectedDay === d.day;
                return (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setSelectedDay(d.day)}
                    className={`py-2 px-1.5 rounded-[14px] flex flex-col items-center transition-all select-none border ${
                      isSelected
                        ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-sm'
                        : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] hover:border-[#8C9DAA]'
                    }`}
                  >
                    <span className="text-[11px] font-bold">{d.day}</span>
                    <span className="text-[9.5px] opacity-80 mt-0.5">{d.date.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Chips */}
          <div>
            <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-2 block">
              Select Time
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {times.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`h-11 rounded-[14px] text-xs font-bold transition-all border flex items-center justify-center ${
                      isSelected
                        ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-sm'
                        : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] hover:border-[#8C9DAA]'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meeting Type Chips */}
          <div>
            <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-2 block">
              Meeting Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'In person' as const, label: 'In person', icon: MapPin },
                { type: 'Phone' as const, label: 'Phone', icon: Phone },
                { type: 'Video' as const, label: 'Video', icon: Video },
              ].map(({ type, label, icon: Icon }) => {
                const isSelected = meetingType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMeetingType(type)}
                    className={`h-12 rounded-[14px] text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-sm'
                        : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] hover:border-[#8C9DAA]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            8. BOOKING FORM (Premium, Classy, Well Spaced)
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 shadow-sm space-y-4">
          <div>
            <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
              Booking &amp; Property Details
            </h2>
            <span className="text-[11px] text-[#8C9DAA]">
              Information for Cook County zoning docket filings
            </span>
          </div>

          {/* Error Banner */}
          {formError && (
            <div className="p-3 rounded-[14px] bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Sub-section: Your Details (pre-filled) */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
              1. Your Details (Pre-filled)
            </span>

            <div>
              <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                />
              </div>
            </div>
          </div>

          {/* Sub-section: Property Details */}
          <div className="space-y-3 pt-3 border-t border-[#D8D8D8] dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
              2. Property Details
            </span>

            <div>
              <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                Property Address *
              </label>
              <input
                type="text"
                required
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="e.g. 2144 N. Damen Ave, Chicago, IL 60647"
                className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                  PIN (Optional)
                </label>
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="14-31-100-022-0000"
                  className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                  Zoning District (Optional)
                </label>
                <input
                  type="text"
                  value={zoningDistrict}
                  onChange={(e) => setZoningDistrict(e.target.value)}
                  placeholder="e.g. B3-2 or RT-4"
                  className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                />
              </div>
            </div>
          </div>

          {/* Sub-section: Project Details */}
          <div className="space-y-3 pt-3 border-t border-[#D8D8D8] dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
              3. Project Details
            </span>

            <div>
              <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                Project Type *
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
              >
                <option value="Rear Yard Setback Variance">Rear Yard Setback Variance</option>
                <option value="Residential Addition & Remodel">Residential Addition &amp; Remodel</option>
                <option value="Commercial Buildout & Change of Use">Commercial Buildout &amp; Change of Use</option>
                <option value="ZBA Special Use Appeal">ZBA Special Use Appeal</option>
                <option value="ADU / Coach House Construction">ADU / Coach House Construction</option>
                <option value="Multi-Family TOD Density Bonus">Multi-Family TOD Density Bonus</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                Short Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your proposed expansion, height variance, or question..."
                className="w-full p-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white/90 dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919] resize-none"
              />
            </div>
          </div>

          {/* Sub-section: Documents */}
          <div className="space-y-2 pt-3 border-t border-[#D8D8D8] dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
              4. Documents (Optional)
            </span>

            <button
              type="button"
              onClick={() => {
                const mockFile = prompt(
                  'Enter mock document name (e.g. Plat_Of_Survey_2026.pdf):',
                  'Plat_Of_Survey_Damen_Ave.pdf'
                );
                if (mockFile) setUploadedDocName(mockFile);
              }}
              className="w-full h-12 rounded-[14px] border border-dashed border-[#8C9DAA] bg-white/80 dark:bg-white/5 text-xs text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center gap-2 hover:bg-white active:scale-98 transition-all px-3"
            >
              <Upload className="w-4 h-4" />
              <span className="truncate">
                {uploadedDocName
                  ? `Uploaded: ${uploadedDocName}`
                  : 'Upload plat of survey, deed or plans'}
              </span>
            </button>
          </div>

          {/* Sub-section: Checkbox Agreement */}
          <div className="pt-3 border-t border-[#D8D8D8] dark:border-white/10">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#191919] accent-[#191919] mt-0.5 cursor-pointer"
              />
              <span className="text-xs text-[#191919]/90 dark:text-[#FEFEFE]/90 leading-snug">
                I agree to the Terms and Privacy Policy
              </span>
            </label>
          </div>
        </div>

        {/* ========================================================
            9. ORDER SUMMARY CARD (Updates live)
        ======================================================== */}
        <div className="p-4 sm:p-5 rounded-[22px] bg-gradient-to-br from-[#323232] via-[#242424] to-[#191919] text-[#FEFEFE] shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/20">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C7D3DC]" />
              <h3 className="font-heading text-sm font-bold tracking-wide">
                Order Summary
              </h3>
            </div>
            <span className="text-[10.5px] text-[#A0B0BC] uppercase tracking-wider font-semibold">
              Live estimate
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#C7D3DC]">Package:</span>
              <span className="font-semibold text-white">
                {activePkg.title} (${packageCost})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#C7D3DC]">Schedule:</span>
              <span className="font-semibold text-white">
                {selectedDay} {days.find((d) => d.day === selectedDay)?.date} at {selectedTime} ({meetingType})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#C7D3DC]">Add-ons:</span>
              <span className="font-semibold text-white">
                {addOnsTotal > 0
                  ? [
                      rushService && 'Rush (+$100)',
                      extraSiteVisit && 'Site visit (+$200)',
                      spanishTranslator && 'Translator (+$50)',
                    ]
                      .filter(Boolean)
                      .join(', ')
                  : 'None selected'}
              </span>
            </div>

            <div className="pt-2 border-t border-white/20 flex items-center justify-between font-bold text-sm">
              <span className="text-[#C7D3DC]">Total Due:</span>
              <span className="text-lg text-white font-heading">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          10. STICKY BOTTOM BAR: TOTAL PRICE + CONFIRM BOOKING
      ======================================================== */}
      <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] mt-auto flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#82807A] dark:text-[#A0B0BC] block leading-none mb-1">
            Total fee
          </span>
          <span className="text-xl font-heading font-bold text-[#191919] dark:text-[#FEFEFE] leading-none">
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleConfirmBookingClick}
          className="h-[52px] px-6 rounded-2xl btn-glossy-primary font-heading font-bold text-sm text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all flex-1 max-w-[240px]"
        >
          <span>Confirm Booking</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* ========================================================
          TASK 2.1: PAYMENT SHEET INSIDE PHONE SCREEN
      ======================================================== */}
      {showPaymentSheet && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 bg-[#FAFBFC] dark:bg-[#18181A] text-[#191919] dark:text-[#FEFEFE] flex flex-col overflow-hidden animate-in fade-in duration-200">
            {/* Payment Header */}
            <div className="flex-shrink-0 px-4 py-3.5 border-b border-[#D8D8D8] dark:border-white/10 flex items-center justify-between bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowPaymentSheet(false)}
                  className="w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center shadow-2xs hover:bg-slate-50 active:scale-95 transition-all"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                </button>
                <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
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
                <div className="p-4 rounded-[18px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 space-y-2">
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
                      Scheduled: {selectedDay} {days.find((d) => d.day === selectedDay)?.date} at {selectedTime}
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
                        className={`h-12 rounded-[14px] text-xs font-bold transition-all border flex flex-col items-center justify-center gap-1 ${
                          paymentMethod === id
                            ? 'btn-glossy-primary border-[#191919] text-[#FEFEFE] shadow-sm'
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
                      className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] font-mono"
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
                        className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] font-mono"
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
                        className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] font-mono"
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
                      className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                    />
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Action: Pay & confirm */}
              <div className="sticky bottom-0 p-4 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 flex-shrink-0">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="h-[52px] w-full rounded-2xl btn-glossy-primary font-heading font-bold text-sm text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing payment...</span>
                    </>
                  ) : (
                    <span>Pay &amp; confirm</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </PhonePortal>
      )}

      {/* ========================================================
          TASK 2.3: SUCCESS SCREEN INSIDE PHONE SCREEN
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
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Central Success Badge & Confirmation Text */}
            <div className="text-center space-y-4 my-auto py-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5">
                <h2 className="font-heading text-xl font-bold text-[#191919] dark:text-[#FEFEFE]">
                  Payment successful. Your booking is confirmed.
                </h2>
                <p className="text-xs text-[#82807A] dark:text-[#A0B0BC]">
                  Your consultation docket has been queued with Marcus Vance, Esq.
                </p>
              </div>

              {/* Booking Info Card */}
              <div className="p-4 rounded-[20px] liquid-glass-card border border-[#D8D8D8] dark:border-white/10 text-left space-y-2.5 max-w-sm mx-auto shadow-xs text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8D8D8]/60 dark:border-white/10">
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

                <div className="flex items-center justify-between pt-2 border-t border-[#D8D8D8]/60 dark:border-white/10">
                  <span className="font-bold text-[#191919] dark:text-[#FEFEFE]">Amount Paid:</span>
                  <span className="font-heading font-bold text-base text-emerald-600 dark:text-emerald-400">
                    ${confirmedBookingData.totalPaid.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Action Buttons: "View booking" and "Add to calendar" */}
            <div className="space-y-2.5 pt-4">
              <button
                type="button"
                onClick={() => {
                  setConfirmedBookingData(null);
                  navigate('/profile?tab=bookings');
                }}
                className="h-[52px] w-full rounded-2xl btn-glossy-primary font-heading font-bold text-sm text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>View booking</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast('Consultation added to your calendar (.ics)');
                }}
                className="h-[52px] w-full rounded-2xl bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/10 font-heading font-bold text-xs text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-98 transition-all"
              >
                <span>Add to calendar</span>
              </button>
            </div>
          </div>
        </PhonePortal>
      )}
    </div>
  );
};

export default ServiceDetailScreen;
