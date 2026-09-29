import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Sprout } from 'lucide-react';
import heroImage from '../assets/hero.png';
import { useApp } from '../context/AppContext';

export const FarmerLoginPage: React.FC = () => {
  const { switchRole } = useApp();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switchRole('farmer');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl lg:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative order-2 min-h-[260px] lg:order-1 lg:min-h-full">
          <img
            src={heroImage}
            alt="A field ready for harvest"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/25 to-transparent" />
          <div className="absolute bottom-0 max-w-xl p-7 text-white sm:p-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-200">AgriLink for Farmers</p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Bring your harvest to a fairer market.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-emerald-50/90">
              Keep track of crop listings, buyer offers, market prices and payments in one place.
            </p>
          </div>
        </div>

        <div className="order-1 flex items-center px-6 py-10 sm:px-10 lg:order-2 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
              <Sprout className="h-5 w-5" />
              Farmer account
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Sign in to AgriLink</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Enter the mobile number or email linked to your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="farmer-identifier" className="mb-2 block text-sm font-semibold text-slate-700">
                  Mobile number or email
                </label>
                <input
                  id="farmer-identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Enter your mobile number or email"
                  className="h-12 w-full rounded-md border border-slate-300 px-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label htmlFor="farmer-password" className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="farmer-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-12 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(value => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-bold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Sign in to farmer workspace
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 border-l-2 border-amber-400 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-slate-700">
              Local preview only: credentials are not verified until an authentication service is connected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};