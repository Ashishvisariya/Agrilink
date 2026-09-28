import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Grievance } from '../types';
import {
  AlertCircle, ShieldCheck, CheckCircle2, Clock,
  Upload, FileText, ArrowRight, MessageSquare
} from 'lucide-react';

export const GrievancePage: React.FC = () => {
  const { grievances, submitGrievance, currentUser, selectedTxnId, t } = useApp();

  const [txnId, setTxnId] = useState(selectedTxnId || 'AGL-TXN-2026-001245');
  const [category, setCategory] = useState<Grievance['category']>('Payment Issue');
  const [description, setDescription] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    const newId = submitGrievance(txnId, category, description);
    setSubmittedId(newId);
    setDescription('');
  };

  const grievanceSteps = ['Submitted', 'Under Review', 'Resolution Proposed', 'Resolved'];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Dispute & Grievance Resolution Desk</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Help & Grievance System</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Fair, auditable dispute management with 24-hour escalation resolution SLAs.
          </p>
        </div>
      </div>

      {submittedId && (
        <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-md space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-black text-base">
            <CheckCircle2 className="w-5 h-5" />
            <span>Grievance Ticket {submittedId} Opened Successfully</span>
          </div>
          <p className="text-xs text-emerald-100">
            AgriLink Dispute Desk has assigned ticket #{submittedId}. Official review response will be provided within 24 hours.
          </p>
        </div>
      )}

      {/* Grid: Form + Active Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Raise New Dispute / Grievance</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Transaction ID *</label>
            <input
              type="text"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. AGL-TXN-2026-001245"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Grievance Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Payment Issue">Payment Delay / Non-payment</option>
              <option value="Quality Dispute">Quality Grade Mismatch</option>
              <option value="Quantity Mismatch">Quantity Weight Variance</option>
              <option value="Delivery Issue">Logistics / Pickup Delay</option>
              <option value="Other">Other Issues</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description *</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Describe the issue clearly including dates and agreed terms..."
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
            <Upload className="w-5 h-5 text-slate-400 mx-auto" />
            <span className="text-[11px] font-bold text-slate-600 block">Attach Evidence / Photos / Receipts</span>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition-all"
          >
            Submit Dispute Complaint
          </button>
        </form>

        {/* Existing Grievance Tickets */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Your Active Grievances ({grievances.length})</h3>

          {grievances.map((g) => (
            <div key={g.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{g.category}</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Ticket #{g.id}</h4>
                  <div className="text-[11px] text-slate-500">Txn: {g.txnId} • Raised on {g.createdAt}</div>
                </div>

                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {g.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>

              {/* Status Timeline */}
              <div className="pt-2 border-t border-slate-100">
                <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                  {grievanceSteps.map((step, idx) => {
                    const stepIdx = grievanceSteps.indexOf(g.status);
                    const isDone = idx <= stepIdx;
                    return (
                      <div key={step} className={`py-1 rounded font-bold ${
                        isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {step}
                      </div>
                    );
                  })}
                </div>
              </div>

              {g.resolutionNotes && (
                <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-medium border border-emerald-200">
                  <b>Resolution Notes:</b> {g.resolutionNotes}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
