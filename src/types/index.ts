export type UserRole = 'farmer' | 'buyer' | 'fpo' | 'admin';

export type VerificationStatus = 'Verified' | 'Pending' | 'Unverified';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  location: string;
  avatar?: string;
  verified: boolean;
  verificationBadge: VerificationStatus;
  organizationName?: string;
  rating?: number;
  reliabilityScore?: number;
}

export interface FarmerProfile {
  userId: string;
  landSizeAcres: number;
  mainCrops: string[];
  bankAccountVerified: boolean;
  upiId: string;
}

export interface BuyerProfile {
  userId: string;
  companyName: string;
  gstNumber: string;
  buyerType: 'Processor' | 'Exporter' | 'Retail Chain' | 'Wholesaler' | 'Institutional Aggregator';
  cropsPurchased: string[];
  typicalVolume: string;
  avgPaymentDays: number;
  completedTxns: number;
  rating: number;
  reliabilityScore: number;
  verificationStatus: VerificationStatus;
}

export interface FPOProfile {
  userId: string;
  fpoName: string;
  regNumber: string;
  memberCount: number;
  district: string;
  totalCapacityTonnes: number;
}

export interface CropLot {
  id: string; // e.g. AGL-WHT-2026-00125
  farmerId: string;
  farmerName: string;
  fpoId?: string;
  fpoName?: string;
  crop: string;
  variety: string;
  quantity: number; // in tonnes or quintals based on unit
  unit: 'quintal' | 'tonne' | 'kg';
  harvestDate: string;
  location: string;
  district: string;
  state: string;
  expectedPrice: number; // ₹ per quintal
  minAcceptablePrice: number;
  qualityGrade: 'A+' | 'A' | 'B' | 'C';
  moisturePct: number;
  cropCondition: string;
  availableFrom: string;
  storageRequired: boolean;
  images: string[];
  status: 'Active' | 'Under Offer' | 'Sold' | 'Archived';
  createdAt: string;
  isFpoAggregated?: boolean;
  contributingFarmersCount?: number;
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType?: string;
  buyerVerification: VerificationStatus;
  crop: string;
  requiredQuantity: number; // in tonnes
  unit: 'tonne' | 'quintal';
  minPrice: number; // ₹ per quintal
  maxPrice: number; // ₹ per quintal
  maxMoisturePct: number;
  location: string;
  deadline: string;
  status: 'Open' | 'Fulfilled' | 'Expired';
  createdAt: string;
}

export interface MatchFactors {
  cropMatch: boolean;
  quantityMatch: boolean;
  qualityMatch: boolean;
  locationMatch: boolean;
  priceMatch: boolean;
}

export interface Offer {
  id: string;
  lotId: string;
  buyerId: string;
  buyerName: string;
  buyerRating: number;
  buyerReliability: number;
  offeredPrice: number; // ₹ per quintal
  offeredQuantity: number; // in tonnes
  paymentTermsDays: number;
  distanceKm: number;
  matchScore: number; // 0-100
  matchFactors: MatchFactors;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Countered';
  counterPrice?: number;
  createdAt: string;
}

export interface QualityReport {
  id: string;
  lotId: string;
  inspectorName: string;
  moisturePct: number;
  foreignMatterPct: number;
  grainSizeMm: number;
  damagedGrainsPct: number;
  colorRating: string;
  overallScore: number; // 0-100 e.g. 91
  grade: 'A+' | 'A' | 'B' | 'C';
  certified: boolean;
  inspectionDate: string;
}

export interface LogisticsOption {
  id: string;
  driverName: string;
  driverPhone: string;
  truckType: string;
  capacityTonnes: number;
  distanceKm: number;
  estimatedCost: number; // ₹
  etaHours: number;
  rating: number;
}

export interface LogisticsBooking {
  id: string;
  txnId: string;
  lotId: string;
  truckId: string;
  driverName: string;
  driverPhone: string;
  cost: number;
  status: 'Order Confirmed' | 'Transport Assigned' | 'Pickup Scheduled' | 'Crop Picked Up' | 'In Transit' | 'Delivered';
  pickupDate: string;
  deliveryDate?: string;
}

export interface StorageFacility {
  id: string;
  name: string;
  district: string;
  distanceKm: number;
  availableCapacityTonnes: number;
  pricePerTonneMonth: number;
  storageType: 'Cold Storage' | 'Dry Granary' | 'Silo';
  tempControlled: boolean;
  rating: number;
  contactPhone: string;
  capacityUtilization: number;
}

export interface Transaction {
  id: string; // e.g. AGL-TXN-2026-001245
  lotId: string;
  offerId: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  crop: string;
  quantityTonnes: number;
  pricePerQuintal: number;
  totalAmount: number;
  status: 'Offer Accepted' | 'Quality Verified' | 'Delivery Completed' | 'Invoice Generated' | 'Payment Processing' | 'Payment Completed';
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  txnId: string;
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  invoiceNumber: string;
  dueDate: string;
  paidDate?: string;
  utrNumber?: string;
}

export interface Grievance {
  id: string; // e.g. AGL-GRV-1024
  txnId: string;
  raisedBy: string;
  raisedRole: UserRole;
  category: 'Payment Issue' | 'Quality Dispute' | 'Quantity Mismatch' | 'Delivery Issue' | 'Other';
  description: string;
  evidenceUrl?: string;
  status: 'Submitted' | 'Under Review' | 'Resolution Proposed' | 'Resolved';
  createdAt: string;
  resolutionNotes?: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  mandiName: string;
  district: string;
  state: string;
  distanceKm: number;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceChangePct: number; // e.g. +8.4
  arrivalVolumeQuintals: number;
  date: string;
  historical7Days?: { day: string; price: number }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'offer' | 'price' | 'verification' | 'logistics' | 'payment' | 'grievance';
  read: boolean;
  createdAt: string;
}

export interface SellingRecommendation {
  crop: string;
  currentPrice: number;
  expectedPrice: number;
  recommendedAction: string;
  windowDays: string;
  confidenceScore: number;
  factors: string[];
}
