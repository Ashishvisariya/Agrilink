import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Globe } from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { currentRole, activeTab, switchRole, currentLang, setLanguage } = useApp();

  const roles: { role: UserRole; label: string }[] = [
    { role: 'farmer', label: 'Farmer' },
    { role: 'buyer', label: 'Buyer' },
    { role: 'fpo', label: 'FPO' },
    { role: 'admin', label: 'Admin' },
  ];

  if (activeTab === 'farmer_login') return null;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-500">Workspace</span>
          <div className="flex items-center gap-1">
            {roles.map(({ role, label }) => {
            const isActive = currentRole === role;
            return (
              <button
                key={role}
                onClick={() => switchRole(role)}
                aria-pressed={isActive}
                className={`px-2.5 py-1 rounded font-medium transition-colors text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200">
            <Globe className="w-3 h-3 text-slate-500" />
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value as any)}
              aria-label="Language"
              className="bg-transparent text-slate-700 text-xs focus:outline-none cursor-pointer py-0.5"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
