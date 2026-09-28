import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ShieldCheck, UserCheck, RefreshCw, Sparkles, Globe, PlayCircle } from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { currentRole, switchRole, currentLang, setLanguage, resetDemoData, setActiveTab } = useApp();

  const roles: { role: UserRole; label: string; icon: string; desc: string }[] = [
    { role: 'farmer', label: 'Farmer Demo', icon: '🌾', desc: 'Ramesh Singh (Ludhiana)' },
    { role: 'buyer', label: 'Buyer Demo', icon: '🏢', desc: 'Punjab Agro Foods' },
    { role: 'fpo', label: 'FPO Demo', icon: '🚜', desc: 'Malwa Farmers Co.' },
    { role: 'admin', label: 'Admin Demo', icon: '🛡️', desc: 'Platform Desk' },
  ];

  const handleStartDemoFlow = () => {
    switchRole('farmer');
    setActiveTab('farmer_dashboard');
  };

  return (
    <div className="bg-agri-dark text-white border-b border-emerald-900/40 text-xs py-2 px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: SIH Demo Mode Title */}
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            SIH 2026 Interactive Demo Mode
          </span>
          <span className="text-gray-300 hidden lg:inline">Select a role to test full end-to-end platform workflows:</span>
        </div>

        {/* Middle: Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
          {roles.map(({ role, label, icon, desc }) => {
            const isActive = currentRole === role;
            return (
              <button
                key={role}
                onClick={() => switchRole(role)}
                title={desc}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400 font-semibold'
                    : 'bg-emerald-950/60 text-gray-300 hover:bg-emerald-900/80 hover:text-white'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Language Selector & Reset Data */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Flow Trigger */}
          <button
            onClick={handleStartDemoFlow}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1 rounded flex items-center gap-1 transition-all text-xs shadow-sm"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Full Demo Flow</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            <Globe className="w-3 h-3 text-emerald-400" />
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-gray-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English (EN)</option>
              <option value="hi" className="bg-slate-900 text-white">हिंदी (HI)</option>
              <option value="pa" className="bg-slate-900 text-white">ਪੰਜਾਬੀ (PA)</option>
            </select>
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={resetDemoData}
            title="Reset dataset back to clean state"
            className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
