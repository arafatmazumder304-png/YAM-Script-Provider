import { 
  Product, 
  Notice, 
  SliderItem, 
  WebsiteSettings, 
  PaymentGatewayConfig, 
  Coupon,
  Order,
  PurchasedProduct,
  SupportTicket,
  AdminActivityLog,
  User
} from '../types';

export const INITIAL_SETTINGS: WebsiteSettings = {
  websiteName: 'YAM Script Provider',
  websiteDescription: 'Premium digital marketplace for verified website scripts, WordPress themes, plugins, Android/iOS apps, and enterprise SaaS solutions.',
  logoText: 'YAM',
  logoSubtext: 'SCRIPT PROVIDER',
  faviconUrl: '/favicon.ico',
  primaryColor: '#2563eb', // royal blue
  secondaryColor: '#0f172a', // deep navy
  accentColor: '#06b6d4', // cyan
  currencySymbol: '৳',
  currencyCode: 'BDT',
  exchangeRate: 120, // 1 USD = 120 BDT
  maintenanceMode: false,
  whatsappNumber: '01915985602',
  contactEmail: 'arafatmazumder304@gmail.com',
  facebookUrl: 'https://www.facebook.com/arafatmazumder0.2',
  telegramUrl: 'https://t.me/yamscriptprovider',
  youtubeUrl: 'https://youtube.com/@yamscriptprovider',
  copyrightText: '© 2026 YAM Script Provider. All rights reserved. Built for professional software teams and digital entrepreneurs.',
  noticeBoardEnabled: true,
  sliderAutoplaySpeed: 5000,
  sliderTransition: 'slide',
  featuredSectionTitle: 'Handcrafted Digital Products & Premium Scripts',
  footerDescription: 'YAM Script Provider is the premier destination for verified source codes, production-ready web scripts, and native mobile apps with automated instant delivery and 24/7 technical assistance.',
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    text: 'সতর্কতা ও নোটিশ: কোনো ফেক পেমেন্ট বা ভুল ট্রানজেকশন আইডি দিয়ে অর্ডার করবেন না! আমাদের সাইট থেকে ২৪ ঘণ্টাই মিলবে স্ক্রিপ্ট ও অ্যাপস রোবটের মাধ্যমে! bKash, Nagad, Rocket ও SSLCommerz পেমেন্ট ভেরিফাই হওয়ামাত্রই সফটওয়্যার সোর্স কোড ও লাইসেন্স কি অটোমেটিক পেয়ে যাবেন। হেল্পলাইন: 01915985602',
    linkText: 'Order Instructions',
    linkUrl: '#products',
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    isActive: true,
    order: 1,
  },
  {
    id: 'notice-2',
    text: '⚡ MEGA RELEASE: Next.js 15 & Laravel 11 Multi-Vendor Marketplace Script & Flutter App Suite is now 35% OFF! Use code: PRODEV at checkout.',
    linkText: 'Get Discount',
    linkUrl: '#products',
    backgroundColor: '#0f172a',
    textColor: '#818cf8',
    isActive: true,
    order: 2,
  }
];

