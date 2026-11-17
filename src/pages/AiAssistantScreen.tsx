import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
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
  Lock,
  ChevronRight,
  Calculator,
  ExternalLink,
  MessageSquare,
  FileCheck2,
  Calendar,
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

  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting based on language
  const getInitialMessage = (lang: 'en' | 'es'): ChatMessage => ({
    id: 'intro-msg',
    sender: 'assistant',
    text:
      lang === 'en'
        ? `Hi ${user.name ? user.name.split(' ')[0] : 'Alex'}, I can answer zoning questions about Chicago and explain your cases in simple words.`
        : `Hola ${user.name ? user.name.split(' ')[0] : 'Alex'}, puedo responder preguntas de zonificación de Chicago y explicar sus casos en palabras sencillas.`,
    timestamp: 'Just now',
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage(language)]);

  // Suggestion chips
  const suggestionChips =
    language === 'en'
      ? [
          'Can I build a coach house?',
          'What is a variance?',
          'How long does a ZBA hearing take?',
          'Explain my case',
          'Estimate my project cost',
        ]
      : [
          '¿Puedo construir una casa cochera?',
          '¿Qué es una variación de zonificación?',
          '¿Cuánto dura una audiencia ZBA?',
          'Explicar mi caso',
          'Estimar costo de mi proyecto',
        ];

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle case context when navigated with ?caseId=...
  useEffect(() => {
    if (caseIdParam) {
      handleSelectChip('Explain my case');
    } else if (serviceParam && serviceNameParam) {
      handleServiceQuestion(serviceNameParam, serviceParam);
    } else if (estimateParam) {
      handleEstimateExplanation();
    }
  }, [caseIdParam, serviceParam, serviceNameParam, estimateParam]);

  // Language switch handler
  const handleToggleLanguage = (newLang: 'en' | 'es') => {
    setLanguage(newLang);
    setMessages((prev) => [
      getInitialMessage(newLang),
      ...prev.slice(1).map((m) => {
        if (m.id === 'intro-msg') return getInitialMessage(newLang);
        return m;
      }),
    ]);
    showToast(newLang === 'en' ? 'Language switched to English' : 'Idioma cambiado a Español');
  };

  const handleResetChat = () => {
    setMessages([getInitialMessage(language)]);
    setFeedbackState({});
    showToast('New chat started');
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
          text: `I received **${fileName}**. In Chicago, plats of survey must show the official building footprint, lot lines, and existing rear setbacks. Our licensed zoning attorneys will verify whether your project qualifies for administrative relief or requires a full ZBA variance.`,
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

  // Main responder logic for chips & custom questions
  const respondToQuery = (query: string) => {
    const qLower = query.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (qLower.includes('coach house') || qLower.includes('damen') || qLower.includes('cochera')) {
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? `Yes! Under Chicago's Additional Dwelling Unit (ADU) Ordinance, coach houses are often permitted in **RM-5 districts** in the North Pilot Zone. However, your property must maintain a minimum rear yard setback and cannot exceed allowable lot coverage without an administrative adjustment or ZBA variance.`
              : `¡Sí! Bajo la Ordenanza de Unidades de Vivienda Adicionales (ADU) de Chicago, las casas cochera están permitidas en **distritos RM-5** dentro de la Zona Piloto Norte. Sin embargo, su propiedad debe mantener un retiro trasero mínimo y no puede exceder la cobertura de lote sin un ajuste administrativo de la ZBA.`,
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
          text:
            language === 'en'
              ? `Your case **WW-2026-0842** is currently at Stage 3: **ZBA Public Notice**.\n\nUnder Chicago Municipal Code Title 17, the City requires formal certified mailings to all neighboring property owners within 250 feet of 2144 N Damen Ave and posting the official public hearing sign on the parcel.\n\nOur counsel filed the affidavit of service with City Hall on Nov 10, 2026.`
              : `Su caso **WW-2026-0842** está actualmente en la Etapa 3: **Aviso Público de la ZBA**.\n\nEl Código Municipal de Chicago exige notificaciones certificadas a los propietarios vecinos dentro de 250 pies de 2144 N Damen Ave y colocar el letrero oficial de audiencia pública en el lote.\n\nNuestros abogados presentaron la declaración jurada de notificación el 10 de nov de 2026.`,
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
          text:
            language === 'en'
              ? `A **zoning variance** is an authorized exception to Chicago Title 17 dimensional standards (such as front, side, or rear yard setbacks, building height, or parking minimums). It is granted by the Zoning Board of Appeals (ZBA) upon showing practical difficulty or unique site hardship.`
              : `Una **variación de zonificación** es una excepción autorizada a los estándares del Título 17 de Chicago (como retiros frontales, laterales o traseros, altura de edificio o estacionamiento). La otorga la Junta de Apelaciones de Zonificación (ZBA) demostrando una dificultad práctica o condición única del lote.`,
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
          text:
            language === 'en'
              ? `A standard Chicago ZBA hearing process typically takes **6 to 12 weeks** from initial application submittal to docket hearing date. This timeline includes the 21-day public notice requirement, aldermanic review, and city department referrals.`
              : `Un proceso típico de audiencia ZBA en Chicago toma entre **6 y 12 semanas** desde la presentación inicial hasta la fecha de la audiencia en docket. Esto incluye el aviso público obligatorio de 21 días, la revisión del concejal (alderman) y las remisiones departamentales.`,
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
          text:
            language === 'en'
              ? `Zoning consulting fees in Chicago typically range between **$1,800 and $3,500** for standard residential and small commercial variances. You can run our interactive 3-step Cost Estimator to get an instant tailored fee projection for your exact parcel.`
              : `Los honorarios de consultoría de zonificación en Chicago típicamente oscilan entre **$1,800 y $3,500** para variaciones residenciales y comerciales pequeñas. Puede usar nuestro Estimador de Costos interactivo de 3 pasos para obtener una proyección personalizada.`,
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
        // General intelligent assistant answer
        const asstMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'en'
              ? `Thank you for asking about **"${query}"**. In the City of Chicago, land-use and construction entitlements are governed by Title 17 of the Municipal Code. Because every parcel has distinct setback, FAR, and aldermanic considerations, our senior zoning attorneys review your exact drawings for free within 1 business day.`
              : `Gracias por consultar sobre **"${query}"**. En la Ciudad de Chicago, los derechos de uso de suelo y construcción se rigen por el Título 17 del Código Municipal. Debido a que cada lote tiene consideraciones específicas de retiro y FAR, nuestros abogados de zonificación revisan sus planos gratis en 1 día hábil.`,
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

  const handleSelectChip = (chip: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: chip,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    respondToQuery(chip);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: 'Just now',
    };
    const query = inputText.trim();
    setInputText('');
    setMessages((prev) => [...prev, userMsg]);
    respondToQuery(query);
  };

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-0 bg-[#FAFBFC] dark:bg-[#121214] relative">
      {/* ========================================================
          1. CHAT HEADER
          Standardized BackButton: 44px tap area, 40px circle
          Title, Online indicator, New Chat button, Language switch
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#18181A]/95 backdrop-blur-md border-b border-[#D8D8D8] dark:border-white/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton onClick={() => navigate(-1)} ariaLabel="Back" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#323232] to-[#191919] text-[#FEFEFE] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#C7D3DC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-sm font-bold text-[#191919] dark:text-white tracking-tight">
                  Zoning Assistant
                </h1>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>
              <p className="text-[10px] text-[#82807A] leading-none mt-0.5">
                Chicago Title 17 &bull; Municipal AI
              </p>
            </div>
          </div>
        </div>

        {/* Right Tools: Language switch + New Chat */}
        <div className="flex items-center gap-1.5">
          {/* Language Switch: EN / ES */}
          <div className="flex rounded-full bg-black/5 dark:bg-white/10 p-0.5 border border-[#D8D8D8] dark:border-white/10 text-[10.5px] font-bold">
            <button
              type="button"
              onClick={() => handleToggleLanguage('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-[#2A2A2D] text-[#191919] dark:text-white shadow-2xs font-bold'
                  : 'text-[#82807A]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleToggleLanguage('es')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                language === 'es'
                  ? 'bg-white dark:bg-[#2A2A2D] text-[#191919] dark:text-white shadow-2xs font-bold'
                  : 'text-[#82807A]'
              }`}
            >
              ES
            </button>
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
        </div>
      </header>

      {/* ========================================================
          2. PRIVACY & RULES BANNER
          "the assistant never shows other users' data, and it offers a human when it is not sure"
      ======================================================== */}
      <div className="px-4 pt-2.5 pb-1">
        <div className="py-1.5 px-3 rounded-full bg-white/70 dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 flex items-center justify-between text-[10px] text-[#82807A]">
          <span className="flex items-center gap-1.5 truncate">
            <Lock className="w-3 h-3 text-[#323232] dark:text-[#C7D3DC] flex-shrink-0" />
            <span className="truncate">
              Client data isolated &bull; Chicago Municipal Code Title 17 verified
            </span>
          </span>
          <span className="font-bold text-[#191919] dark:text-white flex-shrink-0 ml-1">
            Human-backed
          </span>
        </div>
      </div>

      {/* ========================================================
          3. SCROLLABLE MESSAGES CONTAINER
      ======================================================== */}
      <div className="flex-1 px-4 py-3 space-y-4 overflow-y-auto">
        {/* Suggestion Chips under the intro */}
        {messages.length === 1 && (
          <div className="space-y-2 pt-1 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82807A] block px-1">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectChip(chip)}
                  className="py-1.5 px-3 rounded-full bg-white dark:bg-[#1E1E20] border border-[#D8D8D8] dark:border-white/15 text-xs font-medium text-[#191919] dark:text-white hover:border-[#191919] shadow-2xs active:scale-95 transition-all text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#B8860B] flex-shrink-0" />
                  <span>{chip}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2 animate-in fade-in duration-200`}
            >
              {/* Message Bubble Row */}
              <div
                className={`flex items-start gap-2 max-w-[92%] ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Assistant Sparkle Avatar */}
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#323232] to-[#191919] text-[#C7D3DC] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Bubble Container */}
                <div
                  className={`p-3.5 text-xs leading-relaxed space-y-2.5 ${
                    isUser
                      ? 'btn-glossy-primary text-white rounded-[20px] rounded-tr-xs shadow-xs'
                      : 'bg-white dark:bg-[#1E1E22] text-[#191919] dark:text-white border border-[#D8D8D8] dark:border-white/10 rounded-[20px] rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Text Content with Markdown-style bold parsing */}
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
                    <div className="pt-1.5 border-t border-white/20 text-[10.5px] font-mono flex items-center gap-1.5 opacity-90">
                      <Paperclip className="w-3 h-3" />
                      <span>{msg.attachmentName}</span>
                    </div>
                  )}

                  {/* Card 1: Property Summary Card */}
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

                  {/* Card 2: Next Steps Card */}
                  {msg.nextSteps && msg.nextSteps.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-white/5 border border-amber-200 dark:border-white/10 space-y-2 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 flex items-center gap-1">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Recommended Next Steps</span>
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-[#191919] dark:text-white">
                        {msg.nextSteps.map((step, sIdx) => (
                          <li key={sIdx} className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                              <span>{step.step}</span>
                            </div>
                            {step.actionText && (
                              <div className="pl-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (step.actionQuery === 'GOTO_ESTIMATOR') {
                                      navigate('/cost-estimator');
                                    } else if (step.actionQuery) {
                                      handleSelectChip(step.actionQuery);
                                    }
                                  }}
                                  className="text-[10.5px] font-bold text-[#191919] dark:text-white underline hover:opacity-80 inline-flex items-center gap-1"
                                >
                                  <span>{step.actionText}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Card 3: Case Explanation Card */}
                  {msg.caseExplanation && (
                    <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-white/5 border border-indigo-200 dark:border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-indigo-200/70 pb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-400">
                          Active Proceeding: {msg.caseExplanation.caseId}
                        </span>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                          Stage 3 Notice
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <p className="font-semibold text-[#191919] dark:text-white">
                          Current status: {msg.caseExplanation.currentStep}
                        </p>
                        <p className="text-[#64748B] dark:text-[#A0B0BC] flex items-center gap-1.5 pt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                          <span>{msg.caseExplanation.whatHappensNext}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card 4: Estimate Summary Card */}
                  {msg.estimateSummary && (
                    <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-white/5 border border-emerald-200 dark:border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-emerald-200/70 pb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-400 flex items-center gap-1">
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Project Fee Estimate</span>
                        </span>
                        <span className="font-heading font-extrabold text-xs text-emerald-800 dark:text-emerald-300">
                          {msg.estimateSummary.totalRange}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#71717A] dark:text-[#A0B0BC]">
                        <span>Scope: {msg.estimateSummary.projectType}</span>
                        <span className="font-semibold">Est. {msg.estimateSummary.timeline}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/cost-estimator')}
                        className="w-full py-2 rounded-lg btn-glossy-primary text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-2xs mt-1"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Run Full 3-Step Cost Estimator</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Card 5: Related Service Card */}
                  {msg.relatedService && (
                    <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-[#D8D8D8] dark:border-white/10 space-y-2 text-xs shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9.5px] font-mono text-[#82807A] block">
                            {msg.relatedService.code}
                          </span>
                          <h4 className="font-heading text-xs font-bold text-[#191919] dark:text-white leading-tight">
                            {msg.relatedService.title}
                          </h4>
                          <span className="text-[10.5px] text-[#82807A]">
                            {msg.relatedService.priceHint}
                          </span>
                        </div>
                        {msg.relatedService.tag && (
                          <span className="text-[9px] font-bold text-[#191919] bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full">
                            {msg.relatedService.tag}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/services/${msg.relatedService?.slug}`)}
                        className="w-full py-1.5 px-3 rounded-lg bg-[#191919] dark:bg-white text-white dark:text-[#191919] text-[11px] font-bold flex items-center justify-between active:scale-98 transition-all"
                      >
                        <span>View service details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Actions Row (Thumbs Up, Thumbs Down, Copy) */}
              {!isUser && (
                <div className="flex items-center gap-1 pl-8 text-[11px] text-[#82807A]">
                  <button
                    type="button"
                    onClick={() => handleFeedback(msg.id, 'up')}
                    aria-label="Thumbs up"
                    className={`p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                      feedbackState[msg.id] === 'up' ? 'text-emerald-600' : ''
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback(msg.id, 'down')}
                    aria-label="Thumbs down"
                    className={`p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                      feedbackState[msg.id] === 'down' ? 'text-rose-600' : ''
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(msg.id, msg.text)}
                    aria-label="Copy answer"
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}

              {/* Two Standard Bottom Buttons on EVERY assistant reply:
                  1. "Talk to zoning counsel" (opens live chat / My Enquiries)
                  2. "Request free assessment" (opens Project Assessment) */}
              {!isUser && (
                <div className="pl-8 pt-1 flex items-center gap-2 w-full max-w-[92%]">
                  <button
                    type="button"
                    onClick={() => navigate('/chat')}
                    className="flex-1 py-2 px-3 rounded-full bg-white dark:bg-[#1E1E22] border border-[#D8D8D8] dark:border-white/15 text-[11px] font-bold text-[#191919] dark:text-white flex items-center justify-center gap-1.5 shadow-2xs hover:border-[#191919] active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#323232] dark:text-[#C7D3DC]" />
                    <span className="truncate">Talk to zoning counsel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/project-assessment')}
                    className="flex-1 py-2 px-3 rounded-full btn-glossy-primary text-[11px] font-bold text-white flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C7D3DC]" />
                    <span className="truncate">Request free assessment</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Animation (3 dots) */}
        {isTyping && (
          <div className="flex items-center gap-2 animate-in fade-in duration-200">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#323232] to-[#191919] text-[#C7D3DC] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="py-2.5 px-4 rounded-full bg-white dark:bg-[#1E1E22] border border-[#D8D8D8] dark:border-white/10 shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919] dark:bg-white animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ========================================================
          4. STICKY INPUT BAR & FOOTER DISCLAIMER
          Inputs 48px tall with 14px rounded corners
          Footer note: "AI gives general information, not legal advice. Our zoning counsel confirms every case."
      ======================================================== */}
      <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-[#D8D8D8] dark:border-white/10 p-3 space-y-2">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          {/* Attach Button (Mock document / photo picker) */}
          <button
            type="button"
            onClick={handleAttachMock}
            aria-label="Attach photo or document"
            title="Attach survey or parcel photo"
            className="w-12 h-12 rounded-[14px] bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/15 text-[#82807A] hover:text-[#191919] dark:hover:text-white flex items-center justify-center active:scale-95 transition-all flex-shrink-0 shadow-2xs"
          >
            <Paperclip className="w-4 h-4 stroke-[2]" />
          </button>

          {/* 48px Input with 14px rounded corners */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Ask about zoning, permits or your case...'
                : 'Pregunte sobre zonificación, permisos o su caso...'
            }
            className="flex-1 h-12 px-4 rounded-[14px] border border-[#D8D8D8] dark:border-white/15 bg-white dark:bg-[#202023] text-xs text-[#191919] dark:text-white placeholder-[#8C9DAA] focus:outline-none focus:ring-2 focus:ring-[#323232] transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send message"
            className="w-12 h-12 rounded-[14px] btn-glossy-primary text-white flex items-center justify-center shadow-xs disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4 stroke-[2.2]" />
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-[10px] text-[#82807A] text-center leading-tight">
          {language === 'en'
            ? 'AI gives general information, not legal advice. Our zoning counsel confirms every case.'
            : 'La IA brinda información general, no asesoramiento legal. Nuestros abogados confirman cada caso.'}
        </p>
      </div>
    </div>
  );
};

export default AiAssistantScreen;
