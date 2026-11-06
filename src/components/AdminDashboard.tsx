import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Product, 
  ProductCategory, 
  PaymentMethod, 
  OrderStatus, 
  Coupon, 
  Notice, 
  SliderItem,
  WebsiteSettings
} from '../types';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  Tag, 
  Sliders, 
  Bell, 
  LifeBuoy, 
  Settings, 
  Shield, 
  History, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search, 
  ExternalLink,
  DollarSign,
  TrendingUp,
  FileText,
  Save,
  Palette
} from 'lucide-react';

type AdminSection = 
  | 'overview' 
  | 'products' 
  | 'categories' 
  | 'orders' 
  | 'customers' 
  | 'gateways' 
  | 'coupons' 
  | 'sliders' 
  | 'notices' 
  | 'tickets' 
  | 'settings' 
  | 'logs';

export const AdminDashboard: React.FC = () => {
  const { 
    settings, 
    updateSettings,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    togglePublishProduct,
    orders, 
    updateOrderStatus,
    gateways, 
    updateGateway,
    coupons, 
    addCoupon, 
    updateCoupon, 
    deleteCoupon,
    notices, 
    addNotice, 
    updateNotice, 
    deleteNotice,
    sliders, 
    addSlider, 
    updateSlider, 
    deleteSlider,
    tickets, 
    replyTicket, 
    updateTicketStatus,
    activityLogs,
    purchasedProducts
  } = useStore();

  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  // Modals & form state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New/Edit product form state
  const [prodForm, setProdForm] = useState<Partial<Product>>({
    name: '',
    category: 'Custom Website Scripts',
    shortDescription: '',
    detailedDescription: '',
    regularPrice: 3500,
    discountedPrice: 2500,
    version: '1.0.0',
    compatibility: 'PHP 8.2+, MySQL 8.0',
    requirements: ['PHP >= 8.2', 'MySQL >= 8.0'],
    features: ['Clean MVC architecture', 'Responsive frontend'],
    installationInstructions: 'Upload files and configure database in .env',
    demoUrl: '',
    thumbnailUrl: '/src/assets/images/hero_software_showcase_1793805850840.jpg',
    featured: true,
    published: true,
    downloadLimit: 5,
    accessDurationDays: 365,
    licenseType: 'Regular License',
  });

  // Notice form state
  const [newNoticeText, setNewNoticeText] = useState('');
  const [newNoticeBg, setNewNoticeBg] = useState('#0f172a');
  const [newNoticeColor, setNewNoticeColor] = useState('#38bdf8');

  // Slider form state
  const [newSliderTitle, setNewSliderTitle] = useState('');
  const [newSliderSub, setNewSliderSub] = useState('');
  const [newSliderUrl, setNewSliderUrl] = useState('#products');
  const [newSliderImg, setNewSliderImg] = useState('/src/assets/images/hero_software_showcase_1793805850840.jpg');

  // Coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponVal, setNewCouponVal] = useState(20);
  const [newCouponMin, setNewCouponMin] = useState(1500);

  // Settings local state
  const [siteSettingsForm, setSiteSettingsForm] = useState<WebsiteSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Ticket reply local state
  const [adminTicketReply, setAdminTicketReply] = useState<{ [key: string]: string }>({});

  // Summary stats
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const totalProductsCount = products.length;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name) return;

    if (editingProductId) {
      updateProduct(editingProductId, prodForm);
    } else {
      addProduct({
        name: prodForm.name || 'New Product Script',
        slug: (prodForm.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: prodForm.category as ProductCategory || 'Custom Website Scripts',
        shortDescription: prodForm.shortDescription || 'Professional software solution.',
        detailedDescription: prodForm.detailedDescription || 'Full commercial package.',
        regularPrice: Number(prodForm.regularPrice) || 3000,
        discountedPrice: Number(prodForm.discountedPrice) || 2000,
        featured: Boolean(prodForm.featured),
        published: Boolean(prodForm.published),
        bestSeller: false,
        version: prodForm.version || '1.0.0',
        compatibility: prodForm.compatibility || 'PHP 8.2+, MySQL 8',
        requirements: prodForm.requirements || ['PHP 8.2+'],
        features: prodForm.features || ['Complete source code'],
        installationInstructions: prodForm.installationInstructions || '1. Extract files',
        demoUrl: prodForm.demoUrl || '',
        thumbnailUrl: prodForm.thumbnailUrl || '/src/assets/images/hero_software_showcase_1793805850840.jpg',
        galleryImages: [prodForm.thumbnailUrl || '/src/assets/images/hero_software_showcase_1793805850840.jpg'],
        rating: 5.0,
        reviewsCount: 1,
        salesCount: 0,
        files: [
          {
            fileName: `${(prodForm.name || 'script').toLowerCase().replace(/\s+/g, '-')}-v${prodForm.version || '1.0'}.zip`,
            fileSize: '32.4 MB',
            fileType: 'zip',
            version: prodForm.version || '1.0.0',
          }
        ],
        downloadLimit: Number(prodForm.downloadLimit) || 5,
        accessDurationDays: Number(prodForm.accessDurationDays) || 365,
        licenseType: prodForm.licenseType || 'Regular License',
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    }

    setIsProductModalOpen(false);
    setEditingProductId(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(siteSettingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 rounded-3xl border border-slate-800 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Master Administration Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">YAM Script Provider Control Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage products, automated delivery keys, payment methods, and live website branding.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setEditingProductId(null);
              setProdForm({
                name: '',
                category: 'Custom Website Scripts',
                shortDescription: '',
                detailedDescription: '',
                regularPrice: 4000,
                discountedPrice: 2800,
                version: '1.0.0',
                compatibility: 'PHP 8.2+, MySQL 8.0',
                requirements: ['PHP >= 8.2', 'MySQL >= 8.0'],
                features: ['Automated delivery ready', 'Clean architecture'],
                installationInstructions: '1. Extract zip\n2. Configure .env\n3. Run migrations',
                thumbnailUrl: '/src/assets/images/hero_software_showcase_1793805850840.jpg',
                featured: true,
                published: true,
                downloadLimit: 5,
                accessDurationDays: 365,
                licenseType: 'Regular License',
              });
              setIsProductModalOpen(true);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Active Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-slate-900/90 rounded-2xl border border-slate-800 p-3 space-y-1">
          {(
            [
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Product Catalog', icon: Package, count: products.length },
              { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingCart, count: orders.length },
              { id: 'gateways', label: 'Payment Gateways', icon: CreditCard },
              { id: 'settings', label: 'Website Settings', icon: Settings },
              { id: 'notices', label: 'Dynamic Notices', icon: Bell, count: notices.length },
              { id: 'sliders', label: 'Hero Sliders', icon: Sliders, count: sliders.length },
              { id: 'coupons', label: 'Coupons & Promo', icon: Tag, count: coupons.length },
              { id: 'tickets', label: 'Support Inquiries', icon: LifeBuoy, count: tickets.length },
              { id: 'logs', label: 'Audit Activity Logs', icon: History },
            ] as { id: AdminSection; label: string; icon: any; count?: number }[]
          ).map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9 bg-slate-900/60 rounded-3xl border border-slate-800 p-6 sm:p-8 min-h-[600px]">
          
          {/* SECTION: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              
              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Total Revenue</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {settings.currencySymbol}{totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 mt-1 block">100% Verified Delivery</span>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Total Orders</span>
                    <ShoppingCart className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {totalOrdersCount}
                  </div>
                  <span className="text-[10px] text-blue-400 mt-1 block">{completedOrdersCount} Fulfilled</span>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Live Products</span>
                    <Package className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {totalProductsCount}
                  </div>
                  <span className="text-[10px] text-cyan-400 mt-1 block">In 11 Categories</span>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Support Tickets</span>
                    <LifeBuoy className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {tickets.length}
                  </div>
                  <span className="text-[10px] text-amber-400 mt-1 block">Active Inquiries</span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Customer Transactions & Verification Status
                  </h3>
                  <button
                    onClick={() => setActiveSection('orders')}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    View All Orders
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-3">Order #</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Gateway</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-slate-800/40">
                          <td className="p-3 font-mono font-bold text-cyan-400">{o.orderNumber}</td>
                          <td className="p-3 text-slate-200">{o.customerName}</td>
                          <td className="p-3 font-mono text-slate-400">{o.paymentMethod}</td>
                          <td className="p-3 font-mono font-bold text-white">
                            {settings.currencySymbol}{o.totalAmount.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase bg-emerald-500/20 text-emerald-400 font-semibold">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gateway Quick Status */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Payment Gateway Operational Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {gateways.map(gw => (
                    <div key={gw.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs font-mono">{gw.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          gw.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {gw.enabled ? 'ONLINE' : 'DISABLED'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">Mode: {gw.isSandbox ? 'Sandbox' : 'Production'}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SECTION: PRODUCTS */}
          {activeSection === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white">Product Catalog Management</h2>
                  <p className="text-xs text-slate-400">Add, edit pricing, update version numbers, and publish/unpublish items.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by name or category..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {products
                  .filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()) || p.category.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map(p => (
                    <div 
                      key={p.id}
                      className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={p.thumbnailUrl} alt={p.name} className="w-16 h-12 rounded-xl object-cover bg-slate-950 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{p.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <span className="text-cyan-400">{p.category}</span>
                            <span>·</span>
                            <span className="font-mono">v{p.version}</span>
                            <span>·</span>
                            <span className="font-mono font-bold text-white">
                              {settings.currencySymbol}{p.discountedPrice}
                              {p.regularPrice > p.discountedPrice && (
                                <span className="line-through text-slate-500 font-normal ml-1">
                                  {settings.currencySymbol}{p.regularPrice}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Publish toggle */}
                        <button
                          type="button"
                          onClick={() => togglePublishProduct(p.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            p.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {p.published ? 'Published' : 'Draft'}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProductId(p.id);
                            setProdForm({ ...p });
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION: ORDERS & FULFILLMENT */}
          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">All Orders & Automatic Fulfilment Records</h2>
                <p className="text-xs text-slate-400">Real-time audit log of purchases, transaction hashes, and customer details.</p>
              </div>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-cyan-400">{order.orderNumber}</span>
                          <span className="text-xs font-mono text-slate-400">TRX: {order.transactionId}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Customer: <strong className="text-white">{order.customerName}</strong> ({order.customerEmail} · {order.customerPhone})
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e: any) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none"
                        >
                          <option value="completed">Completed</option>
                          <option value="processing">Processing</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="refunded">Refunded</option>
                        </select>
                        <span className="font-mono font-black text-white text-base">
                          {settings.currencySymbol}{order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Purchased Items:</span>
                      <ul className="mt-1 space-y-0.5">
                        {order.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between text-slate-300 pl-2">
                            <span>• {it.productName} (v{it.version})</span>
                            <span className="font-mono text-slate-400">{settings.currencySymbol}{it.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Gateway: <strong className="text-white">{order.paymentMethod}</strong></span>
                      <span>Verified: {new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: PAYMENT GATEWAY CONFIGURATION */}
          {activeSection === 'gateways' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Bangladesh Payment Gateways Settings</h2>
                <p className="text-xs text-slate-400">Configure bKash, Nagad, Rocket, and SSLCommerz API credentials, merchant numbers, and sandbox/live status.</p>
              </div>

              <div className="space-y-4">
                {gateways.map(gw => (
                  <div key={gw.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-white font-mono">{gw.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          gw.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {gw.enabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateGateway(gw.id, { isSandbox: !gw.isSandbox })}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold ${
                            gw.isSandbox ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {gw.isSandbox ? 'Sandbox Mode' : 'Live Production'}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateGateway(gw.id, { enabled: !gw.enabled })}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            gw.enabled ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {gw.enabled ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-1">Merchant / Account Number</label>
                        <input
                          type="text"
                          value={gw.accountNumber || ''}
                          onChange={(e) => updateGateway(gw.id, { accountNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400 block mb-1">Merchant ID / App ID</label>
                        <input
                          type="text"
                          value={gw.merchantId || ''}
                          onChange={(e) => updateGateway(gw.id, { merchantId: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Customer Instructions</label>
                      <input
                        type="text"
                        value={gw.instructions || ''}
                        onChange={(e) => updateGateway(gw.id, { instructions: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: WEBSITE SETTINGS */}
          {activeSection === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>Website Branding & Visual Identity</span>
                  </h2>
                  <p className="text-xs text-slate-400">Changes reflect instantly across the entire marketplace.</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300">
                  Settings saved successfully and theme synchronized!
                </div>
              )}

              {/* Branding and Names */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">General Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Website Name</label>
                    <input
                      type="text"
                      value={siteSettingsForm.websiteName}
                      onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, websiteName: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Logo Text</label>
                    <input
                      type="text"
                      value={siteSettingsForm.logoText}
                      onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, logoText: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Website Description (SEO)</label>
                  <input
                    type="text"
                    value={siteSettingsForm.websiteDescription}
                    onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, websiteDescription: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Theme Colors */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Color Customization</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteSettingsForm.primaryColor}
                        onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-slate-800"
                      />
                      <input
                        type="text"
                        value={siteSettingsForm.primaryColor}
                        onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Accent Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteSettingsForm.accentColor}
                        onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-slate-800"
                      />
                      <input
                        type="text"
                        value={siteSettingsForm.accentColor}
                        onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Secondary Canvas</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteSettingsForm.secondaryColor}
                        onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-slate-800"
                      />
                      <input
                        type="text"
                        value={siteSettingsForm.secondaryColor}
                        onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Contact Info (WhatsApp, Email, Facebook) */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Official Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">WhatsApp Hotline</label>
                    <input
                      type="text"
                      value={siteSettingsForm.whatsappNumber}
                      onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Official Contact Email</label>
                    <input
                      type="email"
                      value={siteSettingsForm.contactEmail}
                      onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Official Facebook Page URL</label>
                    <input
                      type="text"
                      value={siteSettingsForm.facebookUrl}
                      onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, facebookUrl: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Notice Board & Slider Controls */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Homepage Section Visibility</h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={siteSettingsForm.noticeBoardEnabled}
                      onChange={(e) => setSiteSettingsForm(prev => ({ ...prev, noticeBoardEnabled: e.target.checked }))}
                      className="rounded accent-blue-600 w-4 h-4 cursor-pointer"
                    />
                    <span>Notice Board Enabled on Top of Homepage</span>
                  </label>
                </div>
              </div>

            </form>
          )}

          {/* SECTION: NOTICES */}
          {activeSection === 'notices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Dynamic Notice Board Management</h2>
                  <p className="text-xs text-slate-400">Add unlimited top alert banners, set custom colors, or toggle off.</p>
                </div>
              </div>

              {/* Create Notice */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase">Add New Public Notice</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newNoticeText}
                    onChange={(e) => setNewNoticeText(e.target.value)}
                    placeholder="Enter urgent promotional or security notice text..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newNoticeBg}
                      onChange={(e) => setNewNoticeBg(e.target.value)}
                      title="Background Color"
                      className="w-9 h-9 rounded-lg bg-transparent cursor-pointer"
                    />
                    <input
                      type="color"
                      value={newNoticeColor}
                      onChange={(e) => setNewNoticeColor(e.target.value)}
                      title="Text Color"
                      className="w-9 h-9 rounded-lg bg-transparent cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newNoticeText) return;
                        addNotice({
                          text: newNoticeText,
                          backgroundColor: newNoticeBg,
                          textColor: newNoticeColor,
                          isActive: true,
                          order: notices.length + 1,
                        });
                        setNewNoticeText('');
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl"
                    >
                      Publish Notice
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing notices */}
              <div className="space-y-2">
                {notices.map(n => (
                  <div key={n.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: n.backgroundColor }} />
                      <p className="text-xs text-white truncate" style={{ color: n.textColor }}>{n.text}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateNotice(n.id, { isActive: !n.isActive })}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                          n.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {n.isActive ? 'Active' : 'Disabled'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteNotice(n.id)}
                        className="p-1 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SLIDERS */}
          {activeSection === 'sliders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Homepage Animated Slider Manager</h2>
                  <p className="text-xs text-slate-400">Configure autoplay speed, destinations, titles, and slider images.</p>
                </div>
              </div>

              {/* Create Slide */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase">Add New Hero Slide</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newSliderTitle}
                    onChange={(e) => setNewSliderTitle(e.target.value)}
                    placeholder="Slide headline title..."
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={newSliderSub}
                    onChange={(e) => setNewSliderSub(e.target.value)}
                    placeholder="Slide subtitle description..."
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newSliderUrl}
                    onChange={(e) => setNewSliderUrl(e.target.value)}
                    placeholder="Destination URL (e.g. #products or https://...)"
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={newSliderImg}
                    onChange={(e) => setNewSliderImg(e.target.value)}
                    placeholder="Slide Image Path / URL"
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newSliderTitle) return;
                    addSlider({
                      title: newSliderTitle,
                      subtitle: newSliderSub,
                      destinationUrl: newSliderUrl,
                      imageUrl: newSliderImg,
                      buttonText: 'View Package',
                      isActive: true,
                      order: sliders.length + 1,
                    });
                    setNewSliderTitle('');
                    setNewSliderSub('');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl"
                >
                  Add Slide to Deck
                </button>
              </div>

              {/* Existing sliders */}
              <div className="space-y-3">
                {sliders.map(s => (
                  <div key={s.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <img src={s.imageUrl} alt={s.title} className="w-16 h-12 rounded-lg object-cover bg-slate-950 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{s.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{s.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateSlider(s.id, { isActive: !s.isActive })}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                          s.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {s.isActive ? 'Active' : 'Disabled'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSlider(s.id)}
                        className="p-1 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: COUPONS */}
          {activeSection === 'coupons' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Promotional Discount Coupons</h2>
                <p className="text-xs text-slate-400">Configure percentage and fixed price promotional vouchers.</p>
              </div>

              {/* Add Coupon */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase">Generate Discount Code</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="Code (e.g. FLASH25)"
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white uppercase font-mono"
                  />
                  <select
                    value={newCouponType}
                    onChange={(e: any) => setNewCouponType(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed BDT (৳)</option>
                  </select>
                  <input
                    type="number"
                    value={newCouponVal}
                    onChange={(e) => setNewCouponVal(Number(e.target.value))}
                    placeholder="Value"
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    placeholder="Min Spend"
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newCouponCode) return;
                    addCoupon({
                      code: newCouponCode.toUpperCase(),
                      discountType: newCouponType,
                      discountValue: newCouponVal,
                      minSpend: newCouponMin,
                      maxUses: 100,
                      usedCount: 0,
                      expiresAt: '2026-12-31',
                      isActive: true,
                    });
                    setNewCouponCode('');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl"
                >
                  Create Promotional Code
                </button>
              </div>

              {/* Existing Coupons */}
              <div className="space-y-2">
                {coupons.map(c => (
                  <div key={c.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-300 text-sm">{c.code}</span>
                        <span className="text-xs text-slate-300">
                          {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `${settings.currencySymbol}${c.discountValue} OFF`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Min Spend: {settings.currencySymbol}{c.minSpend} · Used {c.usedCount} times</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCoupon(c.id, { isActive: !c.isActive })}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                          c.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCoupon(c.id)}
                        className="p-1 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SUPPORT TICKETS */}
          {activeSection === 'tickets' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Customer Support Desk</h2>
                <p className="text-xs text-slate-400">Reply to technical queries and manage status resolution.</p>
              </div>

              <div className="space-y-4">
                {tickets.map(t => (
                  <div key={t.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{t.subject}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{t.ticketNumber}</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Customer: <strong className="text-white">{t.userName}</strong> ({t.userEmail}) · Dept: {t.department}
                        </p>
                      </div>

                      <select
                        value={t.status}
                        onChange={(e: any) => updateTicketStatus(t.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="answered">Answered</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {t.messages.map(m => (
                        <div 
                          key={m.id} 
                          className={`p-2.5 rounded-xl text-xs ${
                            m.sender === 'support' ? 'bg-blue-950/40 border border-blue-900/50' : 'bg-slate-950 border border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                            <strong className={m.sender === 'support' ? 'text-blue-400' : 'text-slate-300'}>{m.senderName}</strong>
                            <span>{new Date(m.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-slate-300">{m.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-800">
                      <input
                        type="text"
                        value={adminTicketReply[t.id] || ''}
                        onChange={(e) => setAdminTicketReply(prev => ({ ...prev, [t.id]: e.target.value }))}
                        placeholder="Type official staff reply..."
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const reply = adminTicketReply[t.id];
                          if (!reply) return;
                          replyTicket(t.id, reply);
                          setAdminTicketReply(prev => ({ ...prev, [t.id]: '' }));
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl"
                      >
                        Send Staff Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: AUDIT ACTIVITY LOGS */}
          {activeSection === 'logs' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">System & Administrative Audit Logs</h2>
                <p className="text-xs text-slate-400">Cryptographically immutable activity history for cybersecurity and accountability.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Action</th>
                      <th className="p-3">Details</th>
                      <th className="p-3">Actor</th>
                      <th className="p-3">IP Address</th>
                      <th className="p-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50 font-mono text-xs">
                    {activityLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-cyan-400 font-sans">{log.action}</td>
                        <td className="p-3 text-slate-300 font-sans">{log.details}</td>
                        <td className="p-3 text-amber-300">{log.adminName}</td>
                        <td className="p-3 text-slate-400">{log.ipAddress}</td>
                        <td className="p-3 text-slate-500">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* PRODUCT CREATE / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div onClick={() => setIsProductModalOpen(false)} className="fixed inset-0 bg-black/85 backdrop-blur-md" />
          <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <h3 className="font-bold text-white text-base">
                {editingProductId ? 'Edit Product Details' : 'Create New Digital Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. NextGen Multi-Vendor Marketplace"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Product Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e: any) => setProdForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Custom Website Scripts">Custom Website Scripts</option>
                    <option value="Premium WordPress Themes">Premium WordPress Themes</option>
                    <option value="Premium WordPress Plugins">Premium WordPress Plugins</option>
                    <option value="Android Applications">Android Applications</option>
                    <option value="iOS Applications">iOS Applications</option>
                    <option value="PHP Scripts">PHP Scripts</option>
                    <option value="SaaS Software">SaaS Software</option>
                    <option value="E-commerce Scripts">E-commerce Scripts</option>
                    <option value="Website Templates">Website Templates</option>
                    <option value="Source Codes">Source Codes</option>
                    <option value="Other Digital Products">Other Digital Products</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Regular Price (৳)</label>
                  <input
                    type="number"
                    value={prodForm.regularPrice}
                    onChange={(e) => setProdForm(prev => ({ ...prev, regularPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Discounted Price (৳)</label>
                  <input
                    type="number"
                    value={prodForm.discountedPrice}
                    onChange={(e) => setProdForm(prev => ({ ...prev, discountedPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Version</label>
                  <input
                    type="text"
                    value={prodForm.version}
                    onChange={(e) => setProdForm(prev => ({ ...prev, version: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Download Limit</label>
                  <input
                    type="number"
                    value={prodForm.downloadLimit}
                    onChange={(e) => setProdForm(prev => ({ ...prev, downloadLimit: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Short Description</label>
                <input
                  type="text"
                  value={prodForm.shortDescription}
                  onChange={(e) => setProdForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Detailed Technical Documentation</label>
                <textarea
                  rows={4}
                  value={prodForm.detailedDescription}
                  onChange={(e) => setProdForm(prev => ({ ...prev, detailedDescription: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Thumbnail Image URL / Asset</label>
                  <input
                    type="text"
                    value={prodForm.thumbnailUrl}
                    onChange={(e) => setProdForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Live Demo Preview URL</label>
                  <input
                    type="text"
                    value={prodForm.demoUrl}
                    onChange={(e) => setProdForm(prev => ({ ...prev, demoUrl: e.target.value }))}
                    placeholder="https://demo.example.com"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={prodForm.featured}
                    onChange={(e) => setProdForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded accent-blue-600"
                  />
                  <span>Mark as Featured</span>
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={prodForm.published}
                    onChange={(e) => setProdForm(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded accent-blue-600"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  {editingProductId ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
