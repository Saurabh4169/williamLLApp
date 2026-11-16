import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSent(true);
      setTimeout(() => setIsSent(false), 4000);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-6">
      <AppHeader title="Contact Williams & Williams" showBack />

      <div className="px-4 py-4 space-y-5">
        {/* Title Header */}
        <div>
          <h1 className="font-heading text-xl font-bold text-[#121214] tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xs text-[#82807A]">
            Call, message, or visit our Chicago office to discuss your project.
          </p>
        </div>

        {/* 3 Quick Action Buttons: Phone, Email, WhatsApp */}
        <div className="grid grid-cols-3 gap-2.5">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="liquid-glass-card rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center active:scale-95 transition-all min-h-[44px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#323232]/10 text-[#323232] flex items-center justify-center">
              <Phone className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#121214]">Call Us</span>
            <span className="text-[9px] text-[#82807A] truncate">{BUSINESS_INFO.phone}</span>
          </a>

          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="liquid-glass-card rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center active:scale-95 transition-all min-h-[44px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#323232]/10 text-[#323232] flex items-center justify-center">
              <Mail className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#121214]">Email Us</span>
            <span className="text-[9px] text-[#82807A] truncate">dubbs.mgmt</span>
          </a>

          <a
            href="https://wa.me/16306357688"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-card rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center active:scale-95 transition-all min-h-[44px]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3FA66B]/10 text-[#3FA66B] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#121214]">WhatsApp</span>
            <span className="text-[9px] text-[#82807A]">Chat Live</span>
          </a>
        </div>

        {/* Office Address & Hours Card */}
        <GlassCard className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/70 text-[#323232] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A]">
                Chicago Office
              </span>
              <p className="text-xs font-semibold text-[#121214] leading-relaxed">
                {BUSINESS_INFO.address}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/70 text-[#323232] flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A]">
                Consultation Hours
              </span>
              <p className="text-xs font-semibold text-[#121214] leading-relaxed">
                {BUSINESS_INFO.hours}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Contact Message Form */}
        <form onSubmit={handleSubmit}>
          <GlassCard className="p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-[#121214]">
                Send a Direct Message
              </h3>
              <Badge variant="primary" size="sm">
                Direct Intake
              </Badge>
            </div>

            {isSent && (
              <div className="p-3 bg-[#EAF6F0]/90 rounded-xl border border-[#3FA66B]/30 flex items-center gap-2 text-xs font-semibold text-[#2C784C]">
                <CheckCircle2 className="w-4 h-4 text-[#3FA66B]" />
                <span>Message received! A zoning specialist will contact you shortly.</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-[#82807A] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Sterling"
                className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 text-xs text-[#121214] focus:ring-2 focus:ring-[#323232]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-[#82807A] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 text-xs text-[#121214] focus:ring-2 focus:ring-[#323232]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#82807A] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="312-555-0198"
                  className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 text-xs text-[#121214] focus:ring-2 focus:ring-[#323232]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#82807A] mb-1">
                Project Inquiries &amp; Questions *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about the property address, zoning problem, or permit needed..."
                className="w-full p-3 rounded-xl border border-white/80 bg-white/70 text-xs text-[#121214] focus:ring-2 focus:ring-[#323232]"
              />
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              fullWidth
              className="flex items-center justify-center gap-2 min-h-[46px]"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </GlassButton>
          </GlassCard>
        </form>
      </div>
    </div>
  );
};

export default ContactScreen;
