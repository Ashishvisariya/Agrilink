import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag, ShieldCheck, Filter, Calendar, MapPin,
  Building2, PlusCircle, CheckCircle2, ArrowRight
} from 'lucide-react';

export const BuyerDemandPage: React.FC = () => {
  const {
    buyerDemands, currentRole, postBuyerDemand,
    sendBuyerOffer, cropLots, setActiveTab, t
  } = useApp();

  const [filterCrop, setFilterCrop] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);

  const [newDemand, setNewDemand] = useState({
    crop: 'Wheat',
    requiredQuantity: 100,
    unit: 'tonne' as 'tonne' | 'quintal',
    minPrice: 2400,
    maxPrice: 2550,
    maxMoisturePct: 12.0,
    location: 'Ludhiana Industrial Area',
    deadline: '2026-09-15',
  });

  const filteredDemands = buyerDemands.filter(d => {
    if (filterCrop !== 'All' && !d.crop.toLowerCase().includes(filterCrop.toLowerCase())) return false;
    if (filterLocation !== 'All' && !d.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    return true;
  });

  const handlePostDemand = (e: React.FormEvent) => {
    e.preventDefault();
    postBuyerDemand(newDemand);
    setShowPostModal(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" />
            <span>Institutional Buyer Marketplace</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Buyer Demand Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Active crop procurement requirements posted by verified processors, exporters, and retail chains.
          </p>
        </div>

        {currentRole === 'buyer' && (
          <button
            onClick={() => setShowPostModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Crop Demand</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Demands:</span>
          </div>

          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
          >
            <option value="All">All Crops</option>
            <option value="Wheat">Wheat</option>
            <option value="Paddy">Paddy (Basmati)</option>
            <option value="Maize">Maize</option>
          </select>

          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
          >
            <option value="All">All Locations</option>
            <option value="Ludhiana">Ludhiana</option>
            <option value="Karnal">Karnal</option>
            <option value="Hoshiarpur">Hoshiarpur</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          Showing <b>{filteredDemands.length}</b> active demands
        </div>
      </div>

      {/* Demands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDemands.map((demand) => (
          <div key={demand.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            
            <div className="p-5 space-y-4">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{demand.buyerName}</span>
                    {demand.buyerVerification === 'Verified' && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    )}
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 mt-1">{demand.crop} Required</h3>
                </div>

                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                  {demand.buyerType || 'Corporate'}
                </span>
              </div>

              {/* Requirement Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Required Volume</div>
                  <div className="font-extrabold text-slate-900 text-base mt-0.5">{demand.requiredQuantity} {demand.unit}s</div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Offered Price Range</div>
                  <div className="font-extrabold text-emerald-700 text-base mt-0.5">₹{demand.minPrice}–₹{demand.maxPrice}/q</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quality spec: Moisture &lt; {demand.maxMoisturePct}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Delivery destination: {demand.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Procurement Deadline: <b>{demand.deadline}</b></span>
                </div>
              </div>

            </div>

            {/* Response CTA */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => {
                  const myLot = cropLots[0];
                  if (myLot) {
                    sendBuyerOffer(myLot.id, demand.maxPrice, Math.min(myLot.quantity, demand.requiredQuantity));
                    setActiveTab('offers');
                  } else {
                    setActiveTab('create_lot');
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Respond to Demand</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Post Demand Modal for Buyer */}
      {showPostModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900">Post New Crop Procurement Demand</h3>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handlePostDemand} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Crop Type</label>
                <select
                  value={newDemand.crop}
                  onChange={(e) => setNewDemand({ ...newDemand, crop: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Paddy (Basmati)">Paddy (Basmati)</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Volume (Tonnes)</label>
                  <input
                    type="number"
                    value={newDemand.requiredQuantity}
                    onChange={(e) => setNewDemand({ ...newDemand, requiredQuantity: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Moisture %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newDemand.maxMoisturePct}
                    onChange={(e) => setNewDemand({ ...newDemand, maxMoisturePct: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Price (₹/q)</label>
                  <input
                    type="number"
                    value={newDemand.minPrice}
                    onChange={(e) => setNewDemand({ ...newDemand, minPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Price (₹/q)</label>
                  <input
                    type="number"
                    value={newDemand.maxPrice}
                    onChange={(e) => setNewDemand({ ...newDemand, maxPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Location</label>
                <input
                  type="text"
                  value={newDemand.location}
                  onChange={(e) => setNewDemand({ ...newDemand, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Publish Demand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
