import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, 
  Mail, 
  Facebook, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          Official Support & Developer Helpline
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
          Contact YAM Script Provider
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Have questions about custom scripts, mobile source codes, or enterprise licensing? Our core engineering team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Direct Channels */}
        <div className="space-y-4">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white">Direct Communication Channels</h3>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 hover:border-emerald-500/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-emerald-400 font-mono font-semibold uppercase block">Official WhatsApp Hotline</span>
                <span className="text-base font-bold text-white font-mono group-hover:underline">
                  {settings.whatsappNumber}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Instant chat, live demo queries & script support.</p>
              </div>
            </a>

            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 hover:border-blue-500/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-blue-400 font-mono font-semibold uppercase block">Official Email</span>
                <span className="text-sm font-bold text-white group-hover:underline truncate block">
                  {settings.contactEmail}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Enterprise contracts and commercial inquiries.</p>
              </div>
            </a>

            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 hover:border-indigo-500/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Facebook className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-indigo-400 font-mono font-semibold uppercase block">Official Facebook Page</span>
                <span className="text-sm font-bold text-white group-hover:underline flex items-center gap-1">
                  <span>Arafat Mazumder (Official)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Product launches, coupon giveaways, and updates.</p>
              </div>
            </a>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="p-8 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Send Us a Direct Message</h3>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanvir Rahman"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Your Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tanvir@company.com"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Message / Script Requirement</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you are looking for..."
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send Direct Message</span>
          </button>

          {sent && (
            <p className="text-xs text-emerald-400 font-medium text-center">
              Message dispatched! Our team will respond shortly.
            </p>
          )}
        </form>

      </div>
    </div>
  );
};

export const CategoriesPage: React.FC = () => {
  const { products, setCurrentView, setSelectedCategoryFilter } = useStore();

  const categories = [
    { title: 'Custom Website Scripts', desc: 'Full custom web applications with front and back office codebases.' },
    { title: 'Premium WordPress Themes', desc: 'High-speed, SEO-tuned Elementor & Gutenberg ready themes.' },
    { title: 'Premium WordPress Plugins', desc: 'Firewalls, payment gateways, and custom WordPress add-ons.' },
    { title: 'Android Applications', desc: 'Native Kotlin and Flutter Android source codes with APK releases.' },
    { title: 'iOS Applications', desc: 'Swift & Flutter iOS source projects configured for App Store deployment.' },
    { title: 'PHP Scripts', desc: 'Raw, Laravel, CodeIgniter backend engines and REST APIs.' },
    { title: 'SaaS Software', desc: 'Multi-tenant subscription CRM, invoicing, and agency portals.' },
    { title: 'E-commerce Scripts', desc: 'Multi-vendor marketplaces, single shops, and digital download carts.' },
    { title: 'Website Templates', desc: 'Next.js, React, Tailwind, and HTML5 responsive web templates.' },
    { title: 'Source Codes', desc: 'Algorithmic modules, utility scripts, and automation bots.' },
    { title: 'Other Digital Products', desc: 'Database dumps, design bundles, and deployment scripts.' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          Catalog Architecture
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Product Categories</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore our certified digital software solutions organized by technology and target ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => {
          const count = products.filter(p => p.category === cat.title).length;
          return (
            <div
              key={cat.title}
              onClick={() => {
                setSelectedCategoryFilter(cat.title);
                setCurrentView('products');
              }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {count} products
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Browse Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          Company & Vision
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">About YAM Script Provider</h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          YAM Script Provider was founded to eliminate the chaos of untrusted, buggy, and vulnerable digital scripts. We engineer, audit, and distribute high-grade software source codes, WordPress themes, and native mobile apps with an uncompromising focus on code cleanliness and automated delivery.
        </p>
      </div>

      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white">Our 4 Core Engineering Commitments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-white block font-sans text-sm">1. Zero AI Slop & Generic Stubs</strong>
            <p className="text-slate-400 leading-relaxed">Every script is constructed with genuine logic, working APIs, and production database migrations.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-white block font-sans text-sm">2. Automated Instant Delivery</strong>
            <p className="text-slate-400 leading-relaxed">Once payment clears via bKash, Nagad, Rocket, or SSLCommerz, your download bundle and license are created on the spot.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-white block font-sans text-sm">3. Security Hardening</strong>
            <p className="text-slate-400 leading-relaxed">All codebases pass rigorous checks for CSRF, SQL Injection, XSS, and unauthorized execution exploits.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-white block font-sans text-sm">4. Dedicated Developer Hotline</strong>
            <p className="text-slate-400 leading-relaxed">Direct WhatsApp assistance ({settings.whatsappNumber}) for installation, server setup, and queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PolicyPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-slate-300 leading-relaxed">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">Legal Agreement</span>
        <h1 className="text-3xl font-black text-white mt-1">
          {type === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Digital Product License'}
        </h1>
        <p className="text-xs text-slate-400 mt-1">Effective Date: November 2026</p>
      </div>

      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white">1. Software License Terms</h2>
        <p>
          All digital products, source codes, themes, plugins, and mobile packages purchased on YAM Script Provider are protected by international copyright laws. A Regular License grants non-exclusive, worldwide rights to deploy the software for one single commercial or personal client installation.
        </p>

        <h2 className="text-sm font-bold text-white">2. Automated Delivery & Download Restrictions</h2>
        <p>
          Digital downloads are dispatched instantly following verified payment callbacks from bKash, Nagad, Rocket, or SSLCommerz. Signed download links are bound to your user account and are subject to the product's configurable download quota to prevent unauthorized scraping and redistribution.
        </p>

        <h2 className="text-sm font-bold text-white">3. Refund Policy on Digital Goods</h2>
        <p>
          Due to the irrevocable nature of digital source codes, refunds are issued strictly in the event that a script has an irremediable defect confirmed by our technical team within 7 days of purchase.
        </p>

        <h2 className="text-sm font-bold text-white">4. Data Privacy & Payment Integrity</h2>
        <p>
          YAM Script Provider does not store private banking PINs or OTPs. All gateway verifications take place through authorized merchant API hooks. We protect user accounts using cryptographic password hashing and SSL/TLS transport layer security.
        </p>
      </div>
    </div>
  );
};
