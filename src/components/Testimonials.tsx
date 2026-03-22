import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Arjun helped us find our dream 3BHK in Bandra within our budget. His market knowledge and honesty made the process stress-free. We're finally home.",
    author: "Rahul & Priya Sharma",
    property: "3BHK, Bandra West",
    date: "March 2024"
  },
  {
    quote: "Professional, transparent, and always available. Got us the best deal on our office space in Andheri. Highly recommended!",
    author: "Vikram Patel, CEO",
    property: "Office Space, Andheri East",
    date: "January 2024"
  },
  {
    quote: "Sold our property in Powai at premium rates. Arjun's marketing strategy and negotiation skills are exceptional.",
    author: "Anjali Mehta",
    property: "2BHK, Powai",
    date: "December 2023"
  },
  {
    quote: "Found our first home with Arjun's guidance. He explained everything patiently and helped us get the best home loan rates.",
    author: "Rohan & Sneha Desai",
    property: "1BHK, Santacruz",
    date: "October 2023"
  },
  {
    quote: "Best rental experience! Arjun found us a perfect furnished apartment in Worli within our budget. Smooth process from start to finish.",
    author: "James Anderson (Expat)",
    property: "3BHK Rental, Worli",
    date: "February 2024"
  }
];

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-charcoal text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/50 text-lg">Real stories from real families we've helped</p>
        </div>

        <div className="relative glass-dark p-12 md:p-20 rounded-[3rem] border-white/5 shadow-2xl">
          <div className="absolute top-12 left-12 text-gold/20">
            <Quote size={120} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={20} className="text-gold fill-gold" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-4xl font-display italic leading-relaxed mb-12 text-balance">
                  "{testimonials[index].quote}"
                </blockquote>

                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-bold text-gold mb-2">{testimonials[index].author}</h4>
                  <p className="text-white/50 text-sm uppercase tracking-widest font-bold">
                    {testimonials[index].property} | {testimonials[index].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === i ? 'bg-gold w-8' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
