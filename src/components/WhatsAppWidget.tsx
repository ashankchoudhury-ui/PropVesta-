import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleChat = () => {
    const message = encodeURIComponent("Hi! I'm interested in properties from PropVista Realty. Can you help me find my perfect home?");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-28 lg:bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 mr-2 bg-white p-4 rounded-2xl shadow-2xl border border-charcoal/5 max-w-[200px] relative"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
            >
              <X size={12} />
            </button>
            <p className="text-sm font-bold text-charcoal leading-tight">
              Hi! I'm Arjun. Need help finding a property?
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-charcoal/5 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-2xl shadow-whatsapp/30 relative group"
      >
        <div className="absolute inset-0 bg-whatsapp rounded-full animate-ping opacity-20 group-hover:hidden" />
        <MessageCircle size={32} fill="white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
      </motion.button>
    </div>
  );
};
