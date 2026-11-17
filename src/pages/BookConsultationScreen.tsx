import React, { useState, useEffect } from 'react';
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
  Check,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';
import PaymentModal from '../components/features/PaymentModal';

export const BookConsultationScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addAppointment, addBooking, user, showToast } = useAppStore();

  const preselectedService = searchParams.get('service') || 'Zoning Analysis & Strategy Consultation';
  const preselectedDay = searchParams.get('day') || 'Mon';
  const preselectedTime = searchParams.get('time') || '10:00 AM';

  const [selectedService, setSelectedService] = useState(preselectedService);
  const [serviceCode, setServiceCode] = useState('WW-SRV-01');

  // Booking is exclusively handled on Services > Details > Book a Service
  useEffect(() => {
    navigate('/services/zoning-analysis-consultation', { replace: true });
  }, [navigate]);

  // Package Choice: Basic review ($150), Standard ($450), Full analysis ($900)
  const packages = [
    {
      id: 'basic' as const,
      name: 'Basic review',
      price: 150,
      badge: 'Quick Check',
      desc: '1-Lot zoning district verification & permitted use check.',
    },
    {
      id: 'standard' as const,
      name: 'Standard',
      price: 450,
      badge: 'Most Popular',
      desc: 'Full setback analysis, FAR calculation & parking requirements.',
    },
    {
      id: 'full' as const,
      name: 'Full analysis',
      price: 900,
      badge: 'Comprehensive',
      desc: 'Aldermanic rapport check & ZBA variance petition roadmap.',
    },
  ];

  const [selectedPackageId, setSelectedPackageId] = useState<'basic' | 'standard' | 'full'>('standard');
  const activePackage = packages.find((p) => p.id === selectedPackageId) || packages[1];

  const [selectedDay, setSelectedDay] = useState(preselectedDay);
  const [selectedTime, setSelectedTime] = useState(preselectedTime);
  const [consultType, setConsultType] = useState<'Video' | 'Phone' | 'In-office'>('Video');
  const [name, setName] = useState(user.name || 'Alex Sterling');
  const [phone, setPhone] = useState(user.phone || '312-555-0198');
  const [email, setEmail] = useState(user.email || 'alex.sterling@example.com');
  const [address, setAddress] = useState('2144 N. Damen Ave, Chicago, IL');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentOpen(true);
  };

  const handlePaymentCompleted = () => {
    const selectedDateObj = days.find((d) => d.day === selectedDay) || days[0];

    addBooking({
      serviceTitle: selectedService,
      packageType:
        selectedPackageId === 'basic'
          ? 'Basic'
          : selectedPackageId === 'full'
          ? 'Full analysis'
          : 'Standard',
      amount: activePackage.price,
      date: selectedDateObj.fullDate,
      time: `${selectedTime} CST`,
      meetingType: consultType === 'In-office' ? 'In person' : consultType,
      propertyAddress: address,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      projectType: 'Consultation & Review',
      description: notes || undefined,
    });

    setIsBooked(true);
    showToast(`Payment successful. Your booking is confirmed.`);
  };

  const selectedDateObj = days.find((d) => d.day === selectedDay) || days[0];

  if (isBooked) {
    return (
      <div className="min-h-full flex flex-col text-[#191919] bg-transparent pb-24">
        {/* Sub-screen header with Back Arrow and Title */}
        <div className="px-4 pt-3 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/profile?tab=bookings')}
            className="w-8 h-8 rounded-full bg-white/90 border border-[#D8D8D8] text-[#191919] flex items-center justify-center shadow-2xs hover:bg-white active:scale-95 transition-all"
            aria-label="Back to Bookings"
          >
            <ArrowRight className="w-4 h-4 rotate-180 stroke-[2.2]" />
          </button>
          <h1 className="font-heading text-base font-bold text-[#191919]">
            Booking Confirmed
          </h1>
        </div>

        <div className="px-4 py-4 max-w-md mx-auto w-full space-y-4">
          {/* Success Banner */}
          <div className="text-center space-y-2 pt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 shadow-sm animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
            </div>
            <h2 className="font-heading text-xl font-black text-[#191919]">
              Appointment &amp; Retainer Paid!
            </h2>
            <p className="text-xs text-[#71717A] max-w-xs mx-auto leading-relaxed">
              Your consultation has been confirmed with Williams &amp; Williams LLC. We have emailed you calendar details, intake invoice, and Zoom access links.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="p-4 rounded-[22px] liquid-glass-card shadow-md space-y-3.5 relative overflow-hidden border border-[#D8D8D8]">
            <div className="flex items-center justify-between border-b border-[#D8D8D8]/60 pb-3">
              <div>
                <span className="text-[9.5px] font-bold text-[#8C9DAA] uppercase tracking-wider block">
                  Service Reference Code
                </span>
                <span className="font-mono text-xs font-bold text-[#191919]">
                  {serviceCode}-2026
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase">
                Paid ${activePackage.price}.00 &bull; Confirmed
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-sm font-bold text-[#191919]">
                {selectedService} ({activePackage.name})
              </h3>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="rounded-xl p-2 bg-white/80 border border-[#D8D8D8]/70">
                  <span className="text-[10px] font-medium text-[#8C9DAA] block">Date &amp; Time</span>
                  <span className="font-bold text-[#191919] mt-0.5 block">
                    {selectedDateObj.day}, Nov {selectedDateObj.num} &bull; {selectedTime}
                  </span>
                </div>

                <div className="rounded-xl p-2 bg-white/80 border border-[#D8D8D8]/70">
                  <span className="text-[10px] font-medium text-[#8C9DAA] block">Format</span>
                  <span className="font-bold text-[#191919] mt-0.5 block">
                    {consultType === 'Video' ? 'Video Meeting (Zoom)' : consultType === 'Phone' ? 'Direct Phone' : 'Chicago Office'}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#71717A] flex items-center gap-2">
                <User className="w-4 h-4 text-[#323232] flex-shrink-0" />
                <span>Assigned Counsel: <strong className="text-[#191919]">Marcus Vance, Esq.</strong></span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => navigate('/profile?tab=bookings')}
              className="w-full py-3 rounded-full btn-glossy-primary text-xs font-bold shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>View in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D8D8D8] text-[#191919] text-xs font-bold text-center hover:bg-[#F4F5F5] active:scale-98 transition-all"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col text-[#191919] bg-transparent pb-28">
      {/* Sub-screen Header with Back Arrow & Title */}
      <div className="px-4 pt-3 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/90 border border-[#D8D8D8] text-[#191919] flex items-center justify-center shadow-2xs hover:bg-white active:scale-95 transition-all flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowRight className="w-4 h-4 rotate-180 stroke-[2.2]" />
        </button>
        <div>
          <h1 className="font-heading text-base font-bold text-[#191919] leading-tight">
            Book a Service
          </h1>
          <p className="text-[10.5px] text-[#8C9DAA] font-medium">
            Select package, time &amp; proceed to payment
          </p>
        </div>
      </div>

      <form onSubmit={handleOpenPayment} className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
        {/* Service Name and Code */}
        <div className="p-3.5 rounded-[20px] liquid-glass-card shadow-xs space-y-2 border border-[#D8D8D8]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#323232] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A4B3BE]" />
              <span>Chicago Municipal Practice</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-[#191919] bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 px-2 py-0.5 rounded-full">
              Code: {serviceCode}
            </span>
          </div>

          <div>
            <h2 className="font-heading text-sm sm:text-base font-bold text-[#191919] leading-snug">
              {selectedService}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-[#71717A] mt-1">
              <span className="flex items-center gap-1 font-semibold text-[#323232]">
                <Clock className="w-3.5 h-3.5 text-[#A4B3BE]" />
                <span>45 Min Strategy</span>
              </span>
              <span>&bull;</span>
              <span>Direct Attorney Review</span>
            </div>
          </div>
        </div>

        {/* 1. Package Choice with Showcase Prices */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-4 h-4 rounded-full bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] text-[10px] font-bold flex items-center justify-center shadow-xs">
              1
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919]">
              Select Service Package
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {packages.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`p-2.5 rounded-[16px] flex flex-col justify-between text-left transition-all select-none border active:scale-95 relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-md shadow-black/20'
                      : 'liquid-glass-card text-[#323232] border-[#D8D8D8] hover:border-[#A4B3BE]'
                  }`}
                >
                  <div>
                    <span
                      className={`text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-md inline-block mb-1 ${
                        isSelected
                          ? 'bg-white/20 text-[#FEFEFE]'
                          : 'bg-[#C0D0E1]/40 text-[#191919]'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <h4 className="font-heading text-[11px] font-bold leading-tight">
                      {pkg.name}
                    </h4>
                  </div>

                  <div className="mt-2 pt-1 border-t border-white/10">
                    <span className="font-heading text-sm font-black">
                      ${pkg.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-[#71717A] px-1 italic">
            {activePackage.desc}
          </p>
        </div>

        {/* 2. Format Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-4 h-4 rounded-full bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] text-[10px] font-bold flex items-center justify-center shadow-xs">
              2
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919]">
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
                  className={`py-2.5 px-2 rounded-[16px] flex flex-col items-center justify-center gap-1 text-center transition-all select-none border active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-md shadow-black/20'
                      : 'liquid-glass-card text-[#323232] border-[#D8D8D8] hover:border-[#A4B3BE]'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[2.2] ${isSelected ? 'text-[#FEFEFE]' : 'text-[#323232]'}`} />
                  <span className="text-[11px] font-bold leading-tight">{item.label}</span>
                  <span className={`text-[9px] ${isSelected ? 'text-[#C0D0E1]' : 'text-[#71717A]'}`}>
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Date Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] text-[10px] font-bold flex items-center justify-center shadow-xs">
                3
              </span>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919]">
                Select Date
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#8C9DAA]">
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
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-md shadow-black/20'
                      : 'liquid-glass-card text-[#323232] border-[#D8D8D8] hover:border-[#A4B3BE]'
                  }`}
                >
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-[#C0D0E1]' : 'text-[#71717A]'}`}>
                    {d.day}
                  </span>
                  <span className={`text-sm font-heading font-black mt-0.5 ${isSelected ? 'text-[#FEFEFE]' : 'text-[#191919]'}`}>
                    {d.num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Time Slot Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] text-[10px] font-bold flex items-center justify-center shadow-xs">
                4
              </span>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919]">
                Select Time Slot
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#8C9DAA]">
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
                  className={`h-10 rounded-[14px] px-3 flex items-center justify-between transition-all select-none border text-xs font-semibold ${
                    !slot.available
                      ? 'bg-[#ECEEF0]/70 border-[#D8D8D8] text-[#8C9DAA] line-through cursor-not-allowed opacity-60'
                      : isSelected
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] border-[#191919] shadow-md shadow-black/20'
                      : 'liquid-glass-card text-[#323232] border-[#D8D8D8] hover:border-[#A4B3BE] active:scale-95'
                  }`}
                >
                  <span>{slot.time}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FEFEFE] stroke-[2.5]" />}
                  {!slot.available && (
                    <span className="text-[9px] uppercase font-bold no-underline text-[#8C9DAA]">
                      Booked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Contact & Address */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-4 h-4 rounded-full bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] text-[10px] font-bold flex items-center justify-center shadow-xs">
              5
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#191919]">
              Contact &amp; Parcel Details
            </h3>
          </div>

          <div className="p-3 rounded-[18px] liquid-glass-card space-y-2 border border-[#D8D8D8]">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9.5px] font-bold text-[#8C9DAA] uppercase mb-0.5">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-[10px] border border-[#D8D8D8] bg-white text-xs text-[#191919]"
                />
              </div>
              <div>
                <label className="block text-[9.5px] font-bold text-[#8C9DAA] uppercase mb-0.5">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-[10px] border border-[#D8D8D8] bg-white text-xs text-[#191919]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9.5px] font-bold text-[#8C9DAA] uppercase mb-0.5">
                Chicago Property Address or PIN
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 2144 N Damen Ave"
                className="w-full h-8 px-2.5 rounded-[10px] border border-[#D8D8D8] bg-white text-xs text-[#191919]"
              />
            </div>
          </div>
        </div>

        {/* 6. Price Summary Box */}
        <div className="p-3.5 rounded-[20px] liquid-glass-card border border-[#D8D8D8] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
            Price Summary
          </span>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[#82807A]">
              <span>{activePackage.name} Package</span>
              <span className="font-semibold text-[#191919]">${activePackage.price}.00</span>
            </div>

            <div className="flex items-center justify-between text-[#82807A]">
              <span>Municipal Intake &amp; Booking Fee</span>
              <span className="font-semibold text-emerald-600">$0.00 (Waived)</span>
            </div>

            <div className="pt-2 border-t border-[#D8D8D8] flex items-center justify-between font-bold text-sm">
              <span className="text-[#191919]">Total</span>
              <span className="text-[#191919] font-heading font-extrabold">
                ${activePackage.price}.00
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Continue to payment */}
        <div className="pt-1">
          <button
            type="submit"
            className="w-full h-11 rounded-full btn-glossy-primary font-heading font-bold text-xs text-[#FEFEFE] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          >
            <CreditCard className="w-4 h-4 stroke-[2.2]" />
            <span>Continue to payment</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </form>

      {/* Payment Screen Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title="Secure Service Booking"
        itemTitle={`${selectedService} (${activePackage.name})`}
        itemCode={serviceCode}
        amount={activePackage.price}
        onSuccess={handlePaymentCompleted}
      />
    </div>
  );
};

export default BookConsultationScreen;

