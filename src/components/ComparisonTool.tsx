import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data';
import { Property } from '../types';
import { Star, CheckCircle2, ChevronRight, X, Plus } from 'lucide-react';

export const ComparisonTool: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const selectedProperties = useMemo(() => {
    return selectedIds.map(id => properties.find(p => p.id === id)!).filter(Boolean);
  }, [selectedIds]);

  const winner = useMemo(() => {
    if (selectedProperties.length < 2) return null;
    
    const p1 = selectedProperties[0];
    const p2 = selectedProperties[1];
    
    let s1 = 0;
    let s2 = 0;

    if (p1.pricePerSqft < p2.pricePerSqft) s1 += 2; else s2 += 2;
    if (p1.roi5Year > p2.roi5Year) s1 += 3; else s2 += 3;
    if (p1.rentalYield > p2.rentalYield) s1 += 2; else s2 += 2;
    if (p1.neighborhoodScore > p2.neighborhoodScore) s1 += 2; else s2 += 2;
    if (p1.possession === "Ready to Move") s1 += 1;
    if (p2.possession === "Ready to Move") s2 += 1;

    return s1 > s2 ? p1.id : p2.id;
  }, [selectedProperties]);

  const toggleProperty = (id: number) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(sid => sid !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Compare Properties</h2>
          <p className="text-medium-gray text-lg">Select up to 3 properties to compare side-by-side</p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {properties.map(p => (
            <button
              key={p.id}
              onClick={() => toggleProperty(p.id)}
              className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedIds.includes(p.id)
                  ? 'bg-gold border-gold text-black font-bold shadow-lg shadow-gold/20'
                  : 'bg-white border-charcoal/10 text-medium-gray hover:border-charcoal/30'
              }`}
            >
              {selectedIds.includes(p.id) ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
              {p.title}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] glass rounded-3xl overflow-hidden border-charcoal/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-charcoal text-white">
                  <th className="p-8 w-1/4 uppercase tracking-widest text-xs font-bold text-white/50">Feature</th>
                  {selectedProperties.map(p => (
                    <th key={p.id} className="p-8 w-1/4 relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-white/10">
                          <img 
                            src={`https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400&h=300`} 
                            alt={p.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h4 className="text-lg font-bold leading-tight mb-1">{p.title}</h4>
                        <p className="text-xs text-white/50 uppercase tracking-tighter">{p.location}</p>
                        {winner === p.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-4 -right-4 bg-gold text-black px-4 py-2 rounded-full text-xs font-bold flex items-center shadow-xl"
                          >
                            <Star size={14} className="mr-1 fill-black" />
                            Best Value
                          </motion.div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  { label: 'Price', key: 'priceLabel', highlight: 'price' },
                  { label: 'Price/sq.ft', key: 'pricePerSqft', highlight: 'pricePerSqft', better: 'lower' },
                  { label: 'BHK', key: 'bedrooms' },
                  { label: 'Carpet Area', key: 'carpetArea', better: 'higher' },
                  { label: 'Floor', key: 'floor' },
                  { label: 'Parking', key: 'parking', better: 'higher' },
                  { label: 'Possession', key: 'possession' },
                  { label: 'ROI (5 years)', key: 'roi5Year', suffix: '%', better: 'higher' },
                  { label: 'Rental Yield', key: 'rentalYield', suffix: '%', better: 'higher' },
                  { label: 'Neighborhood', key: 'neighborhoodScore', suffix: '/10', better: 'higher' },
                ].map((row, idx) => (
                  <tr key={row.label} className={idx % 2 === 0 ? 'bg-light-gray/30' : 'bg-white'}>
                    <td className="p-6 font-semibold text-charcoal/60 border-r border-charcoal/5">{row.label}</td>
                    {selectedProperties.map(p => {
                      const val = (p as any)[row.key];
                      const isBetter = row.better && selectedProperties.length > 1 && (
                        row.better === 'higher' 
                          ? val === Math.max(...selectedProperties.map(sp => (sp as any)[row.key]))
                          : val === Math.min(...selectedProperties.map(sp => (sp as any)[row.key]))
                      );

                      return (
                        <td key={p.id} className={`p-6 text-center font-medium ${isBetter ? 'text-gold' : 'text-charcoal'}`}>
                          <div className="flex items-center justify-center">
                            {val}{row.suffix}
                            {isBetter && <Star size={14} className="ml-2 fill-gold" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="bg-charcoal/5">
                  <td className="p-8 font-bold text-charcoal uppercase tracking-widest text-xs">Verdict</td>
                  {selectedProperties.map(p => (
                    <td key={p.id} className="p-8 text-center">
                      {winner === p.id ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="text-success mb-2" size={32} />
                          <p className="text-sm font-bold text-charcoal">Recommended Choice</p>
                          <button className="mt-4 px-6 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold-hover transition-all text-sm">
                            Schedule Visit
                          </button>
                        </div>
                      ) : (
                        <button className="px-6 py-3 border border-charcoal/10 text-charcoal font-bold rounded-xl hover:bg-white transition-all text-sm">
                          View Details
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-medium-gray italic flex items-center justify-center">
            <Star size={16} className="mr-2 text-gold fill-gold" />
            Winner is selected based on value for money, ROI, and neighborhood score.
          </p>
        </div>
      </div>
    </section>
  );
};
