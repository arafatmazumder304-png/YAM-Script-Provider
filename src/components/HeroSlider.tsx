import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Users, 
  Facebook, 
  MessageCircle, 
  Bot, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { sliders, settings, setCurrentView, setActiveProductDetail, products } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlides = sliders
    .filter(s => s.isActive)
    .sort((a, b) => a.order - b.order);

  const nextSlide = useCallback(() => {
    if (activeSlides.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = () => {
    if (activeSlides.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(nextSlide, settings.sliderAutoplaySpeed || 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, activeSlides.length, settings.sliderAutoplaySpeed]);

  if (activeSlides.length === 0) {
    return null;
  }

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handleSlideAction = (destinationUrl: string) => {
    if (destinationUrl.startsWith('#product-detail-')) {
      const prodId = destinationUrl.replace('#product-detail-', '');
      const matched = products.find(p => p.id === prodId);
      if (matched) {
        setActiveProductDetail(matched);
        return;
      }
    }
    if (destinationUrl === '#products') {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setCurrentView('products');
      return;
    }
    if (destinationUrl.startsWith('http')) {
      window.open(destinationUrl, '_blank');
      return;
    }
    setCurrentView('products');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6 space-y-6">
      
      {/* BANNER SLIDER (Styled to match the reference screenshot) */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full min-h-[300px] sm:min-h-[380px] md:min-h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border border-indigo-500/30 shadow-2xl shadow-indigo-950/40 flex flex-col justify-between group">
          
          {/* Subtle Ambient Decorative Grid & Corner Pluses (Exact style in screenshot) */}
          <span className="absolute top-3 left-4 text-indigo-400/60 font-mono text-sm select-none z-10">+</span>
          <span className="absolute top-3 right-4 text-indigo-400/60 font-mono text-sm select-none z-10">+</span>
          <span className="absolute bottom-3 left-4 text-indigo-400/60 font-mono text-sm select-none z-10">+</span>
          <span className="absolute bottom-3 right-4 text-indigo-400/60 font-mono text-sm select-none z-10">+</span>

          {/* Background Image / Ambient Lighting */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Glow and Depth Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-purple-950/40 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Internal Content Split */}
          <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-10 md:p-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Arrow Accent & Category Kicker */}
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs select-none">
                <span>►►►►►</span>
                <span className="text-white font-extrabold tracking-widest uppercase text-[11px] bg-indigo-600/30 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  {currentSlide.badge || 'VERIFIED CODEBASE'}
                </span>
              </div>

              {/* Headline (Styled with punchy high-contrast typography) */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                {currentSlide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                {currentSlide.subtitle}
              </p>

              {/* Direct CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSlideAction(currentSlide.destinationUrl)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/40 flex items-center gap-2 transition-all transform active:scale-95 border border-indigo-400/30"
                >
                  <span>{currentSlide.buttonText || 'Explore Catalog'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-mono">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>২৪ ঘণ্টাই অটোমেটিক ডেলিভারি</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Feature (Mockup preview card like the screenshot) */}
            <div className="lg:col-span-5 hidden sm:flex items-center justify-center relative">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900/90 border border-indigo-500/40 p-4 shadow-2xl backdrop-blur-md transform group-hover:-translate-y-1 transition-transform duration-500">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      INSTANT ROBOT DELIVERY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600/40 text-indigo-300">
                    24/7 ACTIVE
                  </span>
                </div>

                {/* Main Graphic Showcase */}
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 mb-3 relative">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-slate-200">
                    <span className="text-cyan-400 font-bold">bKash · Nagad · Rocket</span>
                    <span className="text-emerald-400">Zero Wait Time</span>
                  </div>
                </div>

                {/* Subtext */}
                <div className="text-center font-bold text-xs sm:text-sm text-indigo-200">
                  আমাদের সাইট থেকে ২৪ ঘণ্টাই মিলবে প্রিমিয়াম সোর্স কোড ও অটোমেটিক লাইসেন্স কি
                </div>
              </div>
            </div>

          </div>

          {/* Left/Right Navigation Arrows */}
          {activeSlides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

        </div>

        {/* CAPSULE SLIDE INDICATORS (Below the slider, exact as screenshot: active elongated pill, inactive small pill) */}
        {activeSlides.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-3">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-7 bg-indigo-500 shadow-md shadow-indigo-500/50' 
                    : 'w-3 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* QUICK SUPPORT ACTION CARDS (Exactly like the bottom of the screenshot: Telegram, Join Group, Facebook, WhatsApp) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        {/* 1. SUPPORT: Telegram */}
        <a
          href={settings.telegramUrl || 'https://t.me/yamscriptprovider'}
          target="_blank"
          rel="noreferrer"
          className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md shadow-indigo-600/20 flex items-center gap-3 transition-all transform active:scale-95 group border border-indigo-400/20"
        >
          <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Send className="w-5 h-5 ml-0.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-indigo-200 uppercase font-bold tracking-wider block">SUPPORT</span>
            <span className="text-xs sm:text-sm font-black truncate block leading-tight">Telegram</span>
          </div>
        </a>

        {/* 2. GROUP: Join Community */}
        <a
          href={settings.telegramUrl || 'https://t.me/yamscriptprovider'}
          target="_blank"
          rel="noreferrer"
          className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white shadow-md shadow-purple-600/20 flex items-center gap-3 transition-all transform active:scale-95 group border border-purple-400/20"
        >
          <div className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-purple-200 uppercase font-bold tracking-wider block">GROUP</span>
            <span className="text-xs sm:text-sm font-black truncate block leading-tight">Join Group</span>
          </div>
        </a>

        {/* 3. PAGE: Facebook */}
        <a
          href={settings.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white shadow-md shadow-blue-600/20 flex items-center gap-3 transition-all transform active:scale-95 group border border-blue-400/20"
        >
          <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Facebook className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-blue-200 uppercase font-bold tracking-wider block">PAGE</span>
            <span className="text-xs sm:text-sm font-black truncate block leading-tight">Facebook</span>
          </div>
        </a>

        {/* 4. CHAT: WhatsApp */}
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white shadow-md shadow-violet-600/20 flex items-center gap-3 transition-all transform active:scale-95 group border border-violet-400/20"
        >
          <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-violet-200 uppercase font-bold tracking-wider block">CHAT</span>
            <span className="text-xs sm:text-sm font-black truncate block leading-tight">WhatsApp</span>
          </div>
        </a>

      </div>

    </div>
  );
};
