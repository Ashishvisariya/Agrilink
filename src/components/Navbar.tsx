import React, { useState } from 'react';
import { useApp, PageTab } from '../context/AppContext';
import {
  Sprout, TrendingUp, ShoppingBag, PlusCircle, Award,
  Truck, Warehouse, CreditCard, AlertCircle, Layers,
  Bell, Menu, X, CheckCircle2, ChevronRight, MapPin, Shield
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser, currentRole, activeTab, setActiveTab,
    notifications, markNotificationRead, t
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { tab: PageTab; label: string; icon: React.ReactNode; roles?: string[] }[] = [
    { tab: 'landing', label: 'Home', icon: <Sprout className="w-4 h-4" /> },
    { tab: 'farmer_dashboard', label: 'Dashboard', icon: <TrendingUp className="w-4 h-4" />, roles: ['farmer'] },
    { tab: 'market_intel', label: 'Market Prices', icon: <TrendingUp className="w-4 h-4" /> },
    { tab: 'price_map', label: 'Price Map', icon: <MapPin className="w-4 h-4" /> },
    { tab: 'buyer_demand', label: 'Buyer Demand', icon: <ShoppingBag className="w-4 h-4" /> },
    { tab: 'create_lot', label: 'Create Lot', icon: <PlusCircle className="w-4 h-4" />, roles: ['farmer', 'fpo'] },
    { tab: 'buyer_matching', label: 'Smart Matching', icon: <Award className="w-4 h-4" />, roles: ['farmer', 'fpo'] },
    { tab: 'offers', label: 'Offers', icon: <ShoppingBag className="w-4 h-4" />, roles: ['farmer', 'fpo', 'buyer'] },
    { tab: 'quality', label: 'Quality', icon: <CheckCircle2 className="w-4 h-4" /> },
    { tab: 'logistics', label: 'Logistics', icon: <Truck className="w-4 h-4" /> },
    { tab: 'storage', label: 'Storage', icon: <Warehouse className="w-4 h-4" /> },
    { tab: 'payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
    { tab: 'grievances', label: 'Grievances', icon: <AlertCircle className="w-4 h-4" /> },
    { tab: 'fpo_dashboard', label: 'FPO Aggregation', icon: <Layers className="w-4 h-4" />, roles: ['fpo', 'admin'] },
    { tab: 'admin', label: 'Admin Portal', icon: <Shield className="w-4 h-4" />, roles: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(currentRole);
  });

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-agri-dark">Agri<span className="text-emerald-600">Link</span></span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">India</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">Farmer-Buyer Intelligence Platform</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {visibleNavItems.slice(0, 8).map(item => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 shadow-2xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile & Right Actions */}
          <div className="flex items-center gap-3">

            {/* Notification Drawer Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      Notifications ({notifications.length})
                    </h4>
                    <span className="text-[11px] text-emerald-600 font-semibold cursor-pointer hover:underline">Mark all read</span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No new notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 text-xs transition-colors cursor-pointer hover:bg-slate-50 ${
                            !n.read ? 'bg-emerald-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Current User Role Badge Card */}
            <div
              onClick={() => setActiveTab(currentRole === 'farmer' ? 'farmer_dashboard' : currentRole === 'buyer' ? 'buyer_demand' : currentRole === 'fpo' ? 'fpo_dashboard' : 'admin')}
              className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-1.5 pr-3 cursor-pointer hover:bg-emerald-100/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left leading-tight">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {currentRole === 'fpo' ? 'FPO' : currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Workspace
                  {currentUser.verified && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                  )}
                </div>
                <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                  {currentUser.location}
                </span>
              </div>
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-1.5 py-2">
            {visibleNavItems.map(item => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
