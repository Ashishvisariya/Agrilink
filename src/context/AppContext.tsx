import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, UserRole, CropLot, BuyerDemand, Offer, QualityReport,
  LogisticsOption, LogisticsBooking, StorageFacility, Transaction,
  PaymentRecord, Grievance, MarketPrice, Notification
} from '../types';
import {
  DEMO_USERS, INITIAL_MARKET_PRICES, INITIAL_CROP_LOTS,
  INITIAL_BUYER_DEMANDS, INITIAL_OFFERS, INITIAL_QUALITY_REPORTS,
  INITIAL_LOGISTICS_OPTIONS, INITIAL_STORAGE_FACILITIES,
  INITIAL_TRANSACTIONS, INITIAL_PAYMENTS, INITIAL_GRIEVANCES,
  INITIAL_NOTIFICATIONS, calculateBuyerMatchScore
} from '../services/store';
import { Language, i18nTranslations } from '../services/i18n';

export type PageTab = 
  | 'landing'
  | 'farmer_dashboard'
  | 'create_lot'
  | 'buyer_matching'
  | 'buyer_demand'
  | 'offers'
  | 'quality'
  | 'logistics'
  | 'storage'
  | 'payments'
  | 'grievances'
  | 'market_intel'
  | 'price_map'
  | 'fpo_dashboard'
  | 'admin';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  currentLang: Language;
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  setLanguage: (lang: Language) => void;
  switchRole: (role: UserRole) => void;
  t: (key: string) => string;

  // Data state
  marketPrices: MarketPrice[];
  cropLots: CropLot[];
  buyerDemands: BuyerDemand[];
  offers: Offer[];
  qualityReports: Record<string, QualityReport>;
  logisticsOptions: LogisticsOption[];
  logisticsBookings: LogisticsBooking[];
  storageFacilities: StorageFacility[];
  transactions: Transaction[];
  payments: PaymentRecord[];
  grievances: Grievance[];
  notifications: Notification[];

  // Action methods
  publishCropLot: (lot: Omit<CropLot, 'id' | 'farmerId' | 'farmerName' | 'status' | 'createdAt'>) => string;
  postBuyerDemand: (demand: Omit<BuyerDemand, 'id' | 'buyerId' | 'buyerName' | 'buyerVerification' | 'status' | 'createdAt'>) => void;
  sendBuyerOffer: (lotId: string, price: number, quantity: number) => void;
  acceptOffer: (offerId: string) => void;
  rejectOffer: (offerId: string) => void;
  bookLogistics: (truckId: string, txnId: string) => void;
  submitGrievance: (txnId: string, category: Grievance['category'], description: string) => string;
  aggregateFpoLots: (farmerLotIds: string[], fpoLotTitle: string, expectedPrice: number) => void;
  verifyBuyerOrFarmer: (userId: string, approve: boolean) => void;
  resolveGrievance: (grievanceId: string, notes: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
  
  // Selected Context (e.g. active lot for detail view)
  selectedLotId?: string;
  setSelectedLotId: (id?: string) => void;
  selectedTxnId?: string;
  setSelectedTxnId: (id?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<PageTab>('landing');

  // State collections initialized with demo seed data
  const [marketPrices] = useState<MarketPrice[]>(INITIAL_MARKET_PRICES);
  const [cropLots, setCropLots] = useState<CropLot[]>(INITIAL_CROP_LOTS);
  const [buyerDemands, setBuyerDemands] = useState<BuyerDemand[]>(INITIAL_BUYER_DEMANDS);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [qualityReports, setQualityReports] = useState<Record<string, QualityReport>>(INITIAL_QUALITY_REPORTS);
  const [logisticsOptions] = useState<LogisticsOption[]>(INITIAL_LOGISTICS_OPTIONS);
  const [logisticsBookings, setLogisticsBookings] = useState<LogisticsBooking[]>([]);
  const [storageFacilities] = useState<StorageFacility[]>(INITIAL_STORAGE_FACILITIES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [grievances, setGrievances] = useState<Grievance[]>(INITIAL_GRIEVANCES);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const [selectedLotId, setSelectedLotId] = useState<string | undefined>('AGL-WHT-2026-00125');
  const [selectedTxnId, setSelectedTxnId] = useState<string | undefined>('AGL-TXN-2026-001245');

  const currentUser = DEMO_USERS[currentRole];

  // Helper i18n translation lookup
  const t = (key: string): string => {
    return i18nTranslations[currentLang]?.[key] || i18nTranslations.en?.[key] || key;
  };

  // Switch User Role
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'farmer') setActiveTab('farmer_dashboard');
    else if (role === 'buyer') setActiveTab('buyer_demand');
    else if (role === 'fpo') setActiveTab('fpo_dashboard');
    else if (role === 'admin') setActiveTab('admin');
  };

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
  };

  // 1. Publish Crop Lot
  const publishCropLot = (data: Omit<CropLot, 'id' | 'farmerId' | 'farmerName' | 'status' | 'createdAt'>): string => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const cropCode = data.crop.substring(0, 3).toUpperCase();
    const newLotId = `AGL-${cropCode}-2026-${randomNum}`;

    const newLot: CropLot = {
      ...data,
      id: newLotId,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setCropLots(prev => [newLot, ...prev]);
    setSelectedLotId(newLotId);

    // Automatically generate sample Quality Inspection Report
    const qualityReport: QualityReport = {
      id: `QR-${Math.floor(1000 + Math.random() * 9000)}`,
      lotId: newLotId,
      inspectorName: 'AgriLink Certified Quality Auditor',
      moisturePct: data.moisturePct || 11.5,
      foreignMatterPct: 0.9,
      grainSizeMm: 6.4,
      damagedGrainsPct: 1.1,
      colorRating: 'Natural Bright',
      overallScore: 91,
      grade: data.qualityGrade || 'A',
      certified: true,
      inspectionDate: new Date().toISOString().split('T')[0],
    };
    setQualityReports(prev => ({ ...prev, [newLotId]: qualityReport }));

    // Add Notification
    setNotifications(prev => [
      {
        id: `nt-${Date.now()}`,
        title: 'Crop Lot Published Successfully!',
        message: `Lot ${newLotId} (${data.quantity} ${data.unit} ${data.crop}) is now visible to verified buyers.`,
        type: 'offer',
        read: false,
        createdAt: 'Just now',
      },
      ...prev
    ]);

    return newLotId;
  };

  // 2. Post Buyer Demand
  const postBuyerDemand = (data: Omit<BuyerDemand, 'id' | 'buyerId' | 'buyerName' | 'buyerVerification' | 'status' | 'createdAt'>) => {
    const newDemand: BuyerDemand = {
      ...data,
      id: `AGL-DMD-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerId: currentUser.id,
      buyerName: currentUser.organizationName || currentUser.name,
      buyerVerification: currentUser.verificationBadge,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBuyerDemands(prev => [newDemand, ...prev]);
  };

  // 3. Send Buyer Offer
  const sendBuyerOffer = (lotId: string, price: number, quantity: number) => {
    const lot = cropLots.find(l => l.id === lotId);
    const offerId = `AGL-OFR-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Calculate Rule-Based Match Score
    let matchScore = 88;
    let matchFactors = { cropMatch: true, quantityMatch: true, qualityMatch: true, locationMatch: true, priceMatch: true };
    
    if (lot) {
      const matchResult = calculateBuyerMatchScore(lot, {
        id: 'tmp', buyerId: currentUser.id, buyerName: currentUser.name, buyerVerification: 'Verified',
        crop: lot.crop, requiredQuantity: quantity, unit: 'tonne', minPrice: price - 100, maxPrice: price + 100,
        maxMoisturePct: 12.5, location: lot.district, deadline: '2026-09-30', status: 'Open', createdAt: ''
      }, currentUser.reliabilityScore || 95);
      matchScore = matchResult.score;
      matchFactors = matchResult.factors;
    }

    const newOffer: Offer = {
      id: offerId,
      lotId: lotId,
      buyerId: currentUser.id,
      buyerName: currentUser.organizationName || currentUser.name,
      buyerRating: currentUser.rating || 4.8,
      buyerReliability: currentUser.reliabilityScore || 95,
      offeredPrice: price,
      offeredQuantity: quantity,
      paymentTermsDays: 2,
      distanceKm: 32,
      matchScore,
      matchFactors,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOffers(prev => [newOffer, ...prev]);

    setNotifications(prev => [
      {
        id: `nt-${Date.now()}`,
        title: 'New Offer Submitted!',
        message: `Your offer of ₹${price}/q for lot ${lotId} has been sent to the farmer.`,
        type: 'offer',
        read: false,
        createdAt: 'Just now',
      },
      ...prev
    ]);
  };

  // 4. Accept Offer
  const acceptOffer = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Accepted' } : o));

    const lot = cropLots.find(l => l.id === offer.lotId);
    if (lot) {
      setCropLots(prev => prev.map(l => l.id === lot.id ? { ...l, status: 'Under Offer' } : l));
    }

    // Create Transaction
    const newTxnId = `AGL-TXN-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalAmount = offer.offeredQuantity * 10 * offer.offeredPrice; // quantity (tonnes) * 10 (quintals/tonne) * price/quintal

    const newTxn: Transaction = {
      id: newTxnId,
      lotId: offer.lotId,
      offerId: offer.id,
      farmerId: lot?.farmerId || currentUser.id,
      farmerName: lot?.farmerName || currentUser.name,
      buyerId: offer.buyerId,
      buyerName: offer.buyerName,
      crop: lot?.crop || 'Wheat',
      quantityTonnes: offer.offeredQuantity,
      pricePerQuintal: offer.offeredPrice,
      totalAmount,
      status: 'Offer Accepted',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setTransactions(prev => [newTxn, ...prev]);
    setSelectedTxnId(newTxnId);

    // Create Payment Record
    const newPayment: PaymentRecord = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      txnId: newTxnId,
      totalAmount,
      status: 'Pending',
      invoiceNumber: `INV-${newTxnId}`,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setPayments(prev => [newPayment, ...prev]);

    setNotifications(prev => [
      {
        id: `nt-${Date.now()}`,
        title: 'Offer Accepted!',
        message: `Transaction ${newTxnId} created for ₹${totalAmount.toLocaleString('en-IN')}. Proceed to quality verification & transport.`,
        type: 'payment',
        read: false,
        createdAt: 'Just now',
      },
      ...prev
    ]);
  };

  // 5. Reject Offer
  const rejectOffer = (offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'Rejected' } : o));
  };

  // 6. Book Logistics
  const bookLogistics = (truckId: string, txnId: string) => {
    const truck = logisticsOptions.find(t => t.id === truckId);
    if (!truck) return;

    const bookingId = `AGL-LOG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: LogisticsBooking = {
      id: bookingId,
      txnId,
      lotId: selectedLotId || 'AGL-WHT-2026-00125',
      truckId,
      driverName: truck.driverName,
      driverPhone: truck.driverPhone,
      cost: truck.estimatedCost,
      status: 'Transport Assigned',
      pickupDate: new Date().toISOString().split('T')[0],
    };

    setLogisticsBookings(prev => [newBooking, ...prev]);

    // Advance transaction status
    setTransactions(prev => prev.map(t => t.id === txnId ? { ...t, status: 'Delivery Completed' } : t));

    setNotifications(prev => [
      {
        id: `nt-${Date.now()}`,
        title: 'Transport Booked!',
        message: `${truck.driverName} (${truck.truckType}) assigned. Pickup scheduled today.`,
        type: 'logistics',
        read: false,
        createdAt: 'Just now',
      },
      ...prev
    ]);
  };

  // 7. Submit Grievance
  const submitGrievance = (txnId: string, category: Grievance['category'], description: string): string => {
    const grvId = `AGL-GRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance: Grievance = {
      id: grvId,
      txnId,
      raisedBy: currentUser.name,
      raisedRole: currentRole,
      category,
      description,
      status: 'Submitted',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setGrievances(prev => [newGrievance, ...prev]);

    setNotifications(prev => [
      {
        id: `nt-${Date.now()}`,
        title: 'Grievance Registered',
        message: `Grievance ticket ${grvId} opened. AgriLink dispute desk will review within 24 hours.`,
        type: 'grievance',
        read: false,
        createdAt: 'Just now',
      },
      ...prev
    ]);

    return grvId;
  };

  // 8. Aggregate FPO Lots
  const aggregateFpoLots = (farmerLotIds: string[], fpoLotTitle: string, expectedPrice: number) => {
    const selectedLots = cropLots.filter(l => farmerLotIds.includes(l.id));
    const totalQuantity = selectedLots.reduce((acc, curr) => acc + curr.quantity, 0);

    const fpoLotId = `FPO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newFpoLot: CropLot = {
      id: fpoLotId,
      farmerId: currentUser.id,
      farmerName: currentUser.organizationName || 'Malwa FPO Aggregator',
      fpoId: currentUser.id,
      fpoName: currentUser.organizationName,
      crop: selectedLots[0]?.crop || 'Wheat',
      variety: 'FPO Pooled Grade A',
      quantity: totalQuantity,
      unit: 'tonne',
      harvestDate: new Date().toISOString().split('T')[0],
      location: currentUser.location,
      district: 'Moga',
      state: 'Punjab',
      expectedPrice,
      minAcceptablePrice: expectedPrice - 50,
      qualityGrade: 'A',
      moisturePct: 11.3,
      cropCondition: `Combined produce from ${selectedLots.length} member farmers`,
      availableFrom: 'Immediate',
      storageRequired: true,
      images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'],
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      isFpoAggregated: true,
      contributingFarmersCount: selectedLots.length || 18,
    };

    setCropLots(prev => [newFpoLot, ...prev]);
    setSelectedLotId(fpoLotId);
  };

  // 9. Admin Verify
  const verifyBuyerOrFarmer = (userId: string, approve: boolean) => {
    setNotifications(prev => [
      {
        id: `nt-${Date.now()}`,
        title: approve ? 'Account Verified' : 'Account Flagged',
        message: `Account ${userId} verification status updated to ${approve ? 'Verified' : 'Unverified'}.`,
        type: 'verification',
        read: false,
        createdAt: 'Just now',
      },
      ...prev
    ]);
  };

  // 10. Admin Resolve Grievance
  const resolveGrievance = (grievanceId: string, notes: string) => {
    setGrievances(prev => prev.map(g => g.id === grievanceId ? {
      ...g,
      status: 'Resolved',
      resolutionNotes: notes
    } : g));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetDemoData = () => {
    setCropLots(INITIAL_CROP_LOTS);
    setBuyerDemands(INITIAL_BUYER_DEMANDS);
    setOffers(INITIAL_OFFERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setPayments(INITIAL_PAYMENTS);
    setGrievances(INITIAL_GRIEVANCES);
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentLang,
        activeTab,
        setActiveTab,
        setLanguage,
        switchRole,
        t,

        marketPrices,
        cropLots,
        buyerDemands,
        offers,
        qualityReports,
        logisticsOptions,
        logisticsBookings,
        storageFacilities,
        transactions,
        payments,
        grievances,
        notifications,

        publishCropLot,
        postBuyerDemand,
        sendBuyerOffer,
        acceptOffer,
        rejectOffer,
        bookLogistics,
        submitGrievance,
        aggregateFpoLots,
        verifyBuyerOrFarmer,
        resolveGrievance,
        markNotificationRead,
        resetDemoData,

        selectedLotId,
        setSelectedLotId,
        selectedTxnId,
        setSelectedTxnId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
