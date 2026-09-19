import React, { useState } from 'react';
import { Vehicle } from '../types';
import { 
  X, Check, ShieldCheck, Award, Fuel, Gauge, Cpu, 
  Calendar, DollarSign, Calculator, Share2, Phone, 
  ChevronLeft, ChevronRight, Sparkles, FileText, ArrowRight 
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onScheduleTestDrive: (vehicle: Vehicle) => void;
  onInquire: (vehicle: Vehicle) => void;
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
  onScheduleTestDrive,
  onInquire
}: VehicleDetailModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  
  // Payment calculator state
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!vehicle) return null;

  const pictures = vehicle.pictures.length > 0 ? vehicle.pictures : [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
  ];

  // Estimated monthly payment: P = (r * PV) / (1 - (1 + r)^-n)
  const principal = Math.max(0, vehicle.price - downPayment);
  const monthlyRate = (interestRate / 100) / 12;
  const estimatedMonthly = monthlyRate > 0
    ? Math.round((principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm)))
    : Math.round(principal / loanTerm);

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % pictures.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Blue Diamon Certified Vehicle Dossier
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Title & Price Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-xs border border-blue-200">
                  {vehicle.year}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs">
                  {vehicle.bodyStyle}
                </span>
                {vehicle.isSpecial && (
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{vehicle.specialTag || "Special Deal"}</span>
                  </span>
                )}
                {vehicle.cleanCarfax && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Clean CARFAX</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                VIN: {vehicle.vin} • Stock #{vehicle.id.toUpperCase().slice(-6)}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 md:text-right shrink-0">
              <div className="flex items-center md:justify-end gap-1.5 text-xs text-blue-700 font-semibold mb-0.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Google Docs Live Price</span>
              </div>

              <div className="flex items-baseline md:justify-end gap-2">
                {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
                  <span className="text-base text-slate-400 line-through font-medium">
                    ${vehicle.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-black text-slate-900">
                  ${vehicle.price.toLocaleString()}
                </span>
              </div>

              {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
                <div className="text-xs font-bold text-emerald-700 mt-0.5">
                  You Save ${(vehicle.originalPrice - vehicle.price).toLocaleString()} Instantly
                </div>
              )}

              <div className="text-[11px] text-slate-500 mt-1">
                Est. ${estimatedMonthly}/mo • No Hidden Dealer Fees
              </div>
            </div>
          </div>

          {/* Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 group">
              <img
                src={pictures[activePhotoIndex]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur text-white text-xs font-semibold shadow">
                  Photo {activePhotoIndex + 1} of {pictures.length}
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-900/80 backdrop-blur text-cyan-300 text-xs font-semibold shadow border border-cyan-500/30">
                  Loaded from Google Doc
                </span>
              </div>

              {/* Navigation arrows */}
              {pictures.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center transition-transform active:scale-90"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center transition-transform active:scale-90"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail row */}
            {pictures.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {pictures.map((pic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activePhotoIndex === idx ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={pic} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Mileage</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{vehicle.mileage.toLocaleString()} miles</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Engine</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5 truncate" title={vehicle.engine}>{vehicle.engine}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Transmission</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5 truncate" title={vehicle.transmission}>{vehicle.transmission}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Drivetrain</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{vehicle.drivetrain}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Fuel Type & MPG</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{vehicle.fuelType} • {vehicle.mpg}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Exterior Color</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5 truncate" title={vehicle.exteriorColor}>{vehicle.exteriorColor}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Interior</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5 truncate" title={vehicle.interiorColor}>{vehicle.interiorColor}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Ownership</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">{vehicle.oneOwner ? "1-Owner" : "Multi-Owner"} • Clean Title</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Dealer Overview & History
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-200">
              {vehicle.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Premium Options & Installed Equipment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {vehicle.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/40 border border-blue-100/80">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Calculator Section */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold">Interactive Payment Estimator</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Estimated Payment:</span>
                <span className="text-xl font-extrabold text-cyan-300">${estimatedMonthly} / mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Down Payment ($)</label>
                <input
                  type="number"
                  step="500"
                  min="0"
                  max={vehicle.price}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                >
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                  <option value={72}>72 Months (6 Years)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Estimated APR (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              *Estimates exclude government taxes, tag fees, and insurance. Actual rates subject to tier-1 approval from Blue Diamon Finance partners.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Includes 90-Day / 3,000-Mile Diamond Powertrain Warranty</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onInquire(vehicle);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors"
            >
              Ask a Question / Trade-In
            </button>

            <button
              type="button"
              onClick={() => {
                onScheduleTestDrive(vehicle);
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Test Drive</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
