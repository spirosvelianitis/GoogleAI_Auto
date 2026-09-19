import React, { useState, useMemo } from 'react';
import { Vehicle, FilterState, DocSyncInfo } from '../types';
import { 
  Search, SlidersHorizontal, ArrowUpDown, ShieldCheck, 
  Fuel, Gauge, Calendar, Sparkles, RefreshCw, Eye, Tag, 
  Car, Check, ExternalLink, FileText 
} from 'lucide-react';

interface InventoryViewProps {
  vehicles: Vehicle[];
  syncInfo: DocSyncInfo;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onScheduleTestDrive: (vehicle: Vehicle) => void;
  onOpenSyncModal: () => void;
  onViewSpecials: () => void;
}

export default function InventoryView({
  vehicles,
  syncInfo,
  onSelectVehicle,
  onScheduleTestDrive,
  onOpenSyncModal,
  onViewSpecials
}: InventoryViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    make: 'all',
    bodyStyle: 'all',
    maxPrice: 100000,
    minYear: 2018,
    maxMileage: 100000,
    fuelType: 'all',
    transmission: 'all',
    sortBy: 'price-asc',
  });

  // Unique makes available in dataset
  const availableMakes = useMemo(() => {
    const set = new Set<string>();
    vehicles.forEach(v => set.add(v.make));
    return Array.from(set).sort();
  }, [vehicles]);

  const bodyStyles = ['all', 'Sedan', 'SUV', 'Truck', 'Coupe'];

  // Filtered and sorted vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesTitle = `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(query);
        const matchesVin = v.vin.toLowerCase().includes(query);
        const matchesFeatures = v.features.some(f => f.toLowerCase().includes(query));
        if (!matchesTitle && !matchesVin && !matchesFeatures) return false;
      }

      // Make
      if (filters.make !== 'all' && v.make.toLowerCase() !== filters.make.toLowerCase()) {
        return false;
      }

      // Body Style
      if (filters.bodyStyle !== 'all' && v.bodyStyle.toLowerCase() !== filters.bodyStyle.toLowerCase()) {
        return false;
      }

      // Max Price
      if (v.price > filters.maxPrice) {
        return false;
      }

      // Fuel Type
      if (filters.fuelType !== 'all' && v.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'year-desc') return b.year - a.year;
      if (filters.sortBy === 'mileage-asc') return a.mileage - b.mileage;
      return 0;
    });
  }, [vehicles, filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      make: 'all',
      bodyStyle: 'all',
      maxPrice: 100000,
      minYear: 2018,
      maxMileage: 100000,
      fuelType: 'all',
      transmission: 'all',
      sortBy: 'price-asc',
    });
  };

  const specialsTotal = vehicles.filter(v => v.isSpecial).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner with Diamond Accent */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-96 h-96 text-cyan-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 9l10 13 10-13-10-7zm0 2.2l6.8 4.8H5.2L12 4.2zm-7.6 6.3h4.4l3.2 9-7.6-9zm6.1 9V10.5h3v9l-3 0zm4.5-9h4.4l-7.6 9 3.2-9z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Docs Synced Inventory • 100% Transparent Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Diamond Standard in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Pre-Owned Vehicles</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every vehicle on our lot is hand-selected, rigorously 160-point certified, and updated live from our master Google Docs pricing sheet. Zero hidden dealership fees.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onViewSpecials}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Explore {specialsTotal} Manager Specials</span>
            </button>

            <button
              type="button"
              onClick={onOpenSyncModal}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect Connected Google Doc</span>
            </button>
          </div>
        </div>

        {/* Live sync indicator footer within hero */}
        <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Inventory Database: <strong>{vehicles.length} Vehicles in Stock</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span>Prices and photos synced from Google Docs</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Row 1: Search & Body style chips */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by Make, Model (e.g. BMW M340i, Porsche, Corvette), VIN, or features..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Body style quick filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {bodyStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setFilters({ ...filters, bodyStyle: style })}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filters.bodyStyle === style
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {style === 'all' ? 'All Body Types' : style}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Detailed Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Make Filter */}
          <div>
            <label className="text-slate-500 font-medium block mb-1">Make</label>
            <select
              value={filters.make}
              onChange={(e) => setFilters({ ...filters, make: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Makes ({vehicles.length})</option>
              {availableMakes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Max Price Filter */}
          <div>
            <label className="text-slate-500 font-medium block mb-1">Max Price</label>
            <select
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={100000}>Any Price</option>
              <option value={40000}>Under $40,000</option>
              <option value={50000}>Under $50,000</option>
              <option value={60000}>Under $60,000</option>
              <option value={75000}>Under $75,000</option>
            </select>
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label className="text-slate-500 font-medium block mb-1">Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Fuel Types</option>
              <option value="gas">Gasoline</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric (EV)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-slate-500 font-medium block mb-1">Sort Vehicles</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="mileage-asc">Mileage: Lowest First</option>
            </select>
          </div>
        </div>

        {/* Results summary & reset */}
        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredVehicles.length}</strong> of {vehicles.length} vehicles available
          </div>
          {(filters.search || filters.make !== 'all' || filters.bodyStyle !== 'all' || filters.maxPrice < 100000 || filters.fuelType !== 'all') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Car className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">No matching vehicles found</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try broadening your search criteria or resetting filters to see our full inventory loaded from Google Docs.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const primaryPic = vehicle.pictures[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80";
            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div 
                  className="relative h-56 bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => onSelectVehicle(vehicle)}
                >
                  <img
                    src={primaryPic}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {vehicle.isSpecial && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-extrabold shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{vehicle.specialTag || "Special Deal"}</span>
                      </span>
                    )}
                    {vehicle.cleanCarfax && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur text-emerald-400 text-[11px] font-semibold shadow flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Clean CARFAX</span>
                      </span>
                    )}
                  </div>

                  {/* Google Doc Synced badge on card */}
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur text-[10px] text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <FileText className="w-2.5 h-2.5" />
                      <span>Google Doc Synced</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Year & Body */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                      <span>{vehicle.year}</span>
                      <span>•</span>
                      <span>{vehicle.bodyStyle}</span>
                      <span>•</span>
                      <span>{vehicle.drivetrain}</span>
                    </div>

                    {/* Title */}
                    <h2 
                      onClick={() => onSelectVehicle(vehicle)}
                      className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight"
                    >
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h2>

                    {/* Specs Badges */}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.mileage.toLocaleString()} mi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Synced Live Price</div>
                      <div className="flex items-baseline gap-2">
                        {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ${vehicle.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-xl font-extrabold text-slate-900">
                          ${vehicle.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-emerald-600 font-semibold block">
                        {vehicle.isSpecial ? "Save $" + (vehicle.originalPrice ? (vehicle.originalPrice - vehicle.price).toLocaleString() : "Off") : "No Dealer Markups"}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectVehicle(vehicle)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onScheduleTestDrive(vehicle)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Test Drive</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
