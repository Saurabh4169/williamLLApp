import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  ArrowUp,
  Paperclip,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Building,
  MapPin,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Calculator,
  FileCheck2,
  Calendar,
  MessageSquare,
  Scale,
  Clock,
  HelpCircle,
} from 'lucide-react';
import BackButton from '../components/ui/BackButton';
import { useAppStore } from '../store/useAppStore';

interface PropertySummary {
  address: string;
  zoningDistrict: string;
  lotSize: string;
  far: string;
  coachHouseEligible: boolean;
  notes?: string;
}

interface NextStepItem {
  step: string;
  actionText?: string;
  actionQuery?: string;
}

interface RelatedServiceItem {
  title: string;
  code: string;
  priceHint: string;
  slug: string;
  tag?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  attachmentName?: string;
  propertySummary?: PropertySummary;
  nextSteps?: NextStepItem[];
  relatedService?: RelatedServiceItem;
  caseExplanation?: {
    caseId: string;
    currentStep: string;
    whatHappensNext: string;
  };
  estimateSummary?: {
    totalRange: string;
    projectType: string;
    timeline: string;
  };
}

export const AiAssistantScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, showToast } = useAppStore();

  const caseIdParam = searchParams.get('caseId');
  const serviceParam = searchParams.get('service');
  const serviceNameParam = searchParams.get('serviceName');
  const estimateParam = searchParams.get('estimate');

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ChatGPT-style initial conversation: start empty so prompt cards show, or with greeting
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 4 Clean Suggested Prompts (ChatGPT-style 2x2 cards)
  const promptCards = [
    {
      id: 'p1',
      icon: Building,
      title: 'Can I build a coach house?',
      subtitle: 'Chicago ADU ordinance & lot coverage rules',
      query: 'Can I build a coach house in Chicago?',
    },
    {
      id: 'p2',
      icon: Scale,
      title: 'What is a zoning variance?',
      subtitle: 'Setbacks, FAR & ZBA board relief',
      query: 'What is a zoning variance and how does it work?',
    },
    {
      id: 'p3',
      icon: Clock,
      title: 'How long does a hearing take?',
      subtitle: 'City Hall filing to ZBA docket schedule',
      query: 'How long does a ZBA hearing process take?',
    },
    {
      id: 'p4',
      icon: Calculator,
      title: 'Estimate project fees',
      subtitle: 'Preliminary consulting costs for Chicago',
      query: 'Estimate my project cost for a zoning variance',
    },
  ];

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle case context when navigated with query params
  useEffect(() => {
    if (caseIdParam) {
      handleSelectPrompt('Explain my case WW-2026-0842');
    } else if (serviceParam && serviceNameParam) {
      handleServiceQuestion(serviceNameParam, serviceParam);
    } else if (estimateParam) {
      handleEstimateExplanation();
    }
  }, [caseIdParam, serviceParam, serviceNameParam, estimateParam]);

  const handleResetChat = () => {
    setMessages([]);
    setFeedbackState({});
    setInputText('');
    showToast('New chat started');
    inputRef.current?.focus();
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackState((prev) => ({
      ...prev,
      [id]: prev[id] === type ? undefined : type,
    }));
    showToast(type === 'up' ? 'Helpful feedback recorded' : 'Feedback noted for zoning counsel');
  };

  const handleAttachMock = () => {
    const fileName = prompt(
      'Attach a plat of survey or parcel photo (mock):',
      'Plat_Of_Survey_2144_Damen.pdf'
    );
    if (fileName) {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: `Attached file for zoning review: ${fileName}`,
        timestamp: 'Just now',
        attachmentName: fileName,
      };
      setMessages((prev) => [...prev, userMsg]);
      showToast(`Attached ${fileName}`);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `I received **${fileName}**. In Chicago, plats of survey must show the official building footprint, lot lines, and existing rear setbacks.\n\nOur licensed zoning attorneys will verify whether your project qualifies for administrative relief or requires a full ZBA variance.`,
          timestamp: 'Just now',
          propertySummary: {
            address: '2144 N Damen Ave, Chicago, IL 60647',
            zoningDistrict: 'RM-5 (Multi-Family Residential)',
            lotSize: '3,125 sq ft (25′ × 125′)',
            far: '2.0 Maximum FAR',
            coachHouseEligible: true,
            notes: 'Survey uploaded for administrative adjustment check',
          },
          nextSteps: [
            { step: '1. Review survey against Chicago Title 17 setback minimums' },
            { step: '2. Prepare application for Zoning Board of Appeals (ZBA)' },
          ],
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 750);
    }
  };

  const handleServiceQuestion = (sName: string, slug: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: `Can you tell me about the ${sName} service?`,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const asstMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: `**${sName}** provides comprehensive review by our Chicago-certified land-use attorneys and architects. We examine Cook County parcel records, analyze Chicago Title 17 zoning codes, and provide a clear roadmap for permits or variances.`,
        timestamp: 'Just now',
        relatedService: {
          title: sName,
          code: slug.includes('architectural') ? 'WW-CON-01' : 'WW-SRV-01',
          priceHint: 'From $450 • Popular',
          slug,
          tag: 'CERTIFIED REVIEW',
        },
        nextSteps: [
          { step: 'Schedule 1-on-1 consultation (Video, Phone, or Site Visit)' },
          { step: 'Receive attorney-client privileged zoning memorandum' },
        ],
      };
      setMessages((prev) => [...prev, asstMsg]);
    }, 700);
  };

  const handleEstimateExplanation = () => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: 'Explain my project cost estimate',
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const asstMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: `Your estimated consulting fee of **$1,800 to $3,500** covers preliminary zoning analysis, hearing preparation with architectural angle exhibits, and representation before the Chicago Zoning Board of Appeals.\n\nCity permit fees and Cook County filing charges are paid separately to municipal departments.`,
        timestamp: 'Just now',
        estimateSummary: {
          totalRange: '$1,800 to $3,500',
          projectType: 'Chicago Zoning & Entitlement Package',
          timeline: '6 to 10 weeks',
        },
        nextSteps: [
          { step: '1. Free 1 business day review of preliminary drawings' },
          { step: '2. Fixed-fee quote confirmation before retainer' },
        ],
      };
      setMessages((prev) => [...prev, asstMsg]);
    }, 700);
  };

  // Main responder logic for prompts & custom questions
  const respondToQuery = (query: string) => {
    const qLower = query.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (qLower.includes('coach house') || qLower.includes('damen') || qLower.includes('cochera')) {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `Yes! Under Chicago's Additional Dwelling Unit (ADU) Ordinance, coach houses are permitted in **RM-5 districts** in the North Pilot Zone.\n\nHowever, your property must maintain a minimum rear yard setback and cannot exceed allowable lot coverage without an administrative adjustment or ZBA variance.`,
          timestamp: 'Just now',
          propertySummary: {
            address: '2144 N Damen Ave, Chicago, IL 60647',
            zoningDistrict: 'RM-5 (Multi-Family Residential)',
            lotSize: '3,125 sq ft (25′ × 125′)',
            far: '2.0 Maximum FAR',
            coachHouseEligible: true,
            notes: 'Eligible under Chicago ADU Pilot Program (North Zone)',
          },
          nextSteps: [
            {
              step: '1. Confirm rear yard setback (typically 30 ft or 30% of lot depth)',
              actionText: 'Setback Rules',
              actionQuery: 'What are the setback rules for RM-5?',
            },
            {
              step: '2. Prepare schematic architectural plans and site survey',
              actionText: 'View ADU Service',
              actionQuery: 'Tell me about architectural design',
            },
          ],
          relatedService: {
            title: 'Architectural Design Consultation',
            code: 'WW-CON-01',
            priceHint: 'From $450 • Popular',
            slug: 'architectural-design-consultation',
            tag: 'POPULAR',
          },
        };
        setMessages((prev) => [...prev, asstMsg]);
      } else if (qLower.includes('explain my case') || qLower.includes('explicar mi caso')) {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `Your case **WW-2026-0842** is currently at Stage 3: **ZBA Public Notice**.\n\nUnder Chicago Municipal Code Title 17, the City requires formal certified mailings to all neighboring property owners within 250 feet of 2144 N Damen Ave and posting the official public hearing sign on the parcel.\n\nOur counsel filed the affidavit of service with City Hall on Nov 10, 2026.`,
          timestamp: 'Just now',
          caseExplanation: {
            caseId: 'WW-2026-0842',
            currentStep: 'Stage 3: ZBA Public Notice Completed',
            whatHappensNext: 'Hearing on Nov 24, 2026 at 9:00 AM before the Chicago Zoning Board of Appeals',
          },
          nextSteps: [
            { step: '1. Formal ZBA docket call (Nov 24, 2026 • 9:00 AM CST)' },
            { step: '2. Aldermanic letter of non-opposition verification' },
          ],
        };
        setMessages((prev) => [...prev, asstMsg]);
      } else if (qLower.includes('variance') || qLower.includes('variación')) {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `A **zoning variance** is an authorized exception to Chicago Title 17 dimensional standards (such as front, side, or rear yard setbacks, building height, or parking minimums).\n\nIt is granted by the Zoning Board of Appeals (ZBA) upon showing practical difficulty or unique site hardship.`,
          timestamp: 'Just now',
          nextSteps: [
            { step: 'Administrative Adjustment: relief up to 10–20% approved by Zoning Administrator' },
            { step: 'Full ZBA Hearing: required for variances exceeding administrative thresholds' },
          ],
          relatedService: {
            title: 'ZBA Variances & Administrative Appeals',
            code: 'WW-SRV-02',
            priceHint: 'From $450 • Full Retainer Available',
            slug: 'zba-variance-appeals',
            tag: 'HIGH VALUE',
          },
        };
        setMessages((prev) => [...prev, asstMsg]);
      } else if (qLower.includes('how long') || qLower.includes('hearing') || qLower.includes('cuánto dura')) {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `A standard Chicago ZBA hearing process typically takes **6 to 12 weeks** from initial application submittal to docket hearing date.\n\nThis timeline includes the 21-day public notice requirement, aldermanic review, and city department referrals.`,
          timestamp: 'Just now',
          nextSteps: [
            { step: 'Weeks 1–3: Survey, architectural exhibits & City Hall filing' },
            { step: 'Weeks 4–6: Certified mailings to 250-foot radius & aldermanic caucus' },
            { step: 'Weeks 7–10: Official ZBA hearing & board deliberation' },
          ],
        };
        setMessages((prev) => [...prev, asstMsg]);
      } else if (qLower.includes('cost') || qLower.includes('estimate') || qLower.includes('costo') || qLower.includes('estimar')) {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `Zoning consulting fees in Chicago typically range between **$1,800 and $3,500** for standard residential and small commercial variances.\n\nYou can run our interactive 3-step Cost Estimator to get an instant tailored fee projection for your exact parcel.`,
          timestamp: 'Just now',
          estimateSummary: {
            totalRange: '$1,800 to $3,500',
            projectType: 'Typical Chicago ZBA & Setback Relief',
            timeline: '6 to 10 weeks',
          },
          nextSteps: [
            {
              step: 'Click below to launch our tailored 3-step Cost Estimator',
              actionText: 'Open Cost Estimator',
              actionQuery: 'GOTO_ESTIMATOR',
            },
          ],
        };
        setMessages((prev) => [...prev, asstMsg]);
      } else {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `Thank you for asking about **"${query}"**.\n\nIn the City of Chicago, land-use and construction entitlements are governed by Title 17 of the Municipal Code. Because every parcel has distinct setback, FAR, and aldermanic considerations, our senior zoning attorneys review your preliminary drawings for free within 1 business day.`,
          timestamp: 'Just now',
          nextSteps: [
            { step: '1. Preliminary Title 17 ordinance lookup' },
            { step: '2. Attorney case evaluation with Cook County GIS parcel records' },
          ],
        };
        setMessages((prev) => [...prev, asstMsg]);
      }
    }, 650);
  };

  const handleSelectPrompt = (query: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    respondToQuery(query);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };
    setInputText('');
    setMessages((prev) => [...prev, userMsg]);
    respondToQuery(query);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-[#121214] bg-[#FAFBFC] dark:bg-[#121214] relative select-none">
      {/* ========================================================
          1. CHATGPT-STYLE CLEAN MINIMALIST HEADER
          - Zero clutter, website light liquid-glass styling
      ======================================================== */}
      <header className="w-full flex-shrink-0 z-30 liquid-glass-bar border-b border-[#A4B3BE]/25 px-3 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton onClick={() => navigate(-1)} ariaLabel="Back" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#191919] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#C7D3DC]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading text-[13.5px] font-bold text-[#191919] dark:text-white tracking-tight">
                  Zoning Assistant
                </h1>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-[#82807A] leading-none mt-0.5">
                Title 17 &bull; Williams &amp; Williams
              </p>
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          type="button"
          onClick={handleResetChat}
          aria-label="New chat"
          title="Start new chat"
          className="w-9 h-9 rounded-full bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/10 text-[#82807A] hover:text-[#191919] dark:hover:text-white flex items-center justify-center active:scale-95 transition-all shadow-2xs"
        >
          <RotateCcw className="w-4 h-4 stroke-[2]" />
        </button>
      </header>

      {/* ========================================================
          2. CHAT STREAM / WELCOME SCREEN
          - When empty: clean ChatGPT welcome with 2x2 prompt cards
          - When chatting: clean message feed with website liquid-glass accents
      ======================================================== */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar px-4 py-4 space-y-4 max-w-md mx-auto">
        {/* ChatGPT Style Empty State: Shown when no messages yet */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center py-6 space-y-6 animate-in fade-in duration-300">
            {/* Center Hero Logo */}
            <div className="text-center space-y-2 max-w-xs mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#191919] text-white flex items-center justify-center shadow-md border border-white/10 mx-auto relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                <Sparkles className="w-7 h-7 text-[#C7D3DC]" />
              </div>
              <h2 className="font-heading text-lg font-bold text-[#191919] dark:text-white tracking-tight pt-1">
                How can I help you today?
              </h2>
              <p className="text-xs text-[#82807A] leading-relaxed">
                Ask any question about Chicago zoning, setbacks, ADUs, or variance hearings.
              </p>
            </div>

            {/* 2x2 Prompt Grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full pt-2">
              {promptCards.map((p) => {
                const IconComp = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPrompt(p.query)}
                    className="p-3 rounded-[18px] liquid-glass-card border border-[#E2E6EB] dark:border-white/10 hover:border-[#191919]/30 text-left space-y-1.5 transition-all active:scale-[0.98] shadow-xs group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#191919] dark:text-white group-hover:bg-[#191919] group-hover:text-white transition-colors">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-heading text-xs font-bold text-[#191919] dark:text-white leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-[10px] text-[#82807A] leading-tight line-clamp-2">
                      {p.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 animate-in fade-in duration-200`}
            >
              {/* Message Bubble Container */}
              <div
                className={`max-w-[88%] ${
                  isUser
                    ? 'ml-auto rounded-[20px] rounded-br-[4px] bg-[#191919] text-white px-4 py-2.5 shadow-xs text-xs sm:text-[13px] leading-relaxed'
                    : 'space-y-2'
                }`}
              >
                {/* Assistant Identity Header */}
                {!isUser && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#82807A]">
                    <div className="w-5 h-5 rounded-full bg-[#191919] text-[#C7D3DC] flex items-center justify-center shadow-xs">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span>Zoning Assistant</span>
                  </div>
                )}

                {/* Assistant Text Box */}
                {!isUser && (
                  <div className="p-3.5 rounded-[20px] rounded-tl-[4px] liquid-glass-card border border-[#E2E6EB] dark:border-white/10 shadow-xs text-xs sm:text-[13px] text-[#191919] dark:text-white space-y-2 leading-relaxed">
                    <div className="space-y-1.5 whitespace-pre-wrap">
                      {msg.text.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>
                          {para.split('**').map((chunk, cIdx) =>
                            cIdx % 2 === 1 ? (
                              <strong key={cIdx} className="font-bold text-[#121214] dark:text-white">
                                {chunk}
                              </strong>
                            ) : (
                              chunk
                            )
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Attachment if present */}
                    {msg.attachmentName && (
                      <div className="pt-2 border-t border-[#D8D8D8]/60 text-[11px] font-mono flex items-center gap-1.5 text-[#82807A]">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{msg.attachmentName}</span>
                      </div>
                    )}

                    {/* Rich Card: Property Summary */}
                    {msg.propertySummary && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-[#D8D8D8]/70 pb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-[#191919] dark:text-white" />
                            <span>Property Summary</span>
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                            {msg.propertySummary.coachHouseEligible ? 'ADU Eligible' : 'Standard'}
                          </span>
                        </div>

                        <div className="space-y-1 text-[11.5px]">
                          <div className="flex items-center gap-1.5 text-[#191919] dark:text-white font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-[#82807A] flex-shrink-0" />
                            <span>{msg.propertySummary.address}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#71717A] dark:text-[#A0B0BC]">
                            <div>
                              <span className="text-[#82807A] block text-[10px]">District:</span>
                              <span className="font-bold text-[#191919] dark:text-white">
                                {msg.propertySummary.zoningDistrict}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#82807A] block text-[10px]">Lot Dimensions:</span>
                              <span className="font-bold text-[#191919] dark:text-white">
                                {msg.propertySummary.lotSize}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rich Card: Next Steps */}
                    {msg.nextSteps && msg.nextSteps.length > 0 && (
                      <div className="p-3 rounded-xl bg-[#FAFBFC] dark:bg-white/5 border border-[#E2E6EB] dark:border-white/10 space-y-1.5 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] flex items-center gap-1">
                          <FileCheck2 className="w-3.5 h-3.5 text-[#191919] dark:text-white" />
                          <span>Recommended Next Steps</span>
                        </span>
                        <ul className="space-y-1 text-[11px] text-[#4A4A4A] dark:text-[#A0B0BC]">
                          {msg.nextSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white mt-1.5 flex-shrink-0" />
                              <span>{step.step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Rich Card: Case Explanation */}
                    {msg.caseExplanation && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-[#D8D8D8]/70 pb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A]">
                            Case: {msg.caseExplanation.caseId}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-[#191919] dark:text-white">
                          Status: {msg.caseExplanation.currentStep}
                        </p>
                        <p className="text-[10.5px] text-[#82807A] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#191919] dark:text-white" />
                          <span>{msg.caseExplanation.whatHappensNext}</span>
                        </p>
                      </div>
                    )}

                    {/* Rich Card: Estimate Summary */}
                    {msg.estimateSummary && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A]">
                            Estimated Consulting Fee
                          </span>
                          <span className="font-heading font-extrabold text-xs text-[#191919] dark:text-white">
                            {msg.estimateSummary.totalRange}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate('/cost-estimator')}
                          className="w-full py-2 rounded-xl btn-glossy-primary text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-2xs mt-1"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Open Interactive Cost Estimator</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* User Message Content */}
                {isUser && <div>{msg.text}</div>}
              </div>

              {/* Assistant Message Actions: Copy, Thumbs Up, Thumbs Down + Clean Counsel Link */}
              {!isUser && (
                <div className="flex items-center justify-between w-full max-w-[88%] pl-2 text-[11px] text-[#82807A]">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      aria-label="Copy answer"
                      className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, 'up')}
                      aria-label="Helpful"
                      className={`p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                        feedbackState[msg.id] === 'up' ? 'text-emerald-600' : ''
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, 'down')}
                      aria-label="Not helpful"
                      className={`p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                        feedbackState[msg.id] === 'down' ? 'text-rose-600' : ''
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Clean, Non-Intrusive Counsel Link */}
                  <button
                    type="button"
                    onClick={() => navigate('/chat')}
                    className="text-[10.5px] font-semibold text-[#191919] dark:text-white underline hover:opacity-80 flex items-center gap-1 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-3 h-3 text-[#82807A]" />
                    <span>Talk to counsel</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Animation (3 dots) */}
        {isTyping && (
          <div className="flex items-center gap-2 pl-1 animate-in fade-in duration-200">
            <div className="w-5 h-5 rounded-full bg-[#191919] text-[#C7D3DC] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3" />
            </div>
            <div className="py-2 px-3 rounded-full bg-white dark:bg-[#1E1E22] border border-[#D8D8D8] dark:border-white/10 shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ========================================================
          3. CHATGPT-STYLE BOTTOM INPUT CAPSULE
          - Unified floating rounded pill
          - Paperclip on left, seamless text input, circular up-arrow send button on right
          - Subtle one-line disclaimer
      ======================================================== */}
      <div className="w-full flex-shrink-0 z-30 liquid-glass-bar border-t border-[#A4B3BE]/25 px-4 pt-2.5 pb-3 backdrop-blur-2xl">
        <div className="max-w-md mx-auto space-y-1.5">
          <form
            onSubmit={handleSendMessage}
            className="rounded-[26px] bg-white dark:bg-[#1E1E22] border border-[#D8D8D8] dark:border-white/15 px-2.5 py-1.5 flex items-center gap-2 shadow-xs focus-within:border-[#191919] dark:focus-within:border-white/40 focus-within:ring-2 focus-within:ring-[#191919]/5 transition-all"
          >
            {/* Attachment Button */}
            <button
              type="button"
              onClick={handleAttachMock}
              aria-label="Attach document or survey"
              title="Attach survey or parcel photo"
              className="w-8 h-8 rounded-full text-[#82807A] hover:text-[#191919] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Seamless Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about Chicago zoning..."
              className="flex-1 bg-transparent text-[13px] text-[#191919] dark:text-white placeholder-[#8C9DAA] focus:outline-none px-1 py-1"
            />

            {/* ChatGPT-style Circle Up-Arrow Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send message"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                inputText.trim()
                  ? 'bg-[#191919] text-white shadow-2xs hover:brightness-110 active:scale-95'
                  : 'bg-black/5 dark:bg-white/10 text-[#A0B0BC] cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Muted Disclaimer Line */}
          <p className="text-[9.5px] text-[#9CA3AF] text-center leading-tight">
            Zoning Assistant can make mistakes. Verify official Title 17 municipal codes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantScreen;
