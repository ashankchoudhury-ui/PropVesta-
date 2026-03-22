import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data';
import { Property } from '../types';
import { Waves, Briefcase, School, TrendingUp, CheckCircle2, RotateCcw, MessageSquare } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What matters most to you?",
    options: [
      { label: "Sea View", icon: Waves, value: "Sea View" },
      { label: "Near Office", icon: Briefcase, value: "Near Office" },
      { label: "Good Schools", icon: School, value: "Good Schools" },
      { label: "Investment ROI", icon: TrendingUp, value: "Investment" },
    ]
  },
  {
    id: 2,
    question: "Your budget range?",
    options: [
      { label: "< ₹2 Cr", value: "low" },
      { label: "₹2-5 Cr", value: "medium" },
      { label: "₹5+ Cr", value: "high" },
    ]
  },
  {
    id: 3,
    question: "Property type?",
    options: [
      { label: "1 BHK", value: 1 },
      { label: "2 BHK", value: 2 },
      { label: "3 BHK", value: 3 },
      { label: "4+ BHK", value: 4 },
    ]
  },
  {
    id: 4,
    question: "Timeline?",
    options: [
      { label: "Ready to Move", value: "Ready to Move" },
      { label: "Under Construction", value: "Under Construction" },
      { label: "Flexible", value: "Flexible" },
    ]
  }
];

export const PropertyMatcher: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [results, setResults] = useState<Property[]>([]);

  const handleAnswer = (value: any) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResults(newAnswers);
      setStep(step + 1);
    }
  };

  const calculateResults = (finalAnswers: any[]) => {
    const scored = properties.map(p => {
      let score = 0;
      
      // Q1: Preference
      if (finalAnswers[0] === "Sea View" && p.amenities.includes("Sea View")) score += 10;
      if (finalAnswers[0] === "Near Office" && p.amenities.includes("Cafeteria")) score += 10; // Using Cafeteria as a proxy for office amenities
      if (finalAnswers[0] === "Good Schools" && p.amenities.includes("Kids Play Area")) score += 10; // Using Kids Play Area as a proxy
      if (finalAnswers[0] === "Investment" && p.category === "Commercial") score += 10; // Using Commercial as a proxy for investment

      // Q2: Budget
      if (finalAnswers[1] === "low" && p.price < 20000000) score += 15;
      if (finalAnswers[1] === "medium" && p.price >= 20000000 && p.price <= 50000000) score += 15;
      if (finalAnswers[1] === "high" && p.price > 50000000) score += 15;

      // Q3: BHK
      if (p.bedrooms === finalAnswers[2]) score += 10;

      // Q4: Timeline
      if (finalAnswers[3] === "Ready to Move" && p.possession === "Ready to Move") score += 5;
      if (finalAnswers[3] === "Under Construction" && p.possession.includes("Under Construction")) score += 5;
      if (finalAnswers[3] === "Flexible") score += 5;

      return { ...p, matchScore: score };
    });

    const sorted = scored.sort((a: any, b: any) => b.matchScore - a.matchScore).slice(0, 3);
    setResults(sorted);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResults([]);
  };

  return (
    <section id="matcher" className="py-24 bg-light-gray">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Property</h2>
          <p className="text-medium-gray text-lg">Answer 4 quick questions for personalized matches</p>
        </div>

        <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl shadow-xl">
          <AnimatePresence mode="wait">
            {step < questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">Question {step + 1} of 4</span>
                    <span className="text-sm text-medium-gray">{Math.round(((step + 1) / 4) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-1 bg-charcoal/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / 4) * 100}%` }}
                      className="h-full bg-gold"
                    />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold mb-10">{questions[step].question}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt.value)}
                      className="flex items-center p-6 bg-white border border-charcoal/5 rounded-2xl hover:border-gold hover:shadow-lg transition-all duration-300 group text-left"
                    >
                      {opt.icon && (
                        <div className="w-12 h-12 bg-light-gray rounded-xl flex items-center justify-center mr-4 group-hover:bg-gold/10 transition-colors">
                          <opt.icon className="text-charcoal group-hover:text-gold transition-colors" size={24} />
                        </div>
                      )}
                      <span className="text-lg font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="mb-10">
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-gold" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Your Perfect Matches</h3>
                  <p className="text-medium-gray">Based on your answers, here are your top 3 properties:</p>
                </div>

                <div className="space-y-6 mb-12">
                  {results.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-charcoal/5 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="w-full md:w-48 h-48 bg-charcoal/10 relative overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${p.id}/400/400`} 
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {idx === 0 && (
                          <div className="absolute top-2 left-2 bg-gold text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Best Match
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6 text-left flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xl font-bold">{p.title}</h4>
                            <p className="text-sm text-medium-gray">{p.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gold">{p.priceLabel}</p>
                            <p className="text-xs text-medium-gray uppercase tracking-tighter">{p.bedrooms} BHK | {p.carpetArea} sq.ft</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {p.amenities.slice(0, 2).map(amenity => (
                            <span key={amenity} className="text-[10px] bg-light-gray px-2 py-1 rounded-full text-medium-gray font-medium uppercase tracking-wider">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 bg-light-gray/50 flex flex-col justify-center gap-2">
                        <button className="px-4 py-2 bg-charcoal text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-charcoal/10 text-charcoal text-sm font-semibold rounded-lg hover:bg-white transition-colors">
                          Schedule Visit
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={reset}
                    className="flex items-center text-medium-gray hover:text-charcoal font-medium transition-colors"
                  >
                    <RotateCcw size={18} className="mr-2" />
                    Start Over
                  </button>
                  <button className="flex items-center px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-gold-hover transition-all shadow-lg shadow-gold/20">
                    <MessageSquare size={18} className="mr-2" />
                    Talk to Arjun
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
