import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSmartSellingRecommendation } from '../services/store';
import {
  TrendingUp, TrendingDown, DollarSign, Package,
  Sparkles, Award, ArrowUpRight, ArrowDownRight,
  Filter, Calendar, MapPin, ChevronRight, CheckCircle2,
  Clock, AlertTriangle, Lightbulb
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';

export const FarmerDashboard: React.FC = () => {
  const {
    currentUser, marketPrices, cropLots, offers,
    payments, setActiveTab, setSelectedLotId, t
  } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedRange, setSelectedRange] = useState<'7' | '30'>('7');

  const farmerLots = cropLots.filter(l => l.farmerId === currentUser.id);
  const activeLot = farmerLots[0] || cropLots[0];

  const wheatPrices = marketPrices.filter(m => m.crop.toLowerCase().includes(selectedCrop.toLowerCase()));
  const ludhianaPrice = wheatPrices.find(m => m.district === 'Ludhiana') || marketPrices[0];

  const pendingPaymentsTotal = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + p.totalAmount, 0);

  const smartRec = getSmartSellingRecommendation(selectedCrop, ludhianaPrice?.modalPrice || 2450);

  const chartData = ludhianaPrice?.historical7Days || [
    { day: '21 Aug', price: 2260 },
    { day: '22 Aug', price: 2280 },
    { day: '23 Aug', price: 2310 },
    { day: '24 Aug', price: 2350 },
    { day: '25 Aug', price: 2400 },
    { day: '26 Aug', price: 2420 },
    { day: '27 Aug', price: 2450 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner Welcome */}
      <div className="bg-gradient-to-r from-emerald-900 via-agri-dark to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>🌾 Farmer Dashboard</span>
              <span>•</span>
              <span>{currentUser.location}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              Good Morning, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Here is your crop price intelligence and buyer offer summary for today.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('create_lot')}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
          >
            <span>+ Create New Crop Lot</span>
          </button>
        </div>
      </div>

      {/* 4 Core Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Today's Best Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Today's Best Price</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{ludhianaPrice?.modalPrice.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-medium">/ quintal</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-max">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+{ludhianaPrice?.priceChangePct}% this week</span>
          </div>
        </div>

        {/* Card 2: Crop Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Your Crop Value</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {activeLot ? `${activeLot.quantity} ${activeLot.unit}s` : '1,200 kg'}
          </div>
          <p className="text-xs text-slate-600 font-semibold">
            Estimated value: <span className="text-emerald-700 font-bold">₹{((activeLot?.quantity || 72) * 10 * (ludhianaPrice?.modalPrice || 2450)).toLocaleString('en-IN')}</span>
          </p>
        </div>

        {/* Card 3: Active Offers */}
        <div
          onClick={() => setActiveTab('offers')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Active Buyer Offers</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {offers.length} Buyer Offers
          </div>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span>Highest offer: ₹2,530/q</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </p>
        </div>

        {/* Card 4: Pending Payment */}
        <div
          onClick={() => setActiveTab('payments')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Pending Payment</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{pendingPaymentsTotal.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-amber-600 font-semibold flex items-center gap-1">
            <span>Invoice #INV-AGL-2026-778</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </p>
        </div>

      </div>

      {/* Smart Selling Window Recommendation Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-amber-400/60 rounded-2xl p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                Recommended Selling Window
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 uppercase">
                  Confidence: {smartRec.confidenceScore}%
                </span>
              </h3>
              <p className="text-xs text-slate-600">Decision-support price trajectory engine for {smartRec.crop}</p>
            </div>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs text-left sm:text-right">
            <div className="text-[11px] text-slate-500 font-semibold">Expected Price Projection</div>
            <div className="text-base font-black text-emerald-700">
              ₹{smartRec.currentPrice} → <span className="text-amber-600">₹{smartRec.expectedPrice}/q</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-xl p-4 border border-amber-200/60 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Recommendation: {smartRec.recommendedAction}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 pt-2 border-t border-slate-200/60">
            {smartRec.factors.map((f, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Important: Decision-support recommendation based on APMC trend models, not a guaranteed future price.
          </span>
          <button
            onClick={() => setActiveTab('offers')}
            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Buyer Offers →</span>
          </button>
        </div>

      </div>

      {/* Market Intelligence Widget */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Market Intelligence Widget
            </h3>
            <p className="text-xs text-slate-500">Live prices across nearby APMC Mandis & historical price trends</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Crop:</span>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="Wheat">Wheat</option>
                <option value="Paddy">Paddy (Basmati)</option>
                <option value="Maize">Maize</option>
                <option value="Potato">Potato</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <button
                onClick={() => setSelectedRange('7')}
                className={`px-2 py-0.5 rounded ${selectedRange === '7' ? 'bg-white font-bold shadow-2xs text-emerald-700' : 'text-slate-600'}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setSelectedRange('30')}
                className={`px-2 py-0.5 rounded ${selectedRange === '30' ? 'bg-white font-bold shadow-2xs text-emerald-700' : 'text-slate-600'}`}
              >
                30 Days
              </button>
            </div>
          </div>
        </div>

        {/* Nearby Market Prices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                <th className="py-3 px-4">Market / Mandi</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Distance</th>
                <th className="py-3 px-4 text-right">Min Price</th>
                <th className="py-3 px-4 text-right">Max Price</th>
                <th className="py-3 px-4 text-right">Modal Price</th>
                <th className="py-3 px-4 text-right">Weekly Trend</th>
                <th className="py-3 px-4 text-right">Arrival Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {wheatPrices.map((m) => (
                <tr key={m.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{m.mandiName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{m.district}</td>
                  <td className="py-3.5 px-4 text-slate-600">{m.distanceKm} km</td>
                  <td className="py-3.5 px-4 text-right text-slate-600">₹{m.minPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-right text-slate-600">₹{m.maxPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-700 text-sm">
                    ₹{m.modalPrice.toLocaleString('en-IN')} /q
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`inline-flex items-center gap-0.5 font-bold px-2 py-0.5 rounded ${
                      m.priceChangePct >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {m.priceChangePct >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {m.priceChangePct >= 0 ? `+${m.priceChangePct}%` : `${m.priceChangePct}%`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600">{m.arrivalVolumeQuintals.toLocaleString('en-IN')} q</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Line Chart Visualization */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-sm text-slate-900">
              {selectedCrop} Price Trajectory ({selectedRange}-Day Trend in Ludhiana Mandi)
            </h4>
            <span className="text-[11px] text-slate-400">Source: Prototype APMC Data</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={['auto', 'auto']} stroke="#94a3b8" fontSize={11} unit=" ₹" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0e2920', color: '#fff', borderRadius: '8px', border: 'none' }}
                  formatter={(value: any) => [`₹${value} / quintal`, 'Modal Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10b981' }}
                  activeDot={{ r: 8, fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
