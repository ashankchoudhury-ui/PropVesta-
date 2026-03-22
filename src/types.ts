export interface Property {
  id: number;
  title: string;
  subtitle?: string;
  location: string;
  area: string;
  price: number;
  priceLabel: string;
  pricePerSqft: number;
  type: 'Sale' | 'Rent';
  category: 'Residential' | 'Commercial';
  bedrooms?: number;
  bathrooms?: number;
  carpetArea: number;
  builtUpArea: number;
  floor: string;
  totalFloors?: number;
  facing?: string;
  parking: number;
  furnishing: string;
  possession: string;
  possessionDate?: string;
  ageOfProperty: string;
  amenities: string[];
  featured: boolean;
  verified: boolean;
  imageUrl: string;
  coordinates: { lat: number; lng: number };
  deposit?: string;
}

export interface NeighborhoodData {
  overallScore: number;
  schools: { score: number; nearby: string[] };
  transport: { score: number; details: string[] };
  healthcare: { score: number; nearby: string[] };
  shopping: { score: number; details: string[] };
  recreation: { score: number; details: string[] };
  appreciation: { score: number; rate: string };
}

export interface MarketTrend {
  month: string;
  bandraWest: number;
  juhu: number;
  powai: number;
  andheri: number;
}
