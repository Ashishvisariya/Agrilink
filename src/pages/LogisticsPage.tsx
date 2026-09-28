import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Truck, MapPin, Clock, ShieldCheck, CheckCircle2,
  ArrowRight, PhoneCall, ChevronRight
} from 'lucide-react';

export const LogisticsPage: React.FC = () => {
  const {
    logisticsOptions, logisticsBookings, bookLogistics,
    selectedTxnId, transactions, setActiveTab, t
  } = useApp();

  const activeTxn = transactions.find(t => t.id === selectedTxnId) || transactions[0];
  const activeBooking = logisticsBookings[0];

  const deliverySteps = [
    { title: 'Order Confirmed', completed: true },
    { title: 'Transport Assigned', completed: activeBooking ? true : false },
    { title: 'Pickup Scheduled', completed: activeBooking ? true : false },
    { title: 'Crop Picked Up', completed: false },
    { title: 'In Transit', completed: false },
    { title: 'Delivered', completed: false },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            <span>Transport & Fleet Logistics</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Logistics & Delivery Coordination</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Book verified heavy trucks, schedule farm pickup, and track crop shipment status live.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('storage')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
        >
          <span>Discover Nearby Storage</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Delivery Visual Timeline */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-900 space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Active Delivery Tracking</div>
            <div className="text-xl font-black mt-0.5">Transaction #{activeTxn?.id || 'AGL-TXN-2026-001245'}</div>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            {activeBooking ? activeBooking.status : 'Ready to Book Transport'}
          </span>
        </div>

        {/* Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          {deliverySteps.map((step, idx) => (
            <div key={idx} className="space-y-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold text-xs ${
                step.completed ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {step.completed ? '✓' : idx + 1}
              </div>
              <div className={`font-semibold ${step.completed ? 'text-emerald-300' : 'text-slate-400'}`}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Transport Trucks List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xl text-slate-900">Available Transport Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {logisticsOptions.map((truck) => (
            <div key={truck.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all p-5 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    ★ {truck.rating} Driver Rating
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{truck.truckType}</h4>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Driver: {truck.driverName}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Capacity</div>
                    <div className="font-bold text-slate-900">{truck.capacityTonnes} Tonnes</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">ETA Pickup</div>
                    <div className="font-bold text-emerald-700">{truck.etaHours} Hours</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Distance: {truck.distanceKm} km</span>
                  <span className="font-black text-slate-900 text-base">₹{truck.estimatedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => bookLogistics(truck.id, activeTxn?.id || 'AGL-TXN-2026-001245')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <span>Book Transport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
