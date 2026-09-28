import {
  User, FarmerProfile, BuyerProfile, FPOProfile, CropLot, BuyerDemand,
  Offer, QualityReport, LogisticsOption, LogisticsBooking, StorageFacility,
  Transaction, PaymentRecord, Grievance, MarketPrice, Notification,
  SellingRecommendation, UserRole
} from '../types';

// Helper for local storage persistence
const STORAGE_KEY = 'agrilink_app_state_v1';

export const DEMO_USERS: Record<UserRole, User> = {
  farmer: {
    id: 'usr-farmer-01',
    name: 'Ramesh Singh',
    role: 'farmer',
    phone: '+91 98765 43210',
    email: 'ramesh.singh@agrilink.in',
    location: 'Ludhiana, Punjab',
    verified: true,
    verificationBadge: 'Verified',
    organizationName: 'Independent Farmer',
    rating: 4.9,
    reliabilityScore: 98,
  },
  buyer: {
    id: 'usr-buyer-01',
    name: 'Vikram Malhotra',
    role: 'buyer',
    phone: '+91 98111 22334',
    email: 'vikram@punjabagro.com',
    location: 'Ludhiana Industrial Area, Punjab',
    verified: true,
    verificationBadge: 'Verified',
    organizationName: 'Punjab Agro Foods Pvt Ltd',
    rating: 4.8,
    reliabilityScore: 95,
  },
  fpo: {
    id: 'usr-fpo-01',
    name: 'Gurdev Singh Dhillon',
    role: 'fpo',
    phone: '+91 94170 88990',
    email: 'contact@malwafpo.org',
    location: 'Moga, Punjab',
    verified: true,
    verificationBadge: 'Verified',
    organizationName: 'Malwa Farmers Producer Company Ltd',
    rating: 4.9,
    reliabilityScore: 97,
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Admin Desk (AgriLink HQ)',
    role: 'admin',
    phone: '+91 80000 11223',
    email: 'admin@agrilink.gov.in',
    location: 'Chandigarh, India',
    verified: true,
    verificationBadge: 'Verified',
    organizationName: 'AgriLink Platform Administration',
  }
};

export const INITIAL_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'mkt-wht-ldh',
    crop: 'Wheat',
    mandiName: 'Ludhiana APMC Main Mandi',
    district: 'Ludhiana',
    state: 'Punjab',
    distanceKm: 32,
    minPrice: 2380,
    maxPrice: 2490,
    modalPrice: 2450,
    priceChangePct: 8.4,
    arrivalVolumeQuintals: 4500,
    date: '2026-08-27',
    historical7Days: [
      { day: '21 Aug', price: 2260 },
      { day: '22 Aug', price: 2280 },
      { day: '23 Aug', price: 2310 },
      { day: '24 Aug', price: 2350 },
      { day: '25 Aug', price: 2400 },
      { day: '26 Aug', price: 2420 },
      { day: '27 Aug', price: 2450 },
    ]
  },
  {
    id: 'mkt-wht-khn',
    crop: 'Wheat',
    mandiName: 'Khanna Grain Market',
    district: 'Ludhiana',
    state: 'Punjab',
    distanceKm: 45,
    minPrice: 2340,
    maxPrice: 2420,
    modalPrice: 2390,
    priceChangePct: 5.1,
    arrivalVolumeQuintals: 6200,
    date: '2026-08-27',
    historical7Days: [
      { day: '21 Aug', price: 2270 },
      { day: '22 Aug', price: 2290 },
      { day: '23 Aug', price: 2300 },
      { day: '24 Aug', price: 2340 },
      { day: '25 Aug', price: 2360 },
      { day: '26 Aug', price: 2380 },
      { day: '27 Aug', price: 2390 },
    ]
  },
  {
    id: 'mkt-wht-mga',
    crop: 'Wheat',
    mandiName: 'Moga New APMC Mandi',
    district: 'Moga',
    state: 'Punjab',
    distanceKm: 71,
    minPrice: 2280,
    maxPrice: 2360,
    modalPrice: 2320,
    priceChangePct: -2.0,
    arrivalVolumeQuintals: 3800,
    date: '2026-08-27',
    historical7Days: [
      { day: '21 Aug', price: 2370 },
      { day: '22 Aug', price: 2360 },
      { day: '23 Aug', price: 2350 },
      { day: '24 Aug', price: 2340 },
      { day: '25 Aug', price: 2330 },
      { day: '26 Aug', price: 2325 },
      { day: '27 Aug', price: 2320 },
    ]
  },
  {
    id: 'mkt-pad-krl',
    crop: 'Paddy (Basmati)',
    mandiName: 'Karnal Grain Market',
    district: 'Karnal',
    state: 'Haryana',
    distanceKm: 120,
    minPrice: 3800,
    maxPrice: 4100,
    modalPrice: 3950,
    priceChangePct: 4.2,
    arrivalVolumeQuintals: 8900,
    date: '2026-08-27',
  },
  {
    id: 'mkt-prm-ldh',
    crop: 'Paddy (Parmal)',
    mandiName: 'Ludhiana APMC Main Mandi',
    district: 'Ludhiana',
    state: 'Punjab',
    distanceKm: 32,
    minPrice: 2120,
    maxPrice: 2220,
    modalPrice: 2180,
    priceChangePct: 1.8,
    arrivalVolumeQuintals: 5100,
    date: '2026-08-27',
  },
  {
    id: 'mkt-mze-hsp',
    crop: 'Maize',
    mandiName: 'Hoshiarpur Grain Mandi',
    district: 'Hoshiarpur',
    state: 'Punjab',
    distanceKm: 85,
    minPrice: 1980,
    maxPrice: 2100,
    modalPrice: 2050,
    priceChangePct: 3.5,
    arrivalVolumeQuintals: 2900,
    date: '2026-08-27',
  },
  {
    id: 'mkt-pot-jlr',
    crop: 'Potato',
    mandiName: 'Jalandhar Vegetable Market',
    district: 'Jalandhar',
    state: 'Punjab',
    distanceKm: 60,
    minPrice: 1350,
    maxPrice: 1480,
    modalPrice: 1420,
    priceChangePct: -1.5,
    arrivalVolumeQuintals: 7400,
    date: '2026-08-27',
  }
];

