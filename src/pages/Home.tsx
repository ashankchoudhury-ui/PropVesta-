import React from 'react';
import { Hero } from '../components/Hero';
import { PropertyMatcher } from '../components/PropertyMatcher';
import { ROICalculator } from '../components/ROICalculator';
import { ComparisonTool } from '../components/ComparisonTool';
import { NeighborhoodScore } from '../components/NeighborhoodScore';
import { MarketDashboard } from '../components/MarketDashboard';
import { LeadCapture } from '../components/LeadCapture';
import { PropertyCard } from '../components/PropertyCard';
import { Testimonials } from '../components/Testimonials';
import { MeetArjun } from '../components/MeetArjun';
import { properties } from '../data';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />

      {/* Featured Properties Section */}
      <section id="properties" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Featured Properties</h2>
              <p className="text-medium-gray text-lg">Not just places. Possibilities. Hand-picked luxury listings in Mumbai's most premium neighborhoods.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/properties" className="px-8 py-4 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all">
                View All
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(p => p.featured).map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                viewMode="grid"
                onQuickView={() => console.log('Quick view', property)}
                onSave={() => console.log('Save', property)}
                isSaved={false}
              />
            ))}
          </div>
        </div>
      </section>

      <PropertyMatcher />
      
      <div id="calculator">
        <ROICalculator />
      </div>

      <div id="compare">
        <ComparisonTool />
      </div>

      <div id="analysis">
        <NeighborhoodScore />
      </div>

      <div id="dashboard">
        <MarketDashboard />
      </div>

      <MeetArjun />
      
      <Testimonials />
      
      <LeadCapture />
    </main>
  );
};
