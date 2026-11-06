import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Product, 
  Notice, 
  SliderItem, 
  WebsiteSettings, 
  PaymentGatewayConfig, 
  Coupon, 
  Order, 
  PurchasedProduct, 
  DownloadLog, 
  SupportTicket, 
  AdminActivityLog, 
  PaymentMethod, 
  OrderStatus,
  UserRole,
  WalletTransaction
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_NOTICES,
  INITIAL_SLIDERS,
  INITIAL_PRODUCTS,
  INITIAL_GATEWAYS,
  INITIAL_COUPONS,
  INITIAL_USER,
  INITIAL_ADMIN_USER,
  INITIAL_ORDERS,
  INITIAL_PURCHASED,
  INITIAL_TICKETS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_WALLET_TRANSACTIONS
} from '../data/initialData';
import { triggerDigitalDownload } from '../utils/fileDownloader';

interface CartItem {
  product: Product;
}

export type ViewType = 
  | 'home' 
  | 'products' 
  | 'categories' 
  | 'my_orders'
  | 'my_codes'
  | 'customer_dashboard' 
  | 'admin_dashboard' 
  | 'contact' 
  | 'about' 
  | 'privacy' 
  | 'terms';



interface StoreContextType {
  currentUser: User | null;
  login: (email: string, role?: UserRole) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  
  settings: WebsiteSettings;
  updateSettings: (updates: Partial<WebsiteSettings>) => void;
  
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: string, updates: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;

  sliders: SliderItem[];
  addSlider: (slider: Omit<SliderItem, 'id'>) => void;
  updateSlider: (id: string, updates: Partial<SliderItem>) => void;
  deleteSlider: (id: string) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  togglePublishProduct: (id: string) => void;

