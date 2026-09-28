import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp, BarChart3, Filter, Calendar, MapPin,
  Info, ArrowUpRight, ArrowDownRight, Layers
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area
} from 'recharts';

export const MarketIntelligencePage: React.FC = () => {
  const { marketPrices, t } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const filteredPrices = marketPrices.filter(m => {
    if (!m.crop.toLowerCase().includes(selectedCrop.toLowerCase())) return false;
    if (selectedDistrict !== 'All' && m.district !== selectedDistrict) return false;
    return true;
  });

  // Recharts Datasets
  const priceTrendData = [
    { day: '21 Aug', Ludhiana: 2260, Khanna: 2270, Moga: 2370 },
    { day: '22 Aug', Ludhiana: 2280, Khanna: 2290, Moga: 2360 },
    { day: '23 Aug', Ludhiana: 2310, Khanna: 2300, Moga: 2350 },
    { day: '24 Aug', Ludhiana: 2350, Khanna: 2340, Moga: 2340 },
    { day: '25 Aug', Ludhiana: 2400, Khanna: 2360, Moga: 2330 },
    { day: '26 Aug', Ludhiana: 2420, Khanna: 2380, Moga: 2325 },
    { day: '27 Aug', Ludhiana: 2450, Khanna: 2390, Moga: 2320 },
  ];

  const marketComparisonData = marketPrices.map(m => ({
    name: m.district,
    ModalPrice: m.modalPrice,
    MinPrice: m.minPrice,
    MaxPrice: m.maxPrice,
  }));

  const arrivalVolumeData = marketPrices.map(m => ({
    name: m.district,
    ArrivalVolume: m.arrivalVolumeQuintals,
  }));

  const demandSupplyData = [
    { week: 'W1 Aug', DemandIndex: 65, SupplyIndex: 85 },
    { week: 'W2 Aug', DemandIndex: 72, SupplyIndex: 80 },
    { week: 'W3 Aug', DemandIndex: 84, SupplyIndex: 70 },
    { week: 'W4 Aug', DemandIndex: 92, SupplyIndex: 62 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-agri-dark to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Market Price Discovery & Benchmark Analytics</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">APMC Market Intelligence</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time mandi prices, arrival volumes, and predictive price trajectories across major North Indian agricultural markets.
          </p>
        </div>

        <div className="bg-emerald-900/60 border border-emerald-700/80 px-4 py-2 rounded-xl text-xs text-amber-300 font-semibold flex items-center gap-1.5">
          <Info className="w-4 h-4 shrink-0" />
          <span>Prototype market data — replace with live Agmarknet / APMC APIs in production.</span>
        </div>
      </div>

      {/* Filter Control Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Mandis:</span>
          </div>

          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none"
          >
            <option value="Wheat">Wheat</option>
            <option value="Paddy">Paddy (Basmati / Parmal)</option>
            <option value="Maize">Maize</option>
            <option value="Potato">Potato</option>
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none"
          >
            <option value="All">All Districts</option>
            <option value="Ludhiana">Ludhiana</option>
            <option value="Moga">Moga</option>
            <option value="Karnal">Karnal</option>
            <option value="Hoshiarpur">Hoshiarpur</option>
          </select>
        </div>

        <div className="text-slate-500 font-semibold">
          Active Commodity: <b className="text-emerald-700">{selectedCrop}</b>
        </div>
      </div>

      {/* Mandi Price Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>Nearby APMC Mandi Price Overview</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                <th className="py-3 px-4">Mandi Name</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Distance</th>
                <th className="py-3 px-4 text-right">Min Price</th>
                <th className="py-3 px-4 text-right">Max Price</th>
                <th className="py-3 px-4 text-right">Modal Price</th>
                <th className="py-3 px-4 text-right">Trend</th>
                <th className="py-3 px-4 text-right">Arrival Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPrices.map((m) => (
                <tr key={m.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.mandiName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{m.district}</td>
                  <td className="py-3.5 px-4 text-slate-600">{m.distanceKm} km</td>
                  <td className="py-3.5 px-4 text-right text-slate-600">₹{m.minPrice}</td>
                  <td className="py-3.5 px-4 text-right text-slate-600">₹{m.maxPrice}</td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-700 text-sm">
                    ₹{m.modalPrice.toLocaleString('en-IN')} /q
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded ${
                      m.priceChangePct >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {m.priceChangePct >= 0 ? `+${m.priceChangePct}%` : `${m.priceChangePct}%`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600">{m.arrivalVolumeQuintals.toLocaleString('en-IN')} q</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 Rich Visual Analytics Recharts Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1: Price Trend */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm">1. 7-Day Price Trajectory Comparison</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" fontSize={11} stroke="#94a3b8" />
                <YAxis domain={['auto', 'auto']} fontSize={11} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0e2920', color: '#fff', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="Ludhiana" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="Khanna" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="Moga" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Market Comparison Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm">2. Mandi Price Band Comparison (₹/Quintal)</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" />
                <YAxis domain={['auto', 'auto']} fontSize={11} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0e2920', color: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="ModalPrice" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Arrival Volumes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm">3. Daily Mandi Arrival Volume (Quintals)</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrivalVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" />
                <YAxis fontSize={11} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0e2920', color: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="ArrivalVolume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Demand vs Supply Area Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm">4. Demand vs Supply Index Trajectory</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandSupplyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" fontSize={11} stroke="#94a3b8" />
                <YAxis fontSize={11} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0e2920', color: '#fff', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="DemandIndex" stroke="#f59e0b" fill="#fef3c7" opacity={0.8} />
                <Area type="monotone" dataKey="SupplyIndex" stroke="#10b981" fill="#d1fae5" opacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
