import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  Users2,
  HeartHandshake,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';
import ImageWithFallback from '../components/ui/ImageWithFallback';

export const AboutScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="About Our Firm" showBack />

      <div className="px-4 py-4 space-y-6">
        {/* Hero Header */}
        <div className="relative rounded-card-lg overflow-hidden bg-[#1F2A44] text-white p-6 shadow-glass">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B7C3DA] bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
              CHICAGO ZONING SPECIALISTS
            </span>
            <h1 className="font-heading text-2xl font-bold leading-tight">
              WILLIAMS &amp; WILLIAMS LLC
            </h1>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Navigating complex zoning with ease. Tailored zoning solutions in Chicago.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 translate-x-4 translate-y-4 pointer-events-none">
            <img src="/brand-icon-white.png" alt="" className="w-36 h-36 object-contain" />
          </div>
        </div>

        {/* Firm Story */}
        <GlassCard className="p-5 space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
            Our Firm Story
          </h2>
          <p className="text-xs text-[#8A93A6] leading-relaxed">
            Founded in Chicago, Williams &amp; Williams LLC was established to bring clarity, speed, and strategic precision to an otherwise daunting municipal zoning process.
          </p>
          <p className="text-xs text-[#8A93A6] leading-relaxed">
            Whether representing a homeowner seeking a rear-yard variance in Lincoln Park or guiding an institutional developer through a high-density transit-oriented rezoning in Fulton Market, our team combines technical code expertise with proactive civic engagement.
          </p>
        </GlassCard>

        {/* Founder Profile */}
        <GlassCard className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
              Leadership
            </span>
            <Badge variant="glass" size="sm">
              [FOUNDER PHOTO PLACEHOLDER]
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#1F2A44] flex-shrink-0 shadow-sm border border-white/60">
              <ImageWithFallback
                imageKey="aboutFounder"
                aspectRatio="aspect-square w-full h-full"
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                Marcus Vance [Placeholder]
              </h3>
              <p className="text-xs font-semibold text-[#3D4D7C]">
                Managing Principal &amp; Senior Zoning Strategist
              </p>
              <p className="text-xs text-[#8A93A6] leading-relaxed pt-1">
                20+ years of zoning advisory, municipal code analysis, and expert testimony before the Chicago Zoning Board of Appeals.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Brand Values (Experienced. Knowledgeable. Dedicated.) */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
            Our Positioning &amp; Values
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            <GlassCard className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
                  Experienced
                </h4>
                <p className="text-xs text-[#8A93A6] mt-0.5 leading-relaxed">
                  Decades of direct interaction with City Hall plan examiners, aldermen, and Cook County commissioners.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
                  Knowledgeable
                </h4>
                <p className="text-xs text-[#8A93A6] mt-0.5 leading-relaxed">
                  Authoritative command of Title 17 Chicago Zoning Ordinance, Connected Communities, and building code matrices.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center flex-shrink-0">
                <Users2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
                  Dedicated
                </h4>
                <p className="text-xs text-[#8A93A6] mt-0.5 leading-relaxed">
                  Passionate advocates for our clients’ architectural ambitions and property rights.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Community Engagement Section */}
        <GlassCard className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#3D4D7C]" />
            <h2 className="font-heading text-lg font-bold text-[#1F2A44]">
              Community Engagement Commitment
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white space-y-1">
              <span className="font-bold text-[#1F2A44] block">
                1. Enhanced Project Support
              </span>
              <p className="text-[#8A93A6]">
                Facilitating constructive dialogue between developers and neighborhood groups to align projects with neighborhood priorities.
              </p>
            </div>

            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white space-y-1">
              <span className="font-bold text-[#1F2A44] block">
                2. Inclusive Decision-Making
              </span>
              <p className="text-[#8A93A6]">
                Ensuring community meetings are accessible and transparent, providing accurate architectural facts to ease neighbor concerns.
              </p>
            </div>

            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white space-y-1">
              <span className="font-bold text-[#1F2A44] block">
                3. Community Benefits Realization
              </span>
              <p className="text-[#8A93A6]">
                Assisting projects in delivering affordable housing units, pedestrian improvements, and green infrastructure for Chicago.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white text-xs text-[#1F2A44] space-y-1">
          <span className="font-bold block">General Information Notice:</span>
          <p className="text-[10px] text-[#8A93A6] leading-relaxed">
            {BUSINESS_INFO.disclaimer} Williams &amp; Williams LLC is a professional land-use and zoning consultancy.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <GlassButton
            variant="primary"
            fullWidth
            onClick={() => navigate('/quote')}
            className="min-h-[48px]"
          >
            Start Your Consultation with Us
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
