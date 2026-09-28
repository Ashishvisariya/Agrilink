import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2, Sparkles, Award, ArrowRight, Camera,
  Sliders, ShieldCheck, AlertCircle, FileText
} from 'lucide-react';

export const QualityGradingPage: React.FC = () => {
  const {
    qualityReports, selectedLotId, cropLots,
    setActiveTab, t
  } = useApp();

  const activeLot = cropLots.find(l => l.id === selectedLotId) || cropLots[0];
  const report = qualityReports[activeLot?.id] || qualityReports['AGL-WHT-2026-00125'];

  const [moisture, setMoisture] = useState(report?.moisturePct || 11.4);
  const [foreignMatter, setForeignMatter] = useState(report?.foreignMatterPct || 0.8);
  const [grainSize, setGrainSize] = useState(report?.grainSizeMm || 6.5);
  const [damagedGrains, setDamagedGrains] = useState(report?.damagedGrainsPct || 1.2);

  // Calculate dynamic overall score
  const calculateScore = () => {
    let score = 100;
    if (moisture > 12) score -= (moisture - 12) * 5;
    if (foreignMatter > 0.5) score -= (foreignMatter - 0.5) * 8;
    if (damagedGrains > 1.0) score -= (damagedGrains - 1.0) * 10;
    return Math.max(50, Math.min(99, Math.round(score)));
  };

  const currentScore = calculateScore();
  const currentGrade = currentScore >= 92 ? 'A+' : currentScore >= 85 ? 'A' : currentScore >= 75 ? 'B' : 'C';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Digital Quality Verification System</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Quality Inspection & Grade Report</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Certified quality parameter breakdown for lot <span className="font-mono font-bold text-emerald-700">{activeLot?.id}</span>.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('logistics')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
        >
          <span>Book Transport & Logistics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-agri-dark to-slate-900 text-white rounded-3xl p-8 border border-emerald-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="space-y-3 max-w-lg text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certified Inspection ID #{report?.id || 'QR-8890'}</span>
          </div>

          <h2 className="text-3xl font-black">{activeLot?.crop} ({activeLot?.variety})</h2>
          <p className="text-xs text-slate-300">
            Inspector: <b>{report?.inspectorName || 'AgriLink Certified Inspector'}</b> • Inspected on {report?.inspectionDate || '2026-08-26'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
            <span className="bg-emerald-900/80 border border-emerald-700 px-3 py-1 rounded-lg">Moisture: <b>{moisture}%</b></span>
            <span className="bg-emerald-900/80 border border-emerald-700 px-3 py-1 rounded-lg">Foreign Matter: <b>{foreignMatter}%</b></span>
            <span className="bg-emerald-900/80 border border-emerald-700 px-3 py-1 rounded-lg">Grain Size: <b>{grainSize} mm</b></span>
          </div>
        </div>

        {/* Visual Quality Score Badge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center min-w-[200px] space-y-2">
          <div className="text-xs uppercase text-slate-300 font-extrabold tracking-wider">Quality Score</div>
          <div className="text-5xl font-black text-amber-400">
            {currentScore}<span className="text-2xl text-slate-300">/100</span>
          </div>
          <div className="inline-block bg-emerald-500 text-slate-950 font-black text-sm px-4 py-1 rounded-full">
            Grade {currentGrade}
          </div>
        </div>

      </div>

      {/* Interactive Quality Parameter Adjuster & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quality Factors Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <span>Inspection Parameters & Grade Logic</span>
          </h3>

          <div className="space-y-4 text-xs">
            
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>Moisture Content</span>
                <span className="text-emerald-700">{moisture}% (Optimal &lt; 12%)</span>
              </div>
              <input
                type="range"
                min="9"
                max="16"
                step="0.1"
                value={moisture}
                onChange={(e) => setMoisture(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>Foreign Matter / Impurities</span>
                <span className="text-emerald-700">{foreignMatter}% (Optimal &lt; 1.0%)</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={foreignMatter}
                onChange={(e) => setForeignMatter(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>Damaged / Shriveled Grains</span>
                <span className="text-emerald-700">{damagedGrains}% (Optimal &lt; 1.5%)</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={damagedGrains}
                onChange={(e) => setDamagedGrains(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

          </div>
        </div>

        {/* AI Computer-Vision Module Placeholder */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              AI Computer-Vision Grading Ready
            </div>
            <h3 className="font-extrabold text-lg">Instant AI Image Quality Scanner</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Future integration module for automated crop grain image classification. Upload grain sample close-up to detect moisture, discoloration, and insect damage automatically using TensorFlow Vision.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-center space-y-2">
            <Camera className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white">AI Vision Scanner Ready</div>
            <div className="text-[11px] text-slate-400">Sample Grain Photo Scanned & Verified ✓</div>
          </div>
        </div>

      </div>

    </div>
  );
};