export const INITIAL_SLIDERS: SliderItem[] = [
  {
    id: 'slider-1',
    title: 'Enterprise Software & Production Scripts',
    subtitle: 'Verified, tested, and high-performance source codes for developers, agency owners, and tech startups.',
    badge: 'NEW RELEASE 2026',
    imageUrl: '/src/assets/images/hero_software_showcase_1793805850840.jpg',
    destinationUrl: '#products',
    buttonText: 'Explore Catalog',
    isActive: true,
    order: 1,
  },
  {
    id: 'slider-2',
    title: 'Next-Gen Multi-Vendor E-Commerce Platform',
    subtitle: 'Built with Next.js 15, Laravel 11, Tailwind CSS & complete Payment Gateway Integrations.',
    badge: 'BEST SELLER',
    imageUrl: '/src/assets/images/product_ecommerce_script_1793805852102.jpg',
    destinationUrl: '#product-detail-prod-1',
    buttonText: 'View E-Commerce Script',
    isActive: true,
    order: 2,
  },
  {
    id: 'slider-3',
    title: 'Cross-Platform iOS & Android Mobile Apps',
    subtitle: 'Native feel, 60fps animations, Firebase push notifications, and clean MVVM architecture.',
    badge: 'MOBILE SUITE',
    imageUrl: '/src/assets/images/product_flutter_ios_android_1793805853000.jpg',
    destinationUrl: '#product-detail-prod-4',
    buttonText: 'Get Mobile Bundle',
    isActive: true,
    order: 3,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'E-Connect Pro: Multi-Vendor Marketplace Engine',
    slug: 'e-connect-pro-multivendor-engine',
    category: 'E-commerce Scripts',
    shortDescription: 'Enterprise-grade multi-vendor e-commerce platform with automated payouts, live stock tracking, and coupon mechanics.',
    detailedDescription: 'E-Connect Pro is a full-featured commercial marketplace engine engineered for massive catalog scaling. Features merchant onboarding, multi-warehouse inventory, dynamic shipping rate calculation, real-time analytics dashboard, coupon logic, and instant download delivery for digital items. Includes complete source code for frontend, backend API, and Admin control room.',
    regularPrice: 5500,
    discountedPrice: 3850,
    featured: true,
    bestSeller: true,
    published: true,
    version: '3.4.0',
    compatibility: 'PHP 8.2+, Laravel 11.x, MySQL 8.0, Node.js 20+',
    requirements: [
      'PHP >= 8.2 with BCMath, Ctype, cURL, Fileinfo, OpenSSL, PDO extensions',
      'MySQL >= 8.0 or MariaDB >= 10.5',
      'Apache/Nginx with rewrite module enabled',
      'Composer 2.x and Node.js >= 18'
    ],
    features: [
      'Full Multi-Vendor & Merchant Management',
      'Built-in bKash, Nagad, Rocket, Stripe & SSLCommerz',
      'Real-time Order & Commission Settlement system',
      'Customer & Vendor Live Chat via WebSockets',
      'Comprehensive Admin Analytics & Sales Reports',
      '100% responsive, SEO-ready Next.js & Tailwind frontend'
    ],
    installationInstructions: '1. Extract the package on your server root or public_html\n2. Create a clean database in cPanel/phpMyAdmin\n3. Copy .env.example to .env and configure DB_DATABASE, DB_USERNAME, DB_PASSWORD\n4. Run php artisan key:generate and php artisan migrate --seed\n5. Login to Admin with admin@yam.local / password123',
    demoUrl: 'https://demo.econnectpro.yamscript.com',
    thumbnailUrl: '/src/assets/images/product_ecommerce_script_1793805852102.jpg',
    galleryImages: [
      '/src/assets/images/product_ecommerce_script_1793805852102.jpg',
      '/src/assets/images/hero_software_showcase_1793805850840.jpg'
    ],
    rating: 4.9,
    reviewsCount: 38,
    salesCount: 142,
    files: [
      {
        fileName: 'e-connect-pro-v3.4.0-source.zip',
        fileSize: '48.6 MB',
        fileType: 'zip',
        version: '3.4.0'
      }
    ],
    downloadLimit: 5,
    accessDurationDays: 365,
    licenseType: 'Regular License',
    lastUpdated: '2026-10-15',
  },
  {
    id: 'prod-2',
    name: 'Strata CRM & Enterprise SaaS Subscription Suite',
    slug: 'strata-crm-saas-suite',
    category: 'SaaS Software',
    shortDescription: 'All-in-one customer relationship management, invoicing, project management, and recurring subscription billing script.',
    detailedDescription: 'Strata CRM provides software agencies and service businesses with client tracking, lead conversion funnels, milestone task boards, automated invoice generation, payment receipts, and staff role permissions. Clean, modern interface with instant dark/light mode.',
    regularPrice: 4800,
    discountedPrice: 3200,
    featured: true,
    bestSeller: true,
    published: true,
    version: '2.8.2',
    compatibility: 'PHP 8.2+, Laravel 11, Vue 3, Tailwind CSS',
    requirements: [
      'PHP >= 8.2 with PDO, GD, Zip, and Intl',
      'MySQL >= 8.0',
      'Cron job support for scheduled email reports'
    ],
    features: [
      'Multi-tenant workspace architecture',
      'Automated recurring billing and PDF invoicing',
      'Team permission matrices (Admin, Manager, Staff, Client)',
      'Kanban task pipeline with drag-and-drop',
      'Integrated live client ticketing system',
      'Exportable CSV and PDF financial reports'
    ],
    installationInstructions: '1. Upload zip contents to server\n2. Point web document root to /public\n3. Run web-based 3-step setup wizard at yourdomain.com/install\n4. Enter your license key provided in your YAM Script Provider receipt',
    demoUrl: 'https://demo.stratacrm.yamscript.com',
    thumbnailUrl: '/src/assets/images/product_saas_crm_1793805852008.jpg',
    galleryImages: [
      '/src/assets/images/product_saas_crm_1793805852008.jpg',
      '/src/assets/images/hero_software_showcase_1793805850840.jpg'
    ],
    rating: 4.8,
    reviewsCount: 29,
    salesCount: 96,
    files: [
      {
        fileName: 'strata-crm-v2.8.2-full.zip',
        fileSize: '36.2 MB',
        fileType: 'zip',
        version: '2.8.2'
      }
    ],
    downloadLimit: 5,
    accessDurationDays: 365,
    licenseType: 'Regular License',
    lastUpdated: '2026-09-28',
  },
  {
    id: 'prod-3',
    name: 'Veridian Aesthetics – Ultra Clean Agency WP Theme',
    slug: 'veridian-aesthetics-wordpress-theme',
    category: 'Premium WordPress Themes',
    shortDescription: 'High-speed, elementor-compatible corporate agency theme scoring 99 on Google PageSpeed Insights.',
    detailedDescription: 'Veridian Aesthetics is tailored for design studios, IT consultancies, and digital agencies. Includes 12 pre-built homepage layouts, 40+ custom Elementor widgets, Gutenberg blocks, fluid responsive typography, and WooCommerce integration.',
    regularPrice: 2800,
    discountedPrice: 1950,
    featured: true,
    bestSeller: false,
    published: true,
    version: '4.1.0',
    compatibility: 'WordPress 6.4+, Elementor 3.x, PHP 8.0+',
    requirements: [
      'WordPress 6.0 or higher',
      'PHP >= 8.0 with memory_limit = 256M',
      'MySQL 5.7+ or MariaDB 10.3+'
    ],
    features: [
      'One-Click Demo Content Importer',
      'No Coding Required visual page building',
      'SEO Optimized schema markup out of the box',
      'Full WooCommerce shop & checkout styling',
      'Lifetime free theme updates & support'
    ],
    installationInstructions: '1. In WordPress Admin, go to Appearance > Themes > Add New > Upload Theme\n2. Select veridian-theme.zip and click Install Now\n3. Click Activate and follow the setup wizard to import your preferred demo layout',
    demoUrl: 'https://veridian.yamscript.com',
    thumbnailUrl: '/src/assets/images/product_wp_theme_1793805853104.jpg',
    galleryImages: [
      '/src/assets/images/product_wp_theme_1793805853104.jpg'
    ],
    rating: 4.9,
    reviewsCount: 19,
    salesCount: 78,
    files: [
      {
        fileName: 'veridian-theme-bundle-v4.1.0.zip',
        fileSize: '24.1 MB',
        fileType: 'zip',
        version: '4.1.0'
      }
    ],
    downloadLimit: 10,
    accessDurationDays: 365,
    licenseType: 'Regular License',
    lastUpdated: '2026-10-02',
  },
  {
    id: 'prod-4',
    name: 'Aura Finance: Flutter iOS & Android Full App Code',
    slug: 'aura-finance-flutter-ios-android',
    category: 'Android Applications',
    shortDescription: 'Complete personal finance, crypto tracking, and budget management mobile app with clean Flutter 3 source code.',
    detailedDescription: 'Aura Finance is a production-tested mobile codebase built with Flutter. Runs at 60fps on both iOS and Android. Contains state-of-the-art visual charts, push notifications with Firebase FCM, biometric FaceID/fingerprint authentication, and light/dark theme.',
    regularPrice: 6500,
    discountedPrice: 4200,
    featured: true,
    bestSeller: true,
    published: true,
    version: '1.9.0',
    compatibility: 'Flutter 3.22+, Dart 3.4+, iOS 14+, Android 12+ (API 31+)',
    requirements: [
      'Flutter SDK 3.22.x',
      'Android Studio / Xcode with latest SDKs',
      'Google Firebase Account for push notifications'
    ],
    features: [
      'Dual platform: 100% shared Dart codebase for iOS & Android',
      'State management using Riverpod 2.x',
      'Biometric authentication (TouchID, FaceID, Fingerprint)',
      'Multi-currency balance support with live BDT conversion',
      'Detailed PDF export of monthly statements'
    ],
    installationInstructions: '1. Unzip the code in your workspace\n2. Run `flutter pub get`\n3. Add your google-services.json and GoogleService-Info.plist in designated platform directories\n4. Run `flutter run` on simulator or connected physical device',
    demoUrl: 'https://play.google.com/store/apps/details?id=com.yam.aurafinance.demo',
    thumbnailUrl: '/src/assets/images/product_flutter_ios_android_1793805853000.jpg',
    galleryImages: [
      '/src/assets/images/product_flutter_ios_android_1793805853000.jpg'
    ],
    rating: 5.0,
    reviewsCount: 44,
    salesCount: 165,
    files: [
      {
        fileName: 'aura-finance-flutter-v1.9.0.zip',
        fileSize: '54.2 MB',
        fileType: 'zip',
        version: '1.9.0'
      }
    ],
    downloadLimit: 5,
    accessDurationDays: 365,
    licenseType: 'Extended Commercial License',
    lastUpdated: '2026-10-22',
  },
  {
    id: 'prod-5',
    name: 'ShieldPress: Advanced WordPress Security & Firewall',
    slug: 'shieldpress-wp-security-firewall-plugin',
    category: 'Premium WordPress Plugins',
    shortDescription: 'Enterprise WordPress security plugin with real-time brute-force defense, file integrity scanning, and two-factor auth.',
    detailedDescription: 'Protect client websites with ShieldPress. Blocks malicious crawlers, prevents SQL injection and XSS attempts on forms, hides WP-Admin URL, disables XML-RPC, and alerts site administrators instantly via Telegram or email upon suspicious login attempts.',
    regularPrice: 1900,
    discountedPrice: 1250,
    featured: false,
    bestSeller: false,
    published: true,
    version: '5.2.1',
    compatibility: 'WordPress 5.8 to 6.6+, PHP 7.4 to 8.3',
    requirements: [
      'WordPress 5.8+',
      'PHP >= 7.4',
      'cURL and OpenSSL extensions'
    ],
    features: [
      'Web Application Firewall (WAF) layer',
      'Instant Brute-force Login Shield & CAPTCHA',
      'Core & Theme file checksum integrity monitor',
      'Two-Factor Authentication (2FA) with Google Authenticator',
      'Custom WP-Login URL Masking'
    ],
    installationInstructions: '1. Upload shieldpress-pro.zip under WP Admin > Plugins > Add New\n2. Activate the plugin\n3. Navigate to ShieldPress settings and activate the High-Security preset',
    demoUrl: 'https://demo.shieldpress.yamscript.com',
    thumbnailUrl: '/src/assets/images/hero_software_showcase_1793805850840.jpg',
    galleryImages: ['/src/assets/images/hero_software_showcase_1793805850840.jpg'],
    rating: 4.7,
    reviewsCount: 15,
    salesCount: 52,
    files: [
      {
        fileName: 'shieldpress-pro-v5.2.1.zip',
        fileSize: '8.4 MB',
        fileType: 'zip',
        version: '5.2.1'
      }
    ],
    downloadLimit: 10,
    accessDurationDays: 365,
    licenseType: 'Regular License',
    lastUpdated: '2026-08-11',
  },
  {
    id: 'prod-6',
    name: 'RapidPay Gateway: Unified Bangladesh Checkout PHP Script',
    slug: 'rapidpay-gateway-bd-php-script',
    category: 'PHP Scripts',
    shortDescription: 'Universal payment aggregation script uniting bKash, Nagad, Rocket, Upay, and SSLCommerz with unified webhook dispatcher.',
    detailedDescription: 'Integrate every major Bangladeshi payment provider into your web application in under 15 minutes. Supports direct Merchant API callbacks, transaction query endpoints, refunds, and signature-verified webhooks.',
    regularPrice: 2200,
    discountedPrice: 1500,
    featured: false,
    bestSeller: true,
    published: true,
    version: '2.1.0',
    compatibility: 'Pure PHP 8.1+, Laravel, CodeIgniter, or raw scripts',
    requirements: ['PHP 8.1+', 'cURL extension enabled'],
    features: [
      'Ready bKash Checkout (Tokenized API)',
      'Nagad Direct Payment Integration',
      'DBBL Rocket PG Hook',
      'SSLCommerz Session & Validation endpoints',
      'Instant Webhook retry queue and transaction log database'
    ],
    installationInstructions: '1. Include `autoload.php` in your project\n2. Fill `config.php` with your merchant credentials\n3. Follow the sample checkout.php file provided in /examples',
    demoUrl: 'https://rapidpay.yamscript.com',
    thumbnailUrl: '/src/assets/images/product_ecommerce_script_1793805852102.jpg',
    galleryImages: ['/src/assets/images/product_ecommerce_script_1793805852102.jpg'],
    rating: 4.9,
    reviewsCount: 22,
    salesCount: 114,
    files: [
      {
        fileName: 'rapidpay-unified-bd-v2.1.0.zip',
        fileSize: '5.8 MB',
        fileType: 'zip',
        version: '2.1.0'
      }
    ],
    downloadLimit: 5,
    accessDurationDays: 365,
    licenseType: 'Regular License',
    lastUpdated: '2026-10-10',
  }
];