export const INITIAL_CROP_LOTS: CropLot[] = [
  {
    id: 'AGL-WHT-2026-00125',
    farmerId: 'usr-farmer-01',
    farmerName: 'Ramesh Singh',
    crop: 'Wheat',
    variety: 'Sharbati (PBW 725)',
    quantity: 72,
    unit: 'tonne',
    harvestDate: '2026-04-18',
    location: 'Ludhiana, Punjab',
    district: 'Ludhiana',
    state: 'Punjab',
    expectedPrice: 2450,
    minAcceptablePrice: 2380,
    qualityGrade: 'A',
    moisturePct: 11.4,
    cropCondition: 'Golden, well-dried, uniform grains',
    availableFrom: 'Immediate',
    storageRequired: false,
    images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'],
    status: 'Active',
    createdAt: '2026-08-25',
  },
  {
    id: 'AGL-PAD-2026-00088',
    farmerId: 'usr-farmer-01',
    farmerName: 'Ramesh Singh',
    crop: 'Paddy (Basmati)',
    variety: 'Pusa 1121',
    quantity: 45,
    unit: 'tonne',
    harvestDate: '2026-10-10',
    location: 'Ludhiana, Punjab',
    district: 'Ludhiana',
    state: 'Punjab',
    expectedPrice: 3950,
    minAcceptablePrice: 3850,
    qualityGrade: 'A+',
    moisturePct: 12.0,
    cropCondition: 'Aromatic long grain, clean',
    availableFrom: '2026-10-15',
    storageRequired: true,
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'],
    status: 'Active',
    createdAt: '2026-08-20',
  },
  {
    id: 'FPO-00124',
    farmerId: 'usr-fpo-01',
    farmerName: 'Malwa Farmers Producer Co.',
    fpoId: 'usr-fpo-01',
    fpoName: 'Malwa Farmers Producer Org',
    crop: 'Wheat',
    variety: 'HD 3086 & PBW 550',
    quantity: 120,
    unit: 'tonne',
    harvestDate: '2026-04-20',
    location: 'Moga, Punjab',
    district: 'Moga',
    state: 'Punjab',
    expectedPrice: 2480,
    minAcceptablePrice: 2420,
    qualityGrade: 'A',
    moisturePct: 11.2,
    cropCondition: 'Aggregated FPO Lot, High Purity',
    availableFrom: 'Immediate',
    storageRequired: true,
    images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'],
    status: 'Active',
    createdAt: '2026-08-24',
    isFpoAggregated: true,
    contributingFarmersCount: 46,
  }
];

