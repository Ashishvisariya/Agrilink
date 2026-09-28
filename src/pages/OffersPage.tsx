import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Offer } from '../types';
import {
  Scale, ShieldCheck, CheckCircle2, XCircle, ArrowRight,
  DollarSign, Clock, MapPin, Award, AlertCircle
} from 'lucide-react';

export const OffersPage: React.FC = () => {
  const {
    offers, cropLots, acceptOffer, rejectOffer,
    selectedLotId, setSelectedLotId, setActiveTab, t
  } = useApp();

  const [confirmOffer, setConfirmOffer] = useState<Offer | null>(null);

  const activeLot = cropLots.find(l => l.id === selectedLotId) || cropLots[0];
  const lotOffers = offers.filter(o => o.lotId === activeLot?.id || true);

  const handleConfirmAccept = () => {
    if (!confirmOffer) return;
    acceptOffer(confirmOffer.id);
    setConfirmOffer(null);
    setActiveTab('quality');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Digital Offer Management Matrix</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Offers for Lot {activeLot?.id}</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Compare buyer prices, payment SLAs, distance logistics, and match scores side-by-side.
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

      {/* Lot Details Banner */}
      <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center font-bold text-emerald-300">
            🌾
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-bold">Target Crop Produce</div>
            <div className="text-lg font-black">{activeLot?.crop} ({activeLot?.variety})</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300">
          <div>Volume: <b className="text-white text-sm">{activeLot?.quantity} Tonnes</b></div>
          <div>Expected: <b className="text-amber-400 text-sm">₹{activeLot?.expectedPrice}/q</b></div>
          <div>Location: <b className="text-white text-sm">{activeLot?.location}</b></div>
        </div>
      </div>

      {/* Offer Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-900 text-sm flex items-center justify-between">
          <span>Incoming Buyer Offers ({lotOffers.length})</span>
          <span className="text-xs text-slate-400">Ranked by Match Score</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                <th className="py-3 px-4">Buyer Company</th>
                <th className="py-3 px-4 text-right">Offered Price</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4 text-center">Payment SLA</th>
                <th className="py-3 px-4 text-center">Distance</th>
                <th className="py-3 px-4 text-center">Match Score</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {lotOffers.map((offer) => {
                const isAccepted = offer.status === 'Accepted';
                const isRejected = offer.status === 'Rejected';
                return (
                  <tr key={offer.id} className={`hover:bg-emerald-50/40 transition-colors ${isAccepted ? 'bg-emerald-50/70' : ''}`}>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs">
                          {offer.buyerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                            {offer.buyerName}
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Reliability: <b className="text-emerald-700">{offer.buyerReliability}%</b> • Rating: {offer.buyerRating} ★
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-black text-slate-900 text-base">
                      ₹{offer.offeredPrice.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-normal">/q</span>
                    </td>

                    <td className="py-4 px-4 text-right font-bold text-slate-700">
                      {offer.offeredQuantity} Tonnes
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-[11px]">
                        {offer.paymentTermsDays} Days SLA
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center text-slate-600">
                      {offer.distanceKm} km
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg">
                        {offer.matchScore}%
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className={`font-bold px-2.5 py-1 rounded-md text-[11px] ${
                        isAccepted ? 'bg-emerald-600 text-white' :
                        isRejected ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {offer.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right space-x-1">
                      {!isAccepted && !isRejected && (
                        <>
                          <button
                            onClick={() => setConfirmOffer(offer)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-2xs"
                          >
                            Accept Offer
                          </button>
                          <button
                            onClick={() => rejectOffer(offer.id)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {isAccepted && (
                        <button
                          onClick={() => setActiveTab('quality')}
                          className="bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 ml-auto"
                        >
                          <span>Quality Step</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmOffer && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Accept Buyer Offer?</h3>
                <p className="text-xs text-slate-500">Confirm transaction agreement with verified buyer</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Buyer:</span>
                <span className="font-bold text-slate-900">{confirmOffer.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Price per Quintal:</span>
                <span className="font-extrabold text-emerald-700 text-sm">₹{confirmOffer.offeredPrice}/q</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Offered Volume:</span>
                <span className="font-bold text-slate-900">{confirmOffer.offeredQuantity} Tonnes</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-700 font-extrabold">Total Transaction Value:</span>
                <span className="font-black text-emerald-700 text-base">
                  ₹{(confirmOffer.offeredQuantity * 10 * confirmOffer.offeredPrice).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOffer(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccept}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow-md"
              >
                Confirm & Create Transaction
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
