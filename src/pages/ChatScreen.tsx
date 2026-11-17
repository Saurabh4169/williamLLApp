import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Send,
  Paperclip,
  ShieldCheck,
  PhoneCall,
  ArrowLeft,
  User,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';

export const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tickets, sendTicketReply, user, showToast } = useAppStore();

  const ticketParam = searchParams.get('ticketId');
  const activeTicket =
    tickets.find((t) => t.id === ticketParam) ||
    tickets[0] || {
      id: '#TK-1043',
      subject: 'Aldermanic Hearing Support - 32nd Ward',
      topic: 'ZBA Hearing & Aldermanic Rapport',
      relatedCase: 'WW-2026-0842',
      priority: 'Urgent' as const,
      status: 'Open' as const,
      lastReplyTime: '5m ago',
      assignedConsultant: {
        name: 'Marcus Vance, Esq.',
        title: 'Principal Zoning Counsel',
        isOnline: true,
      },
      messages: [],
    };

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeTicket.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendTicketReply(activeTicket.id, inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between text-[#191919] pb-0">
      {/* Sub-screen Header with Back Arrow and Title */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-[#D8D8D8]/70 bg-white/70 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white border border-[#D8D8D8] text-[#191919] flex items-center justify-center shadow-2xs hover:bg-white active:scale-95 transition-all flex-shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <div>
            <h1 className="font-heading text-sm font-bold text-[#191919]">
              Ticket &amp; Live Chat
            </h1>
            <span className="text-[10px] font-mono font-bold text-[#8C9DAA] block">
              {activeTicket.id}
            </span>
          </div>
        </div>

        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="w-8 h-8 rounded-full bg-white/90 border border-[#D8D8D8] text-[#191919] flex items-center justify-center shadow-2xs hover:bg-white active:scale-95 transition-all flex-shrink-0"
          aria-label="Call Counsel Hotline"
        >
          <PhoneCall className="w-3.5 h-3.5 stroke-[2]" />
        </a>
      </div>

      {/* Ticket Details & Assigned Consultant Banner */}
      <div className="p-3.5 mx-4 mt-2.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#191919] bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 px-2 py-0.5 rounded-full">
              {activeTicket.id}
            </span>
            <span className="text-[9.5px] font-bold text-[#71717A]">
              &bull; {activeTicket.priority} Priority
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9.5px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{activeTicket.status}</span>
          </span>
        </div>

        <div>
          <h2 className="font-heading text-xs font-bold text-[#191919]">
            {activeTicket.subject}
          </h2>
          <div className="flex items-center justify-between text-[10.5px] text-[#71717A] mt-1 pt-1.5 border-t border-[#D8D8D8]/60">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-[#323232]" />
              <span>Assigned: <strong className="text-[#191919]">{activeTicket.assignedConsultant.name}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Thread: user messages on right in dark bubbles, consultant on left in light bubbles */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {activeTicket.messages.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#82807A] space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#A4B3BE] mx-auto" />
            <p className="font-semibold text-[#191919]">
              Encrypted Chicago Municipal Live Thread
            </p>
            <p className="text-[11px] max-w-xs mx-auto">
              Type your message below to communicate directly with {activeTicket.assignedConsultant.name}.
            </p>
          </div>
        ) : (
          activeTicket.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-center gap-1.5 text-[9.5px] text-[#8C9DAA] px-1 font-medium">
                  <span>{msg.authorName}</span>
                  <span>&bull;</span>
                  <span>{msg.time}</span>
                </div>

                <div
                  className={`max-w-[84%] p-3 rounded-[16px] text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-gradient-to-b from-[#323232] to-[#191919] text-[#FEFEFE] rounded-br-xs'
                      : 'liquid-glass-card text-[#191919] rounded-bl-xs border border-[#D8D8D8]'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.attachment && (
                    <div className="mt-2 pt-1.5 border-t border-white/20 text-[10px] flex items-center gap-1 opacity-90 font-mono">
                      <Paperclip className="w-3 h-3" />
                      <span>{msg.attachment}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Message Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white/95 backdrop-blur-md border-t border-[#D8D8D8] flex items-center gap-2 sticky bottom-0 z-30"
      >
        <button
          type="button"
          onClick={() => {
            const mockDoc = prompt('Enter document name to attach (mock):', 'Exhibit_C_Setback_Plat.pdf');
            if (mockDoc) {
              sendTicketReply(activeTicket.id, `Uploaded attachment for review: ${mockDoc}`);
              showToast(`Attached ${mockDoc}`);
            }
          }}
          aria-label="Attach File"
          className="w-10 h-10 rounded-full bg-white border border-[#D8D8D8] flex items-center justify-center text-[#82807A] hover:text-[#191919] active:scale-95 transition-all flex-shrink-0 shadow-2xs"
        >
          <Paperclip className="w-4 h-4 stroke-[2]" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${activeTicket.assignedConsultant.name.split(' ')[0]}...`}
          className="flex-1 h-10 px-4 rounded-full border border-[#D8D8D8] bg-white text-xs text-[#191919] placeholder-[#8C9DAA] focus:outline-none focus:ring-2 focus:ring-[#323232] transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send message"
          className="w-10 h-10 rounded-full btn-glossy-primary flex items-center justify-center shadow-xs disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all flex-shrink-0 text-white"
        >
          <Send className="w-4 h-4 stroke-[2.2]" />
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;