export const INITIAL_BUYER_DEMANDS: BuyerDemand[] = [
  {
    id: 'AGL-DMD-9042',
    buyerId: 'usr-buyer-01',
    buyerName: 'Punjab Agro Foods Pvt Ltd',
    buyerType: 'Processor',
    buyerVerification: 'Verified',
    crop: 'Wheat',
    requiredQuantity: 100,
    unit: 'tonne',
    minPrice: 2400,
    maxPrice: 2550,
    maxMoisturePct: 12.0,
    location: 'Ludhiana Industrial Area',
    deadline: '2026-09-15',
    status: 'Open',
    createdAt: '2026-08-26',
  },
  {
    id: 'AGL-DMD-9088',
    buyerId: 'usr-buyer-02',
    buyerName: 'Northern Grains Corp',
    buyerType: 'Exporter',
    buyerVerification: 'Verified',
    crop: 'Paddy (Basmati)',
    requiredQuantity: 60,
    unit: 'tonne',
    minPrice: 3900,
    maxPrice: 4100,
    maxMoisturePct: 12.5,
    location: 'Karnal Export Hub',
    deadline: '2026-09-20',
    status: 'Open',
    createdAt: '2026-08-23',
  },
  {
    id: 'AGL-DMD-9102',
    buyerId: 'usr-buyer-03',
    buyerName: 'Apex Feed Mills Ltd',
    buyerType: 'Processor',
    buyerVerification: 'Verified',
    crop: 'Maize',
    requiredQuantity: 150,
    unit: 'tonne',
    minPrice: 2000,
    maxPrice: 2150,
    maxMoisturePct: 13.0,
    location: 'Hoshiarpur Plant',
    deadline: '2026-09-10',
    status: 'Open',
    createdAt: '2026-08-22',
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'AGL-OFR-3011',
    lotId: 'AGL-WHT-2026-00125',
    buyerId: 'usr-buyer-01',
    buyerName: 'Punjab Agro Foods Pvt Ltd',
    buyerRating: 4.8,
    buyerReliability: 95,
    offeredPrice: 2510,
    offeredQuantity: 70,
    paymentTermsDays: 2,
    distanceKm: 35,
    matchScore: 94,
    matchFactors: {
      cropMatch: true,
      quantityMatch: true,
      qualityMatch: true,
      locationMatch: true,
      priceMatch: true
    },
    status: 'Pending',
    createdAt: '2026-08-26 14:30',
  },
  {
    id: 'AGL-OFR-3012',
    lotId: 'AGL-WHT-2026-00125',
    buyerId: 'usr-buyer-02',
    buyerName: 'Northern Grains Corp',
    buyerRating: 4.6,
    buyerReliability: 89,
    offeredPrice: 2470,
    offeredQuantity: 72,
    paymentTermsDays: 5,
    distanceKm: 48,
    matchScore: 88,
    matchFactors: {
      cropMatch: true,
      quantityMatch: true,
      qualityMatch: true,
      locationMatch: false,
      priceMatch: true
    },
    status: 'Pending',
    createdAt: '2026-08-26 16:15',
  },
  {
    id: 'AGL-OFR-3013',
    lotId: 'AGL-WHT-2026-00125',
    buyerId: 'usr-buyer-03',
    buyerName: 'Apex Foods Pvt Ltd',
    buyerRating: 4.7,
    buyerReliability: 92,
    offeredPrice: 2530,
    offeredQuantity: 60,
    paymentTermsDays: 3,
    distanceKm: 61,
    matchScore: 91,
    matchFactors: {
      cropMatch: true,
      quantityMatch: false,
      qualityMatch: true,
      locationMatch: true,
      priceMatch: true
    },
    status: 'Pending',
    createdAt: '2026-08-27 09:10',
  }
];

export const INITIAL_QUALITY_REPORTS: Record<string, QualityReport> = {
  'AGL-WHT-2026-00125': {
    id: 'QR-8890',
    lotId: 'AGL-WHT-2026-00125',
    inspectorName: 'AgriLink Certified Inspector - Ludhiana Lab #04',
    moisturePct: 11.4,
    foreignMatterPct: 0.8,
    grainSizeMm: 6.5,
    damagedGrainsPct: 1.2,
    colorRating: 'Golden Bright',
    overallScore: 91,
    grade: 'A',
    certified: true,
    inspectionDate: '2026-08-26',
  }
};

