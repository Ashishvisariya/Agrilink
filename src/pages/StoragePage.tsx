import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StorageFacility } from '../types';
import {
  Warehouse, MapPin, Snowflake, ShieldCheck,
  CheckCircle2, PhoneCall, ArrowRight, DollarSign
} from 'lucide-react';

export const StoragePage: React.FC = () => {
  const { storageFacilities, setActiveTab, t } = useApp();
  const [reservedId, setReservedId] = useState<string | null>(null);

  const handleReserve = (id: string) => {
    setReservedId(id);
    setTimeout(() => setReservedId(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <Warehouse className="w-4 h-4" />
            <span>Warehousing & Scientific Storage</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Nearby Storage Discovery</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Discover temperature-controlled cold storages, grain silos, and WDRA-accredited warehouses.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('payments')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
        >
          <span>View Payment Tracking</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {reservedId && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-md flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Storage Reservation Confirmed! Facility manager will contact you within 2 hours.</span>
          </div>
        </div>
      )}

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storageFacilities.map((fac) => (
          <div key={fac.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                  <Warehouse className="w-6 h-6" />
                </div>
                {fac.tempControlled && (
                  <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Snowflake className="w-3 h-3 text-cyan-600" /> Cold Storage
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base">{fac.name}</h4>
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{fac.district} ({fac.distanceKm} km away)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Available Space</div>
                  <div className="font-extrabold text-slate-900 text-sm mt-0.5">{fac.availableCapacityTonnes} Tonnes</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Monthly Price</div>
                  <div className="font-extrabold text-emerald-700 text-sm mt-0.5">₹{fac.pricePerTonneMonth}/tonne</div>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Capacity Utilization:</span>
                  <span className="font-bold text-slate-800">{fac.capacityUtilization}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${fac.capacityUtilization}%` }}
                  />
                </div>
              </div>

            </div>

            <button
              onClick={() => handleReserve(fac.id)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <span>Reserve Storage Space</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};
