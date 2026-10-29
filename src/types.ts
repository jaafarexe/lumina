export type ProductCategory = 
  | 'All'
  | 'Kitchen & Table'
  | 'Living & Decor'
  | 'Care & Wellness'
  | 'Lighting'
  | 'Stationery & Desk';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductVisualTheme {
  background: string;
  accent: string;
  icon: 'mug' | 'teapot' | 'plate' | 'blanket' | 'vase' | 'cushion' | 'diffuser' | 'bottle' | 'candle' | 'lamp' | 'pendant' | 'tray' | 'pen' | 'notebook' | 'board';
  tagline: string;
  materialLook: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<ProductCategory, 'All'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  origin: string;
  material: string;
  dimensions: string;
  inStock: number;
  badge?: 'Bestseller' | 'New Arrival' | 'Artisan Batch' | 'Editor Pick' | 'Low Stock' | 'Staff Pick';
  variants: ProductVariant[];
  visualTheme: ProductVisualTheme;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique item id = productId + variant combination
  productId: string;
  product: Product;
  selectedVariants: Record<string, string>;
  quantity: number;
  unitPrice: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  shippingDetails: ShippingDetails;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'cod';
  status: 'Confirmed' | 'Preparing' | 'Shipped';
  estimatedDelivery: string;
}