export const INITIAL_LOGISTICS_OPTIONS: LogisticsOption[] = [
  {
    id: 'tr-01',
    driverName: 'Gurpreet Singh',
    driverPhone: '+91 98140 12345',
    truckType: 'Eicher 10-Tonne Container',
    capacityTonnes: 10,
    distanceKm: 15,
    estimatedCost: 4500,
    etaHours: 2,
    rating: 4.9,
  },
  {
    id: 'tr-02',
    driverName: 'Harpal Singh',
    driverPhone: '+91 98722 54321',
    truckType: 'Tata 20-Tonne Heavy Hauler',
    capacityTonnes: 20,
    distanceKm: 21,
    estimatedCost: 7200,
    etaHours: 3,
    rating: 4.7,
  },
  {
    id: 'tr-03',
    driverName: 'Jaswinder Kumar',
    driverPhone: '+91 94178 99887',
    truckType: 'Ashok Leyland 28-Tonne Trailer',
    capacityTonnes: 28,
    distanceKm: 34,
    estimatedCost: 9800,
    etaHours: 4,
    rating: 4.8,
  }
];

export const INITIAL_STORAGE_FACILITIES: StorageFacility[] = [
  {
    id: 'str-01',
    name: 'Punjab Agri Warehouse & Cold Chain',
    district: 'Ludhiana',
    distanceKm: 18,
    availableCapacityTonnes: 120,
    pricePerTonneMonth: 350,
    storageType: 'Cold Storage',
    tempControlled: true,
    rating: 4.9,
    contactPhone: '+91 161 2456789',
    capacityUtilization: 72,
  },
  {
    id: 'str-02',
    name: 'Khanna Scientific Grain Silos',
    district: 'Khanna',
    distanceKm: 42,
    availableCapacityTonnes: 450,
    pricePerTonneMonth: 280,
    storageType: 'Silo',
    tempControlled: false,
    rating: 4.8,
    contactPhone: '+91 1628 223344',
    capacityUtilization: 64,
  },
  {
    id: 'str-03',
    name: 'Moga Farmer Produce Storage Hub',
    district: 'Moga',
    distanceKm: 68,
    availableCapacityTonnes: 200,
    pricePerTonneMonth: 300,
    storageType: 'Dry Granary',
    tempControlled: false,
    rating: 4.6,
    contactPhone: '+91 1636 299111',
    capacityUtilization: 80,
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'AGL-TXN-2026-001245',
    lotId: 'AGL-WHT-2026-00125',
    offerId: 'AGL-OFR-3011',
    farmerId: 'usr-farmer-01',
    farmerName: 'Ramesh Singh',
    buyerId: 'usr-buyer-01',
    buyerName: 'Punjab Agro Foods Pvt Ltd',
    crop: 'Wheat',
    quantityTonnes: 72,
    pricePerQuintal: 2510,
    totalAmount: 1807200, // 72 tonnes = 720 quintals * 2510 = ₹18,07,200
    status: 'Delivery Completed',
    createdAt: '2026-08-26',
    updatedAt: '2026-08-27',
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-9011',
    txnId: 'AGL-TXN-2026-001245',
    totalAmount: 1807200,
    status: 'Pending',
    invoiceNumber: 'INV-AGL-2026-778',
    dueDate: '2026-08-29',
  }
];

export const INITIAL_GRIEVANCES: Grievance[] = [
  {
    id: 'AGL-GRV-1024',
    txnId: 'AGL-TXN-2026-00099',
    raisedBy: 'Ramesh Singh',
    raisedRole: 'farmer',
    category: 'Payment Issue',
    description: 'Buyer payment of ₹4,20,000 for Paddy lot is overdue by 3 days beyond the contracted 2-day SLA.',
    status: 'Under Review',
    createdAt: '2026-08-25',
    resolutionNotes: 'AgriLink Escrow Desk has issued formal notice to buyer. Resolution expected within 24h.'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'nt-01',
    title: 'New Buyer Offer Received!',
    message: 'Punjab Agro Foods offered ₹2,510/q for your Wheat lot AGL-WHT-2026-00125.',
    type: 'offer',
    read: false,
    createdAt: '10 mins ago',
  },
  {
    id: 'nt-02',
    title: 'Price Alert: Wheat ↑ 8.4%',
    message: 'Ludhiana mandi Wheat price reached ₹2,450/q (+8.4% this week). Optimal selling window active.',
    type: 'price',
    read: false,
    createdAt: '1 hour ago',
  },
  {
    id: 'nt-03',
    title: 'Quality Report Uploaded',
    message: 'Lab Inspection for AGL-WHT-2026-00125 certified Grade A (Overall Score: 91/100).',
    type: 'verification',
    read: true,
    createdAt: 'Yesterday',
  }
];

