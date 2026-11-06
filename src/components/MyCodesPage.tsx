import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  FileCode, 
  Code2, 
  Download, 
  Key, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  ExternalLink,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';

export const MyCodesPage: React.FC = () => {
  const { 
    purchasedProducts, 
    currentUser, 
    setCurrentView, 
    downloadProduct, 
    products, 
    settings,
    setActiveProductDetail 
  } = useStore();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [forceEmptyState, setForceEmptyState] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);

  // Filter purchased items for current user or admin
  const userPurchases = purchasedProducts.filter(p => 
    p.userId === currentUser?.id || currentUser?.role === 'admin'
  );

  const filteredPurchases = forceEmptyState ? [] : userPurchases.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.productName.toLowerCase().includes(q) || p.licenseKey.toLowerCase().includes(q);
  });

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full min-h-[75vh] bg-slate-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar (Matching the screenshot: Icon on left + 'My Codes' title) */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            {/* Code Icon Button in circular / rounded-2xl white card */}
            <div className="w-11 h-11 rounded-2xl bg-white text-slate-800 flex items-center justify-center shadow-sm border border-slate-200">
              <FileCode className="w-5 h-5 stroke-[2.2] text-slate-800" />
            </div>
            
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Codes
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle demo empty state to match user's screenshot */}
            <button
              type="button"
              onClick={() => setForceEmptyState(!forceEmptyState)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Toggle to view empty state from screenshot"
            >
              {forceEmptyState ? 'Show My Codes' : 'Screenshot View (Empty)'}
            </button>
          </div>
        </div>

        {/* If NO Codes Found (Exact design from the screenshot) */}
        {filteredPurchases.length === 0 ? (
          <div className="w-full bg-white dark:bg-white rounded-3xl p-10 sm:p-14 text-center shadow-lg border border-slate-200 space-y-6 my-4">
            
            {/* No code data found message */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              No code data found !
            </h2>

            {/* ORDER NOW pill button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#6c5ce7] hover:bg-[#5b4cc4] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95"
              >
                ORDER NOW
              </button>
            </div>

            {userPurchases.length > 0 && (
              <p className="text-xs text-slate-500 pt-2">
                No items match your search.{' '}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-indigo-600 font-bold underline"
                >
                  Clear search
                </button>
              </p>
            )}

          </div>
        ) : (
          /* When codes exist: display rich, licensed source code cards */
          <div className="space-y-4">
            
            {/* Search Bar when items exist */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search your licensed source codes or license keys..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {filteredPurchases.map(purchase => {
              const productDetails = products.find(p => p.id === purchase.productId);
              const thumbnail = productDetails?.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80';
              const remainingDownloads = Math.max(0, purchase.downloadLimit - purchase.downloadCount);

              return (
                <div 
                  key={purchase.id}
                  className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-4 hover:border-slate-700 transition-colors"
                >
                  {/* Top Header of the Code Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={thumbnail}
                        alt={purchase.productName}
                        className="w-13 h-13 rounded-2xl object-cover shrink-0 border border-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                            {purchase.productName}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="text-indigo-400 font-mono text-[11px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                            v{purchase.productVersion}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            Purchased {new Date(purchase.purchaseDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Active License</span>
                      </span>
                    </div>
                  </div>

                  {/* License Key Display & 1-Click Copy */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                        License Key / Verification Token:
                      </span>
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="font-mono text-xs sm:text-sm font-bold text-indigo-200 tracking-wider truncate select-all">
                          {purchase.licenseKey}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyLicense(purchase.licenseKey)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      {copiedKey === purchase.licenseKey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Key</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Download & Documentation Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="text-xs text-slate-400 font-mono">
                      <span>Downloads: </span>
                      <strong className="text-white">{purchase.downloadCount}</strong>
                      <span> / {purchase.downloadLimit} allowed</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {productDetails && (
                        <button
                          type="button"
                          onClick={() => setActiveProductDetail(productDetails)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Setup Guide</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => downloadProduct(purchase.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Source Code</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};
