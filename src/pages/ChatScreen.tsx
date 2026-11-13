import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Sparkles,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';

export const ChatScreen: React.FC = () => {
  const { chatMessages, sendChatMessage } = useAppStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickAiPrompts = [
    'Can I add a coach house (ADU)?',
    'What is the maximum FAR for RT-4?',
    'How long does a ZBA appeal take?',
    'Can I eliminate parking near CTA?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendChatMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleChipClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  return (
    <div className="min-h-full flex flex-col justify-between text-[#1F2A44] pb-0">
      {/* Top Header */}
      <AppHeader
        title="Zoning Counsel Chat"
        showBack
        rightAction={
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="w-10 h-10 rounded-full liquid-glass-chip flex items-center justify-center text-[#3D4D7C] hover:border-[#3D4D7C]/50 active:scale-95 transition-all"
            aria-label="Direct Phone Call"
          >
            <PhoneCall className="w-4 h-4 stroke-[2]" />
          </a>
        }
      />

      {/* Online Status Bar */}
      <div className="liquid-glass-bar px-4 py-2 flex items-center justify-between text-xs border-b border-white/60">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3FA66B]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3FA66B] absolute inset-0 animate-ping opacity-60" />
          </div>
          <span className="font-semibold text-[#1F2A44]">
            Williams &amp; Williams Senior Advisory
          </span>
        </div>
        <span className="text-[10px] text-[#8A93A6]">Avg response: 15 min</span>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Chat Intro Banner */}
        <GlassCard className="p-3.5 text-center space-y-1.5 max-w-sm mx-auto">
          <ShieldCheck className="w-6 h-6 mx-auto text-[#3D4D7C]" />
          <h4 className="font-heading text-xs font-bold text-[#1F2A44]">
            Direct Encrypted Zoning Channel
          </h4>
          <p className="text-[10px] text-[#8A93A6]">
            Communicate directly with your assigned Chicago zoning consultant regarding permits, appeals, and hearings.
          </p>
        </GlassCard>

        {/* Message Bubbles */}
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-[#8A93A6] px-1">
                <span>{msg.authorName}</span>
                <span>&bull;</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'btn-glossy-navy text-white rounded-br-xs'
                    : 'liquid-glass-card text-[#1F2A44] rounded-bl-xs'
                }`}
              >
                {msg.text}

                {msg.attachmentName && (
                  <div className="mt-2 pt-2 border-t border-white/20 text-[10px] flex items-center gap-1 opacity-90">
                    <Paperclip className="w-3 h-3" />
                    <span>Attached: {msg.attachmentName}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* "Ask AI / Quick Questions" Chips Row */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#3D4D7C]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
            Quick Ordinance Questions
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {quickAiPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(prompt)}
              className="px-3 py-1.5 rounded-full liquid-glass-chip text-[11px] font-medium text-[#1F2A44] whitespace-nowrap hover:border-[#3D4D7C]/40 active:scale-95 transition-all select-none"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 liquid-glass-bar border-t border-white/70 flex items-center gap-2 sticky bottom-0 z-30"
      >
        <button
          type="button"
          onClick={() => {
            const fileName = prompt('Enter document name to attach (mock):', 'Plat_of_survey_2026.pdf');
            if (fileName) {
              sendChatMessage(`Uploaded document for review: ${fileName}`, fileName);
            }
          }}
          aria-label="Attach File"
          className="w-10 h-10 rounded-full liquid-glass-chip flex items-center justify-center text-[#8A93A6] hover:text-[#1F2A44] active:scale-95 transition-all flex-shrink-0"
        >
          <Paperclip className="w-4 h-4 stroke-[2]" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a zoning question or send update..."
          className="flex-1 h-11 px-4 rounded-full border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] placeholder-[#8A93A6] focus:outline-none focus:ring-2 focus:ring-[#3D4D7C] transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send message"
          className="w-11 h-11 rounded-full btn-glossy-navy flex items-center justify-center shadow-xs disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all flex-shrink-0 text-white"
        >
          <Send className="w-4 h-4 stroke-[2.2]" />
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
