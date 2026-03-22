import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Calendar, Star } from 'lucide-react';

export const MeetArjun: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-gold/10 rounded-[3rem] -rotate-6 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Arjun Malhotra"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl shadow-2xl border-charcoal/5 hidden md:block"
            >
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-gold">12+</p>
                  <p className="text-[10px] font-bold text-medium-gray uppercase tracking-widest">Years Exp</p>
                </div>
                <div className="border-x border-charcoal/5 px-8">
                  <p className="text-3xl font-bold text-gold">800+</p>
                  <p className="text-[10px] font-bold text-medium-gray uppercase tracking-widest">Families</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold">₹150+</p>
                  <p className="text-[10px] font-bold text-medium-gray uppercase tracking-widest">Cr Deals</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest">
              <Star size={14} className="mr-2 fill-gold" />
              Expert Property Consultant
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl font-bold text-charcoal leading-tight">
              I don't just sell <br /> <span className="italic font-normal text-gold">properties.</span>
            </h2>
            
            <p className="text-xl text-medium-gray leading-relaxed font-light">
              After 12 years in Mumbai's real estate market, I've learned that buying property isn't about square footage. It's about finding alignment. I help people find where they belong.
            </p>
            
            <p className="text-lg text-medium-gray leading-relaxed">
              800+ families have trusted me with their biggest decision. My mission is simple: Your dream home is my mission.
            </p>

            <div className="flex flex-wrap gap-4 pt-8">
              <button className="px-10 py-5 bg-charcoal text-white font-bold rounded-full hover:bg-black transition-all shadow-xl flex items-center">
                <Calendar size={18} className="mr-2" />
                Schedule a Call
              </button>
              <button className="px-10 py-5 bg-whatsapp text-white font-bold rounded-full hover:bg-whatsapp/90 transition-all shadow-xl flex items-center">
                <MessageSquare size={18} className="mr-2" />
                WhatsApp Arjun
              </button>
            </div>

            <div className="pt-12 flex items-center gap-12 border-t border-charcoal/5">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-medium-gray uppercase tracking-widest mb-1">Direct Line</span>
                <a href="tel:+919876543210" className="text-xl font-bold text-charcoal hover:text-gold transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-medium-gray uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:arjun@propvista.in" className="text-xl font-bold text-charcoal hover:text-gold transition-colors">arjun@propvista.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
