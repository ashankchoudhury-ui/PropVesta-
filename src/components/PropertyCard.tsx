import React from 'react';
import { Property } from '../types';
import { Heart, MapPin, CheckCircle, Eye } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  viewMode: 'grid' | 'list';
  onQuickView: (property: Property) => void;
  onSave: (property: Property) => void;
  isSaved: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode, onQuickView, onSave, isSaved }) => {
  return (
    <div className={`bg-white rounded-2xl border border-charcoal/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-64'}`}>
        <img 
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400&h=300" 
          alt={property.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && <span className="px-2 py-1 bg-gold text-black text-[10px] font-bold uppercase rounded">Featured</span>}
          {property.verified && <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded flex items-center gap-1"><CheckCircle size={10} /> Verified</span>}
        </div>
        <button 
          onClick={() => onSave(property)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isSaved ? 'bg-red-500 text-white' : 'bg-white/80 text-charcoal hover:bg-white'}`}
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
        <div className="text-2xl font-bold text-gold mb-2">{property.priceLabel}</div>
        <h3 className="text-xl font-bold text-charcoal mb-2">{property.title}</h3>
        <p className="text-sm text-medium-gray mb-4 flex items-center gap-1"><MapPin size={14} /> {property.location}</p>
        
        <div className="flex flex-wrap gap-2 text-xs text-charcoal/70 mb-4">
          <span>{property.bedrooms} BHK</span> | <span>{property.carpetArea} sq.ft</span> | <span>{property.floor}</span>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <button 
            onClick={() => onQuickView(property)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors"
          >
            <Eye size={14} /> View Details
          </button>
          <button className="px-4 py-2 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