export const INITIAL_GATEWAYS: PaymentGatewayConfig[] = [
  {
    id: 'bKash',
    name: 'bKash Direct Gateway',
    enabled: true,
    isSandbox: true,
    accountNumber: '01915985602',
    merchantId: 'BKASH_MERCHANT_YAM_9921',
    appKey: 'bk_live_key_9318287491',
    appSecret: '••••••••••••••••••••••••',
    instructions: 'Automated Instant Verification: Enter your bKash mobile number, verify the 6-digit OTP and secure PIN. Your payment is immediately validated and your download is generated on the spot.',
  },
  {
    id: 'Nagad',
    name: 'Nagad Payment Gateway',
    enabled: true,
    isSandbox: true,
    accountNumber: '01915985602',
    merchantId: 'NAGAD_YAM_7718',
    appKey: 'ng_pub_live_72618291',
    appSecret: '••••••••••••••••••••••••',
    instructions: 'Automated Nagad Checkout: Dial or authorize through official Nagad gateway interface. Immediate transaction verification.',
  },
  {
    id: 'Rocket',
    name: 'DBBL Rocket Pay',
    enabled: true,
    isSandbox: true,
    accountNumber: '019159856020',
    merchantId: 'ROCKET_MERCHANT_442',
    appKey: 'rkt_app_639102',
    appSecret: '••••••••••••••••••••••••',
    instructions: 'Dutch-Bangla Bank Rocket mobile banking payment with server-side PIN confirmation.',
  },
  {
    id: 'SSLCommerz',
    name: 'SSLCommerz Hosted Gateway',
    enabled: true,
    isSandbox: true,
    merchantId: 'yamscripthostedlive',
    appKey: 'yamscript6482910',
    appSecret: '••••••••••••••••••••••••',
    instructions: 'Universal gateway supporting Visa, MasterCard, UnionPay, American Express, and all Bangladesh Internet Banking channels.',
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'PRODEV',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 2000,
    maxUses: 100,
    usedCount: 28,
    expiresAt: '2026-12-31',
    isActive: true,
  },
  {
    id: 'c-2',
    code: 'YAM500',
    discountType: 'fixed',
    discountValue: 500,
    minSpend: 3000,
    maxUses: 50,
    usedCount: 14,
    expiresAt: '2026-12-31',
    isActive: true,
  }
];

