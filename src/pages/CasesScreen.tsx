import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  ChevronRight,
  Headphones,
  MapPin,
  Plus,
  FileCheck2,
  FolderCheck,
  Building2,
  AlertCircle,
  X,
  ArrowLeft,
  FileText,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import PhonePortal from '../components/ui/PhonePortal';

export const CasesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cases, activeCaseFilter, setActiveCaseFilter, addCase, showToast, user } = useAppStore();

  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState('2144 N. Damen Ave, Chicago, IL 60647');
  const [caseType, setCaseType] = useState('ZBA Variance Representation');
  const [caseDescription, setCaseDescription] = useState('');
  const [contactPhone, setContactPhone] = useState(user.phone || '(312) 555-0198');

  const activeCases = cases.filter((c) => c.category === 'Active');
  const pastCases = cases.filter((c) => c.category === 'Completed');

  const getStatusVariant = (status: string): 'solid-primary' | 'solid-success' | 'solid-danger' => {
    switch (status) {
      case 'Approved':
        return 'solid-success';
      case 'Denied':
        return 'solid-danger';
      case 'Hearing Scheduled':
      case 'Under Review':
      default:
        return 'solid-primary';
    }
  };

  const handleStartCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyAddress.trim()) return;

    const newCaseNum = `WW-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    addCase({
      caseNumber: newCaseNum,
      title: `${caseType} - ${propertyAddress.split(',')[0]}`,
      type: caseType,
      category: 'Active',
      status: 'Under Review',
      address: propertyAddress,
      nextDate: 'Dec 12, 2026',
      nextEventTitle: 'Initial Ordinance Docketing',
      imageKey: 'serviceZoningAnalysis',
      assignedExpert: {
        name: 'Marcus Vance, Esq.',
        role: 'Lead Zoning Counsel',
        phone: '630-635-7688',
        avatarKey: 'aboutFounder',
      },
      timeline: [
        {
          id: 'step-1',
          stage: 'Application Intake & PIN Verification',
          date: 'Today',
          completed: true,
          notes: 'Case dossier logged for Chicago municipal review.',
        },
        {
          id: 'step-2',
          stage: 'City Hall Docketing & Hearing Assignment',
          date: 'Pending',
          current: true,
          notes: 'Awaiting City of Chicago DOB / ZBA calendar confirmation.',
        },
      ],
      documents: [
        {
          id: 'doc-1',
          name: 'Case_Intake_Summary.pdf',
          size: '1.2 MB',
          uploadDate: 'Today',
          status: 'Filed',
        },
      ],
      updates: [
        {
          id: 'up-1',
          title: 'Case Request Received',
          date: 'Just now',
          author: 'Marcus Vance, Esq.',
          message: 'Our municipal expediting team has initiated parcel verification with the Cook County Assessor.',
        },
      ],
    });

    setShowNewCaseModal(false);
    setCaseDescription('');
    showToast(`Case request submitted. Docket assigned (${newCaseNum}).`);
  };

  return (
    <div className="min-h-full flex flex-col text-[#191919] dark:text-[#FEFEFE] pb-8">
      {/* Standard AppHeader with single-line title */}
      <AppHeader title="Track Cases" />

      <div className="px-4 py-3 space-y-5">
        {/* Title Header with New Case Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#191919] dark:text-[#FEFEFE] tracking-tight">
              Track Cases
            </h1>
            <p className="text-xs text-[#82807A] dark:text-[#A0B0BC] mt-0.5 font-medium">
              Real-time monitoring of City Hall permits and ZBA hearings.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowNewCaseModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-white btn-glossy-primary px-3.5 py-2 rounded-full shadow-xs active:scale-95 transition-all flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Case</span>
          </button>
        </div>

        {/* Segmented Filter Control: Active / Past Archive */}
        <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-[#D8D8D8] dark:border-white/10 bg-white/80 dark:bg-white/5">
          <button
            type="button"
            onClick={() => setActiveCaseFilter('Active')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all select-none min-h-[36px] ${
              activeCaseFilter === 'Active'
                ? 'btn-glossy-primary text-white shadow-sm'
                : 'text-[#82807A] dark:text-[#A0B0BC] hover:text-[#191919]'
            }`}
          >
            Active Cases ({activeCases.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCaseFilter('Completed')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all select-none min-h-[36px] ${
              activeCaseFilter === 'Completed'
                ? 'btn-glossy-primary text-white shadow-sm'
                : 'text-[#82807A] dark:text-[#A0B0BC] hover:text-[#191919]'
            }`}
          >
            Past Archive ({pastCases.length})
          </button>
        </div>

        {/* Section 1: Upcoming / Active Cases */}
        {activeCaseFilter === 'Active' && (
          <section aria-label="Active Cases List" className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#82807A] dark:text-[#A0B0BC] block px-1">
              Active Proceedings ({activeCases.length})
            </span>

            {activeCases.map((c) => (
              <GlassCard
                key={c.id}
                onClick={() => navigate(`/cases/${c.id}`)}
                className="overflow-hidden p-3.5 cursor-pointer group active:scale-[0.99] transition-all bg-white/90 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 shadow-[0_8px_30px_rgba(25,25,25,0.06)] rounded-[24px]"
              >
                <div className="flex flex-col space-y-3">
                  {/* Thumbnail Image with Clean Rounded Frame */}
                  <div className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden bg-[#191919]">
                    <ImageWithFallback
                      imageKey={c.imageKey}
                      aspectRatio="aspect-video h-full w-full"
                      className="group-hover:scale-105 transition-transform duration-500 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                    {/* Case Number Badge - Crisp Light Glass Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-white/95 dark:bg-black/80 backdrop-blur-md text-[#191919] dark:text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-white/60 dark:border-white/20">
                        {c.caseNumber}
                      </span>
                    </div>

                    {/* Status Badge - High Contrast Pill */}
                    <div className="absolute top-2.5 right-2.5">
                      <Badge variant={getStatusVariant(c.status)} size="sm">
                        {c.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Case Content */}
                  <div className="px-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#82807A] dark:text-[#C7D3DC] block">
                        {c.type}
                      </span>
                      <h3 className="font-heading text-[17px] font-bold text-[#191919] dark:text-[#FEFEFE] leading-snug line-clamp-2 mt-0.5">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#82807A] dark:text-[#A0B0BC] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#191919] dark:text-white flex-shrink-0" />
                        <span className="truncate">{c.address}</span>
                      </div>
                    </div>

                    {/* Next Hearing / Event Date Banner */}
                    <div className="bg-[#F8F9FB] dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 rounded-xl p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#323232]/10 dark:bg-white/10 text-[#191919] dark:text-white flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 stroke-[2]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#82807A] dark:text-[#A0B0BC] font-medium block leading-none">
                            Next Event
                          </span>
                          <span className="font-semibold text-[#191919] dark:text-[#FEFEFE] leading-tight mt-0.5 block">
                            {c.nextDate}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </section>
        )}

        {/* Section 2: Completed / Past Cases List */}
        {activeCaseFilter === 'Completed' && (
          <section aria-label="Completed Cases" className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#82807A] dark:text-[#A0B0BC] block px-1">
              Successfully Resolved Cases ({pastCases.length})
            </span>

            {pastCases.map((c) => (
              <GlassCard
                key={c.id}
                onClick={() => navigate(`/cases/${c.id}`)}
                className="p-3 flex items-center gap-3.5 cursor-pointer active:scale-[0.99] transition-all bg-white/90 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 rounded-[20px]"
              >
                <div className="w-16 h-16 rounded-[14px] overflow-hidden flex-shrink-0 bg-[#191919]">
                  <ImageWithFallback
                    imageKey={c.imageKey}
                    aspectRatio="aspect-square w-full h-full"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#82807A] dark:text-[#A0B0BC]">
                      {c.caseNumber}
                    </span>
                    <Badge variant="solid-success" size="sm">
                      {c.status}
                    </Badge>
                  </div>
                  <h4 className="font-heading text-[15px] font-bold text-[#191919] dark:text-[#FEFEFE] truncate mt-0.5">
                    {c.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#82807A] dark:text-[#A0B0BC] mt-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#3FA66B]" />
                    <span className="truncate">{c.nextEventTitle}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#82807A] flex-shrink-0" />
              </GlassCard>
            ))}
          </section>
        )}

        {/* Support Banner */}
        <section aria-label="Need Help Support Card">
          <GlassCard className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-white/90 dark:bg-white/5 rounded-[24px] border border-[#D8D8D8] dark:border-white/10">
            <div className="space-y-1.5 flex-1">
              <h3 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
                Need Hearing Assistance?
              </h3>
              <p className="text-xs text-[#82807A] dark:text-[#A0B0BC] leading-relaxed">
                Connect directly with our municipal attorneys for docket inquiries and City Hall filings.
              </p>
              <div className="pt-2">
                <GlassButton
                  variant="glass"
                  size="sm"
                  onClick={() => navigate('/contact')}
                  className="text-xs font-semibold"
                >
                  Contact Support Desk
                </GlassButton>
              </div>
            </div>

            <div className="w-12 h-12 rounded-2xl btn-glossy-primary flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Headphones className="w-6 h-6 stroke-[2]" />
            </div>
          </GlassCard>
        </section>
      </div>

      {/* ========================================================
          MODAL: NEW CASE REQUEST (Starts case request only - no booking form)
      ======================================================== */}
      {showNewCaseModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 bg-[#FAFBFC] dark:bg-[#18181A] text-[#191919] dark:text-[#FEFEFE] flex flex-col overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-3.5 border-b border-[#D8D8D8] dark:border-white/10 flex items-center justify-between bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] flex items-center justify-center shadow-2xs hover:bg-slate-50 active:scale-95 transition-all"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                </button>
                <div>
                  <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
                    Start Case Request
                  </h2>
                  <span className="text-[10.5px] text-[#8C9DAA]">
                    Initiate city ordinance docketing &amp; variance filings
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowNewCaseModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center active:scale-95"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleStartCaseSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div className="p-4 space-y-4 text-xs">
                {/* Note Banner */}
                <div className="p-3 rounded-[14px] bg-[#C0D0E1]/20 dark:bg-white/5 border border-[#A4B3BE]/40 dark:border-white/10 flex items-center gap-2 text-[11px] text-[#191919] dark:text-[#FEFEFE]">
                  <FolderCheck className="w-4 h-4 text-[#323232] dark:text-[#C7D3DC] flex-shrink-0" />
                  <span>Submits a formal case intake request directly to our principal zoning attorneys.</span>
                </div>

                {/* Property Address */}
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
                    className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                  />
                </div>

                {/* Case Filing Type */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Case Filing Type *
                  </label>
                  <select
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                  >
                    <option value="ZBA Variance Representation">ZBA Variance Representation</option>
                    <option value="Special Use License Application">Special Use License Application</option>
                    <option value="Administrative Relief Petition">Administrative Relief Petition</option>
                    <option value="Building Permit Expediting">Building Permit Expediting</option>
                    <option value="City Council Rezoning Ordinance">City Council Rezoning Ordinance</option>
                    <option value="Zoning Classification Audit">Zoning Classification Audit</option>
                  </select>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                  />
                </div>

                {/* Description / Scope */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Proposed Scope &amp; Particular Hardship (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={caseDescription}
                    onChange={(e) => setCaseDescription(e.target.value)}
                    placeholder="Describe parcel constraints, setback relief requested, or Aldermanic discussions..."
                    className="w-full p-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919] resize-none"
                  />
                </div>
              </div>

              {/* Fixed Bottom Action: Submit Case Request */}
              <div className="sticky bottom-0 p-4 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 flex-shrink-0">
                <button
                  type="submit"
                  className="h-[52px] w-full rounded-2xl btn-glossy-primary font-heading font-bold text-sm text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                >
                  <span>Submit Case Request</span>
                </button>
              </div>
            </form>
          </div>
        </PhonePortal>
      )}
    </div>
  );
};

export default CasesScreen;
