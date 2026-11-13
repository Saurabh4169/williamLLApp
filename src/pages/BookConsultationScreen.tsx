import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Building2,
  CheckCircle2,
  ArrowRight,
  CalendarPlus,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

export const BookConsultationScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addAppointment, user } = useAppStore();

  const preselectedService = searchParams.get('service') || 'Zoning Analysis & Strategy Consultation';
  const preselectedDay = searchParams.get('day') || 'Mon';
  const preselectedTime = searchParams.get('time') || '10:00 AM';

  const [selectedDay, setSelectedDay] = useState(preselectedDay);
  const [selectedTime, setSelectedTime] = useState(preselectedTime);
  const [consultType, setConsultType] = useState<'Video' | 'Phone' | 'In-office'>('Video');
  const [name, setName] = useState(user.name || 'Alex Sterling');
  const [phone, setPhone] = useState(user.phone || '312-555-0198');
  const [email, setEmail] = useState(user.email || 'alex.sterling@example.com');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const days = [
    { day: 'Mon', num: '24', date: '24 Nov 2026' },
    { day: 'Tue', num: '25', date: '25 Nov 2026' },
    { day: 'Wed', num: '26', date: '26 Nov 2026' },
    { day: 'Thu', num: '27', date: '27 Nov 2026' },
    { day: 'Fri', num: '28', date: '28 Nov 2026' },
  ];

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:30 AM', available: false }, // booked / strike
    { time: '01:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '04:00 PM', available: false }, // booked / strike
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDateObj = days.find((d) => d.day === selectedDay) || days[0];

    addAppointment({
      title: `${preselectedService} (${consultType})`,
      type: consultType,
      date: selectedDateObj.date,
      time: `${selectedTime} CST`,
      expertName: 'Marcus Vance',
      location:
        consultType === 'In-office'
          ? BUSINESS_INFO.address
          : consultType === 'Phone'
          ? `Phone to ${phone}`
          : 'Google Meet / Zoom',
      status: 'Confirmed',
    });

    setIsBooked(true);

    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#3D4D7C', '#1F2A44', '#B7C3DA', '#3FA66B'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleAddToCalendar = () => {
    alert(`Appointment "${preselectedService}" saved to device calendar.`);
  };

  if (isBooked) {
    const selectedDateObj = days.find((d) => d.day === selectedDay) || days[0];

    return (
      <div className="min-h-full flex flex-col justify-between p-6">
        <div className="pt-10 text-center space-y-4 max-w-sm mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-20 h-20 mx-auto rounded-full bg-[#3FA66B]/15 text-[#3FA66B] flex items-center justify-center border-2 border-[#3FA66B]/30"
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </motion.div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3FA66B]">
              Appointment Confirmed
            </span>
            <h1 className="font-heading text-2xl font-bold text-[#1F2A44] mt-1">
              Consultation Booked
            </h1>
          </div>

          <p className="text-xs text-[#8A93A6] leading-relaxed">
            Your zoning strategy session with <strong className="text-[#1F2A44]">Marcus Vance</strong> is scheduled. A confirmation email has been dispatched to {email}.
          </p>

          {/* Booking Summary Card */}
          <GlassCard variant="card" className="p-4 text-left space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#8A93A6]">Service:</span>
              <span className="font-semibold text-[#1F2A44] truncate max-w-[190px]">{preselectedService}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#8A93A6]">Date &amp; Time:</span>
              <span className="font-semibold text-[#1F2A44]">
                {selectedDateObj.date} &bull; {selectedTime} CST
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#8A93A6]">Format:</span>
              <span className="font-semibold text-[#3D4D7C]">{consultType} Consultation</span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-[#DDE2EA]">
              <span className="text-[#8A93A6]">Consultation Fee:</span>
              <span className="font-bold text-[#3FA66B]">Free Initial</span>
            </div>
          </GlassCard>

          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-chip text-xs font-semibold text-[#3D4D7C] hover:bg-white shadow-xs"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Add to Google / Apple Calendar</span>
          </button>
        </div>

        <div className="space-y-2 pt-6 max-w-sm mx-auto w-full">
          <GlassButton
            variant="primary"
            fullWidth
            onClick={() => navigate('/cases')}
          >
            View in My Cases
          </GlassButton>

          <GlassButton
            variant="outline"
            fullWidth
            onClick={() => navigate('/')}
          >
            Return to Home
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44]">
      {/* AppHeader */}
      <AppHeader title="Book Consultation" showBack />

      <form onSubmit={handleBooking} className="flex-1 flex flex-col justify-between">
        <div className="px-4 py-4 space-y-6">
          {/* Summary Card */}
          <GlassCard variant="card" className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
                Zoning Advisory Session
              </span>
              <span className="text-xs font-bold text-[#3FA66B] bg-[#3FA66B]/12 px-2.5 py-0.5 rounded-full">
                Free initial
              </span>
            </div>
            <h2 className="font-heading text-base font-bold text-[#1F2A44] leading-snug">
              {preselectedService}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#8A93A6] pt-1">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#3D4D7C]" />
                <span>45 min session</span>
              </span>
              <span>&bull;</span>
              <span>Dedicated Chicago Zoning Consultant</span>
            </div>
          </GlassCard>

          {/* Section 1: Format (3 equal tiles in one row, height 88px) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3D4D7C] text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-heading text-sm font-bold text-[#1F2A44] tracking-tight">
                Select Format
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'Video' as const, label: 'Video Call', icon: Video, sub: 'Meet / Zoom' },
                { type: 'Phone' as const, label: 'Phone', icon: Phone, sub: 'Direct Call' },
                { type: 'In-office' as const, label: 'In-Office', icon: Building2, sub: 'Chicago Office' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = consultType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setConsultType(item.type)}
                    className={`h-[88px] rounded-tile p-2.5 flex flex-col items-center justify-center gap-1 text-center transition-all select-none border ${
                      isSelected
                        ? 'btn-glossy-navy shadow-md ring-2 ring-[#3D4D7C]/30 text-white'
                        : 'liquid-glass-chip bg-white/70 text-[#1F2A44] hover:bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 stroke-[2] ${isSelected ? 'text-white' : 'text-[#3D4D7C]'}`} />
                    <span className="text-xs font-bold leading-tight">{item.label}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#8A93A6]'}`}>
                      {item.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Date (Horizontally scrollable, 64x72 equal size) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3D4D7C] text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading text-sm font-bold text-[#1F2A44] tracking-tight">
                Select Date (Mon – Fri)
              </h3>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
              {days.map((d) => {
                const isSelected = selectedDay === d.day;
                return (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setSelectedDay(d.day)}
                    className={`w-16 h-[72px] flex-shrink-0 rounded-tile flex flex-col items-center justify-center transition-all select-none border ${
                      isSelected
                        ? 'btn-glossy-navy shadow-md text-white'
                        : 'liquid-glass-chip bg-white/70 text-[#1F2A44] hover:bg-white'
                    }`}
                  >
                    <span className={`text-[11px] font-medium ${isSelected ? 'text-white/80' : 'text-[#8A93A6]'}`}>
                      {d.day}
                    </span>
                    <span className="text-base font-heading font-bold mt-0.5">
                      {d.num}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Time (2-column grid of 48px height chips, disabled strike) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#3D4D7C] text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-heading text-sm font-bold text-[#1F2A44] tracking-tight">
                  Select Time
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8A93A6]">
                Chicago Time (CST)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`h-12 rounded-tile px-3 flex items-center justify-between transition-all select-none border text-xs font-semibold ${
                      !slot.available
                        ? 'bg-slate-100/70 border-slate-200 text-[#8A93A6] line-through cursor-not-allowed opacity-60'
                        : isSelected
                        ? 'btn-glossy-navy shadow-md text-white'
                        : 'liquid-glass-chip bg-white/70 text-[#1F2A44] hover:bg-white'
                    }`}
                  >
                    <span>{slot.time}</span>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                    {!slot.available && (
                      <span className="text-[9px] uppercase font-bold no-underline text-[#8A93A6]">
                        Booked
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Details (One glass card with floating-label inputs) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3D4D7C] text-white text-[10px] font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="font-heading text-sm font-bold text-[#1F2A44] tracking-tight">
                Your Details
              </h3>
            </div>

            <GlassCard variant="card" className="p-4 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Sterling"
                  className="w-full h-11 px-3 rounded-tile border border-[#DDE2EA] bg-white text-xs text-[#1F2A44] focus:outline-none focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="312-555-0198"
                    className="w-full h-11 px-3 rounded-tile border border-[#DDE2EA] bg-white text-xs text-[#1F2A44] focus:outline-none focus:ring-2 focus:ring-[#3D4D7C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full h-11 px-3 rounded-tile border border-[#DDE2EA] bg-white text-xs text-[#1F2A44] focus:outline-none focus:ring-2 focus:ring-[#3D4D7C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                  Project Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Address or brief zoning goals..."
                  className="w-full p-2.5 rounded-tile border border-[#DDE2EA] bg-white text-xs text-[#1F2A44] focus:outline-none focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Sticky Liquid-Glass Bottom Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 z-40 liquid-glass-bar border-t border-white/80 px-4 py-3 shadow-[0_-8px_25px_rgba(31,42,68,0.12)] mt-auto">
          <div className="max-w-[430px] mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A93A6] block leading-none">
                Session Fee
              </span>
              <span className="font-heading text-base font-bold text-[#3FA66B] mt-0.5 block">
                $0.00 (Free Initial)
              </span>
            </div>

            <button
              type="submit"
              className="h-11 px-6 rounded-full btn-glossy-navy font-semibold text-xs flex items-center gap-2 shadow-md active:scale-98 transition-transform"
            >
              <span>Confirm Booking</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookConsultationScreen;