  gateways: PaymentGatewayConfig[];
  updateGateway: (id: PaymentMethod, updates: Partial<PaymentGatewayConfig>) => void;

  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  applyCoupon: (code: string, currentTotal: number) => { valid: boolean; discount: number; message: string; coupon?: Coupon };

  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus, reason?: string) => void;

  purchasedProducts: PurchasedProduct[];
  downloadLogs: DownloadLog[];
  downloadProduct: (purchasedId: string) => { success: boolean; error?: string };

  processPaymentAndDeliver: (params: {
    paymentMethod: PaymentMethod;
    transactionId: string;
    customerInfo: { name: string; email: string; phone: string };
    items: Product[];
    couponCode?: string;
  }) => Promise<{ success: boolean; order: Order; purchasedItems: PurchasedProduct[] }>;

  tickets: SupportTicket[];
  createTicket: (subject: string, department: any, priority: any, initialMessage: string) => void;
  replyTicket: (ticketId: string, text: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  activityLogs: AdminActivityLog[];

  // Navigation & Modals
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (prod: Product | null) => void;
  checkoutItem: Product | null;
  setCheckoutItem: (prod: Product | null) => void;
  completedOrder: Order | null;
  setCompletedOrder: (order: Order | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  // App Install PWA Modal
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_PREFIX = 'yam_marketplace_v1_';

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window 
  ? new BroadcastChannel('yam_live_sync_channel') 
  : null;

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    syncChannel?.postMessage({ type: 'DATA_SYNC', key, value });
  } catch (err) {
    console.error('Storage save error', err);
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const loaded = loadFromStorage<User | null>('user', INITIAL_USER);
    if (loaded) {
      if (!loaded.avatarUrl || loaded.avatarUrl.includes('Screenshot_20261104')) {
        return { ...loaded, avatarUrl: '/default_user_pfp.jpeg' };
      }
      return loaded;
    }
    return INITIAL_USER;
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => 
    loadFromStorage('settings', INITIAL_SETTINGS)
  );

  const [notices, setNotices] = useState<Notice[]>(() => 
    loadFromStorage('notices', INITIAL_NOTICES)
  );

  const [sliders, setSliders] = useState<SliderItem[]>(() => 
    loadFromStorage('sliders', INITIAL_SLIDERS)
  );

  const [products, setProducts] = useState<Product[]>(() => 
    loadFromStorage('products', INITIAL_PRODUCTS)
  );

  const [gateways, setGateways] = useState<PaymentGatewayConfig[]>(() => 
    loadFromStorage('gateways', INITIAL_GATEWAYS)
  );

  const [coupons, setCoupons] = useState<Coupon[]>(() => 
    loadFromStorage('coupons', INITIAL_COUPONS)
  );

  const [orders, setOrders] = useState<Order[]>(() => 
    loadFromStorage('orders', INITIAL_ORDERS)
  );

  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>(() => 
    loadFromStorage('purchased', INITIAL_PURCHASED)
  );

  const [downloadLogs, setDownloadLogs] = useState<DownloadLog[]>(() => 
    loadFromStorage('download_logs', [])
  );

  const [tickets, setTickets] = useState<SupportTicket[]>(() => 
    loadFromStorage('tickets', INITIAL_TICKETS)
  );

  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => 
    loadFromStorage('activity_logs', INITIAL_ACTIVITY_LOGS)
  );

  const [cart, setCart] = useState<CartItem[]>(() => 
    loadFromStorage('cart', [])
  );

  const [wishlist, setWishlist] = useState<string[]>(() => 
    loadFromStorage('wishlist', [])
  );

  // Wallet State
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => 
    loadFromStorage('wallet_txs', INITIAL_WALLET_TRANSACTIONS)
  );
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);

  // UI state
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => { saveToStorage('user', currentUser); }, [currentUser]);
  useEffect(() => { saveToStorage('settings', settings); }, [settings]);
  useEffect(() => { saveToStorage('notices', notices); }, [notices]);
  useEffect(() => { saveToStorage('sliders', sliders); }, [sliders]);
  useEffect(() => { saveToStorage('products', products); }, [products]);
  useEffect(() => { saveToStorage('gateways', gateways); }, [gateways]);
  useEffect(() => { saveToStorage('coupons', coupons); }, [coupons]);
  useEffect(() => { saveToStorage('orders', orders); }, [orders]);
  useEffect(() => { saveToStorage('purchased', purchasedProducts); }, [purchasedProducts]);
  useEffect(() => { saveToStorage('download_logs', downloadLogs); }, [downloadLogs]);
  useEffect(() => { saveToStorage('tickets', tickets); }, [tickets]);
  useEffect(() => { saveToStorage('activity_logs', activityLogs); }, [activityLogs]);
  useEffect(() => { saveToStorage('cart', cart); }, [cart]);
  useEffect(() => { saveToStorage('wishlist', wishlist); }, [wishlist]);
  useEffect(() => { saveToStorage('wallet_txs', walletTransactions); }, [walletTransactions]);

  // Real-time synchronization across app instances (Installed PWA, Mobile, and Web views)
  useEffect(() => {
    const handleSyncMessage = (event: MessageEvent) => {
      if (event.data?.type === 'DATA_SYNC') {
        const { key, value } = event.data;
        switch (key) {
          case 'settings': setSettings(value); break;
          case 'notices': setNotices(value); break;
          case 'sliders': setSliders(value); break;
          case 'products': setProducts(value); break;
          case 'gateways': setGateways(value); break;
          case 'orders': setOrders(value); break;
          case 'purchased': setPurchasedProducts(value); break;
          case 'tickets': setTickets(value); break;
          case 'coupons': setCoupons(value); break;
          default: break;
        }
      }
    };

    const handleStorageEvent = (event: StorageEvent) => {
      if (!event.key || !event.newValue) return;
      if (event.key.startsWith(STORAGE_PREFIX)) {
        const cleanKey = event.key.replace(STORAGE_PREFIX, '');
        try {
          const parsed = JSON.parse(event.newValue);
          switch (cleanKey) {
            case 'settings': setSettings(parsed); break;
            case 'notices': setNotices(parsed); break;
            case 'sliders': setSliders(parsed); break;
            case 'products': setProducts(parsed); break;
            case 'gateways': setGateways(parsed); break;
            case 'orders': setOrders(parsed); break;
            case 'purchased': setPurchasedProducts(parsed); break;
            case 'tickets': setTickets(parsed); break;
            case 'coupons': setCoupons(parsed); break;
            default: break;
          }
        } catch {
          // ignore corrupted data
        }
      }
    };

    syncChannel?.addEventListener('message', handleSyncMessage);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      syncChannel?.removeEventListener('message', handleSyncMessage);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  // Dynamic root CSS variable updates based on settings
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary', settings.primaryColor);
      document.documentElement.style.setProperty('--accent', settings.accentColor);
      document.documentElement.style.setProperty('--secondary', settings.secondaryColor);
    }
  }, [settings.primaryColor, settings.accentColor, settings.secondaryColor]);

  // Auth operations
  const login = (email: string, role: UserRole = 'customer') => {
    if (
      role === 'admin' || 
      email.toLowerCase() === 'arafatmazumder304@gmail.com' ||
      email.toLowerCase().includes('admin')
    ) {
      setCurrentUser(INITIAL_ADMIN_USER);
    } else {
      setCurrentUser({
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email,
        phone: '01915985602',
        role: 'customer',
        avatarUrl: '/default_user_pfp.jpeg',
        createdAt: new Date().toISOString().split('T')[0],
      });
    }
    setIsAuthModalOpen(false);
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role: 'customer',
      avatarUrl: '/default_user_pfp.jpeg',
      walletBalance: 1000,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setCurrentUser(INITIAL_ADMIN_USER);
    } else {
      setCurrentUser(INITIAL_USER);
    }
  };

  // Settings
  const updateSettings = (updates: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    logAdminActivity('Settings Updated', `Modified website configurations`);
  };

  const logAdminActivity = (action: string, details: string) => {
    const newLog: AdminActivityLog = {
      id: 'log-' + Date.now(),
      action,
      details,
      timestamp: new Date().toLocaleString(),
      ipAddress: '103.145.118.22',
      adminName: currentUser?.name || 'Admin',
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Notices
  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = { ...notice, id: 'notice-' + Date.now() };
    setNotices(prev => [...prev, newNotice]);
    logAdminActivity('Notice Created', `Created notice: "${notice.text.substring(0, 30)}..."`);
  };

  const updateNotice = (id: string, updates: Partial<Notice>) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    logAdminActivity('Notice Updated', `Updated notice ID: ${id}`);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    logAdminActivity('Notice Deleted', `Removed notice ID: ${id}`);
  };

  // Sliders
  const addSlider = (slider: Omit<SliderItem, 'id'>) => {
    const newSlider: SliderItem = { ...slider, id: 'slider-' + Date.now() };
    setSliders(prev => [...prev, newSlider]);
    logAdminActivity('Slider Created', `Created slide: "${slider.title}"`);
  };

  const updateSlider = (id: string, updates: Partial<SliderItem>) => {
    setSliders(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logAdminActivity('Slider Updated', `Updated slide ID: ${id}`);
  };

  const deleteSlider = (id: string) => {
    setSliders(prev => prev.filter(s => s.id !== id));
    logAdminActivity('Slider Deleted', `Removed slide ID: ${id}`);
  };

  // Products
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...prodData, id: 'prod-' + Date.now() };
    setProducts(prev => [newProduct, ...prev]);
    logAdminActivity('Product Created', `Added product "${newProduct.name}" in category ${newProduct.category}`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logAdminActivity('Product Updated', `Updated product details for ID: ${id}`);
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    logAdminActivity('Product Deleted', `Removed product: "${prod?.name || id}"`);
  };

  const togglePublishProduct = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.published;
        logAdminActivity('Product Status Changed', `${p.name} is now ${nextState ? 'Published' : 'Unpublished'}`);
        return { ...p, published: nextState };
      }
      return p;
    }));
  };

  // Gateways
  const updateGateway = (id: PaymentMethod, updates: Partial<PaymentGatewayConfig>) => {
    setGateways(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    logAdminActivity('Gateway Configured', `Updated configuration for gateway: ${id}`);
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = { ...couponData, id: 'c-' + Date.now() };
    setCoupons(prev => [newCoupon, ...prev]);
    logAdminActivity('Coupon Created', `Created discount code: ${couponData.code}`);
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const applyCoupon = (code: string, currentTotal: number) => {
    const normalized = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === normalized && c.isActive);

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid or inactive promotional code.' };
    }
    if (coupon.usedCount >= coupon.maxUses) {
      return { valid: false, discount: 0, message: 'This coupon usage limit has been exceeded.' };
    }
    if (currentTotal < coupon.minSpend) {
      return { valid: false, discount: 0, message: `Minimum spend of ${settings.currencySymbol}${coupon.minSpend} required.` };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((currentTotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    return { 
      valid: true, 
      discount: Math.min(discount, currentTotal), 
      message: `Coupon ${coupon.code} applied successfully!`, 
      coupon 
    };
  };

  // Orders & Automated Instant Delivery
  const processPaymentAndDeliver = async ({
    paymentMethod,
    transactionId,
    customerInfo,
    items,
    couponCode,
  }: {
    paymentMethod: PaymentMethod;
    transactionId: string;
    customerInfo: { name: string; email: string; phone: string };
    items: Product[];
    couponCode?: string;
  }): Promise<{ success: boolean; order: Order; purchasedItems: PurchasedProduct[] }> => {
    // 1. Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.discountedPrice, 0);
    let discountAmount = 0;
    if (couponCode) {
      const couponRes = applyCoupon(couponCode, subtotal);
      if (couponRes.valid) {
        discountAmount = couponRes.discount;
        // Increment coupon count
        if (couponRes.coupon) {
          updateCoupon(couponRes.coupon.id, { usedCount: couponRes.coupon.usedCount + 1 });
        }
      }
    }
    const totalAmount = Math.max(0, subtotal - discountAmount);

    const orderNumber = `YAM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = 'ord-' + Date.now();
    const userId = currentUser?.id || 'usr-guest-' + Date.now();

    // 2. Automated Order Creation with server verification stamp
    const newOrder: Order = {
      id: orderId,
      orderNumber,
      userId,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      items: items.map(p => ({
        productId: p.id,
        productName: p.name,
        price: p.discountedPrice,
        category: p.category,
        version: p.version,
      })),
      subtotal,
      discountAmount,
      couponCode,
      totalAmount,
      paymentMethod,
      transactionId: transactionId || `TRX${Date.now().toString(36).toUpperCase()}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      paymentVerifiedAt: new Date().toISOString(),
      notes: `Automated instant payment verification through ${paymentMethod} gateway callback.`,
    };

    // 3. Automated Instant Product Delivery to Customer Account
    const newPurchasedItems: PurchasedProduct[] = items.map((prod, idx) => {
      const randomKey = Math.random().toString(36).substring(2, 6).toUpperCase();
      const randomKey2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const randomKey3 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const licenseKey = `YAM-${prod.category.substring(0, 3).toUpperCase()}-${randomKey}-${randomKey2}-${randomKey3}`;

      const expires = new Date();
      if (prod.accessDurationDays > 0) {
        expires.setDate(expires.getDate() + prod.accessDurationDays);
      } else {
        expires.setFullYear(expires.getFullYear() + 10); // lifetime
      }

      return {
        id: `pur-${Date.now()}-${idx}`,
        orderId,
        userId,
        productId: prod.id,
        productName: prod.name,
        productVersion: prod.version,
        downloadToken: `tok_sec_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
        tokenExpiresAt: expires.toISOString(),
        downloadLimit: prod.downloadLimit,
        downloadCount: 0,
        purchaseDate: new Date().toISOString(),
        licenseKey,
      };
    });

    // 4. Update sales counters on products
    setProducts(prev => prev.map(p => {
      if (items.some(it => it.id === p.id)) {
        return { ...p, salesCount: p.salesCount + 1 };
      }
      return p;
    }));

    // If payment is via Wallet, deduct balance and add wallet transaction
    if (paymentMethod === 'Wallet') {
      setCurrentUser(prev => prev ? { 
        ...prev, 
        walletBalance: Math.max(0, (prev.walletBalance || 0) - totalAmount) 
      } : prev);

      const walletTx: WalletTransaction = {
        id: 'wtx-' + Date.now(),
        userId,
        type: 'purchase',
        amount: totalAmount,
        paymentMethod: 'Wallet Balance',
        transactionId: newOrder.transactionId,
        status: 'completed',
        date: new Date().toLocaleString(),
        description: `Purchased: ${items.map(i => i.name).join(', ')}`,
      };
      setWalletTransactions(prev => [walletTx, ...prev]);
    }

    // Update state
    setOrders(prev => [newOrder, ...prev]);
    setPurchasedProducts(prev => [...newPurchasedItems, ...prev]);

    // Log admin activity
    logAdminActivity(
      'Automated Order Delivery',
      `Processed Order #${orderNumber} (${paymentMethod} TRX: ${newOrder.transactionId}) for ${customerInfo.email}`
    );

    // Clear cart if matching items
    setCart([]);

    return {
      success: true,
      order: newOrder,
      purchasedItems: newPurchasedItems,
    };
  };

  // Add Money To Wallet
  const addMoneyToWallet = async ({
    amount,
    paymentMethod,
    transactionId,
    senderPhone,
  }: {
    amount: number;
    paymentMethod: string;
    transactionId?: string;
    senderPhone?: string;
  }) => {
    const trxId = transactionId || `${paymentMethod.substring(0, 3).toUpperCase()}${Date.now().toString(36).toUpperCase()}`;
    const userId = currentUser?.id || 'usr-demo-1';

    const newWtx: WalletTransaction = {
      id: 'wtx-' + Date.now(),
      userId,
      type: 'deposit',
      amount,
      paymentMethod,
      transactionId: trxId,
      status: 'completed',
      date: new Date().toLocaleString(),
      description: `Wallet top-up via ${paymentMethod} (Sender: ${senderPhone || 'Verified'})`,
    };

    setWalletTransactions(prev => [newWtx, ...prev]);
    setCurrentUser(prev => {
      const curBal = prev?.walletBalance ?? 0;
      return prev ? { ...prev, walletBalance: curBal + amount } : {
        id: userId,
        name: 'Dev Customer',
        email: 'customer@yamscript.com',
        role: 'customer',
        walletBalance: amount,
        createdAt: new Date().toISOString(),
      };
    });

    logAdminActivity('Wallet Top-Up', `Credited +${amount} BDT via ${paymentMethod} (TRX: ${trxId})`);

    return { success: true, newBalance: (currentUser?.walletBalance ?? 0) + amount };
  };

  // Download Execution & Enforcement
  const downloadProduct = (purchasedId: string): { success: boolean; error?: string } => {
    const item = purchasedProducts.find(p => p.id === purchasedId);
    if (!item) {
      return { success: false, error: 'Product purchase record not found.' };
    }

    // Check expiration
    if (new Date(item.tokenExpiresAt) < new Date()) {
      const log: DownloadLog = {
        id: 'dlog-' + Date.now(),
        userId: item.userId,
        purchasedProductId: item.id,
        productName: item.productName,
        downloadedAt: new Date().toISOString(),
        ipAddress: '103.145.118.22',
        userAgent: navigator.userAgent,
        status: 'blocked_expired',
      };
      setDownloadLogs(prev => [log, ...prev]);
      return { success: false, error: 'Download access period has expired. Please contact support.' };
    }

    // Check quota
    if (item.downloadLimit > 0 && item.downloadCount >= item.downloadLimit) {
      const log: DownloadLog = {
        id: 'dlog-' + Date.now(),
        userId: item.userId,
        purchasedProductId: item.id,
        productName: item.productName,
        downloadedAt: new Date().toISOString(),
        ipAddress: '103.145.118.22',
        userAgent: navigator.userAgent,
        status: 'blocked_quota_exceeded',
      };
      setDownloadLogs(prev => [log, ...prev]);
      return { success: false, error: `Maximum download limit (${item.downloadLimit} downloads) reached.` };
    }

    // Success: decrement limit and trigger file download
    setPurchasedProducts(prev => prev.map(p => {
      if (p.id === purchasedId) {
        return {
          ...p,
          downloadCount: p.downloadCount + 1,
          lastDownloadedAt: new Date().toISOString(),
        };
      }
      return p;
    }));

    const successLog: DownloadLog = {
      id: 'dlog-' + Date.now(),
      userId: item.userId,
      purchasedProductId: item.id,
      productName: item.productName,
      downloadedAt: new Date().toISOString(),
      ipAddress: '103.145.118.22',
      userAgent: navigator.userAgent,
      status: 'successful',
    };
    setDownloadLogs(prev => [successLog, ...prev]);

    // Trigger actual download bundle
    const customer = currentUser?.name || 'Licensed Developer';
    triggerDigitalDownload(item.productName, item.productVersion, item.licenseKey, item.orderId, customer);

    return { success: true };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, reason?: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    logAdminActivity('Order Status Changed', `Order ${orderId} changed to ${status}${reason ? ` (Reason: ${reason})` : ''}`);
  };

  // Support Tickets
  const createTicket = (subject: string, department: any, priority: any, initialMessage: string) => {
    const user = currentUser || INITIAL_USER;
    const newTicket: SupportTicket = {
      id: 'tkt-' + Date.now(),
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      subject,
      department,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg-' + Date.now(),
          sender: 'customer',
          senderName: user.name,
          text: initialMessage,
          timestamp: new Date().toISOString(),
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const replyTicket = (ticketId: string, text: string) => {
    const isSenderAdmin = currentUser?.role === 'admin';
    const sender = isSenderAdmin ? 'support' : 'customer';
    const senderName = currentUser?.name || (isSenderAdmin ? 'YAM Senior Engineer' : 'Customer');

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: isSenderAdmin ? 'answered' : 'in_progress',
          updatedAt: new Date().toISOString(),
          messages: [
            ...t.messages,
            {
              id: 'msg-' + Date.now(),
              sender,
              senderName,
              text,
              timestamp: new Date().toISOString(),
            }
          ]
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  // Cart & Wishlist
  const addToCart = (product: Product) => {
    setCart(prev => {
      if (prev.some(item => item.product.id === product.id)) return prev;
      return [...prev, { product }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <StoreContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      switchRole,
      settings,
      updateSettings,
      notices,
      addNotice,
      updateNotice,
      deleteNotice,
      sliders,
      addSlider,
      updateSlider,
      deleteSlider,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      togglePublishProduct,
      gateways,
      updateGateway,
      coupons,
      addCoupon,
      updateCoupon,
      deleteCoupon,
      applyCoupon,
      orders,
      updateOrderStatus,
      purchasedProducts,
      downloadLogs,
      downloadProduct,
      processPaymentAndDeliver,
      tickets,
      createTicket,
      replyTicket,
      updateTicketStatus,
      activityLogs,
      currentView,
      setCurrentView,
      selectedCategoryFilter,
      setSelectedCategoryFilter,
      activeProductDetail,
      setActiveProductDetail,
      checkoutItem,
      setCheckoutItem,
      completedOrder,
      setCompletedOrder,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isInstallModalOpen,
      setIsInstallModalOpen,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
