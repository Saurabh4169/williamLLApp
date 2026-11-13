import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, RefreshCw } from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';

interface CheckItem {
  id: string;
  category: 'feasibility' | 'permit';
  label: string;
  weight: number;
  hint: string;
}

export const ChecklistScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'feasibility' | 'permit'>('feasibility');

  const feasibilityQuestions: CheckItem[] = [
    { id: 'f-1', category: 'feasibility', label: 'Property Cadastral PIN and Plat of Survey are available', weight: 20, hint: 'Essential to confirm exact parcel boundary and lot square footage.' },
    { id: 'f-2', category: 'feasibility', label: 'Current zoning district verified (e.g. RS-3, RT-4, B3-2)', weight: 20, hint: 'Determines whether your proposed use is permitted as-of-right or requires re-zoning.' },
    { id: 'f-3', category: 'feasibility', label: 'Maximum Floor Area Ratio (FAR) & height limits calculated', weight: 20, hint: 'Establishes the allowable square footage envelope before design begins.' },
    { id: 'f-4', category: 'feasibility', label: 'Within 2,640 ft of CTA / Metra station for TOD parking relief', weight: 15, hint: 'Eligible for Connected Communities parking reductions.' },
    { id: 'f-5', category: 'feasibility', label: 'Historical Landmark or Lake Michigan Protection check conducted', weight: 15, hint: 'Prevents unexpected Commission on Chicago Landmarks delays.' },
    { id: 'f-6', category: 'feasibility', label: 'Initial ward aldermanic consensus consulted', weight: 10, hint: 'Ward alderman holds key influence on variances and map amendments.' },
  ];

  const permitQuestions: CheckItem[] = [
    { id: 'p-1', category: 'permit', label: 'Architectural drawings stamped by licensed Illinois architect', weight: 25, hint: 'Mandatory for all standard Chicago Department of Buildings submittals.' },
    { id: 'p-2', category: 'permit', label: 'MEP (Mechanical, Electrical, Plumbing) engineered sheets included', weight: 25, hint: 'Required for commercial or multi-family plan examiner approvals.' },
    { id: 'p-3', category: 'permit', label: 'Zoning ordinance setback calculations verified against plot plan', weight: 20, hint: 'Confirms front, rear, and side yard clearances comply with Title 17.' },
    { id: 'p-4', category: 'permit', label: 'General Contractor licensed and bonded with City of Chicago', weight: 15, hint: 'Required before building permit placard can be officially released.' },
    { id: 'p-5', category: 'permit', label: 'Energy Conservation Code compliance documented', weight: 15, hint: 'Chicago Energy Transformation Code compliance documentation.' },
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(['f-1', 'f-2', 'p-1']);

  const questions = activeTab === 'feasibility' ? feasibilityQuestions : permitQuestions;

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentScore = questions.reduce((sum, item) => {
    return checkedIds.includes(item.id) ? sum + item.weight : sum;
  }, 0);

  const getReadinessGrade = (score: number) => {
    if (score >= 85) return { grade: 'Ready for Submittal', color: 'text-[#3FA66B]' };
    if (score >= 50) return { grade: 'Moderate Readiness', color: 'text-amber-600' };
    return { grade: 'Pre-Planning Needed', color: 'text-[#E5484D]' };
  };

  const status = getReadinessGrade(currentScore);

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="Zoning Readiness Checklist" showBack />

      <div className="px-4 py-4 space-y-5">
        <div>
          <h1 className="font-heading text-xl font-bold text-[#1F2A44] tracking-tight">
            Project Readiness Audit
          </h1>
          <p className="text-xs text-[#8A93A6]">
            Interactive self-assessment to check project feasibility &amp; permit readiness.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-white/60">
          <button
            onClick={() => setActiveTab('feasibility')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'feasibility'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Feasibility Score
          </button>
          <button
            onClick={() => setActiveTab('permit')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all min-h-[36px] ${
              activeTab === 'permit'
                ? 'btn-glossy-navy shadow-sm'
                : 'text-[#8A93A6] hover:text-[#1F2A44]'
            }`}
          >
            Permit Checklist
          </button>
        </div>

        {/* Readiness Score Card */}
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
              Audit Readiness Score
            </span>
            <Badge variant="primary" size="sm">
              {currentScore}% Score
            </Badge>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-heading font-bold text-[#1F2A44]">
                {currentScore} / 100
              </div>
              <span className={`text-xs font-bold ${status.color} mt-0.5 block`}>
                {status.grade}
              </span>
            </div>

            <button
              onClick={() => setCheckedIds([])}
              className="text-xs text-[#8A93A6] hover:text-[#1F2A44] flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-white/60 border border-white overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3D4D7C] to-[#3FA66B] transition-all duration-300 rounded-full"
              style={{ width: `${currentScore}%` }}
            />
          </div>
        </GlassCard>

        {/* Interactive Checklist Items */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block">
            {activeTab === 'feasibility' ? 'Feasibility Requirements' : 'Permit Submittal Requirements'}
          </span>

          {questions.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <GlassCard
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 transition-all cursor-pointer select-none flex items-start gap-3 ${
                  isChecked ? 'border-[#3FA66B]/50' : ''
                }`}
              >
                <div className="pt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded-md bg-[#3FA66B] text-white flex items-center justify-center">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-[#8A93A6] bg-white flex items-center justify-center text-transparent" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold leading-snug text-[#1F2A44]">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-[#8A93A6] mt-1 leading-relaxed">
                    {item.hint}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Consultation Callout */}
        <GlassCard className="p-4 flex items-center justify-between gap-3">
          <div>
            <h4 className="font-heading text-xs font-bold text-[#1F2A44]">
              Need Assistance Clearing These Items?
            </h4>
            <p className="text-[10px] text-[#8A93A6]">
              Williams &amp; Williams LLC conducts certified surveys, FAR modeling, and permit expediting.
            </p>
          </div>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => navigate('/quote')}
            className="flex-shrink-0"
          >
            Get Expert Help
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
};

export default ChecklistScreen;
