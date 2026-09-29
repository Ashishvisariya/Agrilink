import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBar } from './components/DemoBar';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { FarmerLoginPage } from './pages/FarmerLoginPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { CreateLotPage } from './pages/CreateLotPage';
import { BuyerMatchingPage } from './pages/BuyerMatchingPage';
import { BuyerDemandPage } from './pages/BuyerDemandPage';
import { OffersPage } from './pages/OffersPage';
import { QualityGradingPage } from './pages/QualityGradingPage';
import { LogisticsPage } from './pages/LogisticsPage';
import { StoragePage } from './pages/StoragePage';
import { PaymentTrackingPage } from './pages/PaymentTrackingPage';
import { GrievancePage } from './pages/GrievancePage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { PriceMapPage } from './pages/PriceMapPage';
import { FpoDashboard } from './pages/FpoDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className={activeTab === 'farmer_login' ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
      {activeTab === 'landing' && <LandingPage />}
      {activeTab === 'farmer_login' && <FarmerLoginPage />}
      {activeTab === 'farmer_dashboard' && <FarmerDashboard />}
      {activeTab === 'create_lot' && <CreateLotPage />}
      {activeTab === 'buyer_matching' && <BuyerMatchingPage />}
      {activeTab === 'buyer_demand' && <BuyerDemandPage />}
      {activeTab === 'offers' && <OffersPage />}
      {activeTab === 'quality' && <QualityGradingPage />}
      {activeTab === 'logistics' && <LogisticsPage />}
      {activeTab === 'storage' && <StoragePage />}
      {activeTab === 'payments' && <PaymentTrackingPage />}
      {activeTab === 'grievances' && <GrievancePage />}
      {activeTab === 'market_intel' && <MarketIntelligencePage />}
      {activeTab === 'price_map' && <PriceMapPage />}
      {activeTab === 'fpo_dashboard' && <FpoDashboard />}
      {activeTab === 'admin' && <AdminDashboard />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-agri-bg flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
        <DemoBar />
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        
        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 px-4 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="font-extrabold text-sm text-white flex items-center justify-center sm:justify-start gap-1">
                <span>Agri<span className="text-emerald-500">Link</span></span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Full-Stack Agri Market Intelligence & Farmer-Buyer Linkage Platform</p>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Trade</span>
              <span>•</span>
              <span>Escrow Guidelines</span>
              <span>•</span>
              <span>APMC Integration Docs</span>
            </div>
          </div>
        </footer>

      </div>
    </AppProvider>
  );
};

export default App;
