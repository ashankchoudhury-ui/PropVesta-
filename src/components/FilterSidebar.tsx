import React from 'react';
import { Property } from '../types';

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  properties: Property[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, properties }) => {
  const updateFilter = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="w-[280px] flex-shrink-0 bg-white p-6 border-r border-charcoal/5 hidden lg:block">
      <h2 className="text-xl font-bold mb-6">Filters</h2>
      <button 
        onClick={() => setFilters({ type: 'All', category: [], priceMin: 0, priceMax: 1000000000, bhk: [], locations: [], possession: [], furnishing: [], amenities: [], areaMin: 0, areaMax: 10000, verifiedOnly: false })}
        className="text-xs font-bold uppercase tracking-widest text-gold hover:text-black mb-6"
      >
        Clear All Filters
      </button>

      {/* Transaction Type */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Transaction Type</h3>
        {['All', 'Sale', 'Rent'].map(type => (
          <label key={type} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              checked={filters.type === type} 
              onChange={() => updateFilter('type', type)}
              className="accent-gold"
            />
            <span className="text-sm text-charcoal">{type}</span>
          </label>
        ))}
      </div>

      {/* Property Type */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Property Type</h3>
        {['Residential', 'Commercial'].map(category => (
          <label key={category} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.category.includes(category)}
              onChange={(e) => {
                const newCategories = e.target.checked 
                  ? [...filters.category, category]
                  : filters.category.filter((c: string) => c !== category);
                updateFilter('category', newCategories);
              }}
              className="accent-gold"
            />
            <span className="text-sm text-charcoal">{category}</span>
          </label>
        ))}
      </div>
      
      {/* Add more filters here: Price, BHK, Location, etc. */}
    </div>
  );
};
