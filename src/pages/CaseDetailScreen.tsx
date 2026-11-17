import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  Upload,
  MessageSquare,
  Bell,
  BellRing,
  Phone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import BackButton from '../components/ui/BackButton';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';
import ImageWithFallback from '../components/ui/ImageWithFallback';

export const CaseDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases } = useAppStore();

  const caseItem = cases.find((c) => c.id === id) || cases[0];
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'updates'>('timeline');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-6">
      {/* Sub-screen Header with Back Arrow and Title */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton ariaLabel="Back to Cases" />
          <div>
            <h1 className="font-heading text-sm font-bold text-[#121214]">
              {caseItem.caseNumber}
            </h1>
            <span className="text-[10px] text-[#82807A] block truncate max-w-[200px]">
              {caseItem.title}
            </span>
          </div>
        </div>

        <Badge variant={caseItem.status === 'Approved' ? 'success' : 'primary'} size="sm">
          {caseItem.status}
        </Badge>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Case Summary Card */}
        <GlassCard className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#323232] bg-[#323232]/10 px-2.5 py-0.5 rounded-full">
                {caseItem.type}
              </span>
              <h2 className="font-heading text-lg font-bold text-[#121214] mt-1.5 leading-snug">
                {caseItem.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#82807A] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#323232] flex-shrink-0" />
                <span>{caseItem.address}</span>
              </div>
            </div>
          </div>

          {/* AI Case Explainer Button */}
          <button
            type="button"
            onClick={() =>
              navigate(
                `/ai-assistant?caseId=${encodeURIComponent(caseItem.id)}&caseTitle=${encodeURIComponent(
                  caseItem.title
                )}`
              )
            }
            className="w-full py-2.5 px-3.5 rounded-full bg-white dark:bg-white/10 border border-[#D8D8D8] dark:border-white/15 flex items-center justify-between text-xs font-semibold text-[#191919] dark:text-white shadow-2xs hover:border-[#191919] active:scale-[0.99] transition-all group"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <span>Explain in simple words</span>
            </span>
            <span className="text-[11px] text-[#82807A] dark:text-[#A0B0BC] flex items-center gap-1 group-hover:text-[#191919] dark:group-hover:text-white transition-colors">
              <span>AI Case Explainer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Next Hearing / Event Reminder Box */}
          <div className="btn-glossy-navy rounded-2xl p-3.5 flex items-center justify-between shadow-md text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C7D3DC]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#C7D3DC] font-semibold block uppercase tracking-wider">
                  {caseItem.nextEventTitle}
                </span>
                <span className="font-heading text-sm font-bold text-white">
                  {caseItem.nextDate}
                </span>
              </div>
            </div>

            <button
              onClick={() => setReminderEnabled(!reminderEnabled)}
              aria-label="Toggle calendar reminder"
              className={`p-2 rounded-full border transition-all ${
                reminderEnabled
                  ? 'bg-[#3FA66B]/30 border-[#3FA66B] text-white'
                  : 'bg-white/10 border-white/20 text-white/60'
              }`}
            >
              {reminderEnabled ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </button>
          </div>

          {/* Assigned Expert Box */}
          <div className="pt-2 border-t border-white/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#323232] flex-shrink-0 border border-white/80">
                <ImageWithFallback
                  imageKey={caseItem.assignedExpert.avatarKey}
                  aspectRatio="aspect-square w-full h-full"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#121214]">
                  {caseItem.assignedExpert.name}
                </h4>
                <p className="text-[10px] text-[#82807A]">
                  {caseItem.assignedExpert.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${caseItem.assignedExpert.phone}`}
                aria-label="Call Expert"
                className="w-8 h-8 rounded-full liquid-glass-chip flex items-center justify-center text-[#323232] hover:border-[#323232]/50 active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => navigate('/chat')}
                aria-label="Chat with Expert"
                className="w-8 h-8 rounded-full btn-glossy-navy text-white flex items-center justify-center shadow-xs active:scale-95 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Tab Controls: Timeline / Documents / Updates */}
        <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-white/60">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'timeline'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#82807A] hover:text-[#121214]'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'documents'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#82807A] hover:text-[#121214]'
            }`}
          >
            Documents ({caseItem.documents.length})
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'updates'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#82807A] hover:text-[#121214]'
            }`}
          >
            Updates ({caseItem.updates.length})
          </button>
        </div>

        {/* Tab 1: Vertical Stages Timeline */}
        {activeTab === 'timeline' && (
          <GlassCard className="p-5 space-y-5">
            <h3 className="font-heading text-base font-bold text-[#121214]">
              Case Proceedings Timeline
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8D8D8]">
              {caseItem.timeline.map((step, idx) => (
                <div key={step.id} className="relative">
                  {/* Status Circle Node */}
                  <div
                    className={`absolute -left-[27px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                      step.completed
                        ? 'bg-[#22C55E] text-white shadow-xs'
                        : step.current
                        ? 'bg-[#323232] text-white animate-pulse'
                        : 'bg-[#D8D8D8] text-[#8C9DAA]'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading text-sm font-bold text-[#121214]">
                        {step.stage}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#82807A]">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-[#82807A] mt-1 leading-relaxed">
                      {step.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Tab 2: Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#82807A] uppercase tracking-wider">
                Case Files &amp; Exhibits
              </span>
              <button
                onClick={() => navigate('/vault')}
                className="text-xs font-semibold text-[#323232] flex items-center gap-1 hover:underline"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New File</span>
              </button>
            </div>

            <div className="space-y-2">
              {caseItem.documents.map((doc) => (
                <GlassCard
                  key={doc.id}
                  className="p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#323232]/10 flex items-center justify-center text-[#323232]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#121214] truncate max-w-[200px]">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-[#82807A] mt-0.5">
                        <span>{doc.size}</span>
                        <span>&bull;</span>
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="primary" size="sm">
                    {doc.status}
                  </Badge>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Updates Tab */}
        {activeTab === 'updates' && (
          <div className="space-y-3">
            {caseItem.updates.map((up) => (
              <GlassCard
                key={up.id}
                className="p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#323232] uppercase tracking-wider">
                    {up.author}
                  </span>
                  <span className="text-[10px] text-[#82807A]">{up.date}</span>
                </div>
                <h4 className="font-heading text-sm font-bold text-[#121214]">
                  {up.title}
                </h4>
                <p className="text-xs text-[#82807A] leading-relaxed">
                  {up.message}
                </p>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Message the Firm Button */}
        <div className="pt-2">
          <GlassButton
            variant="primary"
            fullWidth
            onClick={() => navigate('/chat')}
            className="flex items-center justify-center gap-2 min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message Zoning Counsel</span>
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailScreen;
