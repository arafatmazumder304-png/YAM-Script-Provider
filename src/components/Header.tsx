import React, { useState, useEffect } from 'react';
import { useStore, ViewType } from '../context/StoreContext';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  Shield, 
  ShoppingBag, 
  LogOut, 
  ChevronRight,
  PackageCheck,
  Download,
  Phone,
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    settings, 
    currentUser, 
    logout, 
    switchRole, 
    currentView, 
    setCurrentView,
    cart, 
    setCheckoutItem,
    setIsAuthModalOpen,
    setSelectedCategoryFilter,
    orders,
    setIsInstallModalOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: ViewType, category?: string) => {
    if (category) {
      setSelectedCategoryFilter(category);
    }
    setCurrentView(view);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.length;

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30' 
            : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* EXTREME LEFT: Stylized Logo & Brand (Matching the Screenshot aesthetic) */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            {/* Custom Monogram Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 flex items-center justify-center font-black text-white text-lg tracking-wider shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200 border border-indigo-400/30">
              <span className="font-mono text-xl">Y</span>
            </div>
            
            {/* Brand Title */}
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-2xl tracking-tighter text-white uppercase flex items-center gap-1 font-sans">
                <span className="text-white">YAM</span>
                <span className="text-indigo-400">SCRIPTS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 font-mono uppercase font-semibold">
                {settings.logoSubtext || 'PREMIUM SOFTWARE MARKETPLACE'}
              </span>
            </div>
          </div>

          {/* EXTREME RIGHT CLUSTER: Wallet Button + User Avatar + Hamburger (Matching screenshot) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Quick Testing Role Switcher */}
            <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
              <button
                type="button"
                onClick={() => switchRole('customer')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  currentUser?.role === 'customer' 
                    ? 'bg-indigo-600 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => switchRole('admin')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  currentUser?.role === 'admin' 
                    ? 'bg-amber-600 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>


            {/* Install / Download App Button */}
            <button
              type="button"
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl shadow-md shadow-indigo-600/30 border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 select-none cursor-pointer"
              title="অ্যাপ ইনস্টল বা ডাউনলোড করুন"
            >
              <Download className="w-4 h-4 text-white animate-bounce" />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden">App</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2.5 text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-2xl transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-300" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* USER PROFILE AVATAR (Circular portrait like in the screenshot) */}
            <div 
              onClick={() => {
                if (currentUser) {
                  navigateTo('customer_dashboard');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="relative cursor-pointer select-none group"
              title={currentUser ? `${currentUser.name} (Click to open Account)` : 'Sign In'}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-white font-bold text-sm">
                  <img
                    src={currentUser?.avatarUrl || '/default_user_pfp.jpeg'}
                    alt={currentUser?.name || 'User Profile'}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default_user_pfp.jpeg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* THREE-LINE HAMBURGER MENU BUTTON (On extreme right) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-2.5 text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-2xl transition-all hover:border-slate-700 active:scale-95"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-6 h-6 stroke-[2.3]" />
            </button>

          </div>

        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div 
          className={`absolute top-0 right-0 w-full max-w-md h-full bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-base">
                Y
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{settings.websiteName}</h3>
                <p className="text-xs text-slate-400">Navigation & Account Hub</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Account Strip */}
          <div className="p-4 mx-4 mt-4 bg-slate-900/80 rounded-2xl border border-slate-800/80">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                    <img
                      src={currentUser.avatarUrl || '/default_user_pfp.jpeg'}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default_user_pfp.jpeg';
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">{currentUser.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                        currentUser.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        {currentUser.role}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{currentUser.email}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Guest Developer</p>
                  <p className="text-xs text-slate-400">Sign in to access your digital licenses</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            
            {/* Download App Prominent Banner */}
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                setIsInstallModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 mb-3 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-indigo-950/80 border border-indigo-500/40 text-white font-medium text-sm hover:border-indigo-400 transition-all shadow-lg shadow-indigo-600/10 group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white leading-tight">Install Mobile App</span>
                  <span className="text-[11px] text-indigo-300">অফিশিয়াল অ্যাপ ডাউনলোড করুন</span>
                </div>
              </div>
              <span className="text-[10px] bg-indigo-500/25 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full font-mono font-bold">
                INSTALL
              </span>
            </button>

            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Main Menu
            </div>

            <button
              onClick={() => navigateTo('home')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'home' ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <button
              onClick={() => navigateTo('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'products' ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>All Products</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <button
              onClick={() => navigateTo('categories')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'categories' ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>Categories</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <div className="pt-4 pb-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
                Customer Services
              </div>
            </div>

            <button
              onClick={() => navigateTo('customer_dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'customer_dashboard' ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-slate-400" />
                My Account
              </span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <button
              onClick={() => navigateTo('my_orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'my_orders' ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-slate-400" />
                My Orders
              </span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <button
              onClick={() => navigateTo('my_codes')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'my_codes' ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-slate-400" />
                My Codes & Downloads
              </span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin_dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors mt-2 ${
                  currentView === 'admin_dashboard' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'text-amber-400 hover:bg-amber-500/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Admin Dashboard
                </span>
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded">Control</span>
              </button>
            )}

            <div className="pt-4 pb-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
                Support & Legal
              </div>
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                Contact Us
              </span>
              <span className="text-xs text-slate-500 font-mono">01915985602</span>
            </button>

            <button
              onClick={() => navigateTo('about')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <button
              onClick={() => navigateTo('privacy')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <span>Privacy Policy</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>

            <button
              onClick={() => navigateTo('terms')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <span>Terms & Conditions</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>
          </div>

          {/* Drawer Footer with Official WhatsApp & Email */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 text-xs text-slate-400 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span>WhatsApp Support:</span>
              <a 
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-emerald-400 font-mono hover:underline font-bold"
              >
                {settings.whatsappNumber}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Official Email:</span>
              <a 
                href={`mailto:${settings.contactEmail}`}
                className="text-indigo-400 truncate max-w-[200px] hover:underline"
              >
                {settings.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Quick Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            onClick={() => setIsCartOpen(false)} 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl p-6 flex flex-col z-10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Shopping Cart ({cart.length})
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-600 mb-3 stroke-[1.5]" />
                <p className="text-base font-medium text-slate-300">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1">Browse our verified scripts & digital products to get started.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                >
                  Explore Scripts
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="overflow-y-auto py-4 space-y-3">
                  {cart.map(item => (
                    <div 
                      key={item.product.id}
                      className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3"
                    >
                      <img 
                        src={item.product.thumbnailUrl} 
                        alt={item.product.name}
                        className="w-14 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-slate-400">{item.product.category}</p>
                        <p className="text-xs font-mono font-bold text-indigo-400 mt-0.5">
                          {settings.currencySymbol}{item.product.discountedPrice.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setCheckoutItem(item.product);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shrink-0"
                      >
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Subtotal:</span>
                    <span className="font-mono font-bold text-white text-base">
                      {settings.currencySymbol}
                      {cart.reduce((sum, item) => sum + item.product.discountedPrice, 0).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (cart.length > 0) {
                        setIsCartOpen(false);
                        setCheckoutItem(cart[0].product);
                      }
                    }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all"
                  >
                    Proceed to Instant Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
