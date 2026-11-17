import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ExternalLink,
  CheckCircle,
  XCircle,
  ArrowRight,
  Info,
  ShieldCheck,
  X,
} from 'lucide-react';
import { lookupChicagoAddress, ZoningLookupResult } from '../data/zoningLookup';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';

export const ZoningLookupScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('q') || searchParams.get('area') || '2144 N Damen Ave';
  const [inputVal, setInputVal] = useState(initialQuery);
  const [result, setResult] = useState<ZoningLookupResult>(lookupChicagoAddress(initialQuery));
  const [activeTab, setActiveTab] = useState<'uses' | 'envelope' | 'ward'>('uses');

  useEffect(() => {
    if (initialQuery) {
      setInputVal(initialQuery);
      setResult(lookupChicagoAddress(initialQuery));
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setResult(lookupChicagoAddress(inputVal.trim()));
    }
  };

  const quickAddresses = [
    '2144 N Damen Ave',
    '920 W Fulton Market',
    '10 S Dearborn St',
    '1850 N Clark St',
  ];

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-6">
      <AppHeader title="Chicago Zoning Lookup" showBack />

      <div className="px-4 py-4 space-y-5">
        {/* Title & Description */}
        <div>
          <h1 className="font-heading text-xl font-bold text-[#121214] tracking-tight">
            Chicago Zoning District Lookup
          </h1>
          <p className="text-xs text-[#82807A]">
            Search by Chicago address or parcel to inspect municipal zoning rules.
          </p>
        </div>

        {/* Address Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="h-12 pl-4 pr-2 rounded-full bg-white/90 backdrop-blur-md border border-[#D8D8D8] shadow-xs flex items-center gap-2 focus-within:border-[#323232] focus-within:ring-2 focus-within:ring-[#323232]/10 transition-all">
            <Search className="w-4 h-4 text-[#82807A] flex-shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Chicago street address or PIN..."
              className="flex-1 min-w-0 bg-transparent text-xs text-[#191919] placeholder-[#82807A] focus:outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                className="w-5 h-5 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#82807A] hover:text-[#191919] transition-colors flex-shrink-0"
                aria-label="Clear search input"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              type="submit"
              className="h-8 px-4 rounded-full btn-glossy-primary text-xs font-semibold text-white flex items-center justify-center flex-shrink-0 shadow-xs hover:shadow-sm active:scale-95 transition-all"
            >
              Lookup
            </button>
          </div>
        </form>

        {/* Quick Sample Address Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] font-bold text-[#82807A] whitespace-nowrap">Try:</span>
          {quickAddresses.map((addr) => (
            <button
              key={addr}
              onClick={() => {
                setInputVal(addr);
                setResult(lookupChicagoAddress(addr));
              }}
              className="px-2.5 py-1 rounded-full liquid-glass-chip text-[11px] font-medium text-[#191919] whitespace-nowrap hover:border-[#323232]/40 transition-all select-none"
            >
              {addr.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Interactive Map Card with Official City Map Link */}
        <GlassCard className="overflow-hidden p-0">
          <div className="relative h-44 w-full bg-[#121214] flex items-center justify-center text-center p-4">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #C7D3DC 1px, transparent 1px), linear-gradient(to right, #C7D3DC 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center text-[#C7D3DC] border border-white/20">
                <MapPin className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-white font-heading text-sm font-bold tracking-wide">
                PARCEL PIN: {result.pin}
              </div>
              <p className="text-[11px] text-white/70 max-w-xs mx-auto">
                {result.address} &bull; {result.ward}
              </p>
            </div>

            {/* Official City Map External CTA */}
            <a
              href={BUSINESS_INFO.officialZoningMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 hover:bg-black/80 transition-all"
            >
              <span>Official City GIS Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Result Header Badge */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A]">
                  Zoning Classification
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="font-heading text-2xl font-bold text-[#121214]">
                    {result.zoningDistrict}
                  </h3>
                  <Badge variant="primary" size="sm">
                    {result.todEligible ? 'TOD Eligible' : 'Standard'}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A]">
                  Max FAR
                </span>
                <div className="font-heading text-lg font-bold text-[#323232]">
                  {result.maxFAR.split(' ')[0]}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#82807A] leading-relaxed">
              {result.districtName}
            </p>
          </div>
        </GlassCard>

        {/* Tab Controls for Detailed Zoning Breakdown */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-white/85 backdrop-blur-md border border-[#D8D8D8] shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('uses')}
            className={`h-9 px-1 rounded-full text-[11px] font-semibold transition-all duration-150 flex items-center justify-center text-center tracking-tight leading-none select-none ${
              activeTab === 'uses' ? 'btn-glossy-primary text-white font-bold shadow-xs' : 'text-[#6E6E73] hover:text-[#121214] hover:bg-black/5'
            }`}
          >
            Allowed Uses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('envelope')}
            className={`h-9 px-1 rounded-full text-[11px] font-semibold transition-all duration-150 flex items-center justify-center text-center tracking-tight leading-none select-none ${
              activeTab === 'envelope' ? 'btn-glossy-primary text-white font-bold shadow-xs' : 'text-[#6E6E73] hover:text-[#121214] hover:bg-black/5'
            }`}
          >
            Building Envelope
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ward')}
            className={`h-9 px-1 rounded-full text-[11px] font-semibold transition-all duration-150 flex items-center justify-center text-center tracking-tight leading-none select-none ${
              activeTab === 'ward' ? 'btn-glossy-primary text-white font-bold shadow-xs' : 'text-[#6E6E73] hover:text-[#121214] hover:bg-black/5'
            }`}
          >
            Ward &amp; Council
          </button>
        </div>

        {/* Tab Content: Allowed & Restricted Uses */}
        {activeTab === 'uses' && (
          <GlassCard className="p-4 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3FA66B] flex items-center gap-1 mb-2">
                <CheckCircle className="w-3.5 h-3.5" />
                Permitted Uses
              </span>
              <ul className="space-y-1.5 text-xs text-[#121214]">
                {result.allowedUses.map((use, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3FA66B]" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-white/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E52E3A] flex items-center gap-1 mb-2">
                <XCircle className="w-3.5 h-3.5" />
                Prohibited / Special Use Needed
              </span>
              <ul className="space-y-1.5 text-xs text-[#82807A]">
                {result.restrictedUses.map((use, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E52E3A]" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        )}

        {/* Tab Content: Building Envelope */}
        {activeTab === 'envelope' && (
          <GlassCard className="p-4 space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#82807A]">Maximum Height:</span>
              <span className="font-semibold text-[#121214]">{result.maxHeight}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#82807A]">Front Yard Setback:</span>
              <span className="font-semibold text-[#121214]">{result.frontSetback}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#82807A]">Rear Yard Setback:</span>
              <span className="font-semibold text-[#121214]">{result.rearSetback}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#82807A]">Transit Reduction:</span>
              <span className="font-semibold text-[#3FA66B]">
                {result.todEligible ? 'Eligible for 100% Parking Relief' : 'Standard Parking Mandate'}
              </span>
            </div>
          </GlassCard>
        )}

        {/* Tab Content: Ward & Council */}
        {activeTab === 'ward' && (
          <GlassCard className="p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#82807A]">Municipal Ward:</span>
              <span className="font-bold text-[#121214]">{result.ward}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#82807A]">City Council Member:</span>
              <span className="font-bold text-[#121214]">{result.alderman}</span>
            </div>
            <p className="text-[11px] text-[#82807A] pt-1 leading-relaxed">
              {result.notes}
            </p>
          </GlassCard>
        )}

        {/* Modernized Premium Expert Assistance Card */}
        <div className="pt-1 pb-24 space-y-3">
          <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#D8D8D8] shadow-xs space-y-3 relative overflow-hidden">
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C7D3DC]/20 to-transparent rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#191919] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#C7D3DC]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#121214] tracking-tight">
                  Need Expert Zoning &amp; Permitting Help?
                </h4>
                <p className="text-[11px] text-[#82807A] truncate">
                  Direct consultation with Chicago zoning counsel &amp; architects
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/quote?address=${encodeURIComponent(result.address)}`)}
              className="w-full h-11 px-4 rounded-full btn-glossy-primary text-xs font-bold text-white flex items-center justify-between shadow-xs hover:shadow-sm active:scale-[0.98] transition-all group"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Get Expert Help with this Property</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="p-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-[#E2E4E8] flex items-start gap-2 text-[10px] text-[#82807A] leading-tight">
            <Info className="w-3.5 h-3.5 text-[#82807A] flex-shrink-0 mt-0.5" />
            <p>
              <strong>Legal Note:</strong> Informational only, not legal advice. Zoning codes are subject to municipal map amendments and aldermanic prerogatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoningLookupScreen;