export const INITIAL_USER: User = {
  id: '23062',
  name: 'Arafat Mazumder',
  email: 'arafatmazumder304@gmail.com',
  phone: '01915985602',
  role: 'customer',
  avatarUrl: '/default_user_pfp.jpeg',
  walletBalance: 0,
  createdAt: '2026-01-10',
};

export const INITIAL_ADMIN_USER: User = {
  id: 'usr-admin-1',
  name: 'Arafat Mazumder (Admin)',
  email: 'arafatmazumder304@gmail.com',
  phone: '01915985602',
  role: 'admin',
  avatarUrl: '/default_user_pfp.jpeg',
  createdAt: '2025-11-01',
};

export const INITIAL_WALLET_TRANSACTIONS = [
  {
    id: 'wtx-1',
    userId: '23062',
    type: 'deposit' as const,
    amount: 2500,
    paymentMethod: 'bKash',
    transactionId: 'BKW881920LA',
    status: 'completed' as const,
    date: '2026-11-02 12:10:00',
    description: 'Wallet top-up via bKash Automated Gateway',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8801',
    orderNumber: 'YAM-2026-8801',
    userId: '23062',
    customerName: 'Dev Arafat Mazumder',
    customerEmail: 'arafatmazumder304@gmail.com',
    customerPhone: '01915985602',
    items: [
      {
        productId: 'prod-1',
        productName: 'E-Connect Pro: Multi-Vendor Marketplace Engine',
        price: 3850,
        category: 'E-commerce Scripts',
        version: '3.4.0'
      }
    ],
    subtotal: 3850,
    discountAmount: 0,
    totalAmount: 3850,
    paymentMethod: 'bKash',
    transactionId: 'TRX9B829104KA',
    status: 'completed',
    createdAt: '2026-11-01T14:32:00Z',
    paymentVerifiedAt: '2026-11-01T14:32:45Z',
    notes: 'Automated instant fulfillment via bKash verified callback.'
  }
];

