import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { properties } from '../data';
import { FilterSidebar } from '../components/FilterSidebar';
import { PropertyCard } from '../components/PropertyCard';
import { LayoutGrid, List, Map } from 'lucide-react';

export const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    type: 'All',
    category: [],
    priceMin: 0,
    priceMax: 1000000000,
    bhk: [],
    locations: [],
    possession: [],
    furnishing: [],
    amenities: [],
    areaMin: 0,
    areaMax: 10000,
    verifiedOnly: false
  });
  const [savedProperties, setSavedProperties] = useState<number[]>([]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (filters.type !== 'All' && p.type !== filters.type) return false;
      if (filters.category.length > 0 && !filters.category.includes(p.category)) return false;
      if (filters.verifiedOnly && !p.verified) return false;
      return true;
    });
  }, [filters]);

  const toggleSave = (property: Property) => {
    setSavedProperties(prev => 
      prev.includes(property.id) ? prev.filter(id => id !== property.id) : [...prev, property.id]
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 flex gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} properties={properties} />
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Showing {filteredProperties.length} Properties</h1>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gold text-white' : 'bg-light-gray'}`}><LayoutGrid size={20} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-gold text-white' : 'bg-light-gray'}`}><List size={20} /></button>
              <button className="p-2 rounded bg-light-gray"><Map size={20} /></button>
            </div>
          </div>

          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                viewMode={viewMode}
                onQuickView={() => console.log('Quick view', property)}
                onSave={toggleSave}
                isSaved={savedProperties.includes(property.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