// Smart Buyer Matching Engine calculation helper
export function calculateBuyerMatchScore(
  lot: CropLot,
  demand: BuyerDemand,
  buyerReliability: number = 95
) {
  let score = 0;

  // 1. Crop Match (30%)
  const cropMatch = lot.crop.toLowerCase().includes(demand.crop.toLowerCase()) ||
                    demand.crop.toLowerCase().includes(lot.crop.toLowerCase());
  if (cropMatch) score += 30;

  // 2. Quantity Compatibility (20%)
  // Ratio of available lot quantity vs buyer requested quantity
  const qtyDiffRatio = Math.abs(lot.quantity - demand.requiredQuantity) / Math.max(lot.quantity, demand.requiredQuantity);
  const quantityMatch = qtyDiffRatio <= 0.4;
  score += Math.max(0, 20 * (1 - qtyDiffRatio));

  // 3. Quality Specs (20%)
  const qualityMatch = lot.moisturePct <= demand.maxMoisturePct;
  if (qualityMatch) score += 20;

  // 4. Location & Logistics (15%)
  const locationMatch = lot.district.toLowerCase() === demand.location.toLowerCase() ||
                        demand.location.toLowerCase().includes(lot.district.toLowerCase());
  score += locationMatch ? 15 : 10;

  // 5. Price Compatibility (10%)
  const priceMatch = lot.expectedPrice <= demand.maxPrice && lot.expectedPrice >= demand.minPrice;
  if (priceMatch) score += 10;

  // 6. Reliability Weight (5%)
  score += Math.round((buyerReliability / 100) * 5);

  const finalScore = Math.min(99, Math.max(65, Math.round(score)));

  return {
    score: finalScore,
    factors: {
      cropMatch,
      quantityMatch,
      qualityMatch,
      locationMatch,
      priceMatch
    }
  };
}

// Smart Selling Window Engine calculation helper
export function getSmartSellingRecommendation(crop: string, currentPrice: number): SellingRecommendation {
  if (crop.toLowerCase().includes('wheat')) {
    return {
      crop: 'Wheat',
      currentPrice: currentPrice || 2450,
      expectedPrice: 2520,
      recommendedAction: 'Consider holding lot for 3–5 days if dry storage is available to maximize return.',
      windowDays: '3–5 days',
      confidenceScore: 78,
      factors: [
        'Historical 7-day price trajectory shows strong upward momentum (+8.4%)',
        'Nearby Ludhiana & Khanna mandi arrivals down 14% this week',
        'Institutional buyer demand index currently at High (92/100)',
        'Favorable dry moisture level (11.4%) permits brief on-farm storage'
      ]
    };
  } else if (crop.toLowerCase().includes('paddy') || crop.toLowerCase().includes('rice')) {
    return {
      crop: 'Paddy (Basmati)',
      currentPrice: currentPrice || 3950,
      expectedPrice: 4120,
      recommendedAction: 'Optimal selling window active. Export demand peak predicted in next 7 days.',
      windowDays: '4–7 days',
      confidenceScore: 84,
      factors: [
        'Basmati export demand firming up ahead of international shipping windows',
        'Karnal hub buyers actively matching offers with low moisture tolerance',
        'Mandi arrivals expected to spike next week, which may soften spot prices'
      ]
    };
  }
  
  return {
    crop: crop,
    currentPrice: currentPrice || 2000,
    expectedPrice: Math.round(currentPrice * 1.04),
    recommendedAction: 'Market prices steady. Favorable time to accept offers above minimum threshold.',
    windowDays: '2–4 days',
    confidenceScore: 72,
    factors: [
      'Steady local processor demand',
      'Normal arrival volume across district mandis',
      'Transport availability normal'
    ]
  };
}
