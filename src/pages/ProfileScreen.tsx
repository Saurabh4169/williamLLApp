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
  ArrowLeft,
  Plus,
  Video,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { SERVICES_DATA } from '../data/services';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { APP_IMAGES } from '../data/images';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    user,
    appointments,
    quotes,
    toggleSavedService,
    toggleSavedProject,
    updateUserProfile,
  } = useAppStore();

  // Active View: 'main' (Apex Repair list) | 'bookings' | 'saved' | 'enquiries'
  const paramTab = searchParams.get('tab');
  const [activeView, setActiveView] = useState<'main' | 'bookings' | 'saved' | 'enquiries'>('main');

  useEffect(() => {
    if (paramTab === 'bookings') setActiveView('bookings');
    else if (paramTab === 'saved') setActiveView('saved');
    else if (paramTab === 'enquiries') setActiveView('enquiries');
    else setActiveView('main');
  }, [paramTab]);

  // Sub-filters for views
  const [savedFilter, setSavedFilter] = useState<'all' | 'services' | 'construction'>('all');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'confirmed' | 'completed'>('all');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [company, setCompany] = useState(user.company);

  const handleOpenView = (view: 'bookings' | 'saved' | 'enquiries') => {
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

  // Filtered Bookings
  const filteredAppointments = appointments.filter((app) => {
    if (bookingFilter === 'confirmed') return app.status === 'Confirmed';
    if (bookingFilter === 'completed') return app.status === 'Completed';
    return true;
  });

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] bg-[#F2F3F5] pb-28">
      {/* Top Header */}
      <AppHeader title="Client Profile & Settings" />

      {/* ========================================================
          SUB-VIEW 1: MY BOOKINGS
      ======================================================== */}
      {activeView === 'bookings' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToMain}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1F2A44] hover:text-[#3D4D7C] active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
              <span>Back to Account</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/book-consultation')}
              className="py-1 px-3 rounded-full btn-glossy-navy text-[10.5px] font-bold text-white flex items-center gap-1 shadow-2xs active:scale-95"
            >
              <Plus className="w-3 h-3" />
              <span>Book New</span>
            </button>
          </div>

          {/* Sub-filter chips */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 p-0.5 rounded-full bg-white border border-[#DDE2EA] text-xs">
              {[
                { id: 'all' as const, label: `All (${appointments.length})` },
                { id: 'confirmed' as const, label: 'Confirmed' },
                { id: 'completed' as const, label: 'Completed' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setBookingFilter(f.id)}
                  className={`py-1 px-3 rounded-full text-[11px] font-bold transition-all ${
                    bookingFilter === f.id
                      ? 'bg-[#1F2A44] text-white shadow-2xs'
                      : 'text-[#8A93A6] hover:text-[#1F2A44]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-[10px] font-semibold text-[#8A93A6]">
              Chicago CST
            </span>
          </div>

          {/* Bookings List */}
          <div className="space-y-2.5">
            {filteredAppointments.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-[22px] border border-[#DDE2EA] space-y-2">
                <Calendar className="w-10 h-10 text-[#8A93A6] mx-auto opacity-50" />
                <h3 className="font-heading text-sm font-bold text-[#1F2A44]">
                  No bookings found
                </h3>
                <p className="text-xs text-[#8A93A6]">
                  You have no scheduled consultations matching this filter.
                </p>
              </div>
            ) : (
              filteredAppointments.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-[20px] bg-white border border-[#DDE2EA] shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1F2A44]/5 text-[#1F2A44] flex items-center justify-center">
                        {app.type === 'Video' ? (
                          <Video className="w-4 h-4 text-[#3D4D7C]" />
                        ) : app.type === 'Phone' ? (
                          <Phone className="w-4 h-4 text-[#3D4D7C]" />
                        ) : (
                          <Building2 className="w-4 h-4 text-[#3D4D7C]" />
                        )}
                      </div>
                      <div>
                        <span className="text-[9.5px] font-bold text-[#8A93A6] uppercase tracking-wide block">
                          {app.caseNumber || 'ZONING CONSULTATION'}
                        </span>
                        <h4 className="font-heading text-xs font-bold text-[#1F2A44]">
                          {app.title}
                        </h4>
                      </div>
                    </div>

                    <span
                      className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        app.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-[12px] bg-[#F8F9FB] border border-[#EEF1F6]">
                      <span className="text-[9.5px] text-[#8A93A6] font-medium block">
                        Scheduled Time
                      </span>
                      <span className="font-bold text-[#1F2A44] text-[11px] mt-0.5 block">
                        {app.date} &bull; {app.time}
                      </span>
                    </div>

                    <div className="p-2 rounded-[12px] bg-[#F8F9FB] border border-[#EEF1F6]">
                      <span className="text-[9.5px] text-[#8A93A6] font-medium block">
                        Assigned Specialist
                      </span>
                      <span className="font-bold text-[#1F2A44] text-[11px] mt-0.5 block truncate">
                        {app.expertName}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#8A93A6] truncate max-w-[180px]">
                      {app.location}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href="tel:630-635-7688"
                        className="py-1 px-2.5 rounded-full bg-[#F2F4F8] text-[#1F2A44] text-[10px] font-bold hover:bg-slate-200"
                      >
                        Call Line
                      </a>
                      <button
                        type="button"
                        onClick={() => alert(`Details sent for appointment ${app.id}`)}
                        className="py-1 px-2.5 rounded-full btn-glossy-navy text-white text-[10px] font-bold shadow-2xs"
                      >
                        Join Call
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-VIEW 2: SAVED ITEMS
      ======================================================== */}
      {activeView === 'saved' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToMain}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1F2A44] hover:text-[#3D4D7C] active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
              <span>Back to Account</span>
            </button>

            <span className="text-xs font-bold text-[#8A93A6]">
              {totalSavedCount} Saved
            </span>
          </div>

          {/* Sub-filter chips */}
          <div className="flex gap-1.5 p-0.5 rounded-full bg-white border border-[#DDE2EA] text-xs">
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
                    ? 'bg-[#1F2A44] text-white shadow-2xs'
                    : 'text-[#8A93A6] hover:text-[#1F2A44]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {totalSavedCount === 0 ? (
            <div className="p-8 text-center bg-white rounded-[22px] border border-[#DDE2EA] space-y-2">
              <Heart className="w-10 h-10 text-[#8A93A6] mx-auto opacity-50" />
              <h3 className="font-heading text-sm font-bold text-[#1F2A44]">
                No saved items yet
              </h3>
              <p className="text-xs text-[#8A93A6]">
                Tap the heart icon on any service or construction project to save it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Saved Services Section */}
              {(savedFilter === 'all' || savedFilter === 'services') && savedServices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44] px-0.5">
                    Saved Services ({savedServices.length})
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {savedServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => navigate(`/services/${service.slug}`)}
                        className="p-2.5 rounded-[18px] bg-white border border-[#DDE2EA] shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
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
                              <Heart className="w-3 h-3 fill-[#E5484D] text-[#E5484D]" />
                            </button>
                          </div>

                          <span className="text-[9px] font-bold text-[#3D4D7C] uppercase block mt-1.5 truncate">
                            {service.category}
                          </span>
                          <h5 className="font-heading text-xs font-bold text-[#1F2A44] line-clamp-2 leading-tight mt-0.5">
                            {service.title}
                          </h5>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-[#EEF1F6] flex items-center justify-between text-[9.5px]">
                          <span className="text-[#8A93A6] truncate">{service.priceNote}</span>
                          <span className="font-bold text-[#3D4D7C] flex items-center gap-0.5">
                            View &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Construction Projects Section */}
              {(savedFilter === 'all' || savedFilter === 'construction') && savedProjects.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44] px-0.5">
                    Saved Construction Projects ({savedProjects.length})
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {savedProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => navigate(`/construction/${project.id}`)}
                        className="p-2.5 rounded-[18px] bg-white border border-[#DDE2EA] shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
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
                              <Heart className="w-3 h-3 fill-[#E5484D] text-[#E5484D]" />
                            </button>

                            <div className="absolute bottom-1.5 left-1.5">
                              <span className={`text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-md text-white shadow-xs ${
                                project.category === 'Past' ? 'bg-[#1F2A44]' : 'bg-[#3FA66B]'
                              }`}>
                                {project.category === 'Past' ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                          </div>

                          <span className="text-[9px] font-bold text-[#3D4D7C] uppercase block mt-1.5 truncate">
                            {project.specs.zoningDistrict} &bull; {project.specs.units}
                          </span>
                          <h5 className="font-heading text-xs font-bold text-[#1F2A44] line-clamp-1 leading-tight mt-0.5">
                            {project.name}
                          </h5>
                          <p className="text-[10px] text-[#8A93A6] line-clamp-1 mt-0.5">
                            {project.address}
                          </p>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-[#EEF1F6] flex items-center justify-between text-[9.5px]">
                          <span className="text-[#8A93A6] truncate">{project.timelineRange}</span>
                          <span className="font-bold text-[#3D4D7C] flex items-center gap-0.5">
                            Details &rarr;
                          </span>
                        </div>
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
          SUB-VIEW 3: MY ENQUIRIES & QUOTES
      ======================================================== */}
      {activeView === 'enquiries' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToMain}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1F2A44] hover:text-[#3D4D7C] active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
              <span>Back to Account</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/quote')}
              className="py-1 px-3 rounded-full btn-glossy-navy text-[10.5px] font-bold text-white flex items-center gap-1 shadow-2xs active:scale-95"
            >
              <Plus className="w-3 h-3" />
              <span>New Inquiry</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {quotes.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-[22px] border border-[#DDE2EA] space-y-2">
                <FileText className="w-10 h-10 text-[#8A93A6] mx-auto opacity-50" />
                <h3 className="font-heading text-sm font-bold text-[#1F2A44]">
                  No inquiries submitted
                </h3>
                <p className="text-xs text-[#8A93A6]">
                  Submit a Chicago property address to receive an official preliminary zoning assessment.
                </p>
              </div>
            ) : (
              quotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-[20px] bg-white border border-[#DDE2EA] shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#3D4D7C] uppercase">
                      {q.id.toUpperCase()}
                    </span>
                    <span
                      className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        q.status === 'In Review'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44]">
                      {q.serviceType}
                    </h4>
                    <p className="text-xs text-[#5A657D] font-medium truncate mt-0.5">
                      {q.address}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-[12px] bg-[#F8F9FB] border border-[#EEF1F6] text-xs">
                    <span className="text-[9.5px] font-bold text-[#8A93A6] uppercase block mb-0.5">
                      Inquiry Scope
                    </span>
                    <p className="text-[#1F2A44] leading-relaxed line-clamp-2">
                      {q.message}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs border-t border-[#EEF1F6]">
                    <span className="text-[10px] text-[#8A93A6]">
                      Submitted on {q.dateSubmitted}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${BUSINESS_INFO.phoneRaw}`}
                        className="py-1 px-2.5 rounded-full bg-[#F2F4F8] text-[#1F2A44] text-[10px] font-bold hover:bg-slate-200"
                      >
                        Call Office
                      </a>
                      <button
                        type="button"
                        onClick={() => navigate('/chat')}
                        className="py-1 px-2.5 rounded-full btn-glossy-navy text-white text-[10px] font-bold shadow-2xs"
                      >
                        Chat Updates
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN VIEW: APEX REPAIR EXACT LAYOUT STRUCTURE
      ======================================================== */}
      {activeView === 'main' && (
        <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
          {/* 1. Profile Card (Exact Match to Apex Repair Reference) */}
          <div className="p-4 rounded-[22px] bg-white border border-[#DDE2EA] shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar with Camera badge */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#1F2A44] via-[#3D4D7C] to-[#2B3B60] flex items-center justify-center text-white text-lg font-bold shadow-sm ring-2 ring-white flex-shrink-0">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#E5484D] text-white flex items-center justify-center ring-2 ring-white shadow-2xs">
                    <Camera className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Name, Verified Badge & Role */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-heading text-base font-bold text-[#1F2A44]">
                      {user.name}
                    </h2>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 flex-shrink-0" />
                  </div>

                  <p className="text-xs text-[#8A93A6] mt-0.5 font-medium">
                    Lead Property Developer
                  </p>

                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-50 text-[#3D4D7C] border border-sky-100 text-[10px] font-bold tracking-tight">
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
                className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 text-[#5A657D] flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all shadow-2xs"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Contact Details (Company, Email, Phone) */}
            <div className="pt-2 border-t border-[#EEF1F6] space-y-1.5 text-xs text-[#5A657D]">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#8A93A6] flex-shrink-0" />
                <span className="truncate">{user.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8A93A6] flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8A93A6] flex-shrink-0" />
                <span>{user.phone}</span>
              </div>
            </div>

            {/* Inline Profile Editing Drawer */}
            {isEditing && (
              <div className="pt-3 border-t border-[#EEF1F6] space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-0.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 rounded-[10px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-0.5">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full h-9 px-3 rounded-[10px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-0.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-9 px-3 rounded-[10px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="w-full h-9 rounded-full btn-glossy-navy font-semibold text-xs text-white"
                >
                  Save Profile
                </button>
              </div>
            )}
          </div>

          {/* 2. ACTIVITY & WORKSPACE (Apex Repair Reference Group 1) */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8A93A6] px-1 block">
              Activity &amp; Workspace
            </span>

            <div className="rounded-[20px] bg-white border border-[#DDE2EA] shadow-xs divide-y divide-[#EEF1F6] overflow-hidden">
              {/* Row 1: Track Cases */}
              <div
                onClick={() => navigate('/cases')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      Track Cases
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      #WW-2026-0842 &bull; ZBA Hearing Nov 24
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 2: My Bookings */}
              <div
                onClick={() => handleOpenView('bookings')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      My Bookings
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Scheduled strategy consultations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#8A93A6]">
                    {appointments.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 3: Saved Items */}
              <div
                onClick={() => handleOpenView('saved')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      Saved Items
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Saved services &amp; construction projects
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#8A93A6]">
                    {totalSavedCount}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 4: My Enquiries & Quotes */}
              <div
                onClick={() => handleOpenView('enquiries')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      My Enquiries &amp; Quotes
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Property reviews &amp; fee estimates
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#8A93A6]">
                    {quotes.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 5: Documents Vault & Deeds */}
              <div
                onClick={() => navigate('/vault')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      Documents Vault &amp; Deeds
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Plats of survey, deeds &amp; ZBA filings
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 3. PREFERENCES & SUPPORT (Apex Repair Reference Group 2 - Image 3) */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8A93A6] px-1 block">
              Preferences &amp; Support
            </span>

            <div className="rounded-[20px] bg-white border border-[#DDE2EA] shadow-xs divide-y divide-[#EEF1F6] overflow-hidden">
              {/* Row 1: Notifications */}
              <div
                onClick={() => navigate('/notifications')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      Notifications
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Case alerts &amp; City Council updates
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 2: Support & Verification Desk */}
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      Support &amp; Verification Desk
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Direct hotline &bull; 630-635-7688
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Row 3: Zoning Readiness Checklist */}
              <div
                onClick={() => navigate('/checklist')}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FB] transition-colors cursor-pointer group active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#1F2A44] leading-tight">
                      Zoning Readiness Checklist
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      7-step permit audit for Chicago City Hall
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 4: Sign Out */}
              <div
                onClick={() => alert('You are signed in as Alex Sterling.')}
                className="p-3.5 flex items-center justify-between hover:bg-rose-50/50 transition-colors cursor-pointer group active:bg-rose-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E5484D] flex items-center justify-center flex-shrink-0">
                    <LogOut className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-[#E5484D] leading-tight">
                      Sign Out
                    </h4>
                    <p className="text-[10.5px] text-[#8A93A6] font-medium mt-0.5">
                      Session secured &bull; Alex Sterling
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Legal / Disclaimers Footer */}
          <div className="pt-2 text-center space-y-1 text-[#8A93A6] flex flex-col items-center">
            <img src="/brand-icon-navy.png" alt="" className="w-5 h-5 object-contain opacity-40 mb-1" />
            <p className="text-[10px]">
              Williams &amp; Williams LLC &bull; Chicago Zoning Specialists
            </p>
            <p className="text-[9px]">
              Version 2.4.0 (Chicago Municipal Release)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
