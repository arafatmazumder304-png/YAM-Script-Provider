import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, Product } from '../types';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  Loader2,
  Smartphone,
  CreditCard
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    checkoutItem, 
    setCheckoutItem, 
    currentUser, 
    settings, 
    gateways, 
    applyCoupon, 
    processPaymentAndDeliver,
    setCompletedOrder
  } = useStore();

  const [step, setStep] = useState<'info' | 'gateway_action' | 'verifying'>('info');
  const [name, setName] = useState(currentUser?.name || 'Arafat Mazumder');
  const [email, setEmail] = useState(currentUser?.email || 'customer@yamscript.com');
  const [phone, setPhone] = useState(currentUser?.phone || '01915985602');
  const [selectedGateway, setSelectedGateway] = useState<PaymentMethod>('bKash');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ discount: number; message: string } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Gateway Simulation State
  const [gatewayPhone, setGatewayPhone] = useState('01915985602');
  const [gatewayOtp, setGatewayOtp] = useState('123456');
  const [gatewayPin, setGatewayPin] = useState('•••••');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);

  if (!checkoutItem) return null;

  const product = checkoutItem;
  const regularTotal = product.discountedPrice;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, regularTotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode, regularTotal);
    if (res.valid) {
      setAppliedCoupon({ discount: res.discount, message: res.message });
      setCouponError('');
    } else {
      setCouponError(res.message);
      setAppliedCoupon(null);
    }
  };

  const handleProceedToGateway = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please provide complete customer details.');
      return;
    }
    setStep('gateway_action');
  };

  const handleAuthorizePayment = async () => {
    setIsProcessing(true);
    setStep('verifying');

    // Simulate multi-step secure server-side verification:
    // 1. Gateway handshake
    // 2. Signature verification
    // 3. Idempotency validation
    // 4. Fulfillment
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setVerificationProgress(p);
      if (p >= 100) {
        clearInterval(interval);
      }
    }, 350);

    setTimeout(async () => {
      const generatedTrxId = `${selectedGateway.substring(0, 3).toUpperCase()}${Date.now().toString(36).toUpperCase()}`;

      const result = await processPaymentAndDeliver({
        paymentMethod: selectedGateway,
        transactionId: generatedTrxId,
        customerInfo: { name, email, phone },
        items: [product],
        couponCode: appliedCoupon ? couponCode : undefined,
      });

      setIsProcessing(false);
      setCheckoutItem(null);
      setCompletedOrder(result.order);
    }, 1800);
  };

  const enabledGateways = gateways.filter(g => g.enabled);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => !isProcessing && setCheckoutItem(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-base">
              {step === 'info' && 'Instant Secure Checkout'}
              {step === 'gateway_action' && `${selectedGateway} Payment Authorization`}
              {step === 'verifying' && 'Automated Server Verification'}
            </h3>
          </div>
          {!isProcessing && (
            <button
              type="button"
              onClick={() => setCheckoutItem(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6">
          
          {/* Order Summary Strip */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3.5 mb-6">
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              className="w-16 h-12 rounded-xl object-cover bg-slate-950 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">{product.name}</h4>
              <p className="text-[11px] text-slate-400">Release v{product.version} · Commercial License</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Due:</span>
              <span className="font-mono text-base font-extrabold text-white">
                {settings.currencySymbol}{finalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* STEP 1: Customer Information & Gateway Selection */}
          {step === 'info' && (
            <form onSubmit={handleProceedToGateway} className="space-y-4">
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Customer & Delivery Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Arafat Mazumder"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Mobile Phone (BD)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="01915985602"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Email (Instant Download Link Sent Here)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="arafatmazumder304@gmail.com"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. PRODEV)"
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{appliedCoupon.message} (-{settings.currencySymbol}{appliedCoupon.discount})</span>
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>

              {/* Select Official Payment Gateway */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Payment Gateway
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {enabledGateways.filter(gw => gw.id !== 'Wallet').map(gw => (
                    <button
                      key={gw.id}
                      type="button"
                      onClick={() => setSelectedGateway(gw.id)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        selectedGateway === gw.id
                          ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {gw.id === 'SSLCommerz' ? (
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <Smartphone className="w-5 h-5 text-pink-400" />
                      )}
                      <span className="text-xs font-bold font-mono">{gw.id}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Instant Pay</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceed to {selectedGateway} Gateway</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

          {/* STEP 2: Gateway UI Interaction Simulation */}
          {step === 'gateway_action' && (
            <div className="space-y-5">
              {/* Brand Gateway Box */}
                  <div className={`p-4 rounded-2xl border ${
                    selectedGateway === 'bKash' 
                      ? 'bg-pink-950/40 border-pink-700/50' 
                      : selectedGateway === 'Nagad' 
                      ? 'bg-orange-950/40 border-orange-700/50' 
                      : selectedGateway === 'Rocket' 
                      ? 'bg-purple-950/40 border-purple-700/50' 
                      : 'bg-indigo-950/40 border-indigo-700/50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black tracking-tight text-white font-mono">
                          {selectedGateway} OFFICIAL CHECKOUT
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                          SANDBOX SECURED
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">
                        {settings.currencySymbol}{finalTotal.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Merchant: <strong className="text-white">YAM Script Provider</strong> (Acct: {gateways.find(g => g.id === selectedGateway)?.accountNumber || '01915985602'})
                    </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">
                      Your {selectedGateway} Wallet Number
                    </label>
                    <input
                      type="text"
                      value={gatewayPhone}
                      onChange={(e) => setGatewayPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Verification OTP</label>
                      <input
                        type="text"
                        value={gatewayOtp}
                        onChange={(e) => setGatewayOtp(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white text-center tracking-widest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Account PIN</label>
                      <input
                        type="password"
                        value={gatewayPin}
                        onChange={(e) => setGatewayPin(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white text-center tracking-widest focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="w-1/3 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleAuthorizePayment}
                  className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Complete Payment</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                🔒 Official Gateway Simulation: Never stores private PINs. Automated verification webhook dispatches upon click.
              </p>
            </div>
          )}

          {/* STEP 3: Automated Server Verification in progress */}
          {step === 'verifying' && (
            <div className="py-8 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <Loader2 className="w-14 h-14 text-blue-500 animate-spin" />
                <Lock className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Verifying Gateway Signature & Dispatching License...
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Validating payment transaction against {selectedGateway} API callback endpoint.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-xs mx-auto bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${verificationProgress}%` }}
                />
              </div>

              <div className="text-[11px] font-mono text-cyan-400">
                {verificationProgress < 40 && 'Querying gateway transaction ID...'}
                {verificationProgress >= 40 && verificationProgress < 80 && 'Generating commercial license key & signed token...'}
                {verificationProgress >= 80 && 'Provisioning instant download bundle...'}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
