import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ChevronRight,
  Headphones,
  MapPin,
  Plus,
  FileCheck2,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';
import ImageWithFallback from '../components/ui/ImageWithFallback';

export const CasesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cases, appointments, activeCaseFilter, setActiveCaseFilter } = useAppStore();

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

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      {/* Standard AppHeader with single-line title */}
      <AppHeader title="My Cases" />

      <div className="px-4 py-3 space-y-6">
        {/* Title Header with New Case Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1F2A44] tracking-tight">
              My Cases &amp; Bookings
            </h1>
            <p className="text-xs text-[#8A93A6] mt-0.5 font-medium">
              Real-time monitoring of City Hall permits and ZBA hearings.
            </p>
          </div>
          <button
            onClick={() => navigate('/quote')}
            className="flex items-center gap-1.5 text-xs font-semibold text-white btn-glossy-navy px-3.5 py-2 rounded-full shadow-xs active:scale-95 transition-all flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Case</span>
          </button>
        </div>

        {/* Segmented Filter Control: Active / Completed */}
        <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-white/80 bg-white/80">
          <button
            onClick={() => setActiveCaseFilter('Active')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all select-none min-h-[36px] ${
              activeCaseFilter === 'Active'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Active Cases ({activeCases.length})
          </button>
          <button
            onClick={() => setActiveCaseFilter('Completed')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all select-none min-h-[36px] ${
              activeCaseFilter === 'Completed'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Past Archive ({pastCases.length})
          </button>
        </div>

        {/* Section 1: Upcoming / Active Cases */}
        {activeCaseFilter === 'Active' && (
          <section aria-label="Active Cases List" className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block px-1">
              Active Proceedings
            </span>

            {activeCases.map((c) => (
              <GlassCard
                key={c.id}
                onClick={() => navigate(`/cases/${c.id}`)}
                className="overflow-hidden p-3.5 cursor-pointer group active:scale-[0.99] transition-all bg-white/85 border border-white/90 shadow-[0_8px_30px_rgba(31,42,68,0.06)] rounded-[24px]"
              >
                <div className="flex flex-col space-y-3">
                  {/* Thumbnail Image with Clean Rounded Frame */}
                  <div className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden bg-[#1F2A44]">
                    <ImageWithFallback
                      imageKey={c.imageKey}
                      aspectRatio="aspect-video h-full w-full"
                      className="group-hover:scale-105 transition-transform duration-500 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                    {/* Case Number Badge - Crisp Light Glass Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-white/95 backdrop-blur-md text-[#1F2A44] font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-white">
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
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#3D4D7C] block">
                        {c.type}
                      </span>
                      <h3 className="font-heading text-[17px] font-bold text-[#1F2A44] leading-snug line-clamp-2 mt-0.5">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#8A93A6] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#3D4D7C] flex-shrink-0" />
                        <span className="truncate">{c.address}</span>
                      </div>
                    </div>

                    {/* Next Hearing / Event Date Banner */}
                    <div className="bg-[#F8F9FB] border border-[#DDE2EA] rounded-xl p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 stroke-[2]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#8A93A6] font-medium block leading-none">
                            Next Event
                          </span>
                          <span className="font-semibold text-[#1F2A44] leading-tight mt-0.5 block">
                            {c.nextDate}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#3D4D7C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block px-1">
              Successfully Resolved Cases
            </span>

            {pastCases.map((c) => (
              <GlassCard
                key={c.id}
                onClick={() => navigate(`/cases/${c.id}`)}
                className="p-3 flex items-center gap-3.5 cursor-pointer active:scale-[0.99] transition-all bg-white/85 border border-white/90 rounded-[20px]"
              >
                <div className="w-16 h-16 rounded-[14px] overflow-hidden flex-shrink-0 bg-[#1F2A44]">
                  <ImageWithFallback
                    imageKey={c.imageKey}
                    aspectRatio="aspect-square w-full h-full"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-[#8A93A6]">
                      {c.caseNumber}
                    </span>
                    <Badge variant="solid-success" size="sm">
                      {c.status}
                    </Badge>
                  </div>
                  <h4 className="font-heading text-[15px] font-bold text-[#1F2A44] truncate mt-0.5">
                    {c.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#8A93A6] mt-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#3FA66B]" />
                    <span className="truncate">{c.nextEventTitle}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#8A93A6] flex-shrink-0" />
              </GlassCard>
            ))}
          </section>
        )}

        {/* Upcoming Consultations Appointments */}
        <section aria-label="Upcoming Consultations" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6]">
              Upcoming Consultations ({appointments.length})
            </span>
            <button
              onClick={() => navigate('/book-consultation')}
              className="text-xs font-semibold text-[#3D4D7C] hover:underline"
            >
              + Book Another
            </button>
          </div>

          <div className="space-y-2">
            {appointments.map((app) => (
              <GlassCard
                key={app.id}
                className="p-3.5 flex items-center justify-between bg-white/85 rounded-[18px] border border-white/90"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C]">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2A44]">{app.title}</h4>
                    <p className="text-[11px] text-[#8A93A6] mt-0.5">
                      {app.date} &bull; {app.time} &bull; {app.type}
                    </p>
                  </div>
                </div>
                <Badge variant="solid-primary" size="sm">
                  {app.status}
                </Badge>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Section 3: Need Help? Card (Exact Match from Reference Image) */}
        <section aria-label="Need Help Support Card">
          <GlassCard className="p-5 flex items-center justify-between gap-4 bg-white/85 rounded-[24px] border border-white/90">
            <div className="space-y-1.5 flex-1">
              <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                Need Help?
              </h3>
              <p className="text-xs text-[#8A93A6] leading-relaxed">
                Our support team is here to assist you with your queries and City Hall filings.
              </p>
              <div className="pt-2">
                <GlassButton
                  variant="glass"
                  size="sm"
                  onClick={() => navigate('/contact')}
                  className="text-xs font-semibold"
                >
                  Contact Support
                </GlassButton>
              </div>
            </div>

            <div className="w-14 h-14 rounded-2xl btn-glossy-navy flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Headphones className="w-7 h-7 stroke-[2]" />
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
};

export default CasesScreen;
