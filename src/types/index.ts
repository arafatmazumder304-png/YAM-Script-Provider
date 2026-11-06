export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  walletBalance?: number;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'purchase' | 'refund' | 'bonus';
  amount: number;
  paymentMethod?: string;
  transactionId?: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export type ProductCategory = 
  | 'Custom Website Scripts'
  | 'Premium WordPress Themes'
  | 'Premium WordPress Plugins'
  | 'Android Applications'
  | 'iOS Applications'
  | 'PHP Scripts'
  | 'SaaS Software'
  | 'E-commerce Scripts'
  | 'Website Templates'
  | 'Source Codes'
  | 'Other Digital Products';

export interface ProductFile {
  fileName: string;
  fileSize: string;
  fileType: string; // zip, rar, tar.gz
  version: string;
  externalDownloadUrl?: string;
  sampleCodeSnippet?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  detailedDescription: string;
  regularPrice: number;
  discountedPrice: number;
  featured: boolean;
  published: boolean;
  bestSeller?: boolean;
  version: string;
  compatibility: string; // e.g. "PHP 8.1+, MySQL 8, Laravel 11"
  requirements: string[];
  features: string[];
  installationInstructions: string;
  demoUrl?: string;
  thumbnailUrl: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  salesCount: number;
  files: ProductFile[];
  downloadLimit: number; // e.g. 5 or -1 for unlimited
  accessDurationDays: number; // e.g. 365 or -1 for lifetime
  licenseType: 'Regular License' | 'Extended Commercial License';
  lastUpdated: string;
}

export type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket' | 'SSLCommerz' | 'Wallet';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  category: string;
  version: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: OrderStatus;
  createdAt: string;
  paymentVerifiedAt?: string;
  notes?: string;
}

export interface PurchasedProduct {
  id: string;
  orderId: string;
  userId: string;
  productId: string;
  productName: string;
  productVersion: string;
  downloadToken: string;
  tokenExpiresAt: string;
  downloadLimit: number;
  downloadCount: number;
  purchaseDate: string;
  lastDownloadedAt?: string;
  licenseKey: string;
}

export interface DownloadLog {
  id: string;
  userId: string;
  purchasedProductId: string;
  productName: string;
  downloadedAt: string;
  ipAddress: string;
  userAgent: string;
  status: 'successful' | 'blocked_quota_exceeded' | 'blocked_expired';
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
}

export interface Notice {
  id: string;
  text: string;
  linkText?: string;
  linkUrl?: string;
  backgroundColor: string;
  textColor: string;
  isActive: boolean;
  expiresAt?: string;
  order: number;
}

export interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  imageUrl: string;
  destinationUrl: string;
  buttonText: string;
  isActive: boolean;
  order: number;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  department: 'Sales' | 'Technical Support' | 'License Issue' | 'Billing';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'answered' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: 'customer' | 'support';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface PaymentGatewayConfig {
  id: PaymentMethod;
  name: string;
  enabled: boolean;
  isSandbox: boolean;
  accountNumber?: string;
  merchantId?: string;
  appKey?: string;
  appSecret?: string;
  instructions?: string;
}

export interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  logoText: string;
  logoSubtext: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  currencySymbol: string; // '৳' or '$'
  currencyCode: string; // 'BDT' or 'USD'
  exchangeRate: number; // 1 USD in BDT
  maintenanceMode: boolean;
  whatsappNumber: string;
  contactEmail: string;
  facebookUrl: string;
  telegramUrl?: string;
  youtubeUrl?: string;
  copyrightText: string;
  noticeBoardEnabled: boolean;
  sliderAutoplaySpeed: number; // ms
  sliderTransition: 'slide' | 'fade';
  featuredSectionTitle: string;
  footerDescription: string;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  adminName: string;
}
