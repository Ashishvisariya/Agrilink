import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp, ShieldCheck, ArrowRight, CheckCircle2,
  Users, ShoppingBag, Truck, Award, Sparkles, Scale,
  BarChart3, Layers, Lock, ChevronRight, Sprout, LogIn
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, switchRole, t } = useApp();

  const keyStats = [
    { label: 'Farmers Connected', value: '45,200+', change: '+12% this month', icon: <Users className="w-5 h-5 text-emerald-600" /> },
    { label: 'Verified Buyers', value: '1,850+', change: '100% GST verified', icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
    { label: 'Active Crop Lots', value: '3,420 Tonnes', change: 'Live listings', icon: <ShoppingBag className="w-5 h-5 text-emerald-600" /> },
    { label: 'Transactions Completed', value: '₹148 Cr+', change: 'Direct to bank', icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
    { label: 'Avg Price Realization', value: '+14.2%', change: 'vs local APMC modal', icon: <Award className="w-5 h-5 text-amber-500" /> },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Check Market Prices',
      desc: 'Compare real-time prices across nearby APMC mandis and benchmark historical 7/30 day price trajectories.',
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
    },
    {
      step: '02',
      title: 'Create Your Crop Lot',
      desc: 'Add crop variety, quantity, moisture level, expected price and quality pictures in under 2 minutes.',
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
    },
    {
      step: '03',
      title: 'Find Verified Buyers',
      desc: 'Our rule-based smart matching engine connects your crop lot with verified corporate processors & exporters.',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
    },
    {
      step: '04',
      title: 'Compare Offers',
      desc: 'Evaluate buyer offers side-by-side on price per quintal, payment SLA, transport distance and buyer rating.',
      icon: <Scale className="w-6 h-6 text-emerald-600" />,
    },
    {
      step: '05',
      title: 'Coordinate Delivery',
      desc: 'Book verified heavy trucks or nearby temperature-controlled warehouses with live GPS tracking.',
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
    },
    {
      step: '06',
      title: 'Get Paid Digitally',
      desc: 'Receive direct payment updates backed by escrow transaction tracking and prompt dispute resolution.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <div className="space-y-16 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-agri-dark to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-800/50">
        
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Empowering Indian Farmers & FPOs with Market Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Sell Smarter. Discover Better Prices. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300">Connect Directly.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AgriLink connects farmers and FPOs with verified buyers using real-time mandi intelligence, transparent price trend forecasting, smart buyer matching, and reliable logistics.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                switchRole('farmer');
                setActiveTab('market_intel');
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 text-base group"
            >
              <span>Explore Market Prices</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setActiveTab('farmer_login');
              }}
              className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-100 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
            >
              <LogIn className="w-5 h-5" />
              <span>Farmer Login</span>
            </button>
          </div>

        </div>
      </section>

      {/* Key Impact Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {keyStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{stat.value}</div>
            <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* How AgriLink Works (6 Steps) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-agri-dark">How AgriLink Works</h2>
          <p className="text-slate-600 text-sm">
            A seamless, transparent end-to-end digital transaction ecosystem designed specifically for Indian agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all space-y-3 relative group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  {s.icon}
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-500/30 transition-colors">{s.step}</span>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Built for Market Transparency</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Solving the Core Challenges of Smallholder Farmers
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Eliminate distress selling after harvest with decision-support analytics, verified buyer connections, quality grade assurance, and digital payment tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800/80 space-y-3">
            <BarChart3 className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-lg text-white">Market Intelligence</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time APMC mandi prices, arrival volumes, and 7/30 day price trend line charts across Punjab and North Indian mandis.
            </p>
          </div>

          <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800/80 space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h4 className="font-bold text-lg text-white">Verified Buyer Network</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every buyer profile features GST verification badges, payment reliability ratings (e.g. 95%), and average settlement days.
            </p>
          </div>

          <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800/80 space-y-3">
            <Award className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-lg text-white">Smart Matching Engine</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparent rule-based scoring matching lot moisture, volume, location distance, and price compatibility (e.g. 94% Match).
            </p>
          </div>

          <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800/80 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <h4 className="font-bold text-lg text-white">Quality Grading System</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Certified quality reports measuring moisture %, foreign matter, grain size, and generating Grade A+/A/B ratings (91/100).
            </p>
          </div>

          <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800/80 space-y-3">
            <Truck className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-lg text-white">Logistics & Storage</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Book 10-Tonne to 28-Tonne trucks with live delivery timelines, or discover nearby temperature-controlled cold storages.
            </p>
          </div>

          <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800/80 space-y-3">
            <Lock className="w-8 h-8 text-emerald-400" />
            <h4 className="font-bold text-lg text-white">Transparent Transactions</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Auditable transaction timeline IDs (`AGL-TXN-2026-001245`), escrow tracking, and 24-hour dispute grievance resolution.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-black">Make your next crop transaction with confidence.</h3>
          <p className="text-emerald-100 text-sm">Explore market insights and connect with verified buyers.</p>
        </div>
        <button
          onClick={() => {
            switchRole('farmer');
            setActiveTab('farmer_dashboard');
          }}
          className="bg-white text-emerald-900 font-extrabold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-md text-base whitespace-nowrap"
        >
          Open Farmer Dashboard →
        </button>
      </section>

    </div>
  );
};
