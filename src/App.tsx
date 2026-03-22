import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Phone, MapPin, Star, LayoutGrid, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const targetId = (this as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white selection:bg-gold selection:text-black">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-gold/20">
                <span className="text-black font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-charcoal">PropVista <span className="text-gold">Realty</span></span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              {['Properties', 'Calculator', 'Compare', 'Analysis', 'Dashboard'].map(link => (
                <a 
                  key={link} 
                  href={`/#${link.toLowerCase()}`} 
                  className="text-xs font-bold uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors"
                >
                  {link}
                </a>
              ))}
              <Link to="/properties" className="text-xs font-bold uppercase tracking-widest text-charcoal/60 hover:text-gold transition-colors">Properties</Link>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="tel:+919876543210" 
                className="hidden md:flex items-center px-6 py-3 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all"
              >
                <Phone size={14} className="mr-2" />
                Call Now
              </a>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }} className="w-6 h-0.5 bg-charcoal rounded-full" />
                <motion.div animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-charcoal rounded-full" />
                <motion.div animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }} className="w-6 h-0.5 bg-charcoal rounded-full" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-20 right-0 z-[60] w-64 h-[calc(100vh-80px)] bg-white shadow-2xl p-6 lg:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-6">
            {['Properties', 'Calculator', 'Compare', 'Analysis', 'Dashboard'].map(link => (
              <a 
                key={link} 
                href={`/#${link.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold text-charcoal hover:text-gold transition-colors"
              >
                {link}
              </a>
            ))}
            <Link 
              to="/properties" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-charcoal hover:text-gold transition-colors"
            >
              Properties
            </Link>
            <div className="flex flex-col gap-4 mt-4">
              <a 
                href="tel:+919876543210" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all"
              >
                <Phone size={14} />
                Call Now
              </a>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#128C7E] transition-all"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>

        <Footer />
        <WhatsAppWidget />

        {/* Mobile Sticky Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-charcoal/5 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] flex items-center justify-around h-20 px-4">
          <a href="tel:+919876543210" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center text-charcoal">
              <Phone size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-medium-gray">Call</span>
          </a>
          <a href="/#calculator" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
              <Star size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-medium-gray">Valuate</span>
          </a>
          <a href="/#analysis" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center text-charcoal">
              <MapPin size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-medium-gray">Location</span>
          </a>
          <Link to="/properties" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
              <LayoutGrid size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-medium-gray">Properties</span>
          </Link>
        </div>
      </div>
    </BrowserRouter>
  );
}
