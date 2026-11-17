import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  MessageSquare,
  Upload,
  FileText,
  Clock,
  MapPin,
  Sparkles,
  X,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import BackButton from '../components/ui/BackButton';
import { useAppStore } from '../store/useAppStore';

export const FreeQuoteScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, addQuoteRequest, showToast } = useAppStore();

  const isSuccessParam = searchParams.get('success') === 'true';

  // Read incoming query params for "Quote for" card & pre-selections
  const itemParam = searchParams.get('item') || searchParams.get('serviceName');
  const serviceParam = searchParams.get('service');
  const addressParam = searchParams.get('address');

  // Determine initial "Quote for" item details
  const quoteTargetTitle =
    itemParam ||
    (serviceParam ? 'Architectural Design Consultation' : 'Rear Yard Setback Variance & 3-Flat Expansion');

  // Determine pre-selected need based on the target title
  const getInitialNeed = (title: string): string => {
    const tLower = title.toLowerCase();
    if (tLower.includes('variance') || tLower.includes('setback')) return 'Variance';
    if (tLower.includes('analysis') || tLower.includes('audit')) return 'Zoning analysis';
    if (tLower.includes('appeal') || tLower.includes('hearing')) return 'Appeal';
    if (tLower.includes('permit') || tLower.includes('drawing')) return 'Permit help';
    return 'Variance';
  };

  // Form State (6 clean questions)
  const [selectedNeed, setSelectedNeed] = useState<string>(() => getInitialNeed(quoteTargetTitle));
  const [propertyAddress, setPropertyAddress] = useState<string>(
    addressParam || '2144 N Damen Ave, Chicago, IL 60647'
  );
  const [propertyType, setPropertyType] = useState<string>('Residential');
  const [howSoon, setHowSoon] = useState<string>('This month');
  const [anythingElse, setAnythingElse] = useState<string>('');
  const [reachMethod, setReachMethod] = useState<string>('Phone');

  // UI / Validation State
  const [addressError, setAddressError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAddDocsModal, setShowAddDocsModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [, setUploadedFiles] = useState<string[]>([]);

  // Trigger confetti on success
  useEffect(() => {
    if (isSuccessParam) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#191919', '#10B981', '#3B82F6', '#D8D8D8'],
      });
    }
  }, [isSuccessParam]);

  // Address validation check
  const isAddressValid = propertyAddress.trim().length >= 5;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!propertyAddress.trim()) {
      setAddressError('Please enter your Chicago property address.');
      return;
    }
    setAddressError('');

    setIsSubmitting(true);

    setTimeout(() => {
      // Save quote request to global store
      addQuoteRequest({
        service: `${selectedNeed}: ${quoteTargetTitle}`,
        address: propertyAddress.trim(),
        estimateAmount: 2450,
        status: 'In Review',
        scope: `${selectedNeed} for ${propertyType} property. Urgency: ${howSoon}. Contact: ${reachMethod} (${user.phone || '(312) 555-0182'}). ${anythingElse ? `Notes: ${anythingElse}` : ''}`,
      });

      setIsSubmitting(false);
      setSearchParams({ success: 'true' });
      showToast('Quote request submitted successfully!');
    }, 700);
  };

  // ========================================================
  // SUCCESS VIEW (Shown when ?success=true)
  // ========================================================
  if (isSuccessParam) {
    return (
      <div className="min-h-full flex flex-col text-[#121214] bg-[#FAFBFC] dark:bg-[#121214] animate-in fade-in duration-300">
        {/* Compact Header */}
        <header className="sticky top-0 z-40 liquid-glass-bar border-b border-[#A4B3BE]/25 px-3 h-12 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Back to Home"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] shadow-2xs hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center select-none"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <span className="font-heading text-xs font-bold text-[#191919] dark:text-white">Request Confirmed</span>
          <div className="w-8" />
        </header>

        {/* Content Body */}
        <div className="flex-1 px-4 py-6 space-y-4 max-w-md mx-auto w-full">
          {/* Confirmed Hero Card */}
          <div className="liquid-glass-card rounded-[24px] p-6 text-center space-y-3 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 stroke-[2.4]" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#191919] text-white">
                REQUEST #WW-QT-2026
              </span>
              <h2 className="font-heading text-xl font-bold text-[#191919] dark:text-white tracking-tight">
                Quote Request Received
              </h2>
              <p className="text-xs text-[#82807A] leading-relaxed max-w-xs mx-auto">
                Our licensed Chicago zoning strategist will analyze your parcel and provide a transparent fee proposal.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Response in 1 business day</span>
              </span>
            </div>
          </div>

          {/* Target Service Card */}
          <div className="liquid-glass-card rounded-[20px] p-4 border border-[#E2E6EB] dark:border-white/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] block">
              Requested Scope
            </span>
            <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-white">
              {quoteTargetTitle}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#82807A]">
              <MapPin className="w-3.5 h-3.5 text-[#191919] dark:text-white flex-shrink-0" />
              <span className="truncate">{propertyAddress}</span>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="liquid-glass-card rounded-[22px] p-4.5 border border-[#E2E6EB] dark:border-white/10 space-y-3">
            <h4 className="font-heading text-xs font-bold text-[#191919] dark:text-white uppercase tracking-wider">
              Next Steps
            </h4>

            <div className="space-y-3">
              {[
                {
                  step: '01',
                  title: 'Title 17 GIS Mapping Check',
                  desc: 'We review lot dimensions, zoning district allowances, and setback limits.',
                },
                {
                  step: '02',
                  title: 'Fixed-Fee Proposal',
                  desc: 'You receive an itemized quote in More > My Quotes with no surprise costs.',
                },
                {
                  step: '03',
                  title: 'Direct Strategist Walkthrough',
                  desc: 'A 15-minute phone or video consult to review your options before retainer.',
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#191919] text-white flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-bold text-[#191919] dark:text-white">
                      {s.title}
                    </h5>
                    <p className="text-[11px] text-[#82807A] mt-0.5 leading-snug">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => navigate('/profile?tab=quotes')}
              className="w-full h-12 rounded-full btn-glossy-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <span>View in My Quotes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full h-11 rounded-full btn-glossy-secondary text-xs font-bold text-[#191919] flex items-center justify-center shadow-xs active:scale-[0.98] transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // FORM VIEW: Proper structured sections with shiny glossy effects
  // ========================================================
  return (
    <div className="min-h-full flex flex-col text-[#121214] bg-[#FAFBFC] dark:bg-[#121214] relative">
      {/* 1. Compact Header (Reduced height, slim & sleek 48px) */}
      <header className="sticky top-0 z-40 liquid-glass-bar border-b border-[#A4B3BE]/25 px-3 h-12 flex items-center justify-between flex-shrink-0">
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] shadow-2xs hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center select-none"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        <div className="text-center leading-tight">
          <h1 className="font-heading text-xs font-bold text-[#191919] dark:text-white tracking-tight">
            Free Quote
          </h1>
          <span className="text-[10px] text-[#82807A] font-medium block">
            Takes 2 min · No payment
          </span>
        </div>

        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#191919] dark:text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          </div>
        </div>
      </header>

      {/* 2. Structured Scrollable Body */}
      <form onSubmit={handleSubmit} className="flex-1 px-4 py-4 space-y-4 pb-8 max-w-md mx-auto w-full">
        {/* Sleek Shiny "QUOTE FOR" Card */}
        <div className="p-3.5 rounded-[20px] bg-gradient-to-r from-[#222428] via-[#191919] to-[#141517] text-white border border-white/15 shadow-md relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-white/90 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                QUOTE FOR
              </span>

              <button
                type="button"
                onClick={() => navigate('/services')}
                className="text-[11px] font-bold text-white/80 hover:text-white underline flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>Change Service</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <h3 className="font-heading text-sm font-bold text-white leading-snug">
                {quoteTargetTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] text-white/70">
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Chicago Title 17</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">Cook County GIS</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-md">1-Day Turnaround</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Service Need & Parcel Address */}
        <div className="liquid-glass-card rounded-[22px] p-4.5 space-y-4 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
          {/* Question 1: What do you need? */}
          <div className="space-y-2">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
              1. What do you need?
            </label>
            <div className="flex flex-wrap gap-2">
              {['Variance', 'Zoning analysis', 'Appeal', 'Permit help', 'Not sure'].map((need) => {
                const isSelected = selectedNeed === need;
                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => setSelectedNeed(need)}
                    className={`h-[40px] px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center select-none active:scale-95 ${
                      isSelected
                        ? 'btn-glossy-primary text-white shadow-xs ring-1 ring-white/20'
                        : 'liquid-glass-chip text-[#4A4A4A] dark:text-white/80 hover:text-[#191919]'
                    }`}
                  >
                    {need}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Property address */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A]">
                2. Property address *
              </label>
              {isAddressValid && (
                <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Verified Address</span>
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => {
                  setPropertyAddress(e.target.value);
                  if (addressError) setAddressError('');
                }}
                placeholder="Enter Chicago property address..."
                className={`w-full h-12 px-4 pr-10 rounded-[16px] border ${
                  addressError
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-[#D8D8D8] dark:border-white/15 bg-white/90 dark:bg-[#1E1E22]'
                } text-xs font-semibold text-[#191919] dark:text-white placeholder-[#8C9DAA] focus:outline-none focus:ring-2 focus:ring-[#C0D0E1] dark:focus:ring-white/20 transition-all shadow-inner`}
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                {isAddressValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                ) : (
                  <MapPin className="w-4 h-4 text-[#8C9DAA]" />
                )}
              </div>
            </div>

            {addressError ? (
              <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 px-0.5 animate-in fade-in">
                {addressError}
              </p>
            ) : (
              <p className="text-[10.5px] text-[#82807A] px-0.5">
                Not sure of the zoning? We will check the official Cook County GIS &amp; Title 17 records.
              </p>
            )}
          </div>
        </div>

        {/* SECTION 2: Property Type & Timeline */}
        <div className="liquid-glass-card rounded-[22px] p-4.5 space-y-4 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
          {/* Question 3: Property Type */}
          <div className="space-y-2">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
              3. Property Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Residential', 'Commercial', 'Mixed-Use'].map((type) => {
                const isSelected = propertyType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`h-[42px] rounded-full text-xs font-bold transition-all flex items-center justify-center select-none active:scale-95 ${
                      isSelected
                        ? 'btn-glossy-primary text-white shadow-xs ring-1 ring-white/20'
                        : 'liquid-glass-chip text-[#4A4A4A] dark:text-white/80 hover:text-[#191919]'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 4: How soon? */}
          <div className="space-y-2 pt-1">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
              4. How soon do you need help?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['ASAP', 'This month', 'Exploring'].map((time) => {
                const isSelected = howSoon === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setHowSoon(time)}
                    className={`h-[42px] rounded-full text-xs font-bold transition-all flex items-center justify-center select-none active:scale-95 ${
                      isSelected
                        ? 'btn-glossy-primary text-white shadow-xs ring-1 ring-white/20'
                        : 'liquid-glass-chip text-[#4A4A4A] dark:text-white/80 hover:text-[#191919]'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: Project Notes & Contact Preference */}
        <div className="liquid-glass-card rounded-[22px] p-4.5 space-y-4 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
          {/* Question 5: Project Notes */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A]">
                5. Project notes (Optional)
              </label>
              <span className="text-[10px] font-semibold text-[#82807A] uppercase">
                Optional
              </span>
            </div>
            <textarea
              rows={2}
              value={anythingElse}
              onChange={(e) => setAnythingElse(e.target.value)}
              placeholder="Brief notes on setbacks, existing building, or zoning relief desired..."
              className="w-full h-18 p-3 rounded-[16px] border border-[#D8D8D8] dark:border-white/15 bg-white/90 dark:bg-[#1E1E22] text-xs text-[#191919] dark:text-white placeholder-[#8C9DAA] focus:outline-none focus:ring-2 focus:ring-[#C0D0E1] dark:focus:ring-white/20 transition-all resize-none leading-relaxed shadow-inner"
            />
          </div>

          {/* Question 6: Preferred reach method */}
          <div className="space-y-2 pt-1">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
              6. Best way to reach you
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Phone', 'Email', 'Video'].map((method) => {
                const isSelected = reachMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setReachMethod(method)}
                    className={`h-[40px] rounded-full text-xs font-bold transition-all flex items-center justify-center select-none active:scale-95 ${
                      isSelected
                        ? 'btn-glossy-primary text-white shadow-xs ring-1 ring-white/20'
                        : 'liquid-glass-chip text-[#4A4A4A] dark:text-white/80 hover:text-[#191919]'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>

            {/* Profile Contact Card */}
            <div className="mt-3 p-3 rounded-[18px] bg-white/90 dark:bg-[#1E1E22] border border-[#D8D8D8] dark:border-white/10 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full btn-glossy-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs">
                  {user.avatarText || 'AM'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-heading text-xs font-bold text-[#191919] dark:text-white leading-tight truncate">
                      {user.name || 'Alex Morgan'}
                    </h4>
                    <span className="text-[9.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded-full flex-shrink-0">
                      From profile
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5 truncate">
                    {user.phone || '(312) 555-0182'} • {user.email || 'alex.morgan@example.com'}
                  </p>
                </div>
              </div>

              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
            </div>
          </div>
        </div>
      </form>

      {/* ========================================================
          4. STICKY BOTTOM SUBMIT DOCK (Liquid Glass with Shiny Glossy Button)
          - Never covers content, stays pinned at bottom, ends cleanly
      ======================================================== */}
      <div className="sticky bottom-0 left-0 right-0 z-30 liquid-glass-bar border-t border-[#A4B3BE]/30 backdrop-blur-2xl px-4 py-3 shadow-[0_-8px_25px_rgba(25,25,25,0.06)] mt-auto flex-shrink-0">
        <div className="max-w-md mx-auto space-y-2">
          {/* Main 54px Premium Shiny Submit Button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!propertyAddress.trim() || isSubmitting}
            className={`w-full h-[54px] rounded-[18px] flex items-center justify-between px-5 transition-all select-none ${
              !propertyAddress.trim()
                ? 'bg-[#E5E7EB] dark:bg-white/10 text-[#9CA3AF] cursor-not-allowed border-0 shadow-none'
                : 'btn-glossy-primary text-white shadow-md hover:brightness-105 active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <div className="w-full flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="font-heading text-xs font-bold text-white tracking-wide">
                  Submitting Request…
                </span>
              </div>
            ) : (
              <>
                <div className="flex flex-col text-left">
                  <span className="font-heading text-[13.5px] font-bold tracking-tight">
                    Send quote request
                  </span>
                  <span className="text-[10px] text-white/70 font-medium">
                    No payment needed · 24h response
                  </span>
                </div>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    !propertyAddress.trim()
                      ? 'bg-black/5 dark:bg-white/10 text-[#9CA3AF]'
                      : 'bg-white text-[#191919] shadow-sm'
                  }`}
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                </div>
              </>
            )}
          </button>

          {/* Trust and Policy Links */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-[#82807A]">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#10B981]" />
              <span>Confidential Title 17 Review</span>
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="underline hover:text-[#191919] dark:hover:text-white"
            >
              Terms &amp; Privacy
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Terms & Privacy Policy */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-[24px] liquid-glass-card p-5 space-y-3.5 shadow-xl border border-[#D8D8D8] dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-white">
                Terms &amp; Privacy Policy
              </h3>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#82807A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#82807A] space-y-2 max-h-60 overflow-y-auto pr-1">
              <p>
                <strong>Free Quote Agreement:</strong> Submitting a request creates no binding obligation or legal retainer. Free quotes are preliminary estimates based on Title 17 municipal codes.
              </p>
              <p>
                <strong>Privacy &amp; Escrow:</strong> Your parcel details and survey uploads remain confidential under attorney-client privilege. We never share your contact information with external brokers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              className="w-full h-11 rounded-full btn-glossy-primary text-xs font-bold text-white shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeQuoteScreen;
