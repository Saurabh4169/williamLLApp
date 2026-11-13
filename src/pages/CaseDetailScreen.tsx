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
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { AppHeader } from '../components/layout/AppHeader';
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
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      {/* Standard AppHeader */}
      <AppHeader
        showBack
        title={caseItem.caseNumber}
        rightAction={
          <Badge variant={caseItem.status === 'Approved' ? 'success' : 'primary'} size="sm">
            {caseItem.status}
          </Badge>
        }
      />

      <div className="px-4 py-4 space-y-5">
        {/* Case Summary Card */}
        <GlassCard className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C] bg-[#3D4D7C]/10 px-2.5 py-0.5 rounded-full">
                {caseItem.type}
              </span>
              <h2 className="font-heading text-lg font-bold text-[#1F2A44] mt-1.5 leading-snug">
                {caseItem.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#8A93A6] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#3D4D7C] flex-shrink-0" />
                <span>{caseItem.address}</span>
              </div>
            </div>
          </div>

          {/* Next Hearing / Event Reminder Box */}
          <div className="btn-glossy-navy rounded-2xl p-3.5 flex items-center justify-between shadow-md text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#B7C3DA]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#B7C3DA] font-semibold block uppercase tracking-wider">
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
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#3D4D7C] flex-shrink-0 border border-white/80">
                <ImageWithFallback
                  imageKey={caseItem.assignedExpert.avatarKey}
                  aspectRatio="aspect-square w-full h-full"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F2A44]">
                  {caseItem.assignedExpert.name}
                </h4>
                <p className="text-[10px] text-[#8A93A6]">
                  {caseItem.assignedExpert.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${caseItem.assignedExpert.phone}`}
                aria-label="Call Expert"
                className="w-8 h-8 rounded-full liquid-glass-chip flex items-center justify-center text-[#3D4D7C] hover:border-[#3D4D7C]/50 active:scale-95 transition-all"
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
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'documents'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Documents ({caseItem.documents.length})
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'updates'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Updates ({caseItem.updates.length})
          </button>
        </div>

        {/* Tab 1: Vertical Stages Timeline */}
        {activeTab === 'timeline' && (
          <GlassCard className="p-5 space-y-5">
            <h3 className="font-heading text-base font-bold text-[#1F2A44]">
              Case Proceedings Timeline
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE2EA]">
              {caseItem.timeline.map((step, idx) => (
                <div key={step.id} className="relative">
                  {/* Status Circle Node */}
                  <div
                    className={`absolute -left-[27px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                      step.completed
                        ? 'bg-[#3FA66B] text-white shadow-xs'
                        : step.current
                        ? 'bg-[#3D4D7C] text-white animate-pulse'
                        : 'bg-[#DDE2EA] text-[#8A93A6]'
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
                      <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
                        {step.stage}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#8A93A6]">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A93A6] mt-1 leading-relaxed">
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
              <span className="text-xs font-bold text-[#8A93A6] uppercase tracking-wider">
                Case Files &amp; Exhibits
              </span>
              <button
                onClick={() => navigate('/vault')}
                className="text-xs font-semibold text-[#3D4D7C] flex items-center gap-1 hover:underline"
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
                    <div className="w-10 h-10 rounded-xl bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1F2A44] truncate max-w-[200px]">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-[#8A93A6] mt-0.5">
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
                  <span className="text-[10px] font-bold text-[#3D4D7C] uppercase tracking-wider">
                    {up.author}
                  </span>
                  <span className="text-[10px] text-[#8A93A6]">{up.date}</span>
                </div>
                <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
                  {up.title}
                </h4>
                <p className="text-xs text-[#8A93A6] leading-relaxed">
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
