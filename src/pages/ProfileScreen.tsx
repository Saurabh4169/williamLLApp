import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Heart,
  Globe,
  FileCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { SERVICES_DATA } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [company, setCompany] = useState(user.company);

  const savedServices = SERVICES_DATA.filter((s) => user.savedServiceIds.includes(s.id));

  const handleSaveProfile = () => {
    updateUserProfile({ name, email, phone, company });
    setIsEditing(false);
  };

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="Client Profile & Settings" />

      <div className="px-4 py-4 space-y-5">
        {/* User Profile Card */}
        <GlassCard className="p-5 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3D4D7C] to-[#7D90B5] flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-[#1F2A44] truncate">
                  {user.name}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-semibold text-[#3D4D7C] hover:underline"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              <p className="text-xs text-[#8A93A6] truncate">{user.company}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="primary" size="sm">
                  Active Client
                </Badge>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing && (
            <div className="pt-3 border-t border-white/60 space-y-2.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#8A93A6]">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-white/80 bg-white/70 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8A93A6]">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-white/80 bg-white/70 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8A93A6]">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-white/80 bg-white/70 text-xs"
                />
              </div>
              <GlassButton
                variant="primary"
                size="sm"
                fullWidth
                onClick={handleSaveProfile}
                className="mt-2"
              >
                Save Changes
              </GlassButton>
            </div>
          )}
        </GlassCard>

        {/* Saved Services Section */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block">
            Saved Services ({savedServices.length})
          </span>

          {savedServices.length === 0 ? (
            <GlassCard className="p-4 text-center text-xs text-[#8A93A6]">
              No saved services yet. Tap the heart icon on any service detail page.
            </GlassCard>
          ) : (
            savedServices.map((service) => (
              <GlassCard
                key={service.id}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="p-3 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-current text-[#E5484D]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2A44] leading-tight">
                      {service.title}
                    </h4>
                    <span className="text-[10px] text-[#8A93A6]">{service.category}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A93A6]" />
              </GlassCard>
            ))
          )}
        </div>

        {/* App Preferences & Settings */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block">
            Preferences &amp; Notifications
          </span>

          <GlassCard className="p-0 overflow-hidden divide-y divide-white/60 text-xs">
            {/* Notification Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[#3D4D7C]" />
                <span className="font-medium text-[#1F2A44]">Hearing &amp; Permit Alerts</span>
              </div>
              <button
                onClick={() =>
                  updateUserProfile({ notifications: !user.notifications })
                }
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  user.notifications ? 'bg-[#3FA66B]' : 'bg-[#DDE2EA]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    user.notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#3D4D7C]" />
                <span className="font-medium text-[#1F2A44]">Language</span>
              </div>
              <span className="text-[#8A93A6] font-semibold">English (US)</span>
            </div>

            {/* Quick Link to Documents Vault */}
            <div
              onClick={() => navigate('/vault')}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4 text-[#3D4D7C]" />
                <span className="font-medium text-[#1F2A44]">My Document Vault</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8A93A6]" />
            </div>
          </GlassCard>
        </div>

        {/* Legal & Terms */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block">
            Legal &amp; Compliance
          </span>

          <GlassCard className="p-4 space-y-2 text-xs text-[#8A93A6]">
            <p className="leading-relaxed text-[11px]">
              {BUSINESS_INFO.disclaimer} Williams &amp; Williams LLC is a professional zoning consultancy based in Chicago, IL.
            </p>
            <div className="pt-2 border-t border-white/60 flex items-center justify-between text-[11px] text-[#3D4D7C] font-semibold">
              <span className="cursor-pointer hover:underline">Privacy Policy</span>
              <span>&bull;</span>
              <span className="cursor-pointer hover:underline">Terms of Service</span>
              <span>&bull;</span>
              <span className="cursor-pointer hover:underline">City Hall Disclaimers</span>
            </div>
          </GlassCard>
        </div>

        {/* App Version Info */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-[#8A93A6]">
            Williams &amp; Williams LLC Mobile Web App &bull; Version 2.4.0 (Chicago Release)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
