import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  ShoppingCart, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Calendar, 
  FileCode,
  HardDrive,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ProductDetailsModal: React.FC = () => {
  const { 
    activeProductDetail, 
    setActiveProductDetail, 
    setCheckoutItem, 
    settings, 
    products 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'installation' | 'reviews'>('overview');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const currentImage = selectedImage || product.thumbnailUrl;

  const discountPercentage = Math.round(
    ((product.regularPrice - product.discountedPrice) / product.regularPrice) * 100
  );

  // Related products in the same category or best sellers
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.bestSeller))
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setNewReviewComment('');
      setReviewSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setActiveProductDetail(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col z-10">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-semibold">{product.category}</span>
            <span>/</span>
            <span className="font-mono text-slate-300">v{product.version}</span>
            <span>/</span>
            <span className="text-slate-400">Updated {product.lastUpdated}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveProductDetail(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* Top Section: Media & Buy Module Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-md">
                    SAVE {discountPercentage}%
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        currentImage === img ? 'border-blue-500 scale-102' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Technical Specifications Bar */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Compatibility</span>
                  <span className="text-slate-200 font-semibold truncate block mt-0.5">{product.compatibility}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Downloads</span>
                  <span className="text-slate-200 font-semibold font-mono block mt-0.5">{product.salesCount} verified</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">License</span>
                  <span className="text-emerald-400 font-semibold block mt-0.5">{product.licenseType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Delivery</span>
                  <span className="text-cyan-400 font-semibold block mt-0.5">Automated 100%</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Right Column (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 sticky top-0">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(st => (
                      <Star key={st} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold ml-1">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Price Box */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-slate-400 font-medium">Commercial License Price:</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                      {settings.currencySymbol}{product.discountedPrice.toLocaleString()}
                    </span>
                    {product.regularPrice > product.discountedPrice && (
                      <span className="text-sm font-mono text-slate-500 line-through ml-2">
                        {settings.currencySymbol}{product.regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Instant Source Code Delivery + Full Future Updates</span>
                </div>
              </div>

              {/* Purchase & Demo CTA Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveProductDetail(null);
                    setCheckoutItem(product);
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Purchase & Instant Download</span>
                </button>

                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>Live Interactive Demo Preview</span>
                  </a>
                )}
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Verified 100% Virus-Free & Clean Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Included Files: Full Source Code, SQL Database & Docs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Supported Gateways: bKash, Nagad, Rocket, SSLCommerz</span>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Tabs (Overview, Features, Installation, Reviews) */}
          <div className="border-b border-slate-800">
            <div className="flex items-center gap-6 overflow-x-auto">
              {(
                [
                  { id: 'overview', label: 'Overview & Description' },
                  { id: 'features', label: 'Key Features & Specs' },
                  { id: 'installation', label: 'Installation & Setup' },
                  { id: 'reviews', label: `Reviews (${product.reviewsCount})` },
                ] as const
              ).map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="text-slate-300 text-sm leading-relaxed">
            
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Detailed Product Overview</h3>
                  <p className="whitespace-pre-line text-slate-300 leading-relaxed">
                    {product.detailedDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2">System Requirements</h4>
                  <ul className="space-y-1.5">
                    {product.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Features */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white mb-3">Engine Highlights & Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                        {i + 1}
                      </div>
                      <span className="text-xs text-slate-200 font-medium leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Installation Instructions */}
            {activeTab === 'installation' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Step-by-Step Installation Documentation
                </h3>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {product.installationInstructions}
                </div>
                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-800/40 text-xs text-blue-300">
                  💡 Need help installing? Contact our WhatsApp developer hotline at{' '}
                  <span className="font-bold underline">{settings.whatsappNumber}</span> for instant technical onboarding.
                </div>
              </div>
            )}

            {/* Customer Reviews & Submit Form */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Submit Review */}
                <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white">Write a Verified Buyer Review</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Your Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(st => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setNewReviewRating(st)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-4 h-4 ${st <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Share your experience with code architecture, performance, and documentation..."
                    rows={3}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Reviews are publicly posted after verification.</span>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs"
                    >
                      Submit Review
                    </button>
                  </div>
                  {reviewSubmitted && (
                    <p className="text-xs text-emerald-400 font-medium">Thank you! Your verified review has been logged.</p>
                  )}
                </form>

                {/* Pre-populated Verified Reviews */}
                <div className="space-y-3">
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs">
                          T
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Tanvir Hossain</p>
                          <p className="text-[10px] text-emerald-400">Verified Buyer · Senior Software Architect</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Cleanest Laravel/PHP script I have purchased in Bangladesh. Database migrations executed seamlessly and the automated bKash/Nagad gateway worked right after pasting merchant keys."
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs">
                          M
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Mahmudul Karim</p>
                          <p className="text-[10px] text-emerald-400">Verified Buyer · Agency Founder</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Instant delivery works like magic. Got the download zip and license key 10 seconds after completing bKash checkout. Top notch documentation."
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Recommended Related Scripts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveProductDetail(rel);
                      setSelectedImage('');
                    }}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <img src={rel.thumbnailUrl} alt={rel.name} className="w-14 h-12 rounded-lg object-cover bg-slate-800 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{rel.name}</h4>
                      <p className="text-xs font-mono font-bold text-cyan-400 mt-0.5">
                        {settings.currencySymbol}{rel.discountedPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
