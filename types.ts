

export interface Category {
    id: string;
    name: string;
    subcategories?: string[];
}

export enum AppView {
  JOIN,
  REGISTER_VENDOR,
  REGISTER_INDIVIDUAL,
  VERIFY_EMAIL,
  LOGIN,
  FORGOT_PASSWORD,
  SET_NEW_PASSWORD,
  COMPLETE_PROFILE_VENDOR,
  COMPLETE_PROFILE_INDIVIDUAL_STEP2,
  COMPLETE_PROFILE_INDIVIDUAL_STEP3,
  HOME,
  PRODUCT_DETAIL,
  // Generic
  SETTINGS,
  KYC_SUBMISSION,
  NOT_FOUND,
  // Vendor Dashboard
  VENDOR_DASHBOARD,
  VENDOR_PRODUCTS,
  VENDOR_ORDERS,
  VENDOR_ADD_EDIT_PRODUCT,
  VENDOR_ORDER_DETAIL,
  VENDOR_CUSTOMERS,
  VENDOR_WALLET,
  // Buyer Dashboard
  BUYER_DASHBOARD,
  BUYER_PRODUCTS,
  BUYER_ORDER_DETAIL,
  BUYER_CART,
  BUYER_CHECKOUT,
  // Support Dashboard
  SUPPORT_DASHBOARD,
  SUPPORT_DISPUTES,
  SUPPORT_DISPUTE_DETAIL,
  // Admin Dashboard
  ADMIN_DASHBOARD,
  ADMIN_USERS,
  ADMIN_PRODUCTS,
  ADMIN_CATEGORIES,
  ADMIN_KYC_SUBMISSIONS,
  ADMIN_KYC_DETAIL,
  ADMIN_ORDERS,
  ADMIN_ORDER_DETAIL,
  ADMIN_ADD_EDIT_USER,
  ADMIN_EDIT_USER,
  ADMIN_KYC_SETTINGS,
  ADMIN_CONTENT_MANAGEMENT,
}

export enum UserType {
    NONE,
    BUYER,
    VENDOR,
    SUPPORT_AGENT,
    SUPER_ADMIN,
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  password?: string;
  avatarUrl: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  phone: string;
  registeredDate: string;
  lastLogin: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  kycStatus: 'Not Submitted' | 'Pending' | 'Verified' | 'Rejected';
  kycRejectionReason?: string;
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    avatarUrl: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  imageUrl: string;
  images: string[];
  price: number;
  stock: number;
  category: string;
  subcategory?: string;
  sales: number;
  status: string;
  description: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specs: { key: string; value: string }[];
}

export type OrderStatus = 'Pending' | 'Payment in Escrow' | 'Processing' | 'Ready for Pickup' | 'Shipped' | 'Delivered' | 'Completed' | 'Cancelled' | 'Disputed' | 'Refunded';

export interface TrackingEvent {
    status: OrderStatus | 'Order Placed';
    date: string;
    location?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: string; // Should be customerId in a real app
  customerId: string;
  total: number;
  status: OrderStatus;
  items: Product[]; // Simplified; should be OrderItem[] with price and quantity
  shippingAddress: {
    street: string;
    city: string;
    country: string;
  };
  trackingNumber?: string;
  paymentMethod: string;
  trackingHistory: TrackingEvent[];
  usedEscrow: boolean;
}

export interface Dispute {
  id: string;
  orderId: string;
  buyer: string;
  vendor: string;
  reason: string;
  status: string;
  date: string;
  messages: {
    user: string; // should be userId
    text: string;
    timestamp: string;
  }[];
  resolution?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Notification {
    id: string;
    userId: string;
    type: 'order' | 'dispute' | 'system' | 'product' | 'kyc' | 'wallet';
    message: string;
    date: string;
    read: boolean;
    link?: string; // e.g. /vendor/orders/detail
}

export interface Transaction {
    id: string;
    date: string;
    type: 'Payout' | 'Fee' | 'Sale' | 'Escrow Release' | 'Refund';
    amount: number;
    status: 'Completed' | 'Pending' | 'Failed';
    description: string;
}

export interface KycField {
    id: string;
    label: string;
    type: 'text' | 'file';
}

export interface FeatureItem {
  icon: 'FastShippingIcon' | 'CustomerSupportIcon' | 'SecurePaymentIcon' | 'MoneyBackIcon';
  title: string;
  description: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  promoText: string;
  promoImageUrl: string;
  features: FeatureItem[];
  deliverySection: {
    title: string;
    description: string;
    subDescription: string;
    buttonText: string;
    imageUrl: string;
  }
}