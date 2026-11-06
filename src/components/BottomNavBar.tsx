import React from 'react';
import { useStore, ViewType } from '../context/StoreContext';
import { 
  Home, 
  ShoppingBag, 
  Download, 
  FileCode, 
  User, 
  Headphones, 
  X,
  Phone
} from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    settings,
    setIsInstallModalOpen
  } = useStore();

  const [isSupportOpen, setIsSupportOpen] = React.useState(false);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* FLOATING LIVE HEADPHONES SUPPORT BUTTON (Exact as in screenshot) */}
      <div className="fixed bottom-20 right-4 sm:right-8 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsSupportOpen(!isSupportOpen)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all ring-4 ring-indigo-500/20 border border-indigo-400/30"
          aria-label="Instant Helpline Support"
          title="Instant 24/7 Helpline"
        >
          <Headphones className="w-6 h-6 stroke-[2.2]" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
        </button>

        {/* Support Flyout Modal */}
        {isSupportOpen && (
          <div className="absolute bottom-16 right-0 w-72 bg-slate-950 border border-indigo-500/40 rounded-2xl shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-xs text-white">Live Support Desk</span>
              </div>
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-300">
              যেকোনো সমস্যায় সরাসরি আমাদের ডেভেলপার হেল্পলাইনে কথা বলুন:
            </p>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: {settings.whatsappNumber}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsSupportOpen(false);
                navigateTo('customer_dashboard');
              }}
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-xl border border-slate-800 text-center"
            >
              Open Support Ticket
            </button>
          </div>
        )}
      </div>

      {/* FIXED BOTTOM APP BAR: Home, My Orders, App [Center raised], My Codes, My Account */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 shadow-2xl py-1.5 px-2 sm:px-6">
        <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-between relative">
          
          {/* 1. Home */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              currentView === 'home' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          {/* 2. My Orders */}
          <button
            type="button"
            onClick={() => navigateTo('my_orders')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              currentView === 'my_orders' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">My Orders</span>
          </button>

          {/* 3. Center Raised App Install Button */}
          <button
            type="button"
            onClick={() => setIsInstallModalOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-1 group transition-colors select-none"
            title="ইনস্টল / ডাউনলোড অ্যাপ"
          >
            <div className="relative -top-2.5 flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 border-2 border-slate-950 group-hover:scale-110 active:scale-95 transition-all">
                <Download className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-[10px] text-indigo-300 font-bold -mt-0.5 tracking-tight group-hover:text-white">
                App
              </span>
            </div>
          </button>

          {/* 4. My Codes */}
          <button
            type="button"
            onClick={() => navigateTo('my_codes')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              currentView === 'my_codes' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">My Codes</span>
          </button>

          {/* 5. My Account */}
          <button
            type="button"
            onClick={() => navigateTo('customer_dashboard')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
              currentView === 'customer_dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">My Account</span>
          </button>

        </div>
      </nav>
    </>
  );
};
