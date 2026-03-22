import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-light-gray py-24 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-gold/20">
                <span className="text-black font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-charcoal">PropVista <span className="text-gold">Realty</span></span>
            </div>
            <p className="text-medium-gray leading-relaxed font-light">
              Find Your Next Chapter. We don't just sell properties. We help people find where they belong.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-charcoal/40 hover:text-gold hover:shadow-lg transition-all border border-charcoal/5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-8">Explore</h4>
            <ul className="space-y-4">
              {['Featured Properties', 'ROI Calculator', 'Comparison Tool', 'Neighborhood Analysis', 'Market Dashboard'].map(link => (
                <li key={link}>
                  <a href="#" className="text-medium-gray hover:text-gold transition-colors font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-8">Connect</h4>
            <ul className="space-y-4">
              {['About Arjun', 'Testimonials', 'Success Stories', 'Privacy Policy', 'Terms of Service'].map(link => (
                <li key={link}>
                  <a href="#" className="text-medium-gray hover:text-gold transition-colors font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-8">Reach Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shrink-0 border border-charcoal/5">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-medium-gray uppercase tracking-widest font-bold mb-1">Call Us</p>
                  <a href="tel:+919876543210" className="text-charcoal font-bold hover:text-gold transition-colors">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shrink-0 border border-charcoal/5">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-medium-gray uppercase tracking-widest font-bold mb-1">Email Us</p>
                  <a href="mailto:arjun@propvista.in" className="text-charcoal font-bold hover:text-gold transition-colors">arjun@propvista.in</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shrink-0 border border-charcoal/5">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-medium-gray uppercase tracking-widest font-bold mb-1">Office</p>
                  <p className="text-charcoal font-bold">BKC, Mumbai 400051</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-medium-gray">
            © 2025 PropVista Realty. RERA: MH12345678. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-medium-gray hover:text-charcoal font-bold uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-xs text-medium-gray hover:text-charcoal font-bold uppercase tracking-widest">Terms</a>
            <div className="flex items-center text-xs text-medium-gray bg-white px-4 py-2 rounded-full border border-charcoal/5">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              System Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
