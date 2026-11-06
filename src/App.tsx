import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { NoticeBoard } from './components/NoticeBoard';
import { HeroSlider } from './components/HeroSlider';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { MyOrdersPage } from './components/MyOrdersPage';
import { MyCodesPage } from './components/MyCodesPage';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { InstallAppModal } from './components/InstallAppModal';
import { BottomNavBar } from './components/BottomNavBar';
import { ContactPage, CategoriesPage, AboutPage, PolicyPage } from './components/Pages';
import { Footer } from './components/Footer';
import { Wrench, Phone, MessageCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    currentView, 
    settings, 
    currentUser, 
    switchRole, 
    isInstallModalOpen, 
    setIsInstallModalOpen 
  } = useStore();

  // Maintenance mode screen (if enabled and user is not admin)
  if (settings.maintenanceMode && currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6">
          <Wrench className="w-8 h-8 animate-spin" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">{settings.websiteName} Scheduled Maintenance</h1>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          We are deploying scheduled infrastructure and security upgrades. For urgent script delivery or support, contact our developer hotline.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp: {settings.whatsappNumber}</span>
          </a>
          <button
            type="button"
            onClick={() => switchRole('admin')}
            className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs rounded-xl hover:text-white"
          >
            Admin Bypass
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Notice Board (appears at the top of public site, disappears if disabled) */}
      <NoticeBoard />

      {/* Sticky Header with Logo on extreme left and Hamburger on extreme right */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <>
            <HeroSlider />
            <ProductGrid />
          </>
        )}

        {currentView === 'products' && (
          <div className="pt-4">
            <ProductGrid />
          </div>
        )}

        {currentView === 'categories' && <CategoriesPage />}

        {currentView === 'my_orders' && <MyOrdersPage />}

        {currentView === 'my_codes' && <MyCodesPage />}

        {currentView === 'customer_dashboard' && <CustomerDashboard />}

        {currentView === 'admin_dashboard' && <AdminDashboard />}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'privacy' && <PolicyPage type="privacy" />}

        {currentView === 'terms' && <PolicyPage type="terms" />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <ProductDetailsModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal />
      <InstallAppModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />

      {/* Floating Support & Bottom App Navigation Bar (from reference screenshot) */}
      <BottomNavBar />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
