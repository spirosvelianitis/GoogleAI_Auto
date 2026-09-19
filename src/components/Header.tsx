import React, { useState } from 'react';
import { ActiveTab, DocSyncInfo } from '../types';
import { Phone, MapPin, Calendar, FileText, Menu, X, Sparkles, Tag, Car } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  specialsCount: number;
  syncInfo: DocSyncInfo;
  onOpenSyncModal: () => void;
  onOpenScheduleTestDrive: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  specialsCount,
  syncInfo,
  onOpenSyncModal,
  onOpenScheduleTestDrive
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'inventory', label: 'Inventory', icon: <Car className="w-4 h-4" /> },
    { id: 'specials', label: 'Specials & Deals', icon: <Tag className="w-4 h-4" />, badge: specialsCount },
    { id: 'about', label: 'About Us', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Map', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
      {/* Top micro-bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-medium text-slate-300">Showroom Open Today • 8:30 AM - 7:30 PM</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>7420 Diamond Crest Pkwy, Charlotte, NC</span>
          </div>
        </div>

        {/* Google Doc Sync Status pill */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSyncModal}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 hover:bg-blue-900 border border-blue-600/40 text-[11px] text-cyan-300 transition-colors"
            title="Manage Google Docs inventory source"
          >
            <FileText className="w-3 h-3 text-cyan-400" />
            <span>Google Docs Synced ({syncInfo.vehicleCount} Cars)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>

          <a
            href="tel:7045883420"
            className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-white hover:text-cyan-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-cyan-400" />
            <span>(704) 588-3420</span>
          </a>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-800 to-slate-900 p-0.5 shadow-lg border border-cyan-400/40 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-[10px] bg-slate-950/40 flex items-center justify-center">
              {/* Faceted diamond geometric icon */}
              <svg className="w-6 h-6 text-cyan-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 9l10 13 10-13-10-7zm0 2.2l6.8 4.8H5.2L12 4.2zm-7.6 6.3h4.4l3.2 9-7.6-9zm6.1 9V10.5h3v9l-3 0zm4.5-9h4.4l-7.6 9 3.2-9z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-sans">
                BLUE DIAMON
              </span>
              <span className="font-light text-xl sm:text-2xl tracking-wider text-cyan-400">
                AUTO
              </span>
            </div>
            <div className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold flex items-center gap-1">
              <span>The Diamond Standard</span>
              <span className="text-cyan-400">•</span>
              <span>Pre-Owned Luxury</span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-blue-900' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenScheduleTestDrive}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-md transition-all transform active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Test Drive</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                    {item.badge} deals
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                onOpenScheduleTestDrive();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Test Drive</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenSyncModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-medium border border-blue-900/60"
            >
              <FileText className="w-4 h-4" />
              <span>Google Docs Inventory Manager</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
