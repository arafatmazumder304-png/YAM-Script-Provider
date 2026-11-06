import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  List, 
  ShoppingBag, 
  Download, 
  Key, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  FileCode,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { 
    orders, 
    currentUser, 
    setCurrentView, 
    downloadProduct, 
    purchasedProducts, 
    settings,
    products
  } = useStore();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'processing' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [forceEmptyState, setForceEmptyState] = useState(false);

  // Filter orders for the current user
  const userOrders = orders.filter(o => 
    o.userId === currentUser?.id || currentUser?.role === 'admin'
  );

  const filteredOrders = forceEmptyState ? [] : userOrders.filter(order => {
    if (selectedFilter !== 'all' && order.status !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchProduct = order.items.some(i => i.productName.toLowerCase().includes(q));
      return matchId || matchProduct;
    }
    return true;
  });

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full min-h-[75vh] bg-slate-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar (Matching the screenshot: List icon on left + 'My Orders' title) */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            {/* List Icon Button in circular / rounded-2xl white card */}
            <div className="w-11 h-11 rounded-2xl bg-white text-slate-800 flex items-center justify-center shadow-sm border border-slate-200">
              <List className="w-5 h-5 stroke-[2.2]" />
            </div>
            
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Orders
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle demo empty state to match user's screenshot exactly */}
            <button
              type="button"
              onClick={() => setForceEmptyState(!forceEmptyState)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Toggle to view empty state from screenshot"
            >
              {forceEmptyState ? 'Show My Orders' : 'Screenshot View (Empty)'}
            </button>

            {/* Quick status filter pills */}
            {!forceEmptyState && userOrders.length > 0 && (
              <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
                {(['all', 'completed', 'processing'] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors ${
                      selectedFilter === tab 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* If NO Orders Found (Exact design from the screenshot) */}
        {filteredOrders.length === 0 ? (
          <div className="w-full bg-white dark:bg-white rounded-3xl p-10 sm:p-14 text-center shadow-lg border border-slate-200 space-y-6 my-4">
            
            {/* No order data found message */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              No order data found !
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

            {userOrders.length > 0 && (
              <p className="text-xs text-slate-500 pt-2">
                No orders match your filter criteria.{' '}
                <button 
                  onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
                  className="text-indigo-600 font-bold underline"
                >
                  Reset filters
                </button>
              </p>
            )}

          </div>
        ) : (
          /* When orders exist: display sleek, high-fidelity order cards */
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const statusColor = 
                order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                order.status === 'processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                order.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                'bg-amber-500/10 text-amber-400 border-amber-500/30';

              return (
                <div 
                  key={order.id} 
                  className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-md space-y-4 hover:border-slate-700 transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs border border-indigo-500/30">
                        #
                      </div>
                      <div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white block">
                          {order.id}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-full border font-bold ${statusColor}`}>
                        {order.status}
                      </span>
                      <span className="font-mono font-black text-sm sm:text-base text-white">
                        {order.totalAmount.toLocaleString()}{settings.currencySymbol}
                      </span>
                    </div>
                  </div>

                  {/* Order Product Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => {
                      const productDetails = products.find(p => p.id === item.productId);
                      const matchedPurchase = purchasedProducts.find(
                        p => p.productId === item.productId && (p.userId === currentUser?.id || currentUser?.role === 'admin')
                      );
                      const thumbnail = productDetails?.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80';

                      return (
                        <div 
                          key={idx} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={thumbnail}
                              alt={item.productName}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
                            />
                            <div>
                              <h4 className="font-bold text-xs sm:text-sm text-white leading-snug">
                                {item.productName}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                <span className="text-indigo-400">{item.category}</span>
                                <span>·</span>
                                <span className="font-mono">{item.price.toLocaleString()}{settings.currencySymbol}</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Action for Licensed Delivery */}
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {order.status === 'completed' && matchedPurchase ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleCopyLicense(matchedPurchase.licenseKey)}
                                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors"
                                  title="Copy License Key"
                                >
                                  {copiedKey === matchedPurchase.licenseKey ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Key className="w-3.5 h-3.5 text-indigo-400" />
                                      <span>Copy Key</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => downloadProduct(matchedPurchase.id)}
                                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Download</span>
                                </button>
                              </>
                            ) : (
                              <span className="text-[11px] font-mono text-slate-400">
                                Paid via {order.paymentMethod}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Footer with TrxID */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 font-mono">
                    <span>TrxID: <strong className="text-slate-200">{order.transactionId || 'WAL-AUTO'}</strong></span>
                    <button 
                      onClick={() => {
                        setCurrentView('products');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      <span>Buy More Scripts</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
