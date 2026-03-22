import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, Download, Mail, Info } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(45000000);
  const [downPayment, setDownPayment] = useState(10000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [monthlyRent, setMonthlyRent] = useState(100000);
  const [appreciationRate, setAppreciationRate] = useState(8);

  const [results, setResults] = useState<any>({
    emi: 0,
    netCashFlow: 0,
    rentalYield: 0,
    roi5Year: 0,
    breakEven: 0,
    futureValue: 0,
    totalGain: 0,
    chartData: []
  });

  useEffect(() => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = (interestRate / 12) / 100;
    const numPayments = loanTenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);

    const netCashFlow = monthlyRent - emi;
    const rentalYield = ((monthlyRent * 12) / propertyPrice) * 100;
    const futureValue = propertyPrice * Math.pow(1 + (appreciationRate/100), 5);
    
    const totalRentalIncome = monthlyRent * 12 * 5;
    const totalEMIPaid = emi * 12 * 5;
    const propertyGain = futureValue - propertyPrice;
    const totalGain = propertyGain + totalRentalIncome - totalEMIPaid;
    const roi5Year = (totalGain / downPayment) * 100;
    const breakEven = downPayment / (netCashFlow * 12);

    // Generate chart data
    const chartData = [];
    for (let i = 0; i <= 10; i++) {
      const val = propertyPrice * Math.pow(1 + (appreciationRate/100), i);
      chartData.push({
        year: `Year ${i}`,
        value: Math.round(val / 10000000 * 100) / 100 // In Crores
      });
    }

    setResults({
      emi,
      netCashFlow,
      rentalYield,
      roi5Year,
      breakEven,
      futureValue,
      totalGain,
      chartData
    });
  }, [propertyPrice, downPayment, interestRate, loanTenure, monthlyRent, appreciationRate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatCrore = (val: number) => {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  };

  const downloadReport = () => {
    const csvContent = [
      'Field,Value',
      `Property Price,${results.emi}`,
      `Down Payment,${results.netCashFlow}`,
      `Interest Rate,${results.roi5Year}`,
      `Tenure,${results.breakEven}`,
      `Monthly Rent,${results.futureValue}`,
      `Appreciation Rate,${results.totalGain}`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roi_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-xl mb-4">
            <Calculator className="text-gold" size={24} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Investment ROI Calculator</h2>
          <p className="text-medium-gray text-lg max-w-2xl mx-auto">Calculate your property investment returns with real-time data and interactive charts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass p-8 rounded-3xl border-charcoal/5">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-wider text-charcoal/50">Property Details</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold">Property Price</label>
                    <span className="text-sm font-bold text-gold">{formatCrore(propertyPrice)}</span>
                  </div>
                  <input 
                    type="range" min="5000000" max="100000000" step="1000000"
                    value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold">Down Payment</label>
                    <span className="text-sm font-bold text-gold">{formatCrore(downPayment)}</span>
                  </div>
                  <input 
                    type="range" min={propertyPrice * 0.2} max={propertyPrice * 0.5} step="500000"
                    value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Interest Rate</label>
                      <span className="text-sm font-bold text-gold">{interestRate}%</span>
                    </div>
                    <input 
                      type="range" min="7" max="12" step="0.1"
                      value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Tenure (Years)</label>
                      <span className="text-sm font-bold text-gold">{loanTenure}</span>
                    </div>
                    <input 
                      type="range" min="5" max="30" step="1"
                      value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold">Monthly Rent</label>
                    <span className="text-sm font-bold text-gold">{formatCurrency(monthlyRent)}</span>
                  </div>
                  <input 
                    type="range" min="20000" max="300000" step="5000"
                    value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold">Appreciation Rate</label>
                    <span className="text-sm font-bold text-gold">{appreciationRate}%</span>
                  </div>
                  <input 
                    type="range" min="3" max="15" step="0.5"
                    value={appreciationRate} onChange={(e) => setAppreciationRate(Number(e.target.value))}
                    className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <div className="bg-charcoal text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Monthly Loan EMI</p>
                    <p className="text-3xl font-bold text-gold">{formatCurrency(results.emi)}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Net Monthly Cash Flow</p>
                    <p className={`text-3xl font-bold ${results.netCashFlow >= 0 ? 'text-success' : 'text-red-400'}`}>
                      {results.netCashFlow >= 0 ? '+' : ''}{formatCurrency(results.netCashFlow)}
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">5-Year ROI</p>
                    <p className="text-3xl font-bold text-gold">{results.roi5Year.toFixed(1)}%</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Break-even Period</p>
                    <p className="text-3xl font-bold text-gold">
                      {results.breakEven > 0 ? `${results.breakEven.toFixed(1)} years` : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="mb-12">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h4 className="text-xl font-bold mb-1">Property Growth Projection</h4>
                      <p className="text-white/50 text-sm">Estimated value over the next 10 years (in Crores)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Value in 5 Years</p>
                      <p className="text-2xl font-bold text-gold">{formatCrore(results.futureValue)}</p>
                    </div>
                  </div>
                  
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis 
                          dataKey="year" 
                          stroke="#ffffff30" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                          dy={10}
                        />
                        <YAxis 
                          stroke="#ffffff30" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => `₹${val}Cr`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #ffffff20', borderRadius: '12px' }}
                          itemStyle={{ color: '#D4AF37' }}
                          labelStyle={{ color: '#ffffff50', marginBottom: '4px' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#D4AF37" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: '#D4AF37', strokeWidth: 0 }}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={downloadReport}
                    className="flex-1 flex items-center justify-center px-6 py-4 bg-gold text-black font-bold rounded-xl hover:bg-gold-hover transition-all"
                  >
                    <Download size={18} className="mr-2" />
                    Download Report
                  </button>
                </div>
                
                <div className="mt-8 flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <Info size={18} className="text-gold shrink-0 mt-1" />
                  <p className="text-sm text-white/60 leading-relaxed">
                    Calculations are based on current market trends and standard bank interest rates. Actual returns may vary based on market conditions and property maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
