import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers, Users, Package, TrendingUp, ShoppingBag,
  CheckCircle2, PlusCircle, ArrowRight, ShieldCheck
} from 'lucide-react';

export const FpoDashboard: React.FC = () => {
  const {
    currentUser, cropLots, aggregateFpoLots,
    setActiveTab, setSelectedLotId, t
  } = useApp();

  const [selectedLots, setSelectedLots] = useState<string[]>(['AGL-WHT-2026-00125']);
  const [fpoLotTitle, setFpoLotTitle] = useState('Malwa FPO Institutional Wheat Pool');
  const [targetPrice, setTargetPrice] = useState(2480);
  const [aggregated, setAggregated] = useState(false);

  const toggleSelectLot = (id: string) => {
    if (selectedLots.includes(id)) {
      setSelectedLots(selectedLots.filter(x => x !== id));
    } else {
      setSelectedLots([...selectedLots, id]);
    }
  };

  const handleAggregate = (e: React.FormEvent) => {
    e.preventDefault();
    aggregateFpoLots(selectedLots, fpoLotTitle, targetPrice);
    setAggregated(true);
    setTimeout(() => setAggregated(false), 4000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-agri-dark to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Farmer Producer Organization (FPO) Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              {currentUser.organizationName || 'Malwa Farmers Producer Org'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Aggregate smallholder produce, negotiate institutional volumes, and command premium pricing.
            </p>
          </div>

          <div className="bg-emerald-800/60 border border-emerald-500/40 px-4 py-2 rounded-xl text-xs font-bold text-emerald-300">
            Reg #FPO-PB-2021-99 • Moga District
          </div>
        </div>
      </div>

      {/* 5 Core FPO Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-bold uppercase">Total Farmers</div>
          <div className="text-2xl font-black text-slate-900">248</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Active Member Base</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-bold uppercase">Total Available Produce</div>
          <div className="text-2xl font-black text-slate-900">1,240 <span className="text-xs text-slate-400 font-normal">T</span></div>
          <div className="text-[11px] text-emerald-600 font-semibold">Wheat & Basmati</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-bold uppercase">Active FPO Lots</div>
          <div className="text-2xl font-black text-slate-900">32</div>
          <div className="text-[11px] text-slate-500 font-semibold">Pooled Listings</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-bold uppercase">Avg Expected Price</div>
          <div className="text-2xl font-black text-emerald-700">₹2,480/q</div>
          <div className="text-[11px] text-emerald-600 font-semibold">+₹30 vs Individual</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] text-slate-500 font-bold uppercase">Total Buyer Demand</div>
          <div className="text-2xl font-black text-amber-600">1,850 <span className="text-xs text-slate-400 font-normal">T</span></div>
          <div className="text-[11px] text-amber-700 font-semibold">Corporate Procurement</div>
        </div>

      </div>

      {aggregated && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-md flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>FPO Aggregated Lot #FPO-00124 Created! 120 Tonnes pooled from 46 member farmers.</span>
          </div>
        </div>
      )}

      {/* Produce Aggregation Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        <div>
          <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Farmer Produce Aggregation Workspace</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Combine multiple small farmer lots into a single high-volume institutional lot for bulk buyers.
          </p>
        </div>

        <form onSubmit={handleAggregate} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Aggregated Lot Title *</label>
              <input
                type="text"
                value={fpoLotTitle}
                onChange={(e) => setFpoLotTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pooled Expected Price (₹/Quintal) *</label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Select Farmer Lots */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Select Member Lots to Combine:</label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cropLots.map((lot) => {
                const isSelected = selectedLots.includes(lot.id);
                return (
                  <div
                    key={lot.id}
                    onClick={() => toggleSelectLot(lot.id)}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                      isSelected ? 'bg-emerald-50 border-emerald-300 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span><b>{lot.id}</b> • {lot.farmerName} ({lot.crop})</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-600">
                      <span>{lot.quantity} {lot.unit}s</span>
                      <span className="font-bold text-emerald-700">₹{lot.expectedPrice}/q</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-md text-xs flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Create Aggregated FPO Lot</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
