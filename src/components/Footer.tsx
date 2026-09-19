import React from 'react';
import { ActiveTab, DocSyncInfo } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles, FileText, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSyncModal: () => void;
  syncInfo: DocSyncInfo;
}

export default function Footer({
  setActiveTab,
  onOpenSyncModal,
  syncInfo
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer Perks Bar */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">160-Point Certified</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Every vehicle rigorously inspected.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Google Docs Pricing</div>
              <div className="text-[11px] text-slate-400 mt-0.5">100% transparent live pricing.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">90-Day Warranty</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Complimentary powertrain protection.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">(704) 588-3420</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Direct sales & concierge desk.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-cyan-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 9l10 13 10-13-10-7zm0 2.2l6.8 4.8H5.2L12 4.2zm-7.6 6.3h4.4l3.2 9-7.6-9zm6.1 9V10.5h3v9l-3 0zm4.5-9h4.4l-7.6 9 3.2-9z" />
              </svg>
            </div>
            <span className="font-bold text-base text-white tracking-tight">BLUE DIAMON AUTO</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Premier pre-owned luxury and performance automotive dealership. Operating with the Diamond Standard of transparency, integrity, and verified quality.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenSyncModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Google Docs Sync Settings ({syncInfo.vehicleCount} loaded)</span>
            </button>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Navigation</h2>
          <ul className="space-y-1.5">
            <li>
              <button type="button" onClick={() => setActiveTab('inventory')} className="hover:text-white transition-colors">
                Certified Inventory
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setActiveTab('specials')} className="hover:text-white transition-colors">
                Manager Specials & Price Drops
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                About Blue Diamon Auto
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                Interactive Map & Directions
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                Schedule VIP Test Drive
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Hours & Operations */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Dealership Hours</h2>
          <ul className="space-y-1.5 text-slate-400">
            <li className="flex justify-between">
              <span>Monday – Friday:</span>
              <span className="text-slate-200 font-medium">8:30 AM – 7:30 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday:</span>
              <span className="text-slate-200 font-medium">9:00 AM – 6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-slate-400">Closed (Reconditioning)</span>
            </li>
          </ul>
          <p className="text-[11px] text-slate-500 pt-2">
            After-hours appointments available upon advance request.
          </p>
        </div>

        {/* Col 4: Location & Contact */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Showroom Location</h2>
          <div className="space-y-2 text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>7420 Diamond Crest Pkwy, Charlotte, NC 28217</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href="tel:7045883420" className="text-slate-200 hover:underline">(704) 588-3420</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href="mailto:sales@bluediamonauto.com" className="text-slate-200 hover:underline">sales@bluediamonauto.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Blue Diamon Auto. All rights reserved. Vehicle prices and images dynamically synchronized with Google Docs.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
