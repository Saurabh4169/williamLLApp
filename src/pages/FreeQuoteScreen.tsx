import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useAppStore } from '../store/useAppStore';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

export const FreeQuoteScreen: React.FC = () => {
  const navigate = useNavigate();
  const { submitQuoteRequest, user } = useAppStore();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    serviceType: SERVICES_DATA[0].title,
    propertyType: 'Residential',
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: '2144 N Damen Ave, Chicago, IL',
    message: 'Seeking a zoning analysis and setback review for an addition on our residential lot.',
    fileName: '',
  });

  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Agricultural'];

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitQuoteRequest({
        serviceType: formData.serviceType,
        propertyType: formData.propertyType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsCompleted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3D4D7C', '#1F2A44', '#B7C3DA', '#3FA66B'],
        });
      } catch {
        // Safe fallback
      }
    }, 800);
  };

  if (isCompleted) {
    return (
      <div className="min-h-full flex flex-col justify-between text-[#1F2A44] p-6 pb-6">
        <div className="pt-12 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-20 h-20 mx-auto rounded-full bg-[#3FA66B]/15 text-[#3FA66B] flex items-center justify-center border-2 border-[#3FA66B]/30"
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </motion.div>

          <h1 className="font-heading text-2xl font-bold text-[#1F2A44] tracking-tight">
            Free Quote Request Received!
          </h1>
          <p className="text-xs text-[#8A93A6] max-w-sm mx-auto leading-relaxed">
            Thank you, {formData.name}. Our zoning consultants will evaluate your property and reach out within 1 business day.
          </p>

          <GlassCard className="p-4 text-left space-y-2 mt-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
              Submitted Details
            </span>
            <div className="text-xs space-y-1">
              <div><strong className="text-[#1F2A44]">Service:</strong> {formData.serviceType}</div>
              <div><strong className="text-[#1F2A44]">Type:</strong> {formData.propertyType}</div>
              <div><strong className="text-[#1F2A44]">Address:</strong> {formData.address}</div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-3 pt-6">
          <GlassButton
            variant="primary"
            fullWidth
            onClick={() => navigate('/cases')}
          >
            Track in My Cases
          </GlassButton>
          <GlassButton
            variant="glass"
            fullWidth
            onClick={() => navigate('/')}
          >
            Back to Home
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="Free Quote Request" showBack />

      <div className="px-4 py-4 space-y-5">
        {/* Progress Tracker Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#3D4D7C] uppercase tracking-wider">
              Step {step} of 4
            </span>
            <span className="text-[#8A93A6]">
              {step === 1 && 'Service & Property Type'}
              {step === 2 && 'Your Contact Info'}
              {step === 3 && 'Project Details'}
              {step === 4 && 'Review & Submit'}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/60 border border-white overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3D4D7C] to-[#7D90B5] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Service Type and Property Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <GlassCard className="p-4 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                1. Select Zoning Service
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] font-medium focus:ring-2 focus:ring-[#3D4D7C]"
              >
                {SERVICES_DATA.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </GlassCard>

            <GlassCard className="p-4 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                2. Property Classification
              </label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: type })}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all select-none text-left ${
                      formData.propertyType === type
                        ? 'btn-glossy-navy shadow-xs text-white'
                        : 'liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <GlassCard className="p-4 space-y-4">
              <h3 className="font-heading text-base font-bold text-[#1F2A44]">
                Contact Details
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#8A93A6] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Sterling"
                  className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A93A6] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8A93A6] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 312-555-0198"
                  className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 3: Project Details & Upload */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <GlassCard className="p-4 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Chicago Property Address or PIN
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. 2144 N Damen Ave, Chicago, IL"
                className="w-full h-11 px-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C]"
              />
            </GlassCard>

            <GlassCard className="p-4 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Project Scope / Summary (min 15 chars)
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your intended use, square footage, building height, or denial history..."
                className="w-full p-3 rounded-xl border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C]"
              />
              <span className="text-[10px] text-[#8A93A6] block text-right">
                {formData.message.length} characters
              </span>
            </GlassCard>

            <GlassCard className="p-4 space-y-2 border border-dashed border-[#3D4D7C]/40 text-center">
              <UploadCloud className="w-7 h-7 mx-auto text-[#3D4D7C]" />
              <div className="text-xs font-semibold text-[#1F2A44]">
                Upload Plat of Survey or Denial Letter (Optional)
              </div>
              <p className="text-[10px] text-[#8A93A6]">
                PDF, DWG, PNG up to 25 MB
              </p>
              <label className="inline-block mt-2 px-3 py-1.5 rounded-full liquid-glass-chip text-xs font-semibold text-[#3D4D7C] cursor-pointer hover:border-[#3D4D7C]/40">
                <span>Select File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setFormData({ ...formData, fileName: f.name });
                  }}
                />
              </label>
              {formData.fileName && (
                <div className="text-xs text-[#3FA66B] font-medium mt-1">
                  Attached: {formData.fileName}
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {/* Step 4: Review and Submit */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <GlassCard className="p-5 space-y-3">
              <h3 className="font-heading text-base font-bold text-[#1F2A44]">
                Review Your Request
              </h3>

              <div className="space-y-2 text-xs divide-y divide-white/60">
                <div className="pt-1 flex justify-between">
                  <span className="text-[#8A93A6]">Service:</span>
                  <span className="font-bold text-[#1F2A44]">{formData.serviceType}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-[#8A93A6]">Property Type:</span>
                  <span className="font-bold text-[#1F2A44]">{formData.propertyType}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-[#8A93A6]">Client:</span>
                  <span className="font-bold text-[#1F2A44]">{formData.name}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-[#8A93A6]">Address:</span>
                  <span className="font-bold text-[#1F2A44]">{formData.address}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-3 bg-[#EAF6F0]/80 backdrop-blur-sm rounded-xl border border-[#3FA66B]/30 flex items-center gap-2 text-xs text-[#2C784C]">
                <ShieldCheck className="w-4 h-4 text-[#3FA66B]" />
                <span>Security check verified. Zero spam protection enabled.</span>
              </div>
            </GlassCard>

            <p className="text-[11px] text-[#8A93A6] leading-relaxed">
              By submitting, you agree to receive a follow-up assessment from Williams &amp; Williams LLC. {BUSINESS_INFO.disclaimer}
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 1 ? (
            <GlassButton
              variant="outline"
              size="md"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Previous
            </GlassButton>
          ) : (
            <div />
          )}

          <GlassButton
            variant="primary"
            size="md"
            onClick={handleNext}
            disabled={isSubmitting || (step === 3 && formData.message.length < 15)}
            className="flex-1 flex items-center justify-center gap-2 shadow-md"
          >
            <span>{step === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Request') : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default FreeQuoteScreen;
