import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface DirectorProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface ImpactStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Coordinator {
  id: string;
  name: string;
  role: 'State' | 'District' | 'Block' | 'Panchayat';
  state: string;
  district: string;
  block?: string;
  panchayat?: string;
  pincode: string;
  mobile: string;
  whatsapp?: string;
  address?: string;
  image?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  image: string;
  rating: number;
  reviews: number;
  isOrganic: boolean;
  description?: string;
  reviewList?: Review[];
  sellerName?: string;
  sellerDistrict?: string;
  stock?: number;
  isVisible?: boolean;
  status?: 'Pending' | 'Approved' | 'Rejected'; // For Admin Approval
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Customer' | 'Seller' | 'Coordinator' | 'Admin';
  avatar?: string;
  address?: string;
  status?: 'Pending' | 'Approved' | 'Rejected'; // For Seller/Coordinator Approval
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: number;
}

export interface Investor {
  id: string;
  name: string;
  tier: 'Tier 1' | 'Tier 2';
  amount: number;
  joinDate: string;
  status: 'Active' | 'Pending';
  nextPayout: string;
}

export interface Offer {
  id: string;
  title: string;
  discount: number;
  code: string;
  validUntil: string;
  isActive: boolean;
  type: 'Festive' | 'Mart Week' | 'Clearance';
}

// --- Marketing Integrations Types ---

export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  likes: number;
}

export interface WhatsAppContact {
  id: string;
  name: string;
  phone: string;
  tags: string[]; // e.g., 'New', 'VIP', 'Seller'
}

export interface WhatsAppCampaign {
  id: string;
  title: string;
  message: string;
  status: 'Draft' | 'Scheduled' | 'Sent';
  audienceSize: number;
  sentAt?: string;
  imageUrl?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: string;
  phone: string;
  rating: number;
  reviewsCount: number;
}

export interface NotificationLog {
  id: string;
  title: string;
  message: string;
  targetAudience: 'All' | 'New Users' | 'Sellers' | 'Investors';
  sentAt: string;
  status: 'Sent' | 'Failed';
  reach: number;
}

// --- SHG System Types ---

export interface SHGMember {
  id: string;
  name: string;
  fatherHusbandName: string;
  age: string;
  role: string;
  city: string;
  skill?: string;
  photo?: File | string | null; // Support both File object (upload) and string URL (display)
}

export interface SHGGroup {
  id: string;
  // Section A: Group Details
  name: string;
  state: string;
  district: string;
  block: string;
  village: string;
  category: 'Women Empowerment' | 'Handicrafts' | 'Rural Products' | 'Herbal/Organic' | 'Self-Employment' | 'Financial/Bank Linkage' | 'Others';
  
  // Section B: Leader Details (Private)
  leaderName: string;
  leaderFatherHusbandName: string;
  leaderPhone: string; 
  leaderWhatsapp: string;
  leaderPhoto?: string;
  leaderAadhar?: string;
  leaderEmail?: string;

  // Section C: Members
  members: SHGMember[]; 
  
  // Section D: Work
  workCategory: string;
  workDescription: string;
  
  // Metadata
  status: 'Pending' | 'Verified' | 'Rejected';
  verificationBadge: boolean;
  createdAt: string;
}