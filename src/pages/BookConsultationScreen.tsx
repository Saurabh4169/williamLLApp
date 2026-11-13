import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  User,
  FileText,
  CalendarCheck,
  Check,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';

export const BookConsultationScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addAppointment, user } = useAppStore();

  const preselectedService = searchParams.get('service') || 'Zoning Analysis & Strategy Consultation';
  const preselectedDay = searchParams.get('day') || 'Mon';
  const preselectedTime = searchParams.get('time') || '10:00 AM';

  const [selectedService, setSelectedService] = useState(preselectedService);
  const [selectedDay, setSelectedDay] = useState(preselectedDay);
  const [selectedTime, setSelectedTime] = useState(preselectedTime);
  const [consultType, setConsultType] = useState<'Video' | 'Phone' | 'In-office'>('Video');
  const [name, setName] = useState(user.name || 'Alex Sterling');
  const [phone, setPhone] = useState(user.phone || '312-555-0198');
  const [email, setEmail] = useState(user.email || 'alex.sterling@example.com');
  const [address, setAddress] = useState('2144 N. Damen Ave, Chicago, IL');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookedAppointmentId, setBookedAppointmentId] = useState('');

  const days = [
    { day: 'Mon', num: '24', fullDate: 'Mon, Nov 24, 2026' },
    { day: 'Tue', num: '25', fullDate: 'Tue, Nov 25, 2026' },
    { day: 'Wed', num: '26', fullDate: 'Wed, Nov 26, 2026' },
    { day: 'Thu', num: '27', fullDate: 'Thu, Nov 27, 2026' },
    { day: 'Fri', num: '28', fullDate: 'Fri, Nov 28, 2026' },
  ];

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '01:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '04:00 PM', available: false },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDateObj = days.find((d) => d.day === selectedDay) || days[0];
    const newId = `app-${Date.now()}`;
    setBookedAppointmentId(newId);

    addAppointment({
      title: `${selectedService} (${consultType})`,
      type: consultType,
      date: selectedDateObj.fullDate,
      time: `${selectedTime} CST`,
      expertName: 'Marcus Vance, Esq.',
      location:
        consultType === 'In-office'
          ? BUSINESS_INFO.address
          : consultType === 'Phone'
          ? `Direct Call to ${phone}`
          : 'Google Meet / Zoom (Link sent to email)',
      status: 'Confirmed',
    });

    setIsBooked(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#3D4D7C', '#1F2A44', '#B7C3DA', '#3FA66B'],
      });
    } catch {
      // fallback
    }
  };

  const selectedDateObj = days.find((d) => d.day === selectedDay) || days[0];

  if (isBooked) {
    return (
      <div className="min-h-full flex flex-col text-[#1F2A44] bg-[#F2F3F5] pb-24">
        <AppHeader title="Booking Confirmed" />

        <div className="px-4 py-6 max-w-md mx-auto w-full space-y-5">
          {/* Success Banner */}
          <div className="text-center space-y-2 pt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 shadow-sm animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
            </div>
            <h1 className="font-heading text-xl font-black text-[#1F2A44]">
              Appointment Confirmed!
            </h1>
            <p className="text-xs text-[#5A657D] max-w-xs mx-auto leading-relaxed">
              Your consultation has been booked with Williams &amp; Williams LLC. We have emailed you calendar details and access links.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="p-4 rounded-[22px] bg-white border border-[#DDE2EA] shadow-md space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#EEF1F6] pb-3">
              <div>
                <span className="text-[9.5px] font-bold text-[#8A93A6] uppercase tracking-wider block">
                  Reference Code
                </span>
                <span className="font-mono text-xs font-bold text-[#1F2A44]">
                  WW-{selectedDay.toUpperCase()}-2026
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase">
                Confirmed &bull; Free Initial
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-sm font-bold text-[#1F2A44]">
                {selectedService}
              </h3>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="rounded-xl p-2 bg-[#F8F9FB] border border-[#EEF1F6]">
                  <span className="text-[10px] font-medium text-[#8A93A6] block">Date &amp; Time</span>
                  <span className="font-bold text-[#1F2A44] mt-0.5 block">
                    {selectedDateObj.day}, Nov {selectedDateObj.num} &bull; {selectedTime}
                  </span>
                </div>

                <div className="rounded-xl p-2 bg-[#F8F9FB] border border-[#EEF1F6]">
                  <span className="text-[10px] font-medium text-[#8A93A6] block">Consultation Format</span>
                  <span className="font-bold text-[#1F2A44] mt-0.5 block">
                    {consultType === 'Video' ? 'Video Meeting (Zoom)' : consultType === 'Phone' ? 'Direct Phone Call' : 'Chicago Office'}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#5A657D] flex items-center gap-2">
                <User className="w-4 h-4 text-[#3D4D7C] flex-shrink-0" />
                <span>Advisor: <strong className="text-[#1F2A44]">Marcus Vance, Esq.</strong> (Principal Zoning Strategist)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => navigate('/profile?tab=bookings')}
              className="w-full py-3 rounded-full btn-glossy-navy text-xs font-bold shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>View in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-2.5 rounded-full bg-white border border-[#DDE2EA] text-[#1F2A44] text-xs font-bold text-center hover:bg-[#F2F3F5] active:scale-98 transition-all"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] bg-[#F2F3F5] pb-28">
      <AppHeader title="Book Consultation" showBack />

      <form onSubmit={handleBooking} className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
        {/* Top Summary Banner */}
        <div className="p-3.5 rounded-[20px] bg-white border border-[#DDE2EA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chicago Zoning Advisory</span>
            </span>
            <span className="text-[10px] font-bold text-[#3FA66B] bg-[#3FA66B]/12 px-2.5 py-0.5 rounded-full">
              $0.00 Free Initial
            </span>
          </div>

          <div>
            <h2 className="font-heading text-sm sm:text-base font-bold text-[#1F2A44] leading-snug">
              {selectedService}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-[#8A93A6] mt-1">
              <span className="flex items-center gap-1 font-semibold text-[#3D4D7C]">
                <Clock className="w-3.5 h-3.5" />
                <span>45 Min Strategy</span>
              </span>
              <span>&bull;</span>
              <span>Direct Attorney Review</span>
            </div>
          </div>
        </div>

        {/* 1. Format Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-4 h-4 rounded-full bg-[#1F2A44] text-white text-[10px] font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
              Select Consultation Format
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
                  className={`py-3 px-2 rounded-[16px] flex flex-col items-center justify-center gap-1 text-center transition-all select-none border active:scale-95 ${
                    isSelected
                      ? 'bg-[#1F2A44] text-white border-[#1F2A44] shadow-sm'
                      : 'bg-white text-[#1F2A44] border-[#DDE2EA] hover:border-[#3D4D7C]/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[2.2] ${isSelected ? 'text-white' : 'text-[#3D4D7C]'}`} />
                  <span className="text-[11px] font-bold leading-tight">{item.label}</span>
                  <span className={`text-[9px] ${isSelected ? 'text-white/70' : 'text-[#8A93A6]'}`}>
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Date Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1F2A44] text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Select Date
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#8A93A6]">
              Monday &ndash; Friday
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {days.map((d) => {
              const isSelected = selectedDay === d.day;
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setSelectedDay(d.day)}
                  className={`py-2 rounded-[14px] flex flex-col items-center justify-center transition-all select-none border active:scale-95 ${
                    isSelected
                      ? 'bg-[#1F2A44] text-white border-[#1F2A44] shadow-sm'
                      : 'bg-white text-[#1F2A44] border-[#DDE2EA] hover:border-[#3D4D7C]/40'
                  }`}
                >
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-white/80' : 'text-[#8A93A6]'}`}>
                    {d.day}
                  </span>
                  <span className="text-sm font-heading font-black mt-0.5">
                    {d.num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Time Slot Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1F2A44] text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Select Time Slot
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#8A93A6]">
              Chicago CST
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
                  className={`h-11 rounded-[14px] px-3 flex items-center justify-between transition-all select-none border text-xs font-semibold ${
                    !slot.available
                      ? 'bg-slate-100/70 border-slate-200 text-[#8A93A6] line-through cursor-not-allowed opacity-60'
                      : isSelected
                      ? 'bg-[#1F2A44] text-white border-[#1F2A44] shadow-sm'
                      : 'bg-white text-[#1F2A44] border-[#DDE2EA] hover:border-[#3D4D7C]/40 active:scale-95'
                  }`}
                >
                  <span>{slot.time}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
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

        {/* 4. Client & Parcel Information */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-4 h-4 rounded-full bg-[#1F2A44] text-white text-[10px] font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
              Your Contact &amp; Property Details
            </h3>
          </div>

          <div className="p-3.5 rounded-[20px] bg-white border border-[#DDE2EA] shadow-xs space-y-2.5">
            <div>
              <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-[#8A93A6] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Sterling"
                  className="w-full h-10 pl-8 pr-3 rounded-[12px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs text-[#1F2A44] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                  Mobile Phone *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#8A93A6] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="312-555-0198"
                    className="w-full h-10 pl-8 pr-3 rounded-[12px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs text-[#1F2A44] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3D4D7C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#8A93A6] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full h-10 pl-8 pr-3 rounded-[12px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs text-[#1F2A44] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3D4D7C]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                Chicago Property Address or PIN
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#8A93A6] absolute left-3 top-3" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 2144 N Damen Ave or PIN"
                  className="w-full h-10 pl-8 pr-3 rounded-[12px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs text-[#1F2A44] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#8A93A6] uppercase tracking-wider mb-1">
                Project Goals / Notes (Optional)
              </label>
              <div className="relative">
                <FileText className="w-3.5 h-3.5 text-[#8A93A6] absolute left-3 top-2.5" />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your parcel, zoning denial, or expansion goals..."
                  className="w-full pl-8 pr-3 py-2 rounded-[12px] border border-[#DDE2EA] bg-[#F8F9FB] text-xs text-[#1F2A44] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3D4D7C]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Booking Action inside the form with ample spacing */}
        <div className="p-3.5 rounded-[20px] bg-white border border-[#DDE2EA] shadow-sm flex items-center justify-between gap-3">
          <div>
            <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#8A93A6] block leading-none">
              Consultation Fee
            </span>
            <span className="font-heading text-sm font-bold text-[#3FA66B] mt-0.5 block">
              $0.00 (Free Initial)
            </span>
          </div>

          <button
            type="submit"
            className="h-10 px-5 rounded-full btn-glossy-navy font-bold text-xs flex items-center gap-2 shadow-sm active:scale-98 transition-transform"
          >
            <span>Confirm Booking</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookConsultationScreen;
