import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck, AlertCircle, CheckCircle2, XCircle,
  Users, ShoppingBag, TrendingUp, BarChart3, Lock
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const {
    cropLots, buyerDemands, transactions, grievances,
    verifyBuyerOrFarmer, resolveGrievance, t
  } = useApp();

  const [selectedTab, setSelectedTab] = useState<'verification' | 'grievances' | 'analytics'>('verification');
  const [resolutionNote, setResolutionNote] = useState('');
  const [activeGrievanceId, setActiveGrievanceId] = useState<string | null>(null);

  const pendingBuyers = [
    { id: 'usr-buyer-02', company: 'Northern Grains Corp', location: 'Karnal, Haryana', docs: 'GST, FSSAI, PAN', status: 'Pending Verification' },
    { id: 'usr-buyer-03', company: 'Apex Feed Mills Ltd', location: 'Hoshiarpur, Punjab', docs: 'GST, Trade License', status: 'Pending Verification' },
    { id: 'usr-buyer-04', company: 'Golden Harvest Exporters', location: 'Amritsar, Punjab', docs: 'IEC, GST, APMC License', status: 'Pending Verification' },
  ];

  const chartData = [
    { day: 'Mon', Transactions: 12, DemandVolume: 450 },
    { day: 'Tue', Transactions: 18, DemandVolume: 620 },
    { day: 'Wed', Transactions: 24, DemandVolume: 890 },
    { day: 'Thu', Transactions: 31, DemandVolume: 1100 },
    { day: 'Fri', Transactions: 28, DemandVolume: 980 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Governance & Oversight Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Admin Operations Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Verify institutional buyers, monitor escrow transaction compliance, and resolve user grievances.
          </p>
        </div>

        <div className="bg-emerald-900/60 border border-emerald-700/80 px-4 py-2 rounded-xl text-xs font-bold text-emerald-300">
          Super Admin Privileges Active
        </div>
      </div>

      {/* 8 Core Admin KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Total Farmers</div>
          <div className="text-lg font-black text-slate-900">45,200</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Total FPOs</div>
          <div className="text-lg font-black text-slate-900">340</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Verified Buyers</div>
          <div className="text-lg font-black text-emerald-700">1,850</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Active Listings</div>
          <div className="text-lg font-black text-slate-900">{cropLots.length + 318}</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Txn Volume</div>
          <div className="text-lg font-black text-emerald-700">₹148 Cr</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Completed Txns</div>
          <div className="text-lg font-black text-slate-900">14,890</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Pending Disputes</div>
          <div className="text-lg font-black text-rose-600">{grievances.filter(g => g.status !== 'Resolved').length}</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Platform Health</div>
          <div className="text-lg font-black text-emerald-600">99.8%</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 flex items-center gap-2 text-xs font-bold">
        <button
          onClick={() => setSelectedTab('verification')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'verification' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Buyer & Farmer Verification (3 Pending)
        </button>

        <button
          onClick={() => setSelectedTab('grievances')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'grievances' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Dispute Desk ({grievances.length})
        </button>

        <button
          onClick={() => setSelectedTab('analytics')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedTab === 'analytics' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Platform Growth Analytics
        </button>
      </div>

      {/* Tab 1: Buyer Verification */}
      {selectedTab === 'verification' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Buyer Verification Queue</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Uploaded Compliance Documents</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pendingBuyers.map((b) => (
                  <tr key={b.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">{b.company}</td>
                    <td className="py-4 px-4 text-slate-600">{b.location}</td>
                    <td className="py-4 px-4 text-emerald-700 font-semibold">{b.docs}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-md text-[11px]">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-1">
                      <button
                        onClick={() => verifyBuyerOrFarmer(b.id, true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => verifyBuyerOrFarmer(b.id, false)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Grievance Desk */}
      {selectedTab === 'grievances' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>Dispute Resolution Portal</span>
          </h3>

          <div className="space-y-4">
            {grievances.map((g) => (
              <div key={g.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm">Ticket #{g.id}</span>
                    <span className="text-slate-500 ml-2">Raised by {g.raisedBy} ({g.raisedRole})</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {g.status}
                  </span>
                </div>

                <p className="text-slate-700">{g.description}</p>

                {g.status !== 'Resolved' && (
                  <div className="pt-2 border-t border-slate-200 flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter official resolution notes..."
                      value={activeGrievanceId === g.id ? resolutionNote : ''}
                      onChange={(e) => {
                        setActiveGrievanceId(g.id);
                        setResolutionNote(e.target.value);
                      }}
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => resolveGrievance(g.id, resolutionNote || 'Resolved by AgriLink Escrow Desk')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs"
                    >
                      Resolve Dispute
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Platform Analytics */}
      {selectedTab === 'analytics' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900">Platform Transaction Growth</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" fontSize={11} stroke="#94a3b8" />
                <YAxis fontSize={11} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0e2920', color: '#fff', borderRadius: '8px' }} />
                <Bar dataKey="Transactions" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="DemandVolume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  );
};
