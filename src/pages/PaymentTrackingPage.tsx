import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard, DollarSign, CheckCircle2, Clock,
  ShieldCheck, FileText, AlertTriangle, ArrowRight
} from 'lucide-react';

export const PaymentTrackingPage: React.FC = () => {
  const {
    payments, transactions, selectedTxnId,
    setActiveTab, t
  } = useApp();

  const [simulatedStatus, setSimulatedStatus] = useState<'Pending' | 'Completed'>('Pending');

  const activeTxn = transactions.find(t => t.id === selectedTxnId) || transactions[0];
  const activePayment = payments[0];

  const paymentSteps = [
    { label: 'Offer Accepted', done: true },
    { label: 'Quality Verified', done: true },
    { label: 'Delivery Completed', done: true },
    { label: 'Invoice Generated', done: true },
    { label: 'Payment Processing', done: simulatedStatus === 'Completed' ? true : true },
    { label: 'Payment Completed', done: simulatedStatus === 'Completed' ? true : false },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Digital Escrow & Settlement System</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Payment Tracking & History</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time digital payment tracking backed by AgriLink escrow settlement monitoring.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('grievances')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
        >
          <span>Raise Grievance / Dispute</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Total Settled</div>
          <div className="text-2xl font-black text-emerald-700">₹32,45,000</div>
          <div className="text-[11px] text-emerald-600 font-semibold">100% Direct Bank Transfer</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Pending Escrow Settlement</div>
          <div className="text-2xl font-black text-amber-600">
            {simulatedStatus === 'Completed' ? '₹0' : '₹18,07,200'}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold">Due in 2 days (SLA active)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Overdue Disputes</div>
          <div className="text-2xl font-black text-slate-900">₹0</div>
          <div className="text-[11px] text-slate-400 font-semibold">Clean payment score</div>
        </div>
      </div>

      {/* Active Transaction Payment Timeline Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-agri-dark to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900 shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Transaction #{activeTxn?.id}</div>
            <h3 className="text-2xl font-black text-white mt-0.5">{activeTxn?.crop} ({activeTxn?.quantityTonnes} Tonnes)</h3>
            <p className="text-xs text-slate-300">Buyer: <b>{activeTxn?.buyerName}</b> • Farmer: <b>{activeTxn?.farmerName}</b></p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs text-slate-400 font-semibold">Total Invoice Amount</div>
            <div className="text-3xl font-black text-amber-400">
              ₹{activeTxn?.totalAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-300">₹{activeTxn?.pricePerQuintal} / quintal</div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="space-y-3">
          <div className="text-xs text-emerald-300 font-extrabold uppercase tracking-wider">Payment Milestone Progress</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
            {paymentSteps.map((step, idx) => (
              <div key={idx} className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/60 space-y-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                  step.done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step.done ? '✓' : idx + 1}
                </div>
                <div className={`text-[11px] font-bold ${step.done ? 'text-white' : 'text-slate-400'}`}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulated Payment Trigger */}
        <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Prototype simulated transaction — test digital settlement instantly.</span>
          </div>

          {simulatedStatus === 'Pending' ? (
            <button
              onClick={() => setSimulatedStatus('Completed')}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-xl shadow-md transition-all text-xs whitespace-nowrap"
            >
              Simulate Instant Settlement (Escrow)
            </button>
          ) : (
            <div className="bg-emerald-500 text-slate-950 font-black px-6 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              <span>Payment Completed • UTR #UTIB202608279911</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
