import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MarketPrice } from '../types';
import { MapPin, TrendingUp, Navigation, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const PriceMapPage: React.FC = () => {
  const { marketPrices, t } = useApp();

  const [activeMarket, setActiveMarket] = useState<MarketPrice>(marketPrices[0]);

  // Coordinates mapping for interactive visual map pins
  const pinPositions: Record<string, { top: string; left: string }> = {
    'mkt-wht-ldh': { top: '48%', left: '42%' },
    'mkt-wht-khn': { top: '56%', left: '52%' },
    'mkt-wht-mga': { top: '54%', left: '28%' },
    'mkt-pad-krl': { top: '78%', left: '72%' },
    'mkt-prm-ldh': { top: '46%', left: '45%' },
    'mkt-mze-hsp': { top: '28%', left: '56%' },
    'mkt-pot-jlr': { top: '38%', left: '38%' },
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>GIS Regional Price Mapping</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Interactive Mandi Price Map</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Geographic pricing heatmap across Punjab & Haryana Mandi APMC Clusters.
          </p>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive SVG/Visual Map (2 Cols) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl relative min-h-[460px] overflow-hidden flex flex-col justify-between">
          
          {/* Map Title & Legend */}
          <div className="flex items-center justify-between z-10 text-white text-xs">
            <div className="font-extrabold text-emerald-400 flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              <span>North India APMC Geographic Node Map</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Upward Trend</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Soft Trend</span>
            </div>
          </div>

          {/* Regional Map Graphics & Marker Pins */}
          <div className="relative w-full h-80 my-4 bg-emerald-900/20 rounded-2xl border border-emerald-800/40 overflow-hidden backdrop-blur-xs">
            
            {/* Background Grid & State Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="absolute top-4 left-4 text-[10px] text-slate-500 font-mono">PUNJAB & HARYANA APMC GRID</div>

            {/* Render Market Pins */}
            {marketPrices.map((m) => {
              const pos = pinPositions[m.id] || { top: '50%', left: '50%' };
              const isSelected = activeMarket.id === m.id;
              const isUp = m.priceChangePct >= 0;

              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMarket(m)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-[10px] shadow-lg transition-transform ${
                      isUp ? 'bg-emerald-600 ring-4 ring-emerald-500/30' : 'bg-rose-600 ring-4 ring-rose-500/30'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </span>
                    
                    {/* Tooltip Label */}
                    <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md whitespace-nowrap border border-slate-700 pointer-events-none">
                      {m.district}: ₹{m.modalPrice}/q
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="text-[11px] text-slate-400 z-10">
            Click any mandi marker pin on the map to inspect live modal price, arrival volume, and distance.
          </div>

        </div>

        {/* Selected Market Inspector Card (1 Col) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{activeMarket.crop}</span>
                <h3 className="font-extrabold text-xl text-slate-900 mt-0.5">{activeMarket.mandiName}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeMarket.district}, {activeMarket.state} ({activeMarket.distanceKm} km)</span>
                </div>
              </div>

              <span className={`font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 ${
                activeMarket.priceChangePct >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {activeMarket.priceChangePct >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {activeMarket.priceChangePct >= 0 ? `+${activeMarket.priceChangePct}%` : `${activeMarket.priceChangePct}%`}
              </span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 space-y-1">
              <div className="text-xs text-slate-500 font-bold uppercase">Current Modal Price</div>
              <div className="text-3xl font-black text-emerald-700">
                ₹{activeMarket.modalPrice.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">/ quintal</span>
              </div>
              <div className="text-xs text-slate-600 font-semibold pt-1 border-t border-emerald-200/60 flex justify-between">
                <span>Min: ₹{activeMarket.minPrice}</span>
                <span>Max: ₹{activeMarket.maxPrice}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Mandi Arrivals</div>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{activeMarket.arrivalVolumeQuintals.toLocaleString('en-IN')} q</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Updated Date</div>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{activeMarket.date}</div>
              </div>
            </div>

          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-600 font-semibold">
            Primary APMC Benchmarking Hub for {activeMarket.crop}
          </div>

        </div>

      </div>

    </div>
  );
};
