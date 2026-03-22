import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { neighborhoodData } from '../data';
import { School, Train, HeartPulse, ShoppingBag, Dumbbell, TrendingUp, Star } from 'lucide-react';

export const NeighborhoodScore: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState('Bandra West');
  const data = neighborhoodData[selectedArea];

  const categories = [
    { label: 'Schools & Education', icon: School, key: 'schools' },
    { label: 'Transport & Connectivity', icon: Train, key: 'transport' },
    { label: 'Healthcare Facilities', icon: HeartPulse, key: 'healthcare' },
    { label: 'Shopping & Dining', icon: ShoppingBag, key: 'shopping' },
    { label: 'Recreation & Parks', icon: Dumbbell, key: 'recreation' },
    { label: 'Property Appreciation', icon: TrendingUp, key: 'appreciation' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Neighborhood Analysis</h2>
          <p className="text-medium-gray text-lg">Data-driven insights for every area</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-4 bg-light-gray p-2 rounded-2xl">
            {Object.keys(neighborhoodData).map(area => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                  selectedArea === area
                    ? 'bg-white text-black shadow-lg shadow-black/5'
                    : 'text-medium-gray hover:text-charcoal'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Overview */}
          <div className="lg:col-span-4 glass p-8 md:p-12 rounded-3xl border-charcoal/5 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest text-charcoal/50">{selectedArea} Overview</h3>
            <div className="my-8 relative">
              <div className="w-48 h-48 rounded-full border-8 border-gold/10 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold text-charcoal">{data.overallScore}</span>
                <span className="text-sm font-bold text-medium-gray uppercase tracking-widest">/ 10</span>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-black px-6 py-2 rounded-full font-bold shadow-xl flex items-center">
                <Star size={16} className="mr-2 fill-black" />
                Excellent
              </div>
            </div>
            <p className="text-medium-gray leading-relaxed mb-8">
              {selectedArea} is one of Mumbai's most sought-after neighborhoods, offering a perfect blend of luxury living, connectivity, and lifestyle amenities.
            </p>
            <button className="w-full py-4 bg-charcoal text-white font-bold rounded-xl hover:bg-black transition-all">
              View Properties in {selectedArea}
            </button>
          </div>

          {/* Details */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {categories.map((cat, idx) => {
                const catData = (data as any)[cat.key];
                return (
                  <motion.div
                    key={`${selectedArea}-${cat.key}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 bg-light-gray/30 rounded-3xl border border-charcoal/5 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-gold/10 transition-colors">
                        <cat.icon className="text-charcoal group-hover:text-gold transition-colors" size={24} />
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-charcoal">{catData.score}</span>
                        <span className="text-xs font-bold text-medium-gray uppercase tracking-widest ml-1">/ 10</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold mb-4">{cat.label}</h4>
                    
                    <div className="w-full h-1.5 bg-charcoal/5 rounded-full overflow-hidden mb-6">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${catData.score * 10}%` }}
                        className="h-full bg-gold"
                      />
                    </div>

                    <ul className="space-y-2">
                      {(catData.nearby || catData.details || [catData.rate]).map((item: string, i: number) => (
                        <li key={i} className="text-sm text-medium-gray flex items-start">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
