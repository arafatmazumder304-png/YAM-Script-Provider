import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Download, 
  PackageCheck, 
  ShieldCheck, 
  Key, 
  ExternalLink,
  Copy,
  Check,
  FileCode
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { 
    completedOrder, 
    setCompletedOrder, 
    purchasedProducts, 
    downloadProduct, 
    setCurrentView,
    settings 
  } = useStore();

  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  if (!completedOrder) return null;

  const order = completedOrder;
  const items = purchasedProducts.filter(p => p.orderId === order.id);

  const copyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setCompletedOrder(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col">
        
        {/* Success Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-emerald-950/40 to-slate-950 border-b border-slate-800 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
            PAYMENT VERIFIED · INSTANT DELIVERY ACTIVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Order Complete #{order.orderNumber}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Your payment via <strong className="text-white">{order.paymentMethod}</strong> (TRX: <span className="font-mono text-cyan-400">{order.transactionId}</span>) has been verified by the automated system.
          </p>
        </div>

        {/* Order Details & Instant Product Download Access */}
        <div className="p-6 space-y-5">
          
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-cyan-400" />
              <span>Purchased Digital Scripts & License Keys</span>
            </h4>

            {items.map(item => (
              <div 
                key={item.id}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="text-sm font-bold text-white">{item.productName}</h5>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="font-mono">Version v{item.productVersion}</span>
                      <span>·</span>
                      <span>Quota: {item.downloadCount} / {item.downloadLimit > 0 ? item.downloadLimit : '∞'} used</span>
                    </div>
                  </div>

                  {/* Immediate Download Button */}
                  <button
                    type="button"
                    onClick={() => downloadProduct(item.id)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Package (.ZIP)</span>
                  </button>
                </div>

                {/* License Key Display */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-400 font-mono text-[11px] truncate">
                      License Key: <strong className="text-amber-300">{item.licenseKey}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyLicense(item.licenseKey)}
                    className="p-1 text-slate-400 hover:text-white rounded transition-colors shrink-0"
                    title="Copy License Key"
                  >
                    {copiedKey === item.licenseKey ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Financial Summary */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Customer:</span>
              <span className="text-slate-200">{order.customerName} ({order.customerEmail})</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Gateway:</span>
              <span className="text-slate-200 font-mono">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Paid:</span>
              <span className="text-white font-bold font-mono text-sm">
                {settings.currencySymbol}{order.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Status:</span>
              <span className="text-emerald-400 font-medium">Automatic Instant Fulfill</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setCompletedOrder(null);
                setCurrentView('customer_dashboard');
              }}
              className="py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-800 transition-colors text-center"
            >
              Go to My Orders
            </button>
            <button
              type="button"
              onClick={() => {
                setCompletedOrder(null);
                setCurrentView('products');
              }}
              className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors text-center"
            >
              Continue Shopping
            </button>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            A confirmation email and perpetual invoice have been dispatched to {order.customerEmail}.
          </p>

        </div>

      </div>
    </div>
  );
};
