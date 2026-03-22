import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { marketTrends } from '../data';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Download, Info } from 'lucide-react';

export const MarketDashboard: React.FC = () => {
  const [activeAreas, setActiveAreas] = useState<string[]>(['bandraWest', 'juhu', 'powai']);

  const toggleArea = (area: string) => {
    if (activeAreas.includes(area)) {
      if (activeAreas.length > 1) {
        setActiveAreas(activeAreas.filter(a => a !== area));
      }
    } else {
      setActiveAreas([...activeAreas, area]);
    }
  };

  const areas = [
    { id: 'bandraWest', label: 'Bandra West', color: '#D4AF37', growth: '+12% YoY' },
    { id: 'juhu', label: 'Juhu', color: '#1A1A1A', growth: '+8% YoY' },
    { id: 'powai', label: 'Powai', color: '#666666', growth: '+15% YoY' },
    { id: 'andheri', label: 'Andheri East', color: '#B8941F', growth: '+10% YoY' },
  ];

  const formatPrice = (val: number) => {
    return `₹${(val / 1000).toFixed(0)}k/sq.ft`;
  };

  const downloadReport = () => {
    const headers = ['Month', ...areas.map(a => a.label)];
    const csvContent = [
      headers.join(','),
      ...marketTrends.map(row => [row.month, ...areas.map(a => (row as any)[a.id])].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'market_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-xl mb-4">
            <TrendingUp className="text-gold" size={24} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Mumbai Property Market Dashboard</h2>
          <p className="text-medium-gray text-lg">Real-time insights and trends for key areas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Market Stats */}
          <div className="lg:col-span-4 space-y-6">
            {areas.map((area, idx) => (
              <motion.button
                key={area.id}
                onClick={() => toggleArea(area.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`w-full p-6 bg-white rounded-2xl border transition-all duration-300 group text-left ${
                  activeAreas.includes(area.id)
                    ? 'border-gold shadow-xl shadow-gold/5'
                    : 'border-charcoal/5 hover:border-charcoal/20'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: area.color }}
                    />
                    <h4 className="font-bold text-lg">{area.label}</h4>
                  </div>
                  <div className="flex items-center text-success font-bold text-sm">
                    <ArrowUpRight size={16} className="mr-1" />
                    {area.growth}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-medium-gray uppercase tracking-widest mb-1">Avg. Price</p>
                    <p className="text-2xl font-bold text-charcoal">
                      {formatPrice((marketTrends[marketTrends.length - 1] as any)[area.id])}
                    </p>
                  </div>
                  <div className="w-24 h-8 bg-light-gray rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="w-full h-1 bg-gold/20 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: activeAreas.includes(area.id) ? '100%' : '0%' }}
                        className="h-full bg-gold"
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
            
            <button 
              onClick={downloadReport}
              className="w-full py-5 bg-charcoal text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center"
            >
              <Download size={18} className="mr-2" />
              Download Full Market Report
            </button>
          </div>

          {/* Chart */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-charcoal/5 h-full flex flex-col">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Price Trend (Last 12 Months)</h3>
                  <p className="text-medium-gray text-sm">Interactive data visualization of market movement</p>
                </div>
                <div className="flex items-center text-gold bg-gold/5 px-4 py-2 rounded-lg border border-gold/10">
                  <Info size={16} className="mr-2" />
                  <span className="text-xs font-bold uppercase tracking-widest">Live Data</span>
                </div>
              </div>

              <div className="flex-1 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#1A1A1A30" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#1A1A1A30" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `₹${val/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #00000010', borderRadius: '12px', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                      labelStyle={{ color: '#666666', marginBottom: '4px', fontWeight: 'bold' }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      align="right" 
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: '40px' }}
                    />
                    {areas.map(area => (
                      <Line 
                        key={area.id}
                        type="monotone" 
                        dataKey={area.id} 
                        name={area.label}
                        stroke={area.color} 
                        strokeWidth={activeAreas.includes(area.id) ? 3 : 0} 
                        opacity={activeAreas.includes(area.id) ? 1 : 0}
                        dot={{ r: 4, fill: area.color, strokeWidth: 0 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        animationDuration={1500}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-12 p-6 bg-light-gray rounded-2xl border border-charcoal/5">
                <h4 className="font-bold mb-4 flex items-center">
                  <TrendingUp size={18} className="mr-2 text-gold" />
                  Market Insights
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="text-sm text-medium-gray flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 shrink-0" />
                    Bandra West seeing highest demand (12% growth)
                  </li>
                  <li className="text-sm text-medium-gray flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 shrink-0" />
                    Powai emerging as investment hotspot (15% growth)
                  </li>
                  <li className="text-sm text-medium-gray flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 shrink-0" />
                    Ready-to-move properties selling 25% faster
                  </li>
                  <li className="text-sm text-medium-gray flex items-start">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 shrink-0" />
                    3BHK most in-demand category (60% of inquiries)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
