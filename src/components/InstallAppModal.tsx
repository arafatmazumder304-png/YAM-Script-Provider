import React, { useState } from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  Zap, 
  ShieldCheck, 
  WifiOff, 
  ExternalLink,
  Laptop,
  Copy,
  Check,
  QrCode,
  Send
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isStandalone, isIOS, promptInstall } = usePWAInstall();
  const [installing, setInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'testing'>('install');

  if (!isOpen) return null;

  // Use the live shared preview URL or the current window origin
  const liveUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') 
        ? 'https://ais-pre-hcfrejzmutnh63b3jpl4iy-843805153357.asia-northeast1.run.app' 
        : window.location.href)
    : 'https://ais-pre-hcfrejzmutnh63b3jpl4iy-843805153357.asia-northeast1.run.app';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(liveUrl)}&bgcolor=080d1a&color=a5b4fc&margin=6`;

  const handleInstallClick = async () => {
    setInstalling(true);
    try {
      const success = await promptInstall();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } finally {
      setInstalling(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareToWhatsApp = () => {
    const text = `YAM Scripts App Testing Link:\n${liveUrl}\n\nআপনার মোবাইল ব্রাউজারে ওপেন করে Install / Add to Home Screen এ চাপুন!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-slate-950 border border-indigo-500/30 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Monogram */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 p-0.5 shadow-xl shadow-indigo-600/30 shrink-0 border border-indigo-400/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
              <img 
                src="/icon.svg" 
                alt="YAM Scripts App Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                YAM Scripts App
              </h3>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
            <p className="text-xs text-indigo-300 font-medium mt-0.5">
              Official Digital Marketplace App • v2.4.0
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">সাইজ: ~1.8 MB</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">অটো-আপডেট অন</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('install')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'install' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>অ্যাপ ইনস্টল</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('testing')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'testing' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>মোবাইলে টেস্টিং ও QR কোড</span>
          </button>
        </div>

        {/* TAB 1: Direct Installation */}
        {activeTab === 'install' && (
          <div>
            {/* Status Message If Already Installed */}
            {(isStandalone || isInstalled || installSuccess) ? (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-bold">অ্যাপটি আপনার ডিভাইসে সক্রিয় রয়েছে!</p>
                  <p className="text-xs text-emerald-400/80 mt-0.5">
                    হোমস্ক্রিন বা অ্যাপ ড্রয়ার থেকে সরাসরি ওপেন করে যেকোনো সময় ব্যবহার করতে পারেন।
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mb-5">
                {isInstallable ? (
                  <div>
                    <button
                      type="button"
                      onClick={handleInstallClick}
                      disabled={installing}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] border border-indigo-400/30 cursor-pointer"
                    >
                      <Download className="w-5 h-5 animate-bounce" />
                      <span>{installing ? 'ইনস্টল হচ্ছে...' : 'এখনই অ্যাপ ডাউনলোড ও ইনস্টল করুন'}</span>
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2">
                      এক ক্লিকেই আপনার ফোনে বা কম্পিউটারে ইনস্টল হয়ে যাবে। কোনো প্লে-স্টোর ছাড়াই সরাসরি কাজ করবে।
                    </p>
                  </div>
                ) : isIOS ? (
                  /* iOS Safari instructions */
                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-left space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                      <Smartphone className="w-4 h-4" />
                      <span>iPhone / iPad এ যেভাবে ইনস্টল করবেন:</span>
                    </div>
                    <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pl-1">
                      <li className="leading-relaxed">
                        Safari ব্রাউজারের নিচে থাকা <span className="inline-flex items-center gap-1 font-semibold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700"><Share2 className="w-3 h-3 text-indigo-400" /> Share</span> বোতামে ট্যাপ করুন।
                      </li>
                      <li className="leading-relaxed">
                        মেনুটি একটু নিচে স্ক্রোল করে <span className="inline-flex items-center gap-1 font-semibold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700"><PlusSquare className="w-3 h-3 text-emerald-400" /> Add to Home Screen</span> অপশনটি বেছে নিন।
                      </li>
                      <li className="leading-relaxed">
                        উপরের ডানদিকের <strong className="text-white font-bold">Add</strong> বোতাম চাপুন—তৈরি হয়ে যাবে আপনার নিজস্ব YAM Scripts অ্যাপ!
                      </li>
                    </ol>
                  </div>
                ) : (
                  /* General browser install guidelines */
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-left space-y-2.5">
                      <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                        <Smartphone className="w-4 h-4" />
                        <span>Android / Chrome ব্রাউজার থেকে ইনস্টল:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        ১. ক্রোম ব্রাউজারের উপরে ডানদিকের <strong>তিনটি ডট (⋮)</strong> মেন্যুতে ক্লিক করুন।
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        ২. <strong>&quot;Install app&quot;</strong> বা <strong>&quot;Add to Home screen&quot;</strong> অপশনে ট্যাপ করুন।
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-slate-400" />
                        কম্পিউটার/ল্যাপটপে:
                      </span>
                      <span className="text-slate-300">অ্যাড্রেস বারের Install (⊕) আইকনে চাপুন</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">সুপার ফাস্ট স্পিড</p>
                  <p className="text-[10px] text-slate-400">০.২ সেকেন্ডে পেজ লোড</p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">অফলাইন স্টোরেজ</p>
                  <p className="text-[10px] text-slate-400">কোড ও লাইসেন্স ক্যাশড</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Mobile Testing & QR Code */}
        {activeTab === 'testing' && (
          <div className="space-y-4 mb-4">
            {/* QR Code Card */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="p-2 bg-slate-950 rounded-xl border border-indigo-500/30 shrink-0 shadow-lg">
                <img 
                  src={qrCodeUrl} 
                  alt="App Testing QR Code" 
                  className="w-32 h-32 rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-bold text-white text-sm">মোবাইল দিয়ে স্ক্যান করে টেস্ট করুন</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  আপনার ফোনের ক্যামেরা বা QR Scanner দিয়ে এই কোডটি স্ক্যান করলেই সরাসরি অ্যাপ ওপেন হবে এবং এক ক্লিকে ইনস্টল হয়ে যাবে।
                </p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={handleShareToWhatsApp}
                    className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp এ লিংক পাঠান</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Direct URL Copy Box */}
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                লাইভ টেস্ট লিংক (যেকোনো ফোনে Chrome বা Safari তে ওপেন করুন):
              </span>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input 
                  type="text" 
                  readOnly 
                  value={liveUrl} 
                  className="bg-transparent text-xs text-indigo-300 font-mono flex-1 outline-hidden select-all truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি করুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PWABuilder Android APK packaging tip */}
            <div className="p-3 bg-indigo-950/40 rounded-2xl border border-indigo-500/30 flex items-start gap-2.5 text-xs text-indigo-200">
              <Smartphone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">সরাসরি .APK ফাইল তৈরি করতে চান?</span>
                <span className="text-[11px] text-slate-300">
                  <a 
                    href="https://www.pwabuilder.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-indigo-400 underline font-bold hover:text-indigo-300 inline-flex items-center gap-0.5"
                  >
                    PWABuilder.com <ExternalLink className="w-3 h-3" />
                  </a> তে এই টেস্ট লিংকটি পেস্ট করে বিনামূল্যে সাইনড Android APK ডাউনলোড করে ফোনে ইন্সটল করতে পারবেন।
                </span>
              </div>
            </div>

            {/* Direct Test Bundle Download (.zip) */}
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">অফলাইন টেস্টিং প্যাকেজ (.ZIP)</span>
                <span className="text-[10px] text-slate-400">সম্পূর্ণ অ্যাপ ফাইলস (~0.76 MB) সরাসরি ডাউনলোড</span>
              </div>
              <a
                href="/yam-scripts-app.zip"
                download="yam-scripts-app.zip"
                className="py-1.5 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-transform active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ZIP ডাউনলোড</span>
              </a>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            {activeTab === 'testing' ? 'Instant Testing Ready' : 'Auto-Update Enabled'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            বন্ধ করুন (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
