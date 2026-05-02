import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { Users, TrendingUp, MapPin, Search } from 'lucide-react';

const mockData = [
  { time: '20:00', viewers: 12400 },
  { time: '20:15', viewers: 18500 },
  { time: '20:30', viewers: 42000 },
  { time: '20:45', viewers: 38000 },
  { time: '21:00', viewers: 35000 },
];

const geoData = [
  { region: 'Tunis', count: 45 },
  { region: 'Sfax', count: 28 },
  { region: 'Sousse', count: 22 },
  { region: 'Nabeul', count: 18 },
  { region: 'Bizerte', count: 12 },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl font-black text-white">Metrics Live</h2>
        <div className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-1 rounded-md border border-red-500/20 flex items-center space-x-1 uppercase tracking-tighter">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span>Analyses temps réel</span>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <Users className="w-5 h-5 text-blue-500 mb-4" />
          <div className="text-2xl font-black text-white">42,504</div>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Connectés</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-4" />
          <div className="text-2xl font-black text-white">+12.4%</div>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">vs Semaine Der.</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">Audience Confirmée (24h)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="viewers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorView)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geo Distribution */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Répartition (Gouvernorats)</h3>
          <MapPin className="w-4 h-4 text-zinc-600" />
        </div>
        <div className="space-y-4">
          {geoData.map((item) => (
            <div key={item.region} className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">{item.region}</span>
                <span className="text-white">{item.count}%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zinc-600 transition-all duration-1000" 
                  style={{ width: `${item.count}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-zinc-500" />
          <span className="text-sm font-bold text-zinc-300">Exporter les données Rapport PDF</span>
        </div>
        <ChevronRight className="w-5 h-5 text-zinc-700" />
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
