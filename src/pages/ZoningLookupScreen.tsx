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
} from 'lucide-react';
import { lookupChicagoAddress, ZoningLookupResult } from '../data/zoningLookup';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
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
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="Chicago Zoning Lookup" showBack />

      <div className="px-4 py-4 space-y-5">
        {/* Title & Description */}
        <div>
          <h1 className="font-heading text-xl font-bold text-[#1F2A44] tracking-tight">
            Chicago Zoning District Lookup
          </h1>
          <p className="text-xs text-[#8A93A6]">
            Search by Chicago address or parcel to inspect municipal zoning rules.
          </p>
        </div>

        {/* Address Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#8A93A6]" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Chicago street address or PIN..."
              className="w-full h-12 pl-10 pr-22 rounded-full border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C] shadow-xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-3.5 py-2 rounded-full btn-glossy-navy text-xs font-semibold active:scale-95 transition-all"
            >
              Lookup
            </button>
          </div>
        </form>

        {/* Quick Sample Address Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] font-bold text-[#8A93A6] whitespace-nowrap">Try:</span>
          {quickAddresses.map((addr) => (
            <button
              key={addr}
              onClick={() => {
                setInputVal(addr);
                setResult(lookupChicagoAddress(addr));
              }}
              className="px-2.5 py-1 rounded-full liquid-glass-chip text-[11px] font-medium text-[#1F2A44] whitespace-nowrap hover:border-[#3D4D7C]/40 transition-all select-none"
            >
              {addr.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Interactive Map Card with Official City Map Link */}
        <GlassCard className="overflow-hidden p-0">
          <div className="relative h-44 w-full bg-[#1F2A44] flex items-center justify-center text-center p-4">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #B7C3DA 1px, transparent 1px), linear-gradient(to right, #B7C3DA 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center text-[#B7C3DA] border border-white/20">
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
                  Zoning Classification
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="font-heading text-2xl font-bold text-[#1F2A44]">
                    {result.zoningDistrict}
                  </h3>
                  <Badge variant="primary" size="sm">
                    {result.todEligible ? 'TOD Eligible' : 'Standard'}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
                  Max FAR
                </span>
                <div className="font-heading text-lg font-bold text-[#3D4D7C]">
                  {result.maxFAR.split(' ')[0]}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8A93A6] leading-relaxed">
              {result.districtName}
            </p>
          </div>
        </GlassCard>

        {/* Tab Controls for Detailed Zoning Breakdown */}
        <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-white/60">
          <button
            onClick={() => setActiveTab('uses')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'uses' ? 'btn-glossy-navy shadow-sm' : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Allowed Uses
          </button>
          <button
            onClick={() => setActiveTab('envelope')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'envelope' ? 'btn-glossy-navy shadow-sm' : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Building Envelope
          </button>
          <button
            onClick={() => setActiveTab('ward')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'ward' ? 'btn-glossy-navy shadow-sm' : 'text-[#8A93A6] hover:text-[#1F2A44]'
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
              <ul className="space-y-1.5 text-xs text-[#1F2A44]">
                {result.allowedUses.map((use, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3FA66B]" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-white/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5484D] flex items-center gap-1 mb-2">
                <XCircle className="w-3.5 h-3.5" />
                Prohibited / Special Use Needed
              </span>
              <ul className="space-y-1.5 text-xs text-[#8A93A6]">
                {result.restrictedUses.map((use, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D]" />
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
              <span className="text-[#8A93A6]">Maximum Height:</span>
              <span className="font-semibold text-[#1F2A44]">{result.maxHeight}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#8A93A6]">Front Yard Setback:</span>
              <span className="font-semibold text-[#1F2A44]">{result.frontSetback}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#8A93A6]">Rear Yard Setback:</span>
              <span className="font-semibold text-[#1F2A44]">{result.rearSetback}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8A93A6]">Transit Reduction:</span>
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
              <span className="text-[#8A93A6]">Municipal Ward:</span>
              <span className="font-bold text-[#1F2A44]">{result.ward}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/60">
              <span className="text-[#8A93A6]">City Council Member:</span>
              <span className="font-bold text-[#1F2A44]">{result.alderman}</span>
            </div>
            <p className="text-[11px] text-[#8A93A6] pt-1 leading-relaxed">
              {result.notes}
            </p>
          </GlassCard>
        )}

        {/* Legal Disclaimer Box */}
        <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 flex items-start gap-2.5 text-xs text-[#1F2A44]">
          <Info className="w-4 h-4 text-[#3D4D7C] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#8A93A6] leading-tight">
            <strong>Legal Note:</strong> Informational only, not legal advice. Zoning codes are subject to municipal map amendments and aldermanic prerogatives.
          </p>
        </div>

        {/* Primary CTA: Get Expert Help */}
        <div className="pt-2">
          <GlassButton
            variant="primary"
            fullWidth
            onClick={() => navigate(`/quote?address=${encodeURIComponent(result.address)}`)}
            className="flex items-center justify-center gap-2 min-h-[48px]"
          >
            <span>Get Expert Help with this Property</span>
            <ArrowRight className="w-4 h-4" />
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default ZoningLookupScreen;
