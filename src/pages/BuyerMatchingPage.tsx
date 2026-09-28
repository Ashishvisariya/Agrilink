import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateBuyerMatchScore } from '../services/store';
import {
  Award, ShieldCheck, CheckCircle2, XCircle, ArrowRight,
  Building2, MapPin, Calendar, Clock, Send, Eye
} from 'lucide-react';

export const BuyerMatchingPage: React.FC = () => {
  const {
    cropLots, buyerDemands, selectedLotId, setSelectedLotId,
    sendBuyerOffer, setActiveTab, t
  } = useApp();

  const [activeBuyerModal, setActiveBuyerModal] = useState<any | null>(null);

  const activeLot = cropLots.find(l => l.id === selectedLotId) || cropLots[0];

  const matchedDemands = buyerDemands.map(demand => {
    const matchResult = calculateBuyerMatchScore(activeLot, demand, 95);
    return {
      demand,
      matchScore: matchResult.score,
      factors: matchResult.factors
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Smart Rule-Based Buyer Matching Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Recommended Verified Buyers</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Buyers algorithmically matched for lot <span className="font-mono font-bold text-emerald-700">{activeLot?.id}</span> ({activeLot?.crop}, {activeLot?.quantity} {activeLot?.unit}s).
          </p>
        </div>

        {/* Lot Selector */}
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-2 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Active Lot:</span>
          <select
            value={activeLot?.id}
            onChange={(e) => setSelectedLotId(e.target.value)}
            className="bg-transparent text-xs font-extrabold text-slate-900 focus:outline-none cursor-pointer"
          >
            {cropLots.map(l => (
              <option key={l.id} value={l.id}>{l.id} - {l.crop} ({l.quantity}T)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recommended Buyers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedDemands.map(({ demand, matchScore, factors }) => (
          <div key={demand.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            
            {/* Header with Match Badge */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-extrabold text-base text-slate-900">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>{demand.buyerName}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Corporate Buyer</span>
                  <span>•</span>
                  <span>95% Reliability</span>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white font-extrabold text-sm px-3 py-1 rounded-xl shadow-xs text-center border border-emerald-400">
                <div>{matchScore}%</div>
                <div className="text-[9px] uppercase font-semibold text-emerald-100">Match</div>
              </div>
            </div>

            {/* Spec Comparison */}
            <div className="p-5 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Buyer Requirements</div>
                  <div className="font-bold text-slate-900 mt-0.5">{demand.crop}</div>
                  <div className="text-slate-600">{demand.requiredQuantity} {demand.unit}s</div>
                  <div className="text-slate-600">Moisture &lt; {demand.maxMoisturePct}%</div>
                  <div className="text-emerald-700 font-bold mt-1">₹{demand.minPrice}–₹{demand.maxPrice}/q</div>
                </div>

                <div className="border-l border-slate-200 pl-3">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Your Lot ({activeLot.id})</div>
                  <div className="font-bold text-slate-900 mt-0.5">{activeLot.crop}</div>
                  <div className="text-slate-600">{activeLot.quantity} {activeLot.unit}s</div>
                  <div className="text-slate-600">Moisture: {activeLot.moisturePct}%</div>
                  <div className="text-slate-900 font-bold mt-1">Expected: ₹{activeLot.expectedPrice}/q</div>
                </div>
              </div>

              {/* Match Factors Checklist */}
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Matching Parameters</div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                  <div className="flex items-center gap-1">
                    {factors.cropMatch ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                    <span>Crop match</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {factors.quantityMatch ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                    <span>Quantity match</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {factors.qualityMatch ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                    <span>Quality moisture</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {factors.priceMatch ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                    <span>Price compatibility</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2">
              <button
                onClick={() => setActiveBuyerModal(demand)}
                className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Buyer</span>
              </button>

              <button
                onClick={() => {
                  sendBuyerOffer(activeLot.id, activeLot.expectedPrice, Math.min(activeLot.quantity, demand.requiredQuantity));
                  setActiveTab('offers');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Offer</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Buyer Profile Detail Modal */}
      {activeBuyerModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl text-slate-900">{activeBuyerModal.buyerName}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">GST: 03AAAAA0000A1Z5 • Ludhiana Industrial Area</div>
              </div>
              <button onClick={() => setActiveBuyerModal(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-slate-500 font-bold text-[10px] uppercase">Payment Reliability</div>
                <div className="text-xl font-black text-emerald-700">95%</div>
                <div className="text-slate-500 mt-0.5">Average SLA: 2.1 days</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-slate-500 font-bold text-[10px] uppercase">Completed Orders</div>
                <div className="text-xl font-black text-slate-900">248 Txns</div>
                <div className="text-slate-500 mt-0.5">Rating: 4.8 / 5.0 ★</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Crops Typically Purchased</h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-semibold">Wheat (Sharbati & HD3086)</span>
                <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-semibold">Basmati Rice (Pusa 1121)</span>
                <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-semibold">Maize</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveBuyerModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Close Profile
              </button>
              <button
                onClick={() => {
                  sendBuyerOffer(activeLot.id, activeLot.expectedPrice, Math.min(activeLot.quantity, activeBuyerModal.requiredQuantity));
                  setActiveBuyerModal(null);
                  setActiveTab('offers');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs"
              >
                Send Offer to {activeBuyerModal.buyerName}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