export const INITIAL_PURCHASED: PurchasedProduct[] = [
  {
    id: 'pur-1',
    orderId: 'ord-8801',
    userId: '23062',
    productId: 'prod-1',
    productName: 'E-Connect Pro: Multi-Vendor Marketplace Engine',
    productVersion: '3.4.0',
    downloadToken: 'tok_sec_9918274a819b2c3d',
    tokenExpiresAt: '2027-11-01T14:32:00Z',
    downloadLimit: 5,
    downloadCount: 1,
    purchaseDate: '2026-11-01T14:32:45Z',
    lastDownloadedAt: '2026-11-01T14:35:10Z',
    licenseKey: 'YAM-ECONNECT-77A2-99B1-48C3',
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-101',
    ticketNumber: 'TKT-9041',
    userId: '23062',
    userName: 'Dev Arafat Mazumder',
    userEmail: 'arafatmazumder304@gmail.com',
    subject: 'Assistance setting up Redis session cache in E-Connect Pro',
    department: 'Technical Support',
    priority: 'medium',
    status: 'answered',
    createdAt: '2026-11-02T10:15:00Z',
    updatedAt: '2026-11-02T11:45:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        senderName: 'Dev Arafat Mazumder',
        text: 'Hello YAM Support, I need help configuring Redis on my cPanel VPS for E-Connect Pro. Does it require predis or phpredis?',
        timestamp: '2026-11-02T10:15:00Z',
      },
      {
        id: 'msg-2',
        sender: 'support',
        senderName: 'YAM Engineering Lead',
        text: 'Hello Arafat! E-Connect Pro supports both. We recommend compiling the native phpredis PHP extension for maximum throughput. Set CACHE_DRIVER=redis and REDIS_CLIENT=phpredis in your .env.',
        timestamp: '2026-11-02T11:45:00Z',
      }
    ]
  }
];

export const INITIAL_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'log-1',
    action: 'Payment Verification',
    details: 'Verified bKash automated transaction TRX9B829104KA for Order #YAM-2026-8801',
    timestamp: '2026-11-01 14:32:45',
    ipAddress: '103.145.118.22',
    adminName: 'System Automation Gateway',
  },
  {
    id: 'log-2',
    action: 'Product Updated',
    details: 'Updated E-Connect Pro to version 3.4.0 with Laravel 11 support',
    timestamp: '2026-10-15 09:20:11',
    ipAddress: '103.145.118.22',
    adminName: 'Arafat Mazumder',
  }
];
