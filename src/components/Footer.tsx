import React from 'react';
import { useStore, ViewType } from '../context/StoreContext';
import { 
  Facebook, 
  Youtube, 
  Send, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Headphones
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setCurrentView, setSelectedCategoryFilter } = useStore();

  const navigateTo = (view: ViewType, category?: string) => {
    if (category) {
      setSelectedCategoryFilter(category);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-300 pt-10 pb-24 sm:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Notice & Urgent Help Advice (Exact copy and style from screenshot) */}
        <div className="space-y-2 text-center sm:text-left">
          <p className="font-extrabold text-sm sm:text-base text-white leading-snug">
            কোন সমস্যায় পড়লে হোয়াটসঅ্যাপ এ যোগাযোগ করবেন। তাহলে দ্রুত সমাধান পেয়ে যাবেন।{' '}
            <span className="font-mono text-emerald-400 font-bold">{settings.whatsappNumber}</span>
          </p>

          <div className="text-xs sm:text-sm text-slate-400">
            <strong className="text-slate-200">নোটিশ: </strong>
            কোন সমস্যায় পড়লে বা স্ক্রিপ্ট সেটআপে সমস্যা হলে হোয়াটসঅ্যাপ এ যোগাযোগ করবেন। তাহলে দ্রুত সমাধান পেয়ে যাবেন।{' '}
            <span className="font-mono text-slate-300">{settings.whatsappNumber}</span>
          </div>
        </div>

        {/* 4 Social Channels Grid (2x2) - Styled as clean elevated cards like the screenshot */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Facebook */}
          <a
            href={settings.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Facebook className="w-4 h-4" />
            </div>
            <span>Facebook</span>
          </a>

          {/* YouTube */}
          <a
            href={settings.youtubeUrl || 'https://youtube.com/@yamscriptprovider'}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md group"
          >
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Youtube className="w-4 h-4" />
            </div>
            <span>YouTube</span>
          </a>

          {/* Telegram */}
          <a
            href={settings.telegramUrl || 'https://t.me/yamscriptprovider'}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md group"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-600/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send className="w-4 h-4" />
            </div>
            <span>Telegram</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span>WhatsApp</span>
          </a>

        </div>

        {/* Contact Us Section Title (Exact as in screenshot) */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Contact Us
          </h3>

          {/* 3 Contact Cards with Verified Blue Badges */}
          <div className="space-y-3">
            
            {/* 1. WhatsApp HelpLine */}
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors">
                      Whatsapp HelpLine
                    </span>
                    {/* Blue Verified Badge */}
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">সকাল ৮টা থেকে রাত ১২টা</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 hidden sm:inline-block">
                {settings.whatsappNumber}
              </span>
            </a>

            {/* 2. Telegram HelpLine */}
            <a
              href={settings.telegramUrl || 'https://t.me/yamscriptprovider'}
              target="_blank"
              rel="noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-600/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  <Send className="w-5 h-5 ml-0.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors">
                      Telegram HelpLine
                    </span>
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">সকাল ৮টা থেকে রাত ১২টা</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 hidden sm:inline-block">
                @yamscriptprovider
              </span>
            </a>

            {/* 3. Facebook HelpLine */}
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors">
                      Facebook HelpLine
                    </span>
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">সকাল ৮টা থেকে রাত ১২টা</p>
                </div>
              </div>
              <span className="text-xs text-blue-400 hidden sm:inline-block font-semibold">
                Official Fanpage
              </span>
            </a>

          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
          <p>{settings.copyrightText}</p>
          <div className="flex items-center justify-center gap-4 text-[11px]">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
              Contact Desk
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
