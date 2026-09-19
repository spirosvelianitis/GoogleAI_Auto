import React from 'react';
import { Vehicle } from '../types';
import { Sparkles, Tag, ShieldCheck, DollarSign, Clock, CheckCircle2, ArrowRight, Car, Percent, Gift } from 'lucide-react';

interface SpecialsViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onClaimDeal: (vehicle: Vehicle) => void;
  onGeneralInquiry: () => void;
}

export default function SpecialsView({
  vehicles,
  onSelectVehicle,
  onClaimDeal,
  onGeneralInquiry
}: SpecialsViewProps) {
  const specials = vehicles.filter(v => v.isSpecial);

  return (
    <div className="space-y-10 pb-16">
      {/* Specials Hero Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white border border-rose-900/40 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Docs Synced Markdown Deals</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Blue Diamon <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Specials & Deals</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Direct from our showroom floor. These handpicked luxury models feature discounted pricing loaded directly from our live Google Docs pricing ledger, plus exclusive seasonal dealership incentives.
          </p>
        </div>

        {/* Incentive cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 relative z-10">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">4.99% APR Financing</div>
              <div className="text-xs text-slate-300 mt-0.5">Special rates on select certified inventory for approved credit.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">$1,000 Trade-In Bonus</div>
              <div className="text-xs text-slate-300 mt-0.5">Extra trade-in valuation when you schedule an online appraisal.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Complimentary Warranty</div>
              <div className="text-xs text-slate-300 mt-0.5">Every special includes 90-Day Diamond Powertrain coverage.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Deals Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Featured Special Inventory ({specials.length} Vehicles)
            </h2>
            <p className="text-xs text-slate-500">
              Live price reductions verified against our active Google Docs sync sheet
            </p>
          </div>
        </div>

        {specials.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600">No active specials configured in the Google Doc right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {specials.map((vehicle) => {
              const savings = vehicle.originalPrice && vehicle.originalPrice > vehicle.price
                ? vehicle.originalPrice - vehicle.price
                : null;
              const primaryPic = vehicle.pictures[0];

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-2xl border-2 border-rose-200/80 hover:border-rose-400 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row group"
                >
                  {/* Photo Side */}
                  <div 
                    className="relative sm:w-2/5 h-56 sm:h-auto bg-slate-900 shrink-0 cursor-pointer overflow-hidden"
                    onClick={() => onSelectVehicle(vehicle)}
                  >
                    <img
                      src={primaryPic}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-black shadow flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{vehicle.specialTag || "Special Deal"}</span>
                      </span>
                    </div>

                    {savings && (
                      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur px-2.5 py-1.5 rounded-lg border border-rose-500/40 text-center">
                        <span className="text-rose-400 font-extrabold text-xs">
                          Save ${savings.toLocaleString()} off original price
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details Side */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                        <span>{vehicle.year}</span>
                        <span>•</span>
                        <span>{vehicle.bodyStyle}</span>
                        <span>•</span>
                        <span>{vehicle.mileage.toLocaleString()} mi</span>
                      </div>

                      <h3 
                        onClick={() => onSelectVehicle(vehicle)}
                        className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>

                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {vehicle.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {vehicle.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price block & CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Special Sale Price</div>
                        <div className="flex items-baseline gap-2">
                          {vehicle.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ${vehicle.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-2xl font-black text-rose-700">
                            ${vehicle.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onClaimDeal(vehicle)}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                      >
                        <span>Claim Deal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Rebate banner */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900">
            Have a Vehicle to Trade In? Get Instant Above-Market Valuation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            We purchase all makes and models outright, even if you don't buy from us. Bring your vehicle in for a 15-minute appraisal with our on-site buyer.
          </p>
        </div>

        <button
          type="button"
          onClick={onGeneralInquiry}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors shadow"
        >
          Request Trade-In Valuation
        </button>
      </div>
    </div>
  );
}
