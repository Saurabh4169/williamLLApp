import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Building2,
  Layers,
  Hammer,
  RefreshCw,
  Scissors,
  HelpCircle,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileText,
  Sparkles,
  MapPin,
  X,
  Phone,
  Mail,
  Video,
  Info,
  ChevronDown,
  Lock,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolio';
import { useAppStore } from '../store/useAppStore';
import PhonePortal from '../components/ui/PhonePortal';
import BackButton from '../components/ui/BackButton';

export const ProjectAssessmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, addQuoteRequest, showToast } = useAppStore();

  const projectId = searchParams.get('projectId');
  const isCompletedParam = searchParams.get('completed') === 'true';

  // Find referred project if any
  const matchedProject: PortfolioProject | undefined = PORTFOLIO_PROJECTS.find(
    (p) => p.id === projectId
  );

  // Flow State
  const [step, setStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(isCompletedParam);
  const [requestId] = useState<string>('#AS-1051');

  // PIN Help Modal State
  const [showPinModal, setShowPinModal] = useState<boolean>(false);

  // Form State
  const [projectType, setProjectType] = useState<string>('New construction');
  const [propertyType, setPropertyType] = useState<string>('Residential');
  const [zoningApproval, setZoningApproval] = useState<string>('Yes (variance or rezoning)');

  // Step 2: Property Details
  const [propertyAddress, setPropertyAddress] = useState<string>(
    matchedProject ? matchedProject.address : '2144 N Damen Ave, Chicago, IL 60647'
  );
  const [pinNumber, setPinNumber] = useState<string>('14-31-108-024-0000');
  const [zoningDistrict, setZoningDistrict] = useState<string>(
    matchedProject?.specs?.zoningDistrict || 'RT-4'
  );
  const [lotSize, setLotSize] = useState<string>('3,125 sq ft (25 x 125)');
  const [ownershipStatus, setOwnershipStatus] = useState<string>('Yes I own it');
  const [lotCurrentCondition, setLotCurrentCondition] = useState<string>('Existing building');

  // Step 3: Project Goals
  const [unitsFloors, setUnitsFloors] = useState<string>(
    matchedProject ? `${matchedProject.specs.units}, 3 floors` : '3 residential units, 4 floors'
  );
  const [approxSize, setApproxSize] = useState<string>('4,200 sq ft');
  const [budgetRange, setBudgetRange] = useState<string>('$1M to $5M');
  const [timelineStart, setTimelineStart] = useState<string>('3 to 6 months');
  const [knownProblems, setKnownProblems] = useState<string[]>([
    'Need a variance',
    'Height or setback',
  ]);
  const [projectDescription, setProjectDescription] = useState<string>(
    'Planning a modern 3-unit residential building with rear coach house parking access and 10-foot ceiling clearances requiring front and rear yard setback relief.'
  );

  // Step 4: Contact & Review
  const [contactName, setContactName] = useState<string>(user.name || 'Alex Sterling');
  const [contactEmail, setContactEmail] = useState<string>(
    user.email || 'alex.sterling@example.com'
  );
  const [contactPhone, setContactPhone] = useState<string>(user.phone || '312-555-0198');
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    'Phone' | 'Email' | 'Video call'
  >('Phone');
  const [uploadedFileName, setUploadedFileName] = useState<string>(
    'Plat_of_Survey_Damen_2144.pdf'
  );
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Sync completion parameter
  useEffect(() => {
    if (isCompletedParam && !isCompleted) {
      setIsCompleted(true);
    }
  }, [isCompletedParam, isCompleted]);

  // Project Type Cards definition
  const projectTypeCards = [
    {
      id: 'New construction',
      title: 'New construction',
      shortLine: 'Ground-up building on parcel',
      icon: Building2,
    },
    {
      id: 'Addition',
      title: 'Addition',
      shortLine: 'Expand footprint or add height',
      icon: Layers,
    },
    {
      id: 'Renovation',
      title: 'Renovation',
      shortLine: 'Interior / exterior remodel',
      icon: Hammer,
    },
    {
      id: 'Change of use',
      title: 'Change of use',
      shortLine: 'Commercial or residential shift',
      icon: RefreshCw,
    },
    {
      id: 'Lot split',
      title: 'Lot split',
      shortLine: 'Subdivide parcel into 2+ lots',
      icon: Scissors,
    },
    {
      id: 'Not sure yet',
      title: 'Not sure yet',
      shortLine: 'Need expert zoning exploration',
      icon: HelpCircle,
    },
  ];

  // Multi-select handler for known problems
  const handleToggleProblem = (item: string) => {
    if (item === 'None') {
      setKnownProblems(['None']);
      return;
    }
    const filtered = knownProblems.filter((p) => p !== 'None');
    if (filtered.includes(item)) {
      const remaining = filtered.filter((p) => p !== item);
      setKnownProblems(remaining.length === 0 ? ['None'] : remaining);
    } else {
      setKnownProblems([...filtered, item]);
    }
  };

  const handleNext = () => {
    if (step === 2 && !propertyAddress.trim()) {
      showToast('Please enter a property address.');
      return;
    }
    if (step === 3 && projectDescription.trim().length < 30) {
      showToast('Please enter at least 30 characters describing your project.');
      return;
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleClose = () => {
    if (projectId) {
      navigate(`/construction/${projectId}`);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/construction');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleClose();
    }
  };

  const handleSubmit = () => {
    if (!agreeTerms) {
      showToast('Please agree to the Terms and Privacy Policy.');
      return;
    }

    // Add request to quotesList so it shows as "Assessment · In review" in More > My Quotes
    addQuoteRequest({
      id: `quote-${Date.now()}`,
      quoteNumber: requestId,
      service: `Assessment · ${projectType}`,
      address: propertyAddress,
      estimateAmount: 0,
      status: 'In Review',
      dateSubmitted: 'Today',
      scope: `Free Project Assessment: ${projectDescription}. Property: ${propertyType}, District: ${zoningDistrict}. Condition: ${lotCurrentCondition}. Budget: ${budgetRange}. Timeframe: ${timelineStart}.`,
    });

    setIsCompleted(true);
    setSearchParams({
      ...(projectId ? { projectId } : {}),
      completed: 'true',
    });

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#191919', '#7A4B2A', '#3FA66B', '#C0D0E1', '#FAFBFC'],
      });
    } catch {
      // safe fallback
    }

    showToast(`Request ${requestId} submitted successfully`);
  };

  const stepNames = [
    'Project Type',
    'Property Details',
    'Project Goals',
    'Review & Send',
  ];

  // ========================================================
  // SUCCESS SCREEN
  // ========================================================
  if (isCompleted) {
    return (
      <div className="min-h-full flex flex-col justify-between text-[#191919] px-4 py-4 max-w-md mx-auto w-full pb-28">
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-white border border-[#D8D8D8] text-[#555] hover:text-[#191919] hover:bg-slate-100 flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
            aria-label="Close"
            title="Close"
          >
            <X className="w-3.5 h-3.5 stroke-[2.4]" />
          </button>
        </div>
        <div className="pt-2 text-center space-y-4">
          {/* Animated Green Checkmark */}
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center border-2 border-emerald-500/30 shadow-md">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <div>
            <h1 className="font-heading text-xl font-bold text-[#191919]">
              Request received
            </h1>
            <p className="text-xs text-[#82807A] font-medium mt-1 leading-relaxed max-w-xs mx-auto">
              Request <strong className="text-[#191919]">{requestId}</strong> &bull; Project Assessment. Our team replies within 1 business day.
            </p>
          </div>

          {/* Card: What happens next (3 steps) */}
          <div className="p-4 rounded-[22px] liquid-glass-card border border-[#D8D8D8] text-left space-y-3.5 shadow-xs bg-white/90">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#191919] block">
              What Happens Next
            </span>

            <div className="space-y-3 text-xs">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#191919] text-xs">
                    We review your property
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5 leading-snug">
                    Our zoning attorneys and architectural team audit parcel PIN, Title 17 zoning envelope, and allowed density.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#191919] text-xs">
                    A zoning strategist calls you
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5 leading-snug">
                    A principal consultant will contact you via your preferred channel ({preferredContactMethod.toLowerCase()}) with preliminary findings.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#191919] text-xs">
                    You get a quote or free consult offer
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5 leading-snug">
                    Your assessment brief and retainer options will be ready to review in <strong>More &gt; My Quotes</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Request Summary Box */}
          <div className="p-3 rounded-[16px] bg-slate-100/80 border border-slate-200/80 text-left text-xs space-y-1">
            <div className="flex items-center justify-between text-[#82807A] text-[11px]">
              <span>Project Type:</span>
              <span className="font-bold text-[#191919]">{projectType}</span>
            </div>
            <div className="flex items-center justify-between text-[#82807A] text-[11px]">
              <span>Property:</span>
              <span className="font-bold text-[#191919] truncate max-w-[200px]">
                {propertyAddress}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#82807A] text-[11px]">
              <span>Target Budget:</span>
              <span className="font-bold text-[#191919]">{budgetRange}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-6">
          <button
            type="button"
            onClick={() => navigate('/profile?tab=quotes')}
            className="w-full h-12 rounded-full btn-glossy-primary text-xs font-bold text-[#FEFEFE] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <span>Track request</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/construction')}
            className="w-full h-11 rounded-full bg-white border border-[#D8D8D8] text-xs font-bold text-[#191919] hover:bg-slate-50 active:scale-98 transition-all shadow-2xs"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  // ========================================================
  // 4-STEP FORM WIZARD
  // ========================================================
  return (
    <div className="min-h-full flex-1 flex flex-col justify-between text-[#191919] bg-[#F4F5F5]">
      <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full pb-4">
        {/* Step Progress Header */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BackButton onClick={handleBack} ariaLabel="Back" />
              <div>
                <span className="font-bold text-[#191919] uppercase tracking-wider text-[11px] block">
                  STEP {step} OF 4
                </span>
                <span className="text-xs font-bold text-[#82807A] block">
                  {stepNames[step - 1]}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white border border-[#D8D8D8] text-[#555] hover:text-[#191919] hover:bg-slate-100 flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              aria-label="Close Assessment"
              title="Close Assessment"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* 4-part Segmented Progress Bar */}
          <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
            {[1, 2, 3, 4].map((seg) => (
              <div
                key={seg}
                className={`h-full rounded-full transition-all duration-300 ${
                  seg <= step
                    ? 'bg-gradient-to-r from-[#323232] to-[#191919]'
                    : 'bg-[#D8D8D8]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: PROJECT TYPE */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Project Referral Context Card if coming from project detail */}
            {matchedProject && (
              <div className="p-2.5 rounded-[16px] bg-gradient-to-r from-[#7A4B2A]/10 via-white to-[#7A4B2A]/5 border border-[#7A4B2A]/30 flex items-center gap-2.5 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-[#7A4B2A] text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9.5px] font-bold text-[#7A4B2A] uppercase tracking-wider block">
                    Similar to this project
                  </span>
                  <p className="text-xs font-bold text-[#191919] truncate">
                    {matchedProject.name} &bull; {matchedProject.specs.zoningDistrict} &bull;{' '}
                    {matchedProject.specs.units}
                  </p>
                </div>
              </div>
            )}

            {/* Title & Helper */}
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919]">
                What do you want to build?
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5 leading-relaxed">
                Tell us about your idea. We will review it for free and reply within 1 business day.
              </p>
            </div>

            {/* Six Selection Cards (2 columns, icon + title + short line) */}
            <div className="grid grid-cols-2 gap-2.5">
              {projectTypeCards.map((card) => {
                const IconComponent = card.icon;
                const isSelected = projectType === card.id;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setProjectType(card.id)}
                    className={`p-3 rounded-[18px] text-left transition-all active:scale-95 border flex flex-col justify-between min-h-[96px] shadow-2xs relative ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-md ring-2 ring-[#191919]/20'
                        : 'bg-white/90 border-[#D8D8D8] text-[#191919] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#191919]'
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-white text-[#191919] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[2.8]" />
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      <h4
                        className={`font-heading text-xs font-bold leading-tight ${
                          isSelected ? 'text-[#FEFEFE]' : 'text-[#191919]'
                        }`}
                      >
                        {card.title}
                      </h4>
                      <p
                        className={`text-[10px] mt-0.5 leading-snug line-clamp-1 ${
                          isSelected ? 'text-[#FEFEFE]/80' : 'text-[#82807A]'
                        }`}
                      >
                        {card.shortLine}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Property Type Chips */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {['Residential', 'Commercial', 'Mixed-Use', 'Industrial'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                      propertyType === type
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                        : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Do you need zoning approval? Chips */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                Do you need zoning approval?
              </label>
              <div className="flex flex-wrap gap-2">
                {['Yes (variance or rezoning)', 'No', 'Not sure'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setZoningApproval(option)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                      zoningApproval === option
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                        : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY DETAILS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Title & Helper */}
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919]">
                Where is the property?
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5 leading-relaxed">
                Enter the Chicago address and zoning details if you know them.
              </p>
            </div>

            {/* Address Field (Required) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#191919] block">
                Property Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  placeholder="e.g. 2144 N Damen Ave, Chicago, IL 60647"
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#82807A] focus:outline-none focus:ring-2 focus:ring-[#191919]"
                />
                <MapPin className="w-4 h-4 text-[#82807A] absolute right-3.5 top-4 pointer-events-none" />
              </div>
            </div>

            {/* PIN / Parcel Number Field with Info Link */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#191919]">
                  PIN / Parcel Number (Optional)
                </label>
                <button
                  type="button"
                  onClick={() => setShowPinModal(true)}
                  className="text-[11px] font-bold text-[#191919] underline hover:text-[#7A4B2A] transition-colors"
                >
                  Where do I find my PIN?
                </button>
              </div>
              <input
                type="text"
                value={pinNumber}
                onChange={(e) => setPinNumber(e.target.value)}
                placeholder="14-digit Cook County PIN, e.g. 14-31-108-024-0000"
                className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#82807A] focus:outline-none focus:ring-2 focus:ring-[#191919]"
              />
            </div>

            {/* Zoning District Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#191919] block">
                Zoning District
              </label>
              <div className="relative">
                <select
                  value={zoningDistrict}
                  onChange={(e) => setZoningDistrict(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#191919]"
                >
                  <option value="RS-3">RS-3 (Single-Family Residential)</option>
                  <option value="RT-4">RT-4 (Residential Two-Flat / Townhome)</option>
                  <option value="RM-5">RM-5 (Residential Multi-Unit Medium Density)</option>
                  <option value="B3-2">B3-2 (Community Shopping District)</option>
                  <option value="DX-5">DX-5 (Downtown Mixed-Use High Density)</option>
                  <option value="I don't know">I don't know (We will look it up)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#82807A] absolute right-3.5 top-4 pointer-events-none" />
              </div>
            </div>

            {/* Lot Size Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#191919] block">
                Lot Size (Sq Ft)
              </label>
              <input
                type="text"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                placeholder="e.g. 3,125 sq ft (25 x 125)"
                className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#82807A] focus:outline-none focus:ring-2 focus:ring-[#191919]"
              />
            </div>

            {/* Do you own the property? Chips */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                Do you own the property?
              </label>
              <div className="flex flex-wrap gap-2">
                {['Yes I own it', 'Under contract', 'Planning to buy'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setOwnershipStatus(option)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                      ownershipStatus === option
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                        : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* What is on the lot now? Chips */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                What is on the lot now?
              </label>
              <div className="flex flex-wrap gap-2">
                {['Vacant lot', 'Existing building', 'To be demolished'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLotCurrentCondition(option)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                      lotCurrentCondition === option
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                        : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECT GOALS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Title & Helper */}
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919]">
                Tell us about the project
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5 leading-relaxed">
                Rough numbers are fine.
              </p>
            </div>

            {/* Units/Floors & Approx Size */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191919] block">
                  Units / Floors
                </label>
                <input
                  type="text"
                  value={unitsFloors}
                  onChange={(e) => setUnitsFloors(e.target.value)}
                  placeholder="e.g. 3 units, 4 floors"
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#82807A] focus:outline-none focus:ring-2 focus:ring-[#191919]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191919] block">
                  Approx. Size (Sq Ft)
                </label>
                <input
                  type="text"
                  value={approxSize}
                  onChange={(e) => setApproxSize(e.target.value)}
                  placeholder="e.g. 4,500 sq ft"
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#82807A] focus:outline-none focus:ring-2 focus:ring-[#191919]"
                />
              </div>
            </div>

            {/* Budget Range Chips */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                Budget Range
              </label>
              <div className="flex flex-wrap gap-2">
                {['Under $250K', '$250K to $1M', '$1M to $5M', '$5M+', 'Not decided'].map(
                  (range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudgetRange(range)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                        budgetRange === range
                          ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                          : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                      }`}
                    >
                      {range}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* When do you want to start? Chips */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-[#191919] uppercase tracking-wider block">
                When do you want to start?
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Within 3 months',
                  '3 to 6 months',
                  '6 to 12 months',
                  'Just exploring',
                ].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setTimelineStart(time)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                      timelineStart === time
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                        : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Any known problems? Multi-select Chips */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#191919] uppercase tracking-wider">
                  Any known problems?
                </label>
                <span className="text-[10px] text-[#82807A]">Multi-select</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Need a variance',
                  'Zoning denied',
                  'Neighbor objections',
                  'Parking rules',
                  'Height or setback',
                  'None',
                ].map((problem) => {
                  const isSelected = knownProblems.includes(problem);

                  return (
                    <button
                      key={problem}
                      type="button"
                      onClick={() => handleToggleProblem(problem)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                          : 'bg-white/90 text-[#555] border border-[#D8D8D8] hover:bg-white hover:text-[#191919]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[2.8]" />}
                      <span>{problem}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Describe your project Text Box */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#191919]">
                  Describe Your Project *
                </label>
                <span
                  className={`text-[10.5px] font-medium ${
                    projectDescription.trim().length >= 30
                      ? 'text-emerald-600 font-semibold'
                      : 'text-[#82807A]'
                  }`}
                >
                  {projectDescription.trim().length >= 30
                    ? `${projectDescription.trim().length} chars (Good)`
                    : `${projectDescription.trim().length} / 30 min`}
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your parcel PIN, proposed units, architectural ideas, or any zoning challenges..."
                className="w-full p-3.5 rounded-[14px] border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#82807A] focus:outline-none focus:ring-2 focus:ring-[#191919] resize-none leading-relaxed"
              />
              <span className="text-[10.5px] text-[#82807A] block">
                Minimum 30 characters
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SEND */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Title & Helper */}
            <div>
              <h2 className="font-heading text-lg font-bold text-[#191919]">
                Almost done
              </h2>
              <p className="text-xs text-[#82807A] mt-0.5 leading-relaxed">
                Review your details before submitting your free assessment.
              </p>
            </div>

            {/* Contact Card Pre-filled from profile */}
            <div className="p-3.5 rounded-[20px] bg-white border border-[#D8D8D8] shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold text-[#191919] uppercase tracking-wider">
                  Contact Information
                </span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Profile Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[9.5px] text-[#82807A] block font-medium">Name</span>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full font-bold text-[#191919] bg-transparent border-b border-slate-200 focus:outline-none text-xs py-0.5"
                  />
                </div>
                <div>
                  <span className="text-[9.5px] text-[#82807A] block font-medium">Email</span>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full font-bold text-[#191919] bg-transparent border-b border-slate-200 focus:outline-none text-xs py-0.5 truncate"
                  />
                </div>
                <div>
                  <span className="text-[9.5px] text-[#82807A] block font-medium">Phone</span>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full font-bold text-[#191919] bg-transparent border-b border-slate-200 focus:outline-none text-xs py-0.5"
                  />
                </div>
              </div>

              {/* Best way to reach chips */}
              <div className="pt-1 border-t border-slate-100">
                <label className="text-[10.5px] font-bold text-[#191919] block mb-1.5">
                  Best way to reach:
                </label>
                <div className="flex items-center gap-2">
                  {(['Phone', 'Email', 'Video call'] as const).map((method) => {
                    const isSelected = preferredContactMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContactMethod(method)}
                        className={`flex-1 py-1.5 px-2 rounded-full text-[11px] font-bold transition-all shadow-2xs flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                            : 'bg-white text-[#555] border border-[#D8D8D8] hover:bg-slate-50'
                        }`}
                      >
                        {method === 'Phone' ? (
                          <Phone className="w-3 h-3 stroke-[2.2]" />
                        ) : method === 'Email' ? (
                          <Mail className="w-3 h-3 stroke-[2.2]" />
                        ) : (
                          <Video className="w-3 h-3 stroke-[2.2]" />
                        )}
                        <span>{method}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Optional File Upload Box */}
            <div className="p-3.5 rounded-[20px] bg-white border border-dashed border-[#A4B3BE] shadow-2xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-[#191919] flex items-center justify-center flex-shrink-0">
                  <UploadCloud className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[#191919] block truncate">
                    Plat of survey, deed, sketches or photos
                  </span>
                  <span className="text-[10px] text-[#82807A] block">
                    PDF, JPG, PNG, up to 20 MB (Optional)
                  </span>
                </div>
              </div>

              {uploadedFileName ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-[#7A4B2A] flex-shrink-0" />
                    <span className="truncate font-semibold text-[#191919] text-[11.5px]">
                      {uploadedFileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFileName('')}
                    className="p-1 text-[#82807A] hover:text-red-600 transition-colors"
                    aria-label="Remove uploaded file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setUploadedFileName('Plat_of_Survey_Damen_2144.pdf')}
                  className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#191919] transition-all"
                >
                  Browse Files
                </button>
              )}
            </div>

            {/* "Your request" Summary Card with Edit Links */}
            <div className="p-3.5 rounded-[20px] bg-white border border-[#D8D8D8] shadow-2xs space-y-3">
              <span className="text-[10px] font-bold text-[#191919] uppercase tracking-wider block">
                Your Request Summary
              </span>

              {/* Row 1: Project */}
              <div className="flex items-start justify-between gap-2 text-xs pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[9.5px] text-[#82807A] font-bold uppercase block">
                    Project
                  </span>
                  <span className="font-bold text-[#191919] text-xs block">
                    {projectType} &bull; {propertyType}
                  </span>
                  <span className="text-[10.5px] text-[#555] block">
                    {zoningApproval}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#191919] underline hover:text-[#7A4B2A]"
                >
                  Edit
                </button>
              </div>

              {/* Row 2: Property */}
              <div className="flex items-start justify-between gap-2 text-xs pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[9.5px] text-[#82807A] font-bold uppercase block">
                    Property
                  </span>
                  <span className="font-bold text-[#191919] text-xs block truncate max-w-[220px]">
                    {propertyAddress}
                  </span>
                  <span className="text-[10.5px] text-[#555] block">
                    District: {zoningDistrict} &bull; {ownershipStatus} &bull; {lotCurrentCondition}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#191919] underline hover:text-[#7A4B2A]"
                >
                  Edit
                </button>
              </div>

              {/* Row 3: Goals */}
              <div className="flex items-start justify-between gap-2 text-xs">
                <div>
                  <span className="text-[9.5px] text-[#82807A] font-bold uppercase block">
                    Goals
                  </span>
                  <span className="font-bold text-[#191919] text-xs block">
                    {unitsFloors} &bull; {approxSize}
                  </span>
                  <span className="text-[10.5px] text-[#555] block">
                    Budget: {budgetRange} &bull; Starts: {timelineStart}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-bold text-[#191919] underline hover:text-[#7A4B2A]"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Checkbox: Terms and Privacy Policy */}
            <div className="flex items-start gap-2.5 pt-1 px-1">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#191919] focus:ring-[#191919] cursor-pointer"
              />
              <label
                htmlFor="terms-checkbox"
                className="text-xs text-[#555] leading-relaxed cursor-pointer select-none"
              >
                I agree to the <span className="underline font-semibold text-[#191919]">Terms</span> and{' '}
                <span className="underline font-semibold text-[#191919]">Privacy Policy</span> for free preliminary development review.
              </label>
            </div>

            {/* IOLA Escrow Protection & Confidentiality Card */}
            <div className="p-3 rounded-2xl bg-white/90 border border-emerald-500/20 shadow-2xs flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div>
                <h5 className="font-heading text-xs font-bold text-[#191919]">
                  IOLA Escrow Protection &amp; Confidentiality
                </h5>
                <p className="text-[11px] text-[#82807A] mt-0.5 leading-snug">
                  Protected under Illinois Rules of Professional Conduct &amp; Attorney-Client privilege.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          CONFIRM BUTTON DOCK (Styled matching exact design spec)
      ======================================================== */}
      <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#D8D8D8] px-4 pt-3 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] mt-auto flex-shrink-0">
        <div className="max-w-md mx-auto space-y-2">
          {/* Main Black Pill Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full h-12 px-4 rounded-[16px] bg-[#000000] text-white flex items-center justify-between shadow-md active:scale-98 transition-all hover:bg-[#191919]"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#34D399] stroke-[2.4]" />
              <span className="font-heading font-bold text-[13.5px] tracking-tight">
                {step === 4 ? 'Submit Assessment Request' : 'Continue'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-sm">
              <span>{step === 4 ? 'Free Review' : `Step ${step} of 4`}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>

          {/* Sub-row: Date/Time + Free Rescheduling or Back Link */}
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-medium px-1">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 font-bold text-[#191919] hover:underline active:scale-95 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Back to Step {step - 1}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center gap-1 font-bold text-[#6B7280] hover:text-[#191919] hover:underline active:scale-95 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Back to projects</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#9CA3AF] stroke-[2] flex-shrink-0" />
              <span>{step === 4 ? 'Confidential & privileged' : 'No obligation'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PIN EXPLANATION MODAL */}
      {showPinModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-[340px] rounded-[24px] bg-white border border-white/80 shadow-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-[#191919] flex items-center justify-center">
                    <Info className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h3 className="font-heading text-xs font-bold text-[#191919]">
                    Where to find your PIN?
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-[#82807A] flex items-center justify-center hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-[#555] space-y-2 leading-relaxed">
                <p>
                  A <strong>Property Index Number (PIN)</strong> is a 14-digit number that identifies your parcel in Cook County, Illinois.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                  <span className="font-bold text-[#191919] block">Format:</span>
                  <code className="text-[#191919] font-mono block">XX-XX-XXX-XXX-XXXX</code>
                  <span className="text-[#82807A] block">Example: 14-31-108-024-0000</span>
                </div>
                <p>
                  You can find it on your <strong>property tax bill</strong>, <strong>deed of title</strong>, or by searching your address at{' '}
                  <span className="font-semibold text-[#191919]">cookcountyassessor.com</span>.
                </p>
                <p className="text-[11px] text-[#82807A]">
                  If you don&apos;t know it, leave it blank — our staff will verify the parcel automatically.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-full h-10 rounded-xl btn-glossy-primary text-xs font-bold text-white shadow-xs"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </PhonePortal>
      )}
    </div>
  );
};

export default ProjectAssessmentScreen;
