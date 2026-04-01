import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  UserPlus, 
  ChevronRight,
  Settings
} from 'lucide-react';

export const DashboardView = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-maroon">
            Platform Insights
          </h1>
          <p className="text-maroon/50 font-medium mt-1">
            Global performance and system health metrics.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Platform Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5">
          <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">Platform Transactions</p>
          <h3 className="text-3xl font-black italic text-maroon mt-1">1,284</h3>
          <p className="text-[10px] text-green-600 font-bold mt-2">↑ 12% across all studios</p>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5">
          <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">System Health</p>
          <h3 className="text-3xl font-black italic text-green-500 mt-1">Operational</h3>
          <p className="text-[10px] text-maroon/40 font-bold mt-2">Paris AWS Server: 24ms</p>
        </div>

        {/* Active Licenses */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5">
          <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest">Active Licenses</p>
          <h3 className="text-3xl font-black italic text-maroon mt-1">15 Studios</h3>
          <p className="text-[10px] text-blue-600 font-bold mt-2">3 Pending Setup</p>
        </div>
      </div>

      <div className="bento-grid">
        {/* Analytics Card */}
        <div className="col-span-12 lg:col-span-8 row-span-3 bg-white rounded-3xl p-8 shadow-sm border border-maroon/5 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold italic">Revenue Growth</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-maroon" />
                <span className="text-xs font-medium opacity-60">This Month</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="text-xs font-medium opacity-60">Last Month</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-2 pb-4">
            {[40, 60, 45, 90, 65, 80, 55, 70, 85, 60, 75, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-maroon/5 rounded-t-lg relative group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    className="w-full bg-maroon rounded-t-lg transition-all group-hover:bg-maroon-dark"
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-maroon text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${val * 100}
                  </div>
                </div>
                <span className="text-[10px] font-bold opacity-30 uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-span-12 lg:col-span-4 row-span-1 bg-maroon text-cream rounded-3xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">New Registrations</p>
            <p className="text-3xl font-black italic mt-1">+48</p>
            <p className="text-[10px] text-gold font-bold mt-1">↑ 12% from last week</p>
          </div>
          <div className="w-12 h-12 bg-cream/10 rounded-2xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 row-span-1 bg-gold text-white rounded-3xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Class Attendance</p>
            <p className="text-3xl font-black italic mt-1">92%</p>
            <p className="text-[10px] opacity-80 mt-1">Average across all studios</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <BarChart3 size={24} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 row-span-1 bg-white rounded-3xl p-6 shadow-sm border border-maroon/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Active Instructors</p>
            <p className="text-3xl font-black italic mt-1">24</p>
            <p className="text-[10px] text-green-500 font-bold mt-1">● 18 Currently On-site</p>
          </div>
          <div className="w-12 h-12 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon">
            <Users size={24} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-6 row-span-2 bg-white rounded-3xl p-6 shadow-sm border border-maroon/5">
          <h2 className="text-xl font-bold italic mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-maroon/5 transition-colors">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                  {i === 1 ? <CreditCard size={18} /> : i === 2 ? <UserPlus size={18} /> : <Clock size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    {i === 1 ? 'New Membership Sold' : i === 2 ? 'New Student Registered' : 'Class Schedule Updated'}
                  </p>
                  <p className="text-xs opacity-50">2 minutes ago • Studio A</p>
                </div>
                <ChevronRight size={16} className="opacity-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Membership Distribution */}
        <div className="col-span-12 lg:col-span-6 row-span-2 bg-white rounded-3xl p-6 shadow-sm border border-maroon/5 flex flex-col">
          <h2 className="text-xl font-bold italic mb-6">Membership Types</h2>
          <div className="flex-1 flex items-center justify-center gap-8">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="50" fill="transparent" stroke="#800020" strokeWidth="12" strokeDasharray="314" strokeDashoffset="100" />
                <circle cx="64" cy="64" r="50" fill="transparent" stroke="#D4AF37" strokeWidth="12" strokeDasharray="314" strokeDashoffset="240" />
                <circle cx="64" cy="64" r="50" fill="transparent" stroke="#C2B280" strokeWidth="12" strokeDasharray="314" strokeDashoffset="280" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black italic">1.2k</span>
                <span className="text-[8px] uppercase font-bold opacity-40">Total</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-maroon" />
                <span className="text-xs font-medium">Unlimited Pass (65%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-xs font-medium">10-Class Pack (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-tan" />
                <span className="text-xs font-medium">Single Drop-in (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ThemeSettingsView = ({ primaryColor, setPrimaryColor }: { primaryColor: string, setPrimaryColor: (c: string) => void }) => {
  const themes = [
    { name: 'Classic Maroon', color: '#800020' },
    { name: 'Midnight Blue', color: '#191970' },
    { name: 'Forest Green', color: '#013220' },
    { name: 'Royal Purple', color: '#4B0082' },
    { name: 'Slate Gray', color: '#2F4F4F' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-black italic tracking-tighter text-maroon">
          White-label Config
        </h1>
        <p className="text-maroon/50 font-medium mt-1">
          Customize the platform branding for your client studios.
        </p>
      </header>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-maroon/5 max-w-2xl">
        <h2 className="text-xl font-bold italic mb-6">Brand Identity</h2>
        
        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 block">Primary Brand Color</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.color}
                  onClick={() => setPrimaryColor(theme.color)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                    primaryColor === theme.color ? 'border-maroon bg-maroon/5' : 'border-transparent bg-maroon/5 hover:border-maroon/20'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.color }} />
                  <span className="text-xs font-bold">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-maroon/10">
            <h3 className="text-sm font-bold mb-4">Preview</h3>
            <div className="p-6 rounded-2xl border-2 border-dashed border-maroon/20 flex items-center justify-center">
              <button className="px-8 py-3 bg-maroon text-cream rounded-xl text-xs font-bold uppercase tracking-widest">
                Sample Brand Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
