import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Pencil,
  Camera,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Heart,
  FileText,
  ShieldCheck,
  Bell,
  Headphones,
  CheckSquare,
  LogOut,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Video,
  ExternalLink,
  CreditCard,
  MessageSquare,
  Globe,
  Settings,
  HelpCircle,
  FileCode2,
  Download,
  Lock,
  Paperclip,
  Check,
  AlertCircle,
  Clock,
  User,
  Newspaper,
  PhoneCall,
  Ruler,
  MapPin,
  X,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Appointment } from '../data/cases';
import { SERVICES_DATA } from '../data/services';
import BackButton from '../components/ui/BackButton';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { APP_IMAGES } from '../data/images';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';
import PaymentModal from '../components/features/PaymentModal';
import PhonePortal from '../components/ui/PhonePortal';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    user,
    appointments,
    quotesList,
    acceptAndPayQuote,
    addQuoteRequest,
    tickets,
    createEnquiry,
    invoices,
    payInvoice,
    payOutstandingBalance,
    toggleSavedService,
    toggleSavedProject,
    updateUserProfile,
    showToast,
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    biometricLogin,
    toggleBiometricLogin,
    analyticsSharing,
    toggleAnalyticsSharing,
    notificationSettings,
    toggleNotificationSetting,
  } = useAppStore();

  // Active View navigation
  type ActiveViewType =
    | 'main'
    | 'bookings'
    | 'saved'
    | 'quotes'
    | 'enquiries'
    | 'payments'
    | 'support'
    | 'language'
    | 'settings'
    | 'terms';

  const paramTab = searchParams.get('tab') as ActiveViewType | null;
  const [activeView, setActiveView] = useState<ActiveViewType>('main');

  useEffect(() => {
    if (paramTab && [
      'bookings',
      'saved',
      'quotes',
      'enquiries',
      'payments',
      'support',
      'language',
      'settings',
      'terms',
    ].includes(paramTab)) {
      setActiveView(paramTab);
    } else {
      setActiveView('main');
    }
  }, [paramTab]);

  const paramCategory = searchParams.get('category');
  useEffect(() => {
    if (paramCategory === 'zoning' || paramCategory === 'construction') {
      setBookingDivisionFilter(paramCategory);
    }
  }, [paramCategory]);

  // Sub-filters for views
  const [savedFilter, setSavedFilter] = useState<'all' | 'services' | 'construction'>('all');
  const [bookingFilter, setBookingFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [bookingDivisionFilter, setBookingDivisionFilter] = useState<'all' | 'zoning' | 'construction'>('all');
  const [summaryAppointment, setSummaryAppointment] = useState<Appointment | null>(null);
  const [quoteFilter, setQuoteFilter] = useState<'all' | 'Approved' | 'In Review' | 'Accepted & Paid'>('all');
  const [invoiceFilter, setInvoiceFilter] = useState<'all' | 'Due' | 'Paid'>('all');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [company, setCompany] = useState(user.company);

  // New Enquiry Form Modal State
  const [showEnquiryModal, setShowEnquiryModal] = useState(searchParams.get('action') === 'new');
  const [enquiryTopic, setEnquiryTopic] = useState('ZBA Hearing & Aldermanic Rapport');
  const [enquiryCase, setEnquiryCase] = useState('WW-2026-0842 (Damen Ave)');
  const [enquiryPriority, setEnquiryPriority] = useState<'Low' | 'Normal' | 'Urgent'>('Normal');
  const [enquirySubject, setEnquirySubject] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquiryAttachment, setEnquiryAttachment] = useState('');

  // New Quote Request Modal State
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [newQuoteService, setNewQuoteService] = useState('Rear Yard Setback Variance & ZBA Representation');
  const [newQuoteAddress, setNewQuoteAddress] = useState('2144 N. Damen Ave, Chicago, IL 60647');
  const [newQuoteScope, setNewQuoteScope] = useState('');

  // Password Change Modal State in Settings
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Payment Modal State
  const [paymentData, setPaymentData] = useState<{
    isOpen: boolean;
    title: string;
    itemTitle: string;
    itemCode?: string;
    amount: number;
    onSuccess: () => void;
  }>({
    isOpen: false,
    title: '',
    itemTitle: '',
    itemCode: '',
    amount: 0,
    onSuccess: () => {},
  });

  // Terms & Privacy expanded states
  const [expandedTerm, setExpandedTerm] = useState<string | null>('privacy');

  const handleOpenView = (view: ActiveViewType) => {
    setActiveView(view);
    setSearchParams({ tab: view });
  };

  const handleBackToMain = () => {
    setActiveView('main');
    setSearchParams({});
  };

  const handleSaveProfile = () => {
    updateUserProfile({ name, email, phone, company });
    setIsEditing(false);
    showToast('Profile information updated');
  };

  // Helper for project image
  const getProjectImage = (imageKey: string) => {
    const asset = APP_IMAGES[imageKey];
    return asset?.src || APP_IMAGES.heroChicagoSkyline.src;
  };

  // Filtered Saved Items
  const savedServices = SERVICES_DATA.filter((s) =>
    (user.savedServiceIds || []).includes(s.id)
  );
  const savedProjects = PORTFOLIO_PROJECTS.filter((p) =>
    (user.savedProjectIds || []).includes(p.id)
  );
  const totalSavedCount = savedServices.length + savedProjects.length;

  // Filtered Bookings: Upcoming and Past
  const upcomingAppointments = appointments.filter((app) => app.status !== 'Completed');
  const pastAppointments = appointments.filter((app) => app.status === 'Completed');
  const currentTabAppointments = bookingFilter === 'upcoming' ? upcomingAppointments : pastAppointments;

  const filteredAppointments = currentTabAppointments.filter((app) => {
    if (bookingDivisionFilter === 'all') return true;
    if (bookingDivisionFilter === 'construction') {
      return app.serviceCategory === 'construction';
    }
    return (app.serviceCategory || 'zoning') === 'zoning';
  });

  // Filtered Quotes
  const filteredQuotes = quotesList.filter((q) => {
    if (quoteFilter === 'all') return true;
    return q.status === quoteFilter;
  });

  // Filtered Invoices & Balance
  const totalOutstandingBalance = invoices
    .filter((inv) => inv.status === 'Due')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const filteredInvoices = invoices.filter((inv) => {
    if (invoiceFilter === 'all') return true;
    return inv.status === invoiceFilter;
  });

  // Handle Enquiry Submission
  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquirySubject.trim() || !enquiryMessage.trim()) return;

    const newTicketId = createEnquiry({
      topic: enquiryTopic,
      relatedCase: enquiryCase,
      priority: enquiryPriority,
      subject: enquirySubject,
      message: enquiryMessage,
      attachment: enquiryAttachment || undefined,
    });

    setShowEnquiryModal(false);
    setEnquirySubject('');
    setEnquiryMessage('');
    setEnquiryAttachment('');

    // Open ticket page with live chat
    navigate(`/chat?ticketId=${encodeURIComponent(newTicketId)}`);
  };

  // Handle New Quote Request Submission
  const handleSubmitNewQuote = (e: React.FormEvent) => {
    e.preventDefault();
    addQuoteRequest({
      service: newQuoteService,
      address: newQuoteAddress,
      estimateAmount: 1850.0,
      scope: newQuoteScope || 'Preliminary municipal review and zoning analysis request.',
    });
    setShowNewQuoteModal(false);
    setNewQuoteScope('');
  };

  // Handle Password Update in Settings
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated successfully');
  };

  return (
    <div className="min-h-full flex flex-col text-[#191919] bg-transparent pb-28">
      {/* Global Brand AppHeader */}
      <AppHeader title="Client Profile & Settings" />

      {/* ========================================================
          SUB-VIEW 1: MY BOOKINGS (Upcoming & Past Tabs)
      ======================================================== */}
      {activeView === 'bookings' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
              <div>
                <h2 className="font-heading text-base font-bold text-[#191919]">
                  My Bookings
                </h2>
                <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                  Chicago zoning consultations &amp; review sessions
                </span>
              </div>
            </div>
          </div>

          {/* Two Tabs: Upcoming and Past */}
          <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-[#D8D8D8] bg-white/80 w-full">
            <button
              type="button"
              onClick={() => setBookingFilter('upcoming')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all select-none min-h-[34px] ${
                bookingFilter === 'upcoming'
                  ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] shadow-xs'
                  : 'text-[#82807A] hover:text-[#191919]'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </button>
            <button
              type="button"
              onClick={() => setBookingFilter('past')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all select-none min-h-[34px] ${
                bookingFilter === 'past'
                  ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] shadow-xs'
                  : 'text-[#82807A] hover:text-[#191919]'
              }`}
            >
              Past ({pastAppointments.length})
            </button>
          </div>

          {/* Filter Chips: All, Zoning, Construction & Design */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
            <button
              type="button"
              onClick={() => setBookingDivisionFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                bookingDivisionFilter === 'all'
                  ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                  : 'bg-white/80 text-[#82807A] border border-[#D8D8D8] hover:text-[#191919]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setBookingDivisionFilter('zoning')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                bookingDivisionFilter === 'zoning'
                  ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                  : 'bg-white/80 text-[#82807A] border border-[#D8D8D8] hover:text-[#191919]'
              }`}
            >
              Zoning
            </button>
            <button
              type="button"
              onClick={() => setBookingDivisionFilter('construction')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                bookingDivisionFilter === 'construction'
                  ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                  : 'bg-white/80 text-[#82807A] border border-[#D8D8D8] hover:text-[#191919]'
              }`}
            >
              Construction &amp; Design
            </button>
          </div>

          {/* Bookings List */}
          <div className="space-y-3">
            {filteredAppointments.length === 0 ? (
              <div className="p-8 text-center liquid-glass-card rounded-[22px] border border-[#D8D8D8] space-y-2">
                <Calendar className="w-10 h-10 text-[#82807A] mx-auto opacity-50" />
                <h3 className="font-heading text-sm font-bold text-[#191919]">
                  {bookingDivisionFilter === 'construction'
                    ? 'No construction bookings yet'
                    : bookingDivisionFilter === 'zoning'
                    ? 'No zoning bookings yet'
                    : bookingFilter === 'upcoming'
                    ? 'No upcoming consultations'
                    : 'No past consultations'}
                </h3>
                <p className="text-xs text-[#82807A]">
                  {bookingDivisionFilter === 'construction'
                    ? 'Explore our architectural design consultations, new construction planning, or permit drawing services.'
                    : bookingDivisionFilter === 'zoning'
                    ? 'Select any service from the Services tab to book a 1-on-1 strategy session.'
                    : bookingFilter === 'upcoming'
                    ? 'Select any service from the Services tab to book a 1-on-1 strategy session.'
                    : 'Your completed consultation sessions and briefs will appear here.'}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="py-2 px-4 rounded-full btn-glossy-primary text-[#FEFEFE] text-xs font-bold shadow-xs active:scale-95"
                  >
                    Browse Services
                  </button>
                </div>
              </div>
            ) : (
              filteredAppointments.map((app) => {
                const isConstruction = app.serviceCategory === 'construction';
                const normType = (app.type || 'Video').toLowerCase();
                const isSiteVisit = normType.includes('site');
                const isOffice = normType.includes('office');
                const isPhone = normType.includes('phone');
                const isVideo = normType.includes('video');

                const formatLabel =
                  app.type === 'In-office' || app.type === 'Office'
                    ? 'Office'
                    : app.type;

                const amountText = app.amountPaid
                  ? app.amountPaid % 1 === 0
                    ? app.amountPaid.toFixed(0)
                    : app.amountPaid.toFixed(2)
                  : '450.00';

                return (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-2xs space-y-3"
                  >
                    {/* Top Row: Category Tag & Format / Status Tag */}
                    <div className="flex items-center justify-between gap-2">
                      {isConstruction ? (
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#7A4B2A]/15 text-[#7A4B2A] border border-[#7A4B2A]/30 tracking-wider">
                          CONSTRUCTION &amp; DESIGN
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-[#555] border border-slate-200 tracking-wider">
                          ZONING
                        </span>
                      )}

                      {bookingFilter === 'upcoming' ? (
                        <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 text-[#191919]">
                          {formatLabel}
                        </span>
                      ) : (
                        <span className="text-[9.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 tracking-wider">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    {/* Icon & Service Info */}
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5 ${
                          isConstruction
                            ? 'bg-[#7A4B2A] text-white'
                            : 'bg-[#191919] text-white'
                        }`}
                      >
                        {isConstruction ? (
                          isSiteVisit ? (
                            <MapPin className="w-4 h-4 stroke-[2]" />
                          ) : isOffice ? (
                            <Building2 className="w-4 h-4 stroke-[2]" />
                          ) : (
                            <Ruler className="w-4 h-4 stroke-[2]" />
                          )
                        ) : isPhone ? (
                          <Phone className="w-4 h-4 stroke-[2]" />
                        ) : isOffice ? (
                          <Building2 className="w-4 h-4 stroke-[2]" />
                        ) : (
                          <Video className="w-4 h-4 stroke-[2]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9.5px] font-bold text-[#82807A] uppercase tracking-wide block truncate">
                          {app.serviceCode || app.caseNumber || 'WW-2026-0842'}
                        </span>
                        <h4 className="font-heading text-xs font-bold text-[#191919] leading-snug">
                          {app.title}
                        </h4>
                      </div>
                    </div>

                    {/* Construction Specific Details: Property & Package */}
                    {isConstruction && (
                      <div className="p-2 rounded-[12px] bg-white/60 border border-[#E5E5E5] space-y-1 text-[11px] text-[#555]">
                        {app.propertyAddress && (
                          <div className="flex items-start gap-1.5">
                            <span className="font-bold text-[#191919] flex-shrink-0">
                              Property:
                            </span>
                            <span className="truncate text-[#333]">
                              {app.propertyAddress}
                            </span>
                          </div>
                        )}
                        {app.packageDetails && (
                          <div className="flex items-start gap-1.5">
                            <span className="font-bold text-[#191919] flex-shrink-0">
                              Package:
                            </span>
                            <span className="text-[#333] font-medium">
                              {app.packageDetails}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Scheduled Date & Time Details Box */}
                    <div className="p-2.5 rounded-[12px] bg-white/80 border border-[#D8D8D8]/70 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[9.5px] text-[#82807A] font-medium block">
                          Scheduled Date &amp; Time
                        </span>
                        <span className="font-bold text-[#191919] text-[11px] mt-0.5 block">
                          {app.date} &bull; {app.time}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9.5px] text-[#82807A] font-medium block">
                          {app.expertRole ||
                            (isConstruction
                              ? 'Assigned Architect'
                              : 'Assigned Counsel')}
                        </span>
                        <span className="font-bold text-[#191919] text-[11px] mt-0.5 block truncate max-w-[140px]">
                          {app.expertName}
                        </span>
                      </div>
                    </div>

                    {/* Footer: Paid Amount on Left, Buttons on Right */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#D8D8D8]/60">
                      <span className="text-xs font-bold text-emerald-600">
                        Paid ${amountText}
                      </span>

                      {bookingFilter === 'upcoming' ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              showToast(
                                isConstruction
                                  ? 'Reschedule request sent to your assigned architect.'
                                  : 'Reschedule request sent to your zoning counsel.'
                              )
                            }
                            className="py-1.5 px-2.5 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-[10.5px] font-bold hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
                          >
                            Reschedule
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const confirmed = window.confirm(
                                'Cancel this consultation?'
                              );
                              if (confirmed) {
                                showToast('Consultation cancelled successfully.');
                              }
                            }}
                            className="py-1.5 px-2.5 rounded-full bg-white border border-[#D8D8D8] text-red-600 text-[10.5px] font-bold hover:bg-red-50 active:scale-95 transition-all shadow-2xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (isSiteVisit) {
                                showToast(
                                  `Opening directions to property: ${
                                    app.propertyAddress ||
                                    '1508 N Talman Ave, Chicago, IL'
                                  }`
                                );
                              } else if (isOffice) {
                                showToast(
                                  'Opening directions to Chicago office: 125 S. Wacker Dr, Suite 1400...'
                                );
                              } else if (isPhone) {
                                showToast(
                                  'Connecting direct phone conference line (+1 312 555-0198)...'
                                );
                              } else {
                                showToast(
                                  'Opening encrypted Google Meet session...'
                                );
                              }
                            }}
                            className="py-1.5 px-3 rounded-full btn-glossy-primary text-[#FEFEFE] text-[10.5px] font-bold shadow-xs active:scale-95 transition-all"
                          >
                            {isSiteVisit || isOffice
                              ? 'Directions'
                              : isPhone
                              ? 'Call now'
                              : 'Join call'}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              showToast(
                                `Downloading receipt for ${
                                  app.serviceCode || app.caseNumber || 'booking'
                                }...`
                              )
                            }
                            className="py-1.5 px-2.5 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-[10.5px] font-bold hover:bg-slate-50 active:scale-95 transition-all shadow-2xs flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 stroke-[2.2]" />
                            <span>Receipt</span>
                          </button>

                          {isConstruction && (
                            <button
                              type="button"
                              onClick={() => setSummaryAppointment(app)}
                              className="py-1.5 px-2.5 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-[10.5px] font-bold hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
                            >
                              Summary
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => navigate('/services')}
                            className="py-1.5 px-3 rounded-full btn-glossy-primary text-[#FEFEFE] text-[10.5px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                          >
                            <span>Book again</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 2: SAVED ITEMS (Existing)
      ======================================================== */}
      {activeView === 'saved' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
              <h2 className="font-heading text-base font-bold text-[#191919]">
                Saved Items
              </h2>
            </div>

            <span className="text-xs font-bold text-[#82807A]">
              {totalSavedCount} Saved
            </span>
          </div>

          {/* Sub-filter chips */}
          <div className="flex gap-1.5 p-0.5 rounded-full bg-white/80 border border-[#D8D8D8] text-xs">
            {[
              { id: 'all' as const, label: `All (${totalSavedCount})` },
              { id: 'services' as const, label: `Services (${savedServices.length})` },
              { id: 'construction' as const, label: `Projects (${savedProjects.length})` },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSavedFilter(f.id)}
                className={`py-1 px-3 rounded-full text-[11px] font-bold transition-all ${
                  savedFilter === f.id
                    ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] shadow-xs'
                    : 'text-[#82807A] hover:text-[#191919]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {totalSavedCount === 0 ? (
            <div className="p-8 text-center liquid-glass-card rounded-[22px] border border-[#D8D8D8] space-y-2">
              <Heart className="w-10 h-10 text-[#82807A] mx-auto opacity-50" />
              <h3 className="font-heading text-sm font-bold text-[#191919]">
                No saved items yet
              </h3>
              <p className="text-xs text-[#82807A]">
                Tap the heart icon on any service or construction project to save it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Saved Services Section */}
              {(savedFilter === 'all' || savedFilter === 'services') && savedServices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919] px-0.5">
                    Saved Services ({savedServices.length})
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {savedServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => navigate(`/services/${service.slug}`)}
                        className="p-2.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                              src={getProjectImage(service.imageKey)}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSavedService(service.id);
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center"
                              aria-label="Remove from saved"
                            >
                              <Heart className="w-3 h-3 fill-[#323232] text-[#323232]" />
                            </button>
                          </div>

                          <span className="text-[9px] font-bold text-[#323232] uppercase block mt-1.5 truncate">
                            {service.category}
                          </span>
                          <h5 className="font-heading text-[11px] font-bold text-[#191919] leading-snug line-clamp-2 mt-0.5">
                            {service.title}
                          </h5>
                        </div>

                        <span className="text-[10px] font-bold text-[#323232] mt-2 block">
                          View details &rarr;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Construction Projects Section */}
              {(savedFilter === 'all' || savedFilter === 'construction') && savedProjects.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919] px-0.5">
                    Saved Construction Projects ({savedProjects.length})
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {savedProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => navigate(`/construction/${project.id}`)}
                        className="p-2.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                              src={getProjectImage(project.imageKey)}
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSavedProject(project.id);
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center"
                              aria-label="Remove from saved"
                            >
                              <Heart className="w-3 h-3 fill-[#323232] text-[#323232]" />
                            </button>
                          </div>

                          <span className="text-[9px] font-bold text-[#82807A] uppercase block mt-1.5 truncate">
                            {project.neighborhood}
                          </span>
                          <h5 className="font-heading text-[11px] font-bold text-[#191919] leading-snug line-clamp-2 mt-0.5">
                            {project.name}
                          </h5>
                        </div>

                        <span className="text-[10px] font-bold text-[#323232] mt-2 block">
                          View project &rarr;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 3: MY QUOTES (Renamed & Enhanced)
      ======================================================== */}
      {activeView === 'quotes' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
              <div>
                <h2 className="font-heading text-base font-bold text-[#191919]">
                  My Quotes
                </h2>
                <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                  Official municipal estimates &amp; retainer authorizations
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowNewQuoteModal(true)}
              className="py-1.5 px-3 rounded-full btn-glossy-primary text-[10.5px] font-bold text-[#FEFEFE] shadow-2xs active:scale-95 flex-shrink-0"
            >
              Request quote
            </button>
          </div>

          {/* Sub-filters */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all' as const, label: 'All Quotes' },
              { id: 'Approved' as const, label: 'Approved' },
              { id: 'In Review' as const, label: 'In Review' },
              { id: 'Accepted & Paid' as const, label: 'Accepted' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setQuoteFilter(f.id)}
                className={`py-1 px-3 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                  quoteFilter === f.id
                    ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] shadow-xs'
                    : 'bg-white/80 border border-[#D8D8D8] text-[#82807A] hover:text-[#191919]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Quotes List */}
          <div className="space-y-3">
            {filteredQuotes.length === 0 ? (
              <div className="p-8 text-center liquid-glass-card rounded-[22px] border border-[#D8D8D8] space-y-2">
                <FileText className="w-10 h-10 text-[#82807A] mx-auto opacity-50" />
                <h3 className="font-heading text-sm font-bold text-[#191919]">
                  No quotes found
                </h3>
                <p className="text-xs text-[#82807A]">
                  Request an official preliminary zoning assessment and fee estimate.
                </p>
              </div>
            ) : (
              filteredQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#323232] bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 px-2 py-0.5 rounded-full uppercase">
                        {q.quoteNumber}
                      </span>
                    </div>

                    <span
                      className={`text-[9.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        q.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : q.status === 'Accepted & Paid'
                          ? 'bg-[#191919] text-white'
                          : q.quoteNumber.startsWith('#AS-')
                          ? 'bg-[#7A4B2A]/15 text-[#7A4B2A] border border-[#7A4B2A]/30'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {q.quoteNumber.startsWith('#AS-') ? 'Assessment · In review' : q.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919]">
                      {q.service}
                    </h4>
                    <p className="text-[11px] text-[#82807A] font-medium truncate mt-0.5">
                      {q.address}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-[12px] bg-white/80 border border-[#D8D8D8]/70 text-xs">
                    <span className="text-[9.5px] font-bold text-[#82807A] uppercase block mb-0.5">
                      Scope of Services
                    </span>
                    <p className="text-[#191919] text-[11px] leading-relaxed line-clamp-2">
                      {q.scope}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[9.5px] text-[#82807A] uppercase font-bold block">
                        {q.estimateAmount === 0 ? 'Assessment Fee' : 'Estimate Amount'}
                      </span>
                      <span className="font-heading text-sm font-extrabold text-[#191919]">
                        {q.estimateAmount === 0 ? 'Free Initial Review' : `$${q.estimateAmount.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => showToast(`Downloaded ${q.quoteNumber}_Assessment.pdf`)}
                        className="py-1.5 px-3 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-[10.5px] font-bold flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition-all shadow-2xs"
                      >
                        <Download className="w-3 h-3 text-[#82807A]" />
                        <span>Download</span>
                      </button>

                      {q.estimateAmount > 0 && q.status !== 'Accepted & Paid' ? (
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentData({
                              isOpen: true,
                              title: `Authorize & Pay Quote`,
                              itemTitle: q.service,
                              itemCode: q.quoteNumber,
                              amount: q.estimateAmount,
                              onSuccess: () => acceptAndPayQuote(q.id),
                            });
                          }}
                          className="py-1.5 px-3.5 rounded-full btn-glossy-primary text-[#FEFEFE] text-[10.5px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                        >
                          <CreditCard className="w-3 h-3" />
                          <span>Accept &amp; pay</span>
                        </button>
                      ) : q.estimateAmount === 0 ? (
                        <span className="py-1.5 px-3 rounded-full bg-slate-100 text-[#191919] text-[10.5px] font-bold border border-slate-200">
                          In Review
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Paid &bull; Retainer Confirmed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 4: MY ENQUIRIES (NEW)
      ======================================================== */}
      {activeView === 'enquiries' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
              <div>
                <h2 className="font-heading text-base font-bold text-[#191919]">
                  My Enquiries
                </h2>
                <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                  Support tickets &amp; direct legal assistance
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowEnquiryModal(true)}
              className="py-1.5 px-3 rounded-full btn-glossy-primary text-[10.5px] font-bold text-[#FEFEFE] shadow-2xs active:scale-95 flex-shrink-0"
            >
              Raise enquiry
            </button>
          </div>

          {/* Ticket List */}
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => navigate(`/chat?ticketId=${encodeURIComponent(t.id)}`)}
                className="p-3.5 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-2xs hover:border-[#A3B4C0] transition-all cursor-pointer group space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#191919] bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 px-2 py-0.5 rounded-full">
                      {t.id}
                    </span>
                    <span className="text-[9.5px] font-semibold text-[#82807A]">
                      &bull; {t.priority}
                    </span>
                  </div>

                  <span
                    className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      t.status === 'Open'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {t.status === 'Open' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    <span>{t.status}</span>
                  </span>
                </div>

                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919] group-hover:text-[#323232] transition-colors">
                    {t.subject}
                  </h4>
                  <p className="text-[11px] text-[#82807A] mt-0.5 line-clamp-1">
                    Topic: {t.topic} {t.relatedCase && `(${t.relatedCase})`}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D8D8D8]/60 flex items-center justify-between text-[10.5px]">
                  <div className="flex items-center gap-1 text-[#71717A]">
                    <User className="w-3 h-3 text-[#323232]" />
                    <span>{t.assignedConsultant.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#8C9DAA] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{t.lastReplyTime}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 5: PAYMENTS & INVOICES (NEW)
      ======================================================== */}
      {activeView === 'payments' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center gap-2">
            <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919]">
                Payments &amp; Invoices
              </h2>
              <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                Billing balance, receipts &amp; Cook County filings
              </span>
            </div>
          </div>

          {/* Outstanding Balance Card with "Pay now" */}
          <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#323232] via-[#242424] to-[#191919] text-[#FEFEFE] shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7D3DC]">
                Total Outstanding Balance
              </span>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                Due Dec 01, 2026
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-black tracking-tight text-white">
                ${totalOutstandingBalance.toFixed(2)}
              </span>
              <span className="text-xs text-[#A4B3BE]">
                ({invoices.filter((i) => i.status === 'Due').length} invoices pending)
              </span>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[10px] text-[#A4B3BE]">
                Secure escrow trust account &bull; JPMorgan Chase
              </span>

              {totalOutstandingBalance > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setPaymentData({
                      isOpen: true,
                      title: 'Pay Outstanding Balance',
                      itemTitle: 'Total Pending Invoices Balance',
                      itemCode: 'WW-BAL-2026',
                      amount: totalOutstandingBalance,
                      onSuccess: payOutstandingBalance,
                    });
                  }}
                  className="py-1.5 px-4 rounded-full bg-white text-[#191919] font-heading font-bold text-xs hover:bg-white/95 active:scale-95 transition-all shadow-md"
                >
                  Pay now
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>All Paid Up</span>
                </span>
              )}
            </div>
          </div>

          {/* Invoices List with Filters */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A]">
                Invoice History
              </span>

              <div className="flex gap-1 p-0.5 rounded-full bg-white/80 border border-[#D8D8D8] text-xs">
                {(['all', 'Due', 'Paid'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setInvoiceFilter(st)}
                    className={`py-0.5 px-2.5 rounded-full text-[10.5px] font-bold transition-all ${
                      invoiceFilter === st
                        ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE]'
                        : 'text-[#82807A]'
                    }`}
                  >
                    {st === 'all' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-3.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#191919]">
                        {inv.id}
                      </span>
                      {inv.caseNumber && (
                        <span className="text-[10px] text-[#82807A] ml-2">
                          Case: {inv.caseNumber}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919]">
                      {inv.title}
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] mt-0.5">
                      Billed on {inv.date} &bull; Due: {inv.dueDate}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#D8D8D8]/60">
                    <span className="font-heading text-sm font-extrabold text-[#191919]">
                      ${inv.amount.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => showToast(`Receipt downloaded for ${inv.id}`)}
                        className="py-1 px-2.5 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-[10px] font-bold flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition-all"
                      >
                        <Download className="w-3 h-3 text-[#82807A]" />
                        <span>Receipt</span>
                      </button>

                      {inv.status === 'Due' && (
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentData({
                              isOpen: true,
                              title: `Pay Invoice ${inv.id}`,
                              itemTitle: inv.title,
                              itemCode: inv.id,
                              amount: inv.amount,
                              onSuccess: () => payInvoice(inv.id),
                            });
                          }}
                          className="py-1 px-3 rounded-full btn-glossy-primary text-white text-[10px] font-bold active:scale-95 transition-all shadow-2xs"
                        >
                          Pay invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 6: SUPPORT & VERIFICATION DESK (Enhanced)
      ======================================================== */}
      {activeView === 'support' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center gap-2">
            <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919]">
                Support &amp; Verification Desk
              </h2>
              <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                Direct hotline, legal live chat &amp; formal enquiries
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Card 1: Direct Hotline */}
            <div className="p-4 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-heading text-xs font-bold text-[#191919]">
                    Chicago Direct Counsel Hotline
                  </h3>
                  <p className="text-[11px] text-[#82807A]">
                    Immediate telephone access to our senior zoning attorneys
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#D8D8D8]/60">
                <span className="font-heading font-extrabold text-sm text-[#191919]">
                  {BUSINESS_INFO.phone}
                </span>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="py-1.5 px-4 rounded-full btn-glossy-primary text-white text-xs font-bold active:scale-95 transition-all"
                >
                  Call now
                </a>
              </div>
            </div>

            {/* Card 2: Live Chat */}
            <div className="p-4 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-heading text-xs font-bold text-[#191919]">
                    Advisory Live Chat
                  </h3>
                  <p className="text-[11px] text-[#82807A]">
                    Chat in real-time with your assigned zoning consultant
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#D8D8D8]/60">
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online &bull; Avg response: 5 mins</span>
                </span>

                <button
                  type="button"
                  onClick={() => navigate('/chat')}
                  className="py-1.5 px-4 rounded-full btn-glossy-primary text-white text-xs font-bold active:scale-95 transition-all"
                >
                  Start chat
                </button>
              </div>
            </div>

            {/* Card 3: Raise an Enquiry */}
            <div className="p-4 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-heading text-xs font-bold text-[#191919]">
                    Formal Case Enquiry
                  </h3>
                  <p className="text-[11px] text-[#82807A]">
                    Submit a formal inquiry ticket with files for attorney docketing
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#D8D8D8]/60">
                <span className="text-[11px] text-[#82807A]">
                  Trackable docket ticket
                </span>

                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(true)}
                  className="py-1.5 px-4 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-2xs"
                >
                  Raise enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 7: LANGUAGE SELECTION (NEW)
      ======================================================== */}
      {activeView === 'language' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center gap-2">
            <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919]">
                Language / Idioma
              </h2>
              <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                Select your preferred application language
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-[22px] liquid-glass-card border border-[#D8D8D8] space-y-2">
            {[
              { id: 'English' as const, label: 'English', desc: 'United States &bull; Chicago Municipal Standard' },
              { id: 'Español' as const, label: 'Español', desc: 'Servicio en español para desarrolladores de Chicago' },
            ].map((lang) => {
              const isSelected = language === lang.id;
              return (
                <div
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`p-3.5 rounded-[16px] border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-xs'
                      : 'bg-white/70 border-[#D8D8D8] text-[#191919] hover:bg-white'
                  }`}
                >
                  <div>
                    <h3 className="font-heading text-xs font-bold">
                      {lang.label}
                    </h3>
                    <p className={`text-[10.5px] ${isSelected ? 'text-[#C7D3DC]' : 'text-[#82807A]'}`}>
                      {lang.desc}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-white text-[#191919] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 8: SETTINGS (NEW)
      ======================================================== */}
      {activeView === 'settings' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center gap-2">
            <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919]">
                Settings &amp; Security
              </h2>
              <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                Account credentials, biometric login &amp; alerts
              </span>
            </div>
          </div>

          {/* 1. Account Credentials */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] px-1 block">
              Account Credentials
            </span>
            <div className="rounded-[20px] liquid-glass-card border border-[#D8D8D8] divide-y divide-[#D8D8D8]/50 overflow-hidden shadow-xs">
              <div
                onClick={() => setShowPasswordModal(true)}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919]">
                    Change Password
                  </h4>
                  <p className="text-[10.5px] text-[#82807A]">
                    Last updated 45 days ago &bull; 2FA active
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A]" />
              </div>

              <div
                onClick={() => setIsEditing(true)}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919]">
                    Email Address
                  </h4>
                  <p className="text-[10.5px] text-[#82807A]">
                    {user.email}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#323232]">Edit</span>
              </div>

              <div
                onClick={() => setIsEditing(true)}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919]">
                    Mobile Phone
                  </h4>
                  <p className="text-[10.5px] text-[#82807A]">
                    {user.phone}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#323232]">Edit</span>
              </div>
            </div>
          </div>

          {/* 2. Privacy & Biometrics */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] px-1 block">
              Privacy &amp; Security
            </span>
            <div className="rounded-[20px] liquid-glass-card border border-[#D8D8D8] divide-y divide-[#D8D8D8]/50 overflow-hidden shadow-xs">
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919]">
                    Biometric Authentication
                  </h4>
                  <p className="text-[10.5px] text-[#82807A]">
                    Use FaceID or Fingerprint to unlock client vault
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleBiometricLogin}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    biometricLogin ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      biometricLogin ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919]">
                    Analytics Sharing
                  </h4>
                  <p className="text-[10.5px] text-[#82807A]">
                    Share anonymous usage data to improve zoning tools
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleAnalyticsSharing}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    analyticsSharing ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      analyticsSharing ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#191919]">
                    Dark Mode Appearance
                  </h4>
                  <p className="text-[10.5px] text-[#82807A]">
                    Switch between crisp light glass and deep charcoal
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    darkMode ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      darkMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Notification Toggles */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] px-1 block">
              Notification Preferences
            </span>
            <div className="rounded-[20px] liquid-glass-card border border-[#D8D8D8] divide-y divide-[#D8D8D8]/50 overflow-hidden shadow-xs">
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#191919]">Case Updates</span>
                <button
                  type="button"
                  onClick={() => toggleNotificationSetting('caseUpdates')}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    notificationSettings.caseUpdates ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      notificationSettings.caseUpdates ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#191919]">Hearing Reminders</span>
                <button
                  type="button"
                  onClick={() => toggleNotificationSetting('appointments')}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    notificationSettings.appointments ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      notificationSettings.appointments ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#191919]">Zoning Alerts</span>
                <button
                  type="button"
                  onClick={() => toggleNotificationSetting('zoningAlerts')}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    notificationSettings.zoningAlerts ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      notificationSettings.zoningAlerts ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Sign Out at bottom of settings */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => showToast('Signed out of Alex Sterling session')}
              className="w-full py-2.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold hover:bg-rose-100 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 9: PRIVACY POLICY & TERMS (NEW)
      ======================================================== */}
      {activeView === 'terms' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Sub-screen header with Back Arrow & Title */}
          <div className="flex items-center gap-2">
            <BackButton onClick={handleBackToMain} ariaLabel="Back to Account" />
            <div>
              <h2 className="font-heading text-base font-bold text-[#191919]">
                Privacy Policy &amp; Terms
              </h2>
              <span className="text-[10.5px] text-[#8C9DAA] font-medium">
                Legal disclosures, attorney-client terms &amp; data policies
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'privacy',
                title: 'Privacy Policy',
                content:
                  'Williams & Williams LLC maintains strict attorney-client confidentiality in compliance with Illinois Supreme Court Rule 1.6. Any property surveys, PIN details, and financial disclosures submitted through this portal are encrypted with AES-256 and never shared with third parties without written client authorization.',
              },
              {
                id: 'terms',
                title: 'Terms of Service',
                content:
                  'All preliminary zoning analyses, FAR calculations, and municipal timelines provided through this application constitute advisory consulting and do not guarantee final approval by the Chicago Zoning Board of Appeals (ZBA) or City Council without formal ordinance enactment.',
              },
              {
                id: 'cookies',
                title: 'Data & Cookies',
                content:
                  'This prototype client portal utilizes local device persistence solely to retain your session state, saved cases, and consultation schedule. We do not engage in third-party cross-site advertising or cookie tracking.',
              },
              {
                id: 'contact',
                title: 'Contact for Privacy',
                content:
                  'For inquiries regarding data retention, CCPA rights, or attorney trust account documentation, contact our compliance officer at privacy@williamzoning.com or call 630-635-7688.',
              },
            ].map((section) => {
              const isOpen = expandedTerm === section.id;
              return (
                <div
                  key={section.id}
                  className="rounded-[18px] liquid-glass-card border border-[#D8D8D8] overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedTerm(isOpen ? null : section.id)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2"
                  >
                    <span className="font-heading text-xs font-bold text-[#191919]">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#82807A] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-3.5 pt-1 text-xs text-[#71717A] leading-relaxed border-t border-[#D8D8D8]/70">
                      {section.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN VIEW: MORE SECTION (COMPLETE FINAL STRUCTURE)
      ======================================================== */}
      {activeView === 'main' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* 1. Client Profile Card */}
          <div className="p-4 rounded-[22px] liquid-glass-card border border-[#D8D8D8] shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar with Camera badge */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#323232] via-[#242424] to-[#191919] flex items-center justify-center text-[#FEFEFE] text-lg font-bold shadow-sm ring-2 ring-white flex-shrink-0">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#323232] text-white flex items-center justify-center ring-2 ring-white shadow-2xs">
                    <Camera className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Name, Verified Badge & Role */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-heading text-base font-bold text-[#191919]">
                      {user.name}
                    </h2>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 flex-shrink-0" />
                  </div>

                  <p className="text-xs text-[#82807A] mt-0.5 font-medium">
                    Lead Property Developer
                  </p>

                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#C0D0E1]/30 text-[#323232] border border-[#A4B3BE]/40 text-[10px] font-bold tracking-tight">
                      Verified Chicago Client
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Icon Button */}
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                aria-label="Edit Profile"
                className="w-8 h-8 rounded-xl bg-white/80 border border-[#D8D8D8] text-[#82807A] flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-2xs"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Contact Details (Company, Email, Phone) */}
            <div className="pt-2 border-t border-[#D8D8D8]/60 space-y-1.5 text-xs text-[#82807A]">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#82807A] flex-shrink-0" />
                <span className="truncate">{user.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#82807A] flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#82807A] flex-shrink-0" />
                <span>{user.phone}</span>
              </div>
            </div>

            {/* Inline Profile Editing Drawer */}
            {isEditing && (
              <div className="pt-3 border-t border-[#D8D8D8]/60 space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#82807A] uppercase tracking-wider mb-0.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 rounded-[10px] border border-[#D8D8D8] bg-white/90 text-xs text-[#191919]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#82807A] uppercase tracking-wider mb-0.5">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full h-9 px-3 rounded-[10px] border border-[#D8D8D8] bg-white/90 text-xs text-[#191919]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#82807A] uppercase tracking-wider mb-0.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-9 px-3 rounded-[10px] border border-[#D8D8D8] bg-white/90 text-xs text-[#191919]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="w-full h-9 rounded-full btn-glossy-primary font-semibold text-xs text-[#FEFEFE]"
                >
                  Save Profile
                </button>
              </div>
            )}
          </div>

          {/* 2. ACTIVITY & WORKSPACE (Final Structure) */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] px-1 block">
              Activity &amp; Workspace
            </span>

            <div className="rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-xs divide-y divide-[#D8D8D8]/50 overflow-hidden">
              {/* Row 1: My Bookings (existing) */}
              <div
                onClick={() => handleOpenView('bookings')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      My Bookings
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Scheduled strategy consultations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#82807A]">
                    {appointments.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 3: Saved Items (existing) */}
              <div
                onClick={() => handleOpenView('saved')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Saved Items
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Saved services &amp; construction projects
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#82807A]">
                    {totalSavedCount}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 4: My Quotes (renamed from My Enquiries & Quotes) */}
              <div
                onClick={() => handleOpenView('quotes')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      My Quotes
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Fee estimates, downloads &amp; authorizations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#82807A]">
                    {quotesList.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 5: My Enquiries (NEW) */}
              <div
                onClick={() => handleOpenView('enquiries')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      My Enquiries
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Support tickets &amp; live assistance
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    {tickets.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 6: Payments & Invoices (NEW) */}
              <div
                onClick={() => handleOpenView('payments')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Payments &amp; Invoices
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Outstanding balance &bull; ${totalOutstandingBalance.toFixed(0)} due
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 7: Documents Vault & Deeds (existing) */}
              <div
                onClick={() => navigate('/vault')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Documents Vault &amp; Deeds
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Plats of survey, deeds &amp; ZBA filings
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 3. PREFERENCES & SUPPORT (Final Structure) */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#82807A] px-1 block">
              Preferences &amp; Support
            </span>

            <div className="rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-xs divide-y divide-[#D8D8D8]/50 overflow-hidden">
              {/* Item 1: Notifications (existing) */}
              <div
                onClick={() => navigate('/notifications')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Notifications
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Case alerts &amp; City Council updates
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 2: Zoning Updates (NEW) */}
              <div
                onClick={() => navigate('/news')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Zoning Updates
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Chicago amendments, council rulings &amp; permit news
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 3: FAQ (NEW) */}
              <div
                onClick={() => navigate('/faq')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      FAQ
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Frequently asked questions &amp; ordinances
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 4: Support & Verification Desk (existing) */}
              <div
                onClick={() => handleOpenView('support')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Support &amp; Verification Desk
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Hotline &bull; Live chat &bull; Raise enquiry
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 5: Zoning Readiness Checklist (existing) */}
              <div
                onClick={() => navigate('/checklist')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Zoning Readiness Checklist
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      7-step permit audit for Chicago City Hall
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 6: Language (NEW) */}
              <div
                onClick={() => handleOpenView('language')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Language / Idioma
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Active: {language}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#323232]">
                    {language}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Item 7: Settings (NEW) */}
              <div
                onClick={() => handleOpenView('settings')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#323232] flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Settings
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Security, biometrics, notifications &amp; password
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 8: Privacy Policy & Terms (NEW) */}
              <div
                onClick={() => handleOpenView('terms')}
                className="p-3.5 flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer group active:bg-white/80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#82807A] flex items-center justify-center flex-shrink-0">
                    <FileCode2 className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#191919] leading-tight">
                      Privacy Policy &amp; Terms
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Terms of service, cookies &amp; disclosures
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Item 9: Sign Out (existing, red, at the bottom) */}
              <div
                onClick={() => showToast('Signed out of Alex Sterling session')}
                className="p-3.5 flex items-center justify-between hover:bg-rose-50/50 transition-colors cursor-pointer group active:bg-rose-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E52E3A] flex items-center justify-center flex-shrink-0">
                    <LogOut className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#E52E3A] leading-tight">
                      Sign Out
                    </h4>
                    <p className="text-[10.5px] text-[#82807A] font-medium mt-0.5">
                      Session secured &bull; Alex Sterling
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#82807A] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Legal / Disclaimers Footer */}
          <div className="pt-2 text-center space-y-1 text-[#82807A] flex flex-col items-center">
            <img src="/brand-icon-navy.png" alt="" className="w-5 h-5 object-contain opacity-40 mb-1" />
            <p className="text-[10px]">
              Williams &amp; Williams LLC &bull; Chicago Zoning Specialists
            </p>
            <p className="text-[9px]">
              Version 2.5.0 &bull; Chicago Municipal Advisory Suite
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: RAISE A NEW ENQUIRY (FULL SCREEN INSIDE PHONE)
      ======================================================== */}
      {showEnquiryModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 bg-[#FAFBFC] dark:bg-[#18181A] text-[#191919] dark:text-[#FEFEFE] flex flex-col overflow-hidden animate-in fade-in duration-200">
            {/* Top Header with Back Arrow and Title */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-[#D8D8D8] dark:border-white/10 flex items-center justify-between bg-white/95 dark:bg-[#1C1C1F]/95 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <BackButton onClick={() => setShowEnquiryModal(false)} ariaLabel="Back" />
                <div>
                  <h2 className="font-heading text-base font-bold text-[#191919] dark:text-[#FEFEFE]">
                    Raise a New Enquiry
                  </h2>
                  <span className="text-[10.5px] text-[#8C9DAA]">
                    Direct docket inquiry to Chicago zoning attorneys
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEnquiryModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center active:scale-95"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmitEnquiry} className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div className="p-4 space-y-4 text-xs">
                {/* Topic Select */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Topic *
                  </label>
                  <select
                    value={enquiryTopic}
                    onChange={(e) => setEnquiryTopic(e.target.value)}
                    className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                  >
                    <option value="ZBA Hearing & Aldermanic Rapport">
                      ZBA Hearing &amp; Aldermanic Rapport
                    </option>
                    <option value="Zoning Classification & Permitted Uses">
                      Zoning Classification &amp; Permitted Uses
                    </option>
                    <option value="Building Permit Expediting">
                      Building Permit Expediting
                    </option>
                    <option value="ADU Coach House Ordinance">
                      ADU Coach House Ordinance
                    </option>
                    <option value="Billing & Invoicing">
                      Billing &amp; Invoicing
                    </option>
                  </select>
                </div>

                {/* Related Case (Optional) */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Related Case (Optional)
                  </label>
                  <input
                    type="text"
                    value={enquiryCase}
                    onChange={(e) => setEnquiryCase(e.target.value)}
                    placeholder="e.g. WW-2026-0842 (Damen Ave)"
                    className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                  />
                </div>

                {/* Priority Pills */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Priority Level *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Low', 'Normal', 'Urgent'] as const).map((pri) => (
                      <button
                        key={pri}
                        type="button"
                        onClick={() => setEnquiryPriority(pri)}
                        className={`h-12 rounded-[14px] text-xs font-bold transition-all border ${
                          enquiryPriority === pri
                            ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-xs'
                            : 'bg-white dark:bg-[#202023] border-[#D8D8D8] dark:border-white/10 text-[#82807A] dark:text-[#A0B0BC]'
                        }`}
                      >
                        {pri}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquirySubject}
                    onChange={(e) => setEnquirySubject(e.target.value)}
                    placeholder="e.g. Setback relief clarification for 32nd Ward"
                    className="w-full h-12 rounded-[14px] px-3.5 border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    placeholder="Describe the zoning issue, parcel PIN, or question for our attorneys..."
                    className="w-full p-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] focus:outline-none focus:border-[#191919] resize-none"
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    File Attachment (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const mockFile = prompt('Enter document name (mock):', 'Plat_Of_Survey_Damen_Ave.pdf');
                      if (mockFile) setEnquiryAttachment(mockFile);
                    }}
                    className="w-full h-12 rounded-[14px] border border-dashed border-[#8C9DAA] bg-white/80 dark:bg-white/5 text-xs text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center gap-2 hover:bg-white active:scale-98 transition-all px-3"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="truncate">{enquiryAttachment ? `Attached: ${enquiryAttachment}` : 'Attach survey, plat, or denial letter'}</span>
                  </button>
                </div>
              </div>

              {/* Fixed Submit enquiry button at the bottom */}
              <div className="sticky bottom-0 p-4 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 flex-shrink-0">
                <button
                  type="submit"
                  className="h-[52px] w-full rounded-2xl btn-glossy-primary font-heading font-bold text-sm text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                >
                  <span>Submit enquiry</span>
                </button>
              </div>
            </form>
          </div>
        </PhonePortal>
      )}

      {/* ========================================================
          MODAL: REQUEST A NEW QUOTE
      ======================================================== */}
      {showNewQuoteModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-[360px] max-h-[92%] overflow-y-auto no-scrollbar rounded-[26px] bg-[#FAFBFC] dark:bg-[#18181A] border border-white/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8D8D8] dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <FileText className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                    Request a New Quote
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewQuoteModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitNewQuote} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Service Type *
                  </label>
                  <select
                    value={newQuoteService}
                    onChange={(e) => setNewQuoteService(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs font-semibold text-[#191919] dark:text-[#FEFEFE]"
                  >
                  <option value="Rear Yard Setback Variance & ZBA Representation">
                    Rear Yard Setback Variance &amp; ZBA Representation
                  </option>
                  <option value="Commercial TOD Parking Reduction Petition">
                    Commercial TOD Parking Reduction Petition
                  </option>
                  <option value="Administrative Building Height Adjustment">
                    Administrative Building Height Adjustment
                  </option>
                  <option value="Special Use License (C-District Commercial)">
                    Special Use License (C-District Commercial)
                  </option>
                  <option value="Preliminary Zoning & Permitted Uses Audit">
                    Preliminary Zoning &amp; Permitted Uses Audit
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                  Property Address or PIN *
                </label>
                <input
                  type="text"
                  required
                  value={newQuoteAddress}
                  onChange={(e) => setNewQuoteAddress(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                  Proposed Work Scope &amp; Goals
                </label>
                <textarea
                  rows={3}
                  value={newQuoteScope}
                  onChange={(e) => setNewQuoteScope(e.target.value)}
                  placeholder="Detail parcel expansion, parking relief, or structural plans..."
                  className="w-full p-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[52px] rounded-2xl btn-glossy-primary font-heading font-bold text-xs text-[#FEFEFE] flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
                >
                  <span>Submit quote request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </PhonePortal>
    )}

      {/* ========================================================
          MODAL: CHANGE PASSWORD (Settings)
      ======================================================== */}
      {showPasswordModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-[360px] rounded-[24px] bg-[#FAFBFC] dark:bg-[#18181A] border border-white/80 dark:border-white/10 shadow-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8D8D8] dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#191919] dark:text-[#FEFEFE]" />
                  <h3 className="font-heading text-sm font-bold text-[#191919] dark:text-[#FEFEFE]">
                    Change Password
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#191919] dark:text-[#E0E0E0] mb-1.5 block">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-3.5 rounded-[14px] border border-[#D8D8D8] dark:border-white/10 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-[#FEFEFE]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-[52px] rounded-2xl btn-glossy-primary font-heading font-bold text-xs text-[#FEFEFE] flex items-center justify-center shadow-md active:scale-98 transition-all"
                  >
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </PhonePortal>
      )}

      {/* ========================================================
          MODAL: CONSULTATION SUMMARY & DELIVERABLES (Past Construction)
      ======================================================== */}
      {summaryAppointment && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-[360px] rounded-[24px] bg-[#FAFBFC] dark:bg-[#18181A] border border-white/80 dark:border-white/10 shadow-2xl p-4 sm:p-5 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8D8D8] dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#7A4B2A] text-white flex items-center justify-center">
                    <Ruler className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-bold text-[#191919] dark:text-[#FEFEFE]">
                      Consultation Summary
                    </h3>
                    <span className="text-[10px] text-[#82807A] font-medium block">
                      {summaryAppointment.serviceCode || 'WW-CON'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSummaryAppointment(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 text-[#82807A] dark:text-[#A0B0BC] flex items-center justify-center hover:bg-slate-200 transition-all"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>

              {/* Service & Expert Details */}
              <div className="p-3 rounded-2xl bg-white dark:bg-[#202023] border border-[#E5E5E5] dark:border-white/10 space-y-2 text-xs">
                <div>
                  <span className="text-[9.5px] font-bold text-[#82807A] uppercase tracking-wide block">
                    Service
                  </span>
                  <span className="font-heading font-bold text-[#191919] dark:text-[#FEFEFE] text-xs">
                    {summaryAppointment.title}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-white/5 text-[11px]">
                  <div>
                    <span className="text-[9.5px] text-[#82807A] block">Date & Time</span>
                    <span className="font-semibold text-[#191919] dark:text-[#E0E0E0]">
                      {summaryAppointment.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-[#82807A] block">Assigned Architect</span>
                    <span className="font-semibold text-[#191919] dark:text-[#E0E0E0] truncate block">
                      {summaryAppointment.expertName}
                    </span>
                  </div>
                </div>
                {summaryAppointment.propertyAddress && (
                  <div className="pt-1 border-t border-slate-100 dark:border-white/5 text-[11px]">
                    <span className="text-[9.5px] text-[#82807A] block">Property</span>
                    <span className="font-medium text-[#191919] dark:text-[#E0E0E0]">
                      {summaryAppointment.propertyAddress}
                    </span>
                  </div>
                )}
              </div>

              {/* Written Notes */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#191919] dark:text-[#FEFEFE] uppercase tracking-wider block">
                  Architect Notes &amp; Findings
                </span>
                <div className="p-3 rounded-2xl bg-white dark:bg-[#202023] border border-[#E5E5E5] dark:border-white/10 text-xs text-[#444] dark:text-[#CCC] leading-relaxed">
                  {summaryAppointment.summaryNotes ||
                    'Completed 4K exterior daylight/twilight renderings and zoning envelope animation for West Loop mixed-use submission. All Chicago DOB massing and setback clearance checks verified.'}
                </div>
              </div>

              {/* Deliverables / Design Files */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#191919] dark:text-[#FEFEFE] uppercase tracking-wider block">
                  Design Deliverables
                </span>
                <div className="space-y-1.5">
                  {(summaryAppointment.deliverables && summaryAppointment.deliverables.length > 0
                    ? summaryAppointment.deliverables
                    : [
                        'Rendering_Package_Randolph_St.pdf',
                        'Zoning_Envelope_3D_Schematic.dwg',
                      ]
                  ).map((file, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#202023] border border-[#E5E5E5] dark:border-white/10 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileCode2 className="w-4 h-4 text-[#7A4B2A] flex-shrink-0" />
                        <span className="truncate font-medium text-[#191919] dark:text-[#FEFEFE] text-[11.5px]">
                          {file}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Downloading ${file}...`)}
                        className="py-1 px-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#191919] dark:text-white text-[10.5px] font-bold flex items-center gap-1 flex-shrink-0 transition-all active:scale-95"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSummaryAppointment(null)}
                  className="w-full h-11 rounded-2xl btn-glossy-primary font-heading font-bold text-xs text-[#FEFEFE] flex items-center justify-center shadow-md active:scale-98 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </PhonePortal>
      )}

      {/* Reusable Payment Screen Modal for Quotes & Invoices */}
      <PaymentModal
        isOpen={paymentData.isOpen}
        onClose={() => setPaymentData((prev) => ({ ...prev, isOpen: false }))}
        title={paymentData.title}
        itemTitle={paymentData.itemTitle}
        itemCode={paymentData.itemCode}
        amount={paymentData.amount}
        onSuccess={paymentData.onSuccess}
      />
    </div>
  );
};

export default ProfileScreen;
