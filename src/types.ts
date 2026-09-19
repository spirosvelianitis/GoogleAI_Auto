export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  originalPrice?: number;
  mileage: number;
  pictures: string[];
  vin: string;
  bodyStyle: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible' | 'Hatchback';
  exteriorColor: string;
  interiorColor: string;
  transmission: string;
  drivetrain: string;
  fuelType: 'Gas' | 'Hybrid' | 'Electric' | 'Diesel';
  engine: string;
  mpg: string;
  isSpecial: boolean;
  specialTag?: string;
  features: string[];
  description: string;
  cleanCarfax: boolean;
  oneOwner: boolean;
  status: 'Available' | 'Pending' | 'Sold';
}

export interface DocSyncInfo {
  docUrl: string;
  docId: string;
  lastSyncedAt: string;
  status: 'synced' | 'syncing' | 'error' | 'demo';
  source: 'google_docs_export' | 'google_docs_pub' | 'custom_editor' | 'default_preset';
  vehicleCount: number;
  rawText: string;
  errorMessage?: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  type: 'test_drive' | 'price_quote' | 'financing' | 'trade_in' | 'general';
  vehicleId?: string;
  vehicleName?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredContact: 'phone' | 'email' | 'text';
  message: string;
}

export type ActiveTab = 'inventory' | 'specials' | 'about' | 'contact';

export interface FilterState {
  search: string;
  make: string;
  bodyStyle: string;
  maxPrice: number;
  minYear: number;
  maxMileage: number;
  fuelType: string;
  transmission: string;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';
}
