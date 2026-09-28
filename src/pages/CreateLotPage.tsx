import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, CheckCircle2, ArrowRight, Upload, Sparkles, AlertCircle } from 'lucide-react';

export const CreateLotPage: React.FC = () => {
  const { publishCropLot, setActiveTab, setSelectedLotId } = useApp();

  const [formData, setFormData] = useState({
    crop: 'Wheat',
    variety: 'Sharbati (PBW 725)',
    quantity: 72,
    unit: 'tonne' as 'tonne' | 'quintal' | 'kg',
    harvestDate: '2026-04-18',
    location: 'Ludhiana, Punjab',
    district: 'Ludhiana',
    state: 'Punjab',
    expectedPrice: 2450,
    minAcceptablePrice: 2380,
    qualityGrade: 'A' as 'A+' | 'A' | 'B' | 'C',
    moisturePct: 11.4,
    cropCondition: 'Golden, well-dried, uniform grains',
    availableFrom: 'Immediate',
    storageRequired: false,
    images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'],
  });

  const [publishedLotId, setPublishedLotId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLotId = publishCropLot(formData);
    setPublishedLotId(newLotId);
  };

  if (publishedLotId) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300 uppercase tracking-wider">
            Lot Published Successfully
          </span>
          <h2 className="text-3xl font-black text-slate-900">Your Crop Lot is Live!</h2>
          <p className="text-slate-600 text-sm">
            Your crop lot is now visible to verified buyers on AgriLink.
          </p>
        </div>

        {/* Lot ID Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Generated Lot Reference ID</div>
          <div className="text-3xl font-black tracking-wider text-amber-400 font-mono">
            {publishedLotId}
          </div>
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex justify-around">
            <span>Crop: <b>{formData.crop}</b></span>
            <span>Quantity: <b>{formData.quantity} {formData.unit}s</b></span>
            <span>Expected: <b>₹{formData.expectedPrice}/q</b></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setSelectedLotId(publishedLotId);
              setActiveTab('buyer_matching');
            }}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>View Recommended Buyers</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setPublishedLotId(null);
            }}
            className="w-full sm:w-auto bg-white border border-slate-300 text-slate-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all text-sm"
          >
            + Create Another Lot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
          <Sprout className="w-4 h-4" />
          <span>Digital Marketplace</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Create Crop Lot</h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Publish your crop produce details to receive direct offers from verified buyers across India.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        
        {/* Section 1: Crop Basics */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
            1. Crop & Quantity Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Crop Type *</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Wheat">Wheat</option>
                <option value="Paddy (Basmati)">Paddy (Basmati)</option>
                <option value="Paddy (Parmal)">Paddy (Parmal)</option>
                <option value="Maize">Maize</option>
                <option value="Cotton">Cotton</option>
                <option value="Potato">Potato</option>
                <option value="Onion">Onion</option>
                <option value="Tomato">Tomato</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Crop Variety *</label>
              <input
                type="text"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="e.g. Sharbati / Pusa 1121"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs font-bold text-slate-700 mb-1">Unit *</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="tonne">Tonne</option>
                  <option value="quintal">Quintal</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Quality */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
            2. Expected Pricing & Quality Grade
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expected Price (₹/Quintal) *</label>
              <input
                type="number"
                value={formData.expectedPrice}
                onChange={(e) => setFormData({ ...formData, expectedPrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Min Acceptable Price (₹/q) *</label>
              <input
                type="number"
                value={formData.minAcceptablePrice}
                onChange={(e) => setFormData({ ...formData, minAcceptablePrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quality Grade *</label>
              <select
                value={formData.qualityGrade}
                onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="A+">Grade A+ (Export Premium)</option>
                <option value="A">Grade A (High Commercial)</option>
                <option value="B">Grade B (Standard)</option>
                <option value="C">Grade C (Fair Average Quality)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Moisture Level (%) *</label>
              <input
                type="number"
                step="0.1"
                value={formData.moisturePct}
                onChange={(e) => setFormData({ ...formData, moisturePct: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Location & Condition */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
            3. Harvest Location & Storage Need
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location / Mandi Hub *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Harvest Date *</label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Available From *</label>
              <input
                type="text"
                value={formData.availableFrom}
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Crop Condition & Description</label>
            <input
              type="text"
              value={formData.cropCondition}
              onChange={(e) => setFormData({ ...formData, cropCondition: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. Clean, well-dried golden grains with minimal broken seeds"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="storageReq"
              checked={formData.storageRequired}
              onChange={(e) => setFormData({ ...formData, storageRequired: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="storageReq" className="text-xs font-bold text-slate-800 cursor-pointer">
              I require warehouse/cold storage assistance before buyer dispatch
            </label>
          </div>
        </div>

        {/* Upload Images Mock */}
        <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2">
          <Upload className="w-8 h-8 text-slate-400 mx-auto" />
          <div className="text-xs font-bold text-slate-700">Upload Crop Sample Photos</div>
          <p className="text-[11px] text-slate-500">Drag and drop or click to attach grain sample images for quality buyers</p>
          <div className="inline-block bg-white px-3 py-1 rounded border border-slate-300 text-xs font-semibold text-emerald-700">
            Sample Photo Attached ✓
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
          >
            <Sprout className="w-4 h-4" />
            <span>Publish Crop Lot</span>
          </button>
        </div>

      </form>
    </div>
  );
};
