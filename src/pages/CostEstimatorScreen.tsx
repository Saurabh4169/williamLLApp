import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Building2,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  Scale,
  FileCheck2,
  Scissors,
  RefreshCw,
  Clock,
  Info,
  ChevronDown,
  Bookmark,
  Calendar,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import BackButton from '../components/ui/BackButton';
import { useAppStore } from '../store/useAppStore';

interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  baseMin: number;
  baseMax: number;
}

export const CostEstimatorScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addQuoteRequest, showToast } = useAppStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Project
  const [projectType, setProjectType] = useState<string>('New construction');
  const [propertyType, setPropertyType] = useState<string>('Residential');

  // Step 2: Size & Complexity
  const [scaleUnits, setScaleUnits] = useState<string>('2–4 Units (3-Flat)');
  const [sqft, setSqft] = useState<number>(3125);
  const [needVariance, setNeedVariance] = useState<boolean>(true);
  const [needCommunityMeetings, setNeedCommunityMeetings] = useState<boolean>(false);
  const [need3D, setNeed3D] = useState<boolean>(false);
  const [isRush, setIsRush] = useState<boolean>(false);

  // Step 3: Location
  const [address, setAddress] = useState<string>('2144 N Damen Ave, Chicago, IL 60647');
  const [zoningDistrict, setZoningDistrict] = useState<string>('RM-5');

  const [savedEstimate, setSavedEstimate] = useState<boolean>(false);

  // Project Type Options
  const projectTypes: ProjectTypeOption[] = [
    {
      id: 'new-construction',
      title: 'New construction',
      description: 'Ground-up building on Chicago parcel',
      icon: Building2,
      baseMin: 2200,
      baseMax: 3800,
    },
    {
      id: 'addition',
      title: 'Addition',
      description: 'Expand footprint, rooftop or ADU addition',
      icon: Layers,
      baseMin: 1600,
      baseMax: 2800,
    },
    {
      id: 'renovation',
      title: 'Renovation',
      description: 'Major interior or exterior remodel',
      icon: RefreshCw,
      baseMin: 1200,
      baseMax: 2200,
    },
    {
      id: 'change-of-use',
      title: 'Change of use',
      description: 'Commercial to residential or mixed-use',
      icon: RefreshCw,
      baseMin: 1800,
      baseMax: 3200,
    },
    {
      id: 'lot-split',
      title: 'Lot split',
      description: 'Subdivide parcel into 2+ zoning lots',
      icon: Scissors,
      baseMin: 2500,
      baseMax: 4200,
    },
    {
      id: 'zoning-appeal',
      title: 'Zoning appeal or variance',
      description: 'ZBA rear setback, FAR, or height relief',
      icon: Scale,
      baseMin: 2000,
      baseMax: 3500,
    },
    {
      id: 'permit-help',
      title: 'Permit help',
      description: 'Chicago DOB Standard Plan Review & self-cert',
      icon: FileCheck2,
      baseMin: 1400,
      baseMax: 2400,
    },
  ];

  const propertyTypes = ['Residential', 'Commercial', 'Mixed-Use'];

  const zoningDistricts = [
    { code: 'RS-3', label: 'RS-3 (Single-Family Residential)' },
    { code: 'RT-4', label: 'RT-4 (Two-Flat / Townhome)' },
    { code: 'RM-5', label: 'RM-5 (Multi-Family Residential)' },
    { code: 'B3-2', label: 'B3-2 (Community Shopping / Mixed-Use)' },
    { code: 'DX-5', label: 'DX-5 (Downtown Mixed-Use District)' },
    { code: 'UNKNOWN', label: "I don't know my zoning district" },
  ];

  // Dynamic cost calculation based on all user parameters
  const currentOption = projectTypes.find((p) => p.title === projectType) || projectTypes[0];

  let minFee = currentOption.baseMin;
  let maxFee = currentOption.baseMax;

  // Property type modifier
  if (propertyType === 'Commercial') {
    minFee += 600;
    maxFee += 900;
  } else if (propertyType === 'Mixed-Use') {
    minFee += 800;
    maxFee += 1200;
  }

  // Size scale modifier
  if (scaleUnits === '5–12 Units') {
    minFee += 700;
    maxFee += 1100;
  } else if (scaleUnits === 'Commercial Floor') {
    minFee += 800;
    maxFee += 1300;
  }

  // Toggles modifiers
  if (needVariance) {
    minFee += 600;
    maxFee += 1000;
  }
  if (needCommunityMeetings) {
    minFee += 400;
    maxFee += 800;
  }
  if (need3D) {
    minFee += 350;
    maxFee += 650;
  }
  if (isRush) {
    minFee += 400;
    maxFee += 750;
  }

  // Round to nearest 50
  minFee = Math.round(minFee / 50) * 50;
  maxFee = Math.round(maxFee / 50) * 50;
  const avgFee = Math.round((minFee + maxFee) / 2);

  // Sub-breakdowns
  const zoningAnalysisMin = Math.round(minFee * 0.28);
  const zoningAnalysisMax = Math.round(maxFee * 0.28);

  const hearingPrepMin = Math.round(minFee * 0.35);
  const hearingPrepMax = Math.round(maxFee * 0.35);

  const representationMin = Math.round(minFee * 0.22);
  const representationMax = Math.round(maxFee * 0.22);

  const permitAssistMin = minFee - zoningAnalysisMin - hearingPrepMin - representationMin;
  const permitAssistMax = maxFee - zoningAnalysisMax - hearingPrepMax - representationMax;

  const timelineString = isRush ? '3 to 5 weeks (Rush docket)' : '6 to 10 weeks (Standard)';

  const handleSaveEstimate = () => {
    addQuoteRequest({
      service: `Project Fee Estimate: ${projectType}`,
      address: address || 'Chicago, IL',
      estimateAmount: avgFee,
      status: 'Pending',
      scope: `${projectType} (${propertyType}) • ${scaleUnits} • Approx ${sqft.toLocaleString()} sq ft • Est: $${minFee.toLocaleString()} – $${maxFee.toLocaleString()}`,
    });
    setSavedEstimate(true);
    showToast('Estimate saved to More > My Quotes as "Estimate"');
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else {
      setStep(4); // Result screen
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-full flex flex-col text-[#121214] bg-[#FAFBFC] dark:bg-[#121214] relative">
      {/* ========================================================
          1. HEADER & 3-PART SEGMENTED PROGRESS BAR
      ======================================================== */}
      <header className="sticky top-0 z-40 liquid-glass-bar border-b border-[#A4B3BE]/30 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <BackButton onClick={handleBack} ariaLabel="Back" />

          {step <= 3 ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#82807A] uppercase tracking-wider">
                STEP {step} OF 3
              </span>
              <span className="text-xs font-bold text-[#191919] dark:text-white">
                {step === 1 ? 'Project Scope' : step === 2 ? 'Size & Add-ons' : 'Parcel Location'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#191919] dark:text-white">
                Fee Estimate Result
              </span>
            </div>
          )}

          <div className="w-11 h-11 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full misty-icon-badge flex items-center justify-center text-[#191919] dark:text-white">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 3-Part Segmented Progress Bar */}
        {step <= 3 && (
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-1 rounded-full bg-[#191919] dark:bg-white transition-all shadow-2xs" />
            <div
              className={`h-1 rounded-full transition-all ${
                step >= 2 ? 'bg-[#191919] dark:bg-white shadow-2xs' : 'bg-[#D8D8D8] dark:bg-white/20'
              }`}
            />
            <div
              className={`h-1 rounded-full transition-all ${
                step >= 3 ? 'bg-[#191919] dark:bg-white shadow-2xs' : 'bg-[#D8D8D8] dark:bg-white/20'
              }`}
            />
          </div>
        )}
      </header>

      {/* ========================================================
          2. STEP-BY-STEP FORM BODY (16px side padding, generous clearance)
      ======================================================== */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-8 max-w-md mx-auto w-full">
        {/* ========================================================
            STEP 1: PROJECT TYPE & PROPERTY TYPE
        ======================================================== */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919] dark:text-white tracking-tight">
                What type of project are you planning?
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5">
                Select your project scope to calculate preliminary Chicago consulting fees.
              </p>
            </div>

            {/* Selection Cards (2 columns with balanced 7th item spanning full width) */}
            <div className="grid grid-cols-2 gap-2.5">
              {projectTypes.map((opt, idx) => {
                const IconComponent = opt.icon;
                const isSelected = projectType === opt.title;
                const isLastItem = idx === projectTypes.length - 1; // 7th item: Permit help

                if (isLastItem) {
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setProjectType(opt.title)}
                      className={`col-span-2 p-3.5 rounded-[20px] text-left border transition-all flex items-center justify-between relative select-none active:scale-[0.98] ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-white rounded-[20px] border border-[#191919] shadow-md ring-1 ring-white/20 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none'
                          : 'liquid-glass-card rounded-[20px] border border-[#E2E6EB] dark:border-white/10 text-[#191919] dark:text-white hover:border-[#A4B3BE] shadow-glass'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'misty-icon-badge text-[#191919] dark:text-white'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-heading text-xs font-bold leading-tight">
                            {opt.title}
                          </h4>
                          <p
                            className={`text-[10px] leading-snug mt-0.5 truncate ${
                              isSelected ? 'text-white/80' : 'text-[#82807A]'
                            }`}
                          >
                            {opt.description}
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-white text-[#191919] flex items-center justify-center shadow-xs flex-shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-[#D8D8D8] dark:border-white/20 flex-shrink-0" />
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProjectType(opt.title)}
                    className={`p-3.5 rounded-[20px] text-left border transition-all flex flex-col justify-between min-h-[110px] space-y-2 relative select-none active:scale-[0.98] ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-white rounded-[20px] border border-[#191919] shadow-md ring-1 ring-white/20 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-2/5 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none'
                        : 'liquid-glass-card rounded-[20px] border border-[#E2E6EB] dark:border-white/10 text-[#191919] dark:text-white hover:border-[#A4B3BE] shadow-glass'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'misty-icon-badge text-[#191919] dark:text-white'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-white text-[#191919] flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-bold leading-tight">
                        {opt.title}
                      </h4>
                      <p
                        className={`text-[10px] leading-snug mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-[#82807A]'
                        }`}
                      >
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Property Type Chips Card */}
            <div className="liquid-glass-card rounded-[22px] p-4 space-y-2.5 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
                Property Classification
              </label>
              <div className="flex items-center gap-2">
                {propertyTypes.map((type) => {
                  const isSelected = propertyType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all select-none active:scale-95 ${
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
          </div>
        )}

        {/* ========================================================
            STEP 2: SIZE & COMPLEXITY TOGGLES (Fixed UI sticking)
        ======================================================== */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919] dark:text-white tracking-tight">
                Project scale &amp; optional requirements
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5">
                Helps estimate architectural exhibits, affidavits, and zoning attorney hours.
              </p>
            </div>

            {/* Units / Floors Selector Card */}
            <div className="liquid-glass-card rounded-[22px] p-4 space-y-2.5 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
                Units or Floors
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '1 Unit (Single-Family)',
                  '2–4 Units (3-Flat)',
                  '5–12 Units',
                  'Commercial Floor',
                ].map((u) => {
                  const isSelected = scaleUnits === u;
                  return (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setScaleUnits(u)}
                      className={`p-3 rounded-[16px] text-xs font-bold transition-all select-none text-left flex items-center justify-between active:scale-[0.98] ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-white rounded-[16px] border border-[#191919] shadow-xs ring-1 ring-white/20 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-2/5 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none'
                          : 'liquid-glass-card rounded-[16px] border border-[#E2E6EB] dark:border-white/10 text-[#191919] dark:text-white hover:border-[#A4B3BE]'
                      }`}
                    >
                      <span className="truncate">{u}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Approx Size Card */}
            <div className="liquid-glass-card rounded-[22px] p-4 space-y-2.5 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
              <div className="flex items-center justify-between px-0.5">
                <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A]">
                  Approx. Size (Sq Ft)
                </label>
                <span className="text-xs font-bold text-[#191919] dark:text-white font-mono">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value) || 0)}
                placeholder="Enter size in square feet..."
                className="w-full h-12 px-4 rounded-[16px] border border-[#D8D8D8] dark:border-white/15 bg-white/90 dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-white placeholder-[#8C9DAA] focus:outline-none focus:ring-2 focus:ring-[#C0D0E1] dark:focus:ring-white/20 transition-all shadow-inner"
              />
              {/* Quick Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {[1500, 2500, 3125, 4500, 8000].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSqft(sz)}
                    className="py-1 px-3 rounded-full liquid-glass-chip text-[10.5px] font-bold text-[#191919] dark:text-white hover:border-[#A4B3BE] active:scale-95 transition-all"
                  >
                    {sz.toLocaleString()} sq ft
                  </button>
                ))}
              </div>
            </div>

            {/* Structured Add-on Scope & Expediting Section (Clear cards, no overlap) */}
            <div className="space-y-2.5 pt-1">
              <div className="px-0.5 flex items-center justify-between">
                <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A]">
                  Add-on Scope &amp; Expediting
                </label>
                <span className="text-[10px] text-[#82807A] font-medium">Select all that apply</span>
              </div>

              {/* Toggle 1: Need a zoning variance */}
              <div
                onClick={() => setNeedVariance(!needVariance)}
                className={`p-3.5 rounded-[18px] border transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.99] ${
                  needVariance
                    ? 'liquid-glass-card border-[#191919] dark:border-white/30 shadow-xs ring-1 ring-[#191919]/10'
                    : 'liquid-glass-card border-[#E2E6EB] dark:border-white/10 opacity-90'
                }`}
              >
                <div className="pr-3">
                  <h4 className="text-xs font-bold text-[#191919] dark:text-white">
                    Need a zoning variance
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5">
                    Relief for setbacks, building height, or lot coverage (+ $600 – $1,000)
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    needVariance
                      ? 'btn-glossy-primary text-white shadow-xs'
                      : 'border border-[#D8D8D8] dark:border-white/20 bg-white/50'
                  }`}
                >
                  {needVariance && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </div>

              {/* Toggle 2: Need community meetings */}
              <div
                onClick={() => setNeedCommunityMeetings(!needCommunityMeetings)}
                className={`p-3.5 rounded-[18px] border transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.99] ${
                  needCommunityMeetings
                    ? 'liquid-glass-card border-[#191919] dark:border-white/30 shadow-xs ring-1 ring-[#191919]/10'
                    : 'liquid-glass-card border-[#E2E6EB] dark:border-white/10 opacity-90'
                }`}
              >
                <div className="pr-3">
                  <h4 className="text-xs font-bold text-[#191919] dark:text-white">
                    Need community meetings
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5">
                    Aldermanic ward caucus &amp; neighbor presentation (+ $400 – $800)
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    needCommunityMeetings
                      ? 'btn-glossy-primary text-white shadow-xs'
                      : 'border border-[#D8D8D8] dark:border-white/20 bg-white/50'
                  }`}
                >
                  {needCommunityMeetings && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </div>

              {/* Toggle 3: Need 3D visualization */}
              <div
                onClick={() => setNeed3D(!need3D)}
                className={`p-3.5 rounded-[18px] border transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.99] ${
                  need3D
                    ? 'liquid-glass-card border-[#191919] dark:border-white/30 shadow-xs ring-1 ring-[#191919]/10'
                    : 'liquid-glass-card border-[#E2E6EB] dark:border-white/10 opacity-90'
                }`}
              >
                <div className="pr-3">
                  <h4 className="text-xs font-bold text-[#191919] dark:text-white">
                    Need 3D visualization
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5">
                    Photorealistic architectural renders for hearing (+ $350 – $650)
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    need3D
                      ? 'btn-glossy-primary text-white shadow-xs'
                      : 'border border-[#D8D8D8] dark:border-white/20 bg-white/50'
                  }`}
                >
                  {need3D && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </div>

              {/* Toggle 4: Rush timeline (Priority Docket) */}
              <div
                onClick={() => setIsRush(!isRush)}
                className={`p-3.5 rounded-[18px] border transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.99] ${
                  isRush
                    ? 'liquid-glass-card border-[#B8860B] shadow-xs ring-1 ring-[#B8860B]/20'
                    : 'liquid-glass-card border-[#E2E6EB] dark:border-white/10 opacity-90'
                }`}
              >
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#191919] dark:text-white">
                      Rush timeline (3–5 weeks)
                    </h4>
                    <span className="text-[9.5px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800 shadow-2xs">
                      Priority Docket
                    </span>
                  </div>
                  <p className="text-[11px] text-[#82807A] mt-0.5">
                    Accelerated attorney filing &amp; survey draft (+ $400 – $750)
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    isRush
                      ? 'btn-glossy-primary text-white shadow-xs'
                      : 'border border-[#D8D8D8] dark:border-white/20 bg-white/50'
                  }`}
                >
                  {isRush && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: LOCATION & DISTRICT
        ======================================================== */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919] dark:text-white tracking-tight">
                Where is your property located?
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5">
                Zoning district determines whether administrative relief or full ZBA hearing is needed.
              </p>
            </div>

            {/* Address Input Card */}
            <div className="liquid-glass-card rounded-[22px] p-4.5 space-y-2 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
                Property Address (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Chicago address (e.g. 2144 N Damen Ave)..."
                  className="w-full h-12 px-4 pr-10 rounded-[16px] border border-[#D8D8D8] dark:border-white/15 bg-white/90 dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-white placeholder-[#8C9DAA] focus:outline-none focus:ring-2 focus:ring-[#C0D0E1] dark:focus:ring-white/20 transition-all shadow-inner"
                />
                <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9DAA]" />
              </div>
            </div>

            {/* Zoning District Card */}
            <div className="liquid-glass-card rounded-[22px] p-4.5 space-y-2 border border-[#E2E6EB] dark:border-white/10 shadow-glass">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] block px-0.5">
                Zoning District
              </label>
              <div className="relative">
                <select
                  value={zoningDistrict}
                  onChange={(e) => setZoningDistrict(e.target.value)}
                  className="w-full h-12 px-4 pr-10 rounded-[16px] border border-[#D8D8D8] dark:border-white/15 bg-white/90 dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#C0D0E1] dark:focus:ring-white/20 transition-all cursor-pointer shadow-inner"
                >
                  {zoningDistricts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#82807A] pointer-events-none" />
              </div>
            </div>

            {/* Info Hint Card */}
            <div className="liquid-glass-card rounded-[20px] p-4 border border-[#E2E6EB] dark:border-white/10 flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#4A4A4A] dark:text-[#A0B0BC] leading-relaxed">
                If you aren't certain of your zoning code, our team pulls official Cook County parcel PINs and aldermanic boundaries during the free initial review.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: RESULT SCREEN (Fee projection breakdown)
        ======================================================== */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* The Big Prestigious Hero Fee Card */}
            <div className="p-5.5 rounded-[24px] bg-gradient-to-br from-[#26262B] via-[#1A1A1E] to-[#121214] text-white border border-white/15 shadow-md space-y-3.5 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                  PROJECT FEE RANGE
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Chicago Title 17 Rates</span>
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-xs text-white/70 block font-medium">
                  Estimated consulting fee:
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight mt-0.5">
                  ${minFee.toLocaleString()} to ${maxFee.toLocaleString()}
                </h3>
              </div>

              {/* Range Visual Bar with Misty-Blue Gradient */}
              <div className="relative z-10 space-y-1.5 pt-1">
                <div className="h-2 rounded-full bg-white/15 overflow-hidden relative">
                  <div className="absolute inset-y-0 left-[20%] right-[15%] rounded-full bg-misty-gradient shadow-xs" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-white/70">
                  <span>${minFee.toLocaleString()}</span>
                  <span className="text-white font-extrabold">Avg: ${avgFee.toLocaleString()}</span>
                  <span>${maxFee.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Itemized Fee Breakdown Card */}
            <div className="liquid-glass-card rounded-[22px] p-4.5 border border-[#E2E6EB] dark:border-white/10 shadow-glass space-y-3 text-xs">
              <h4 className="font-heading text-xs font-bold text-[#191919] dark:text-white uppercase tracking-wider">
                Fee Breakdown
              </h4>

              <div className="divide-y divide-[#D8D8D8]/60 dark:divide-white/10 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#191919] dark:text-white block">
                      Zoning Analysis &amp; Ordinance Audit
                    </span>
                    <span className="text-[10.5px] text-[#82807A]">
                      FAR, setbacks &amp; Cook County parcel search
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-[#191919] dark:text-white">
                    ${zoningAnalysisMin.toLocaleString()} – ${zoningAnalysisMax.toLocaleString()}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#191919] dark:text-white block">
                      Hearing Preparation &amp; Exhibits
                    </span>
                    <span className="text-[10.5px] text-[#82807A]">
                      Architectural exhibits, affidavits &amp; mailings
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-[#191919] dark:text-white">
                    ${hearingPrepMin.toLocaleString()} – ${hearingPrepMax.toLocaleString()}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#191919] dark:text-white block">
                      Legal Representation
                    </span>
                    <span className="text-[10.5px] text-[#82807A]">
                      ZBA appearance &amp; aldermanic consultation
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-[#191919] dark:text-white">
                    ${representationMin.toLocaleString()} – ${representationMax.toLocaleString()}
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#191919] dark:text-white block">
                      Permit Assistance
                    </span>
                    <span className="text-[10.5px] text-[#82807A]">
                      Chicago DOB docketing &amp; certificate tracking
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-[#191919] dark:text-white">
                    ${permitAssistMin.toLocaleString()} – ${permitAssistMax.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Typical Timeline Row */}
              <div className="pt-2.5 border-t border-[#D8D8D8] dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#71717A] dark:text-[#A0B0BC]">
                  <Clock className="w-3.5 h-3.5 text-[#191919] dark:text-white flex-shrink-0" />
                  <span className="font-semibold">Typical timeline:</span>
                </div>
                <span className="font-heading font-extrabold text-xs text-[#191919] dark:text-white">
                  {timelineString}
                </span>
              </div>
            </div>

            {/* Rough Estimate Note */}
            <div className="liquid-glass-card rounded-[18px] p-3.5 border border-[#E2E6EB] dark:border-white/10 flex items-start gap-2.5 text-[10.5px] text-[#82807A] leading-relaxed shadow-2xs">
              <Info className="w-4 h-4 text-[#82807A] flex-shrink-0 mt-0.5" />
              <p>
                Rough estimate only. Municipal filing fees are paid separately to the City of Chicago. Your final proposal is confirmed after the free initial assessment.
              </p>
            </div>

            {/* Link: "Ask AI to explain this estimate" */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/ai-assistant?estimate=true&range=${encodeURIComponent(
                      `$${minFee.toLocaleString()} - $${maxFee.toLocaleString()}`
                    )}`
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#191919] dark:text-white underline hover:opacity-80 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Ask AI to explain this fee estimate</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/project-assessment?projectType=${encodeURIComponent(
                      projectType
                    )}&propertyType=${encodeURIComponent(
                      propertyType
                    )}&address=${encodeURIComponent(address)}&sqft=${sqft}&zoning=${zoningDistrict}`
                  )
                }
                className="w-full h-12 rounded-full btn-glossy-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
              >
                <span>Request Free Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/services')}
                className="w-full h-11 rounded-full btn-glossy-secondary text-[#191919] text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Consultation</span>
              </button>

              <button
                type="button"
                onClick={handleSaveEstimate}
                disabled={savedEstimate}
                className="w-full h-10 px-4 rounded-full liquid-glass-chip text-[#191919] dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#A4B3BE] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {savedEstimate ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saved in My Quotes</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-[#82807A]" />
                    <span>Save Estimate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          3. STICKY BOTTOM DOCK (Steps 1 to 3)
          - Never covers content, stays pinned at bottom, ends cleanly
      ======================================================== */}
      {step <= 3 && (
        <div className="sticky bottom-0 left-0 right-0 z-30 liquid-glass-bar border-t border-[#A4B3BE]/30 backdrop-blur-2xl px-4 py-3 shadow-[0_-8px_25px_rgba(25,25,25,0.06)] mt-auto flex-shrink-0">
          <div className="flex items-center gap-2.5 max-w-md mx-auto">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 h-11 rounded-full btn-glossy-secondary text-xs font-bold text-[#191919] flex items-center justify-center shadow-xs active:scale-95 transition-all"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex-[2] h-11 rounded-full btn-glossy-primary text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
            >
              <span>{step === 3 ? 'Calculate Estimate' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostEstimatorScreen;
