import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, MessageSquare, Send } from 'lucide-react';

const steps = [
  {
    id: 1,
    question: "What are you looking to do?",
    options: ["Buy Property", "Sell Property", "Rent Property", "Invest"],
    type: "choice"
  },
  {
    id: 2,
    question: "What's your preferred property type?",
    options: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Commercial"],
    type: "choice"
  },
  {
    id: 3,
    question: "What's your budget range?",
    options: ["< ₹1 Cr", "₹1-3 Cr", "₹3-7 Cr", "₹7+ Cr"],
    type: "choice"
  },
  {
    id: 4,
    question: "Preferred location?",
    options: ["Bandra", "Juhu", "Andheri", "Powai", "Worli", "Other"],
    type: "choice"
  },
  {
    id: 5,
    question: "What's your name?",
    type: "input",
    fields: [
      { name: "firstName", placeholder: "First Name" },
      { name: "lastName", placeholder: "Last Name" }
    ]
  },
  {
    id: 6,
    question: "How can we reach you?",
    type: "input",
    fields: [
      { name: "email", placeholder: "Email Address", type: "email" },
      { name: "phone", placeholder: "WhatsApp Number", type: "tel" }
    ]
  },
  {
    id: 7,
    question: "Any specific requirements?",
    type: "textarea",
    placeholder: "Tell us more about your dream property..."
  }
];

export const LeadCapture: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleChoice = (value: string) => {
    const fieldName = `step_${step + 1}`;
    setFormData({ ...formData, [fieldName]: value });
    nextStep();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Let's Find Your Perfect Property</h2>
          <p className="text-medium-gray text-lg">Personalized recommendations in just 60 seconds</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl border-charcoal/5 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gold uppercase tracking-widest">Step {step + 1} of {steps.length}</span>
                    <span className="text-xs font-bold text-medium-gray">{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-charcoal/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                      className="h-full bg-gold"
                    />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-10 text-charcoal">{steps[step].question}</h3>

                {steps[step].type === "choice" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps[step].options?.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChoice(opt)}
                        className="p-6 bg-light-gray/30 border border-charcoal/5 rounded-2xl hover:border-gold hover:bg-white hover:shadow-xl transition-all duration-300 text-left font-bold text-lg group"
                      >
                        <div className="flex justify-between items-center">
                          {opt}
                          <ArrowRight size={18} className="text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {steps[step].type === "input" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps[step].fields?.map((field, idx) => (
                      <div key={idx}>
                        <input 
                          type={field.type || "text"}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          className="w-full p-6 bg-light-gray/30 border border-charcoal/5 rounded-2xl focus:border-gold focus:bg-white focus:shadow-xl transition-all outline-none text-lg font-medium"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {steps[step].type === "textarea" && (
                  <div>
                    <textarea 
                      name="requirements"
                      placeholder={steps[step].placeholder}
                      rows={4}
                      value={formData.requirements || ""}
                      onChange={handleInputChange}
                      className="w-full p-6 bg-light-gray/30 border border-charcoal/5 rounded-2xl focus:border-gold focus:bg-white focus:shadow-xl transition-all outline-none text-lg font-medium resize-none"
                    />
                  </div>
                )}

                <div className="mt-12 flex justify-between items-center">
                  {step > 0 ? (
                    <button 
                      onClick={prevStep}
                      className="flex items-center text-medium-gray hover:text-charcoal font-bold transition-colors"
                    >
                      <ArrowLeft size={18} className="mr-2" />
                      Back
                    </button>
                  ) : <div />}
                  
                  {steps[step].type !== "choice" && (
                    <button 
                      onClick={nextStep}
                      className="px-10 py-5 bg-gold text-black font-bold rounded-full hover:bg-gold-hover transition-all shadow-xl shadow-gold/20 flex items-center"
                    >
                      {step === steps.length - 1 ? "Submit Request" : "Continue"}
                      <ArrowRight size={18} className="ml-2" />
                    </button>
                  )}
                </div>

                <div className="mt-12 flex items-start gap-4 p-6 bg-gold/5 rounded-2xl border border-gold/10">
                  <MessageSquare size={20} className="text-gold shrink-0 mt-1" />
                  <p className="text-sm text-medium-gray leading-relaxed">
                    <span className="font-bold text-charcoal">Friendly tip:</span> We'll use this information to curate a list of properties that match your lifestyle and investment goals.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 className="text-success" size={48} />
                  </motion.div>
                </div>
                <h3 className="text-4xl font-bold mb-4">Request Received!</h3>
                <p className="text-medium-gray text-lg max-w-md mx-auto mb-10 leading-relaxed">
                  Perfect! We're already matching you with the best properties. Arjun will WhatsApp you within 5 minutes with personalized recommendations.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button className="px-10 py-5 bg-charcoal text-white font-bold rounded-full hover:bg-black transition-all shadow-xl">
                    Browse Properties
                  </button>
                  <button className="px-10 py-5 border border-charcoal/10 text-charcoal font-bold rounded-full hover:bg-white transition-all">
                    Schedule a Call
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
