import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles } from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  const { settings, notices } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);

  // If globally disabled by Admin or dismissed by user, completely disappear
  if (!settings.noticeBoardEnabled || isDismissed) {
    return null;
  }

  // Active notices
  const activeNotices = notices.filter(n => n.isActive);
  if (activeNotices.length === 0) {
    return null;
  }

  // Combine active notices into marquee string
  const combinedText = activeNotices.map(n => n.text).join('   ✦   ');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1">
      <div className="relative w-full bg-slate-900/90 dark:bg-slate-900/95 border border-indigo-500/30 rounded-2xl sm:rounded-3xl shadow-lg shadow-indigo-950/20 overflow-hidden flex items-center">
        
        {/* Left Side: NOTICE Badge (Exact style from screenshot) */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-l-2xl sm:rounded-l-3xl flex items-center gap-2 sm:gap-2.5 shrink-0 select-none shadow-md z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs shrink-0 animate-pulse" />
          <span className="tracking-wider uppercase font-sans font-black">NOTICE</span>
        </div>

        {/* Center: Animated Text Marquee (Slowed down for relaxed reading, pauses on hover/touch) */}
        <div 
          className="relative flex-1 overflow-hidden py-2 px-3 sm:px-4 cursor-default select-none"
          title="মাউস রাখুন বা টাচ করুন লেখা থামিয়ে পড়ার জন্য"
        >
          <div className="animate-marquee text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
            <div className="flex items-center shrink-0">
              <span className="inline-block px-8">
                {combinedText}
              </span>
            </div>
            <div className="flex items-center shrink-0" aria-hidden="true">
              <span className="inline-block px-8">
                {combinedText}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Circular Purple Close Button (Exact style from screenshot) */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          title="Dismiss Notice"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center justify-center shrink-0 mr-2 sm:mr-3 transition-transform active:scale-90 shadow-md border border-indigo-400/30 z-10"
          aria-label="Dismiss Notice"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
};
