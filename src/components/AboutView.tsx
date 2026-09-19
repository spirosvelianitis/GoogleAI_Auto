import React from 'react';
import { 
  ShieldCheck, Award, HeartHandshake, CheckCircle2, 
  FileText, Sparkles, Users, Star, Clock, MapPin, ChevronRight, Phone 
} from 'lucide-react';

interface AboutViewProps {
  onContactClick: () => void;
  onInventoryClick: () => void;
  onOpenSyncModal: () => void;
}

export default function AboutView({
  onContactClick,
  onInventoryClick,
  onOpenSyncModal
}: AboutViewProps) {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Story Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Blue Diamon Auto Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Setting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Diamond Standard</span> in Pre-Owned Automotive
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            At Blue Diamon Auto, we eliminated the old dealership games. No artificial markups, no high-pressure sales floors, and no hidden surprises. We operate with radical transparency, handpicked luxury and performance vehicles, and live Google Docs pricing that you can audit anytime.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onInventoryClick}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              Browse Certified Inventory
            </button>
            <button
              type="button"
              onClick={onContactClick}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Visit Our Showroom
            </button>
          </div>
        </div>
      </div>

      {/* Why Google Docs Pricing Section */}
      <div className="bg-white rounded-3xl border border-blue-100 p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Real-Time Google Docs Pricing & Picture Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why We Connect Directly to Google Docs
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Traditional dealerships hide real pricing behind complicated DMS systems and back-office sales desks. At Blue Diamon Auto, our appraisal and acquisition managers log prices, specs, discounts, and high-resolution vehicle photography straight into an accessible Google Doc.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Instant Sync:</strong> As soon as a car is detailed or price-adjusted in our inventory spreadsheet, it goes live on the website in seconds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Surprise Markups:</strong> The price listed in our document is the price on the bill of sale. Zero dealer prep or doc fees tacked on.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Verifiable Audit Trail:</strong> Customers and team members look at the exact same transparent data source.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenSyncModal}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <span>View connected Google Doc & Sync Settings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <span className="text-xs font-mono text-cyan-300">Live Inventory Stream</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">STATUS: 200 OK</span>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-cyan-400">// Blue Diamon Master Document</div>
              <div>&gt; Sync Source: Google Docs Export API</div>
              <div>&gt; Parsing vehicle records...</div>
              <div className="text-emerald-400">&gt; 8 Certified vehicles loaded</div>
              <div>&gt; High-res photography rendered</div>
              <div>&gt; Ready for test drive requests</div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              "We believe buying a pre-owned luxury vehicle should feel as rewarding and straightforward as driving it off the lot."
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            The 4 Pillars of the Diamond Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered to give you absolute peace of mind with every mile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">160-Point Diamond Inspection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every engine, transmission, brake caliper, and electrical harness is thoroughly vetted by master technicians before entering inventory.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Complimentary Warranty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drive away with confidence. All qualifying vehicles include our 90-day / 3,000-mile comprehensive powertrain warranty at zero extra charge.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Clean Title Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Free CARFAX and AutoCheck reports provided with every vehicle. We refuse salvaged, flood, or frame-damaged vehicles without exception.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">3-Day Exchange Courtesy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Love your car or bring it back within 3 days or 150 miles to swap for any other vehicle of equal value in our inventory.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Staff */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-slate-900">Meet Our Automotive Specialists</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Passionate car enthusiasts dedicated to finding you the exact vehicle for your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xl">
              SV
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Spiros Velianitis</h3>
              <p className="text-xs text-blue-600 font-medium">Founder & Managing Director</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              15+ years in automotive acquisitions and high-performance vehicle curation. Pioneered Blue Diamon's live Google Docs pricing architecture.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xl">
              MC
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Marcus Chen</h3>
              <p className="text-xs text-blue-600 font-medium">Head of Certification & Inspection</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ASE Master Certified technician specializing in European performance, hybrid powertrains, and precision diagnostic calibration.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-cyan-900 text-white flex items-center justify-center font-bold text-xl">
              ER
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Elena Rostova</h3>
              <p className="text-xs text-blue-600 font-medium">Finance & Client Experience Director</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Coordinates prime rates with 20+ regional and national lenders to deliver custom payment solutions with zero upfront surprise fees.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-slate-900 ml-1.5">4.9 / 5.0 Star Dealership</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">What Our Clients Say</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-slate-700 italic">
              "I loved that the price in their Google Doc was the exact price on the invoice. No $995 doc fee, no mandatory ceramic coat package. Bought my BMW M340i in 45 minutes!"
            </p>
            <div className="font-bold text-slate-900 pt-1">— David K. (Verified Buyer)</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-slate-700 italic">
              "The Macan GTS arrived exactly as pictured. Super clean title, new tires, and Marcus walked me through the 160-point inspection line by line."
            </p>
            <div className="font-bold text-slate-900 pt-1">— Samantha T. (Verified Buyer)</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-slate-700 italic">
              "Traded in my old truck and got $1,000 more than CarMax offered. Elena in finance got me 5.2% APR when my own bank was quoting 7%. 10/10 recommend Blue Diamon."
            </p>
            <div className="font-bold text-slate-900 pt-1">— Robert M. (Verified Buyer)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
