/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  CreditCard, 
  Settings, 
  PlusCircle, 
  UserPlus, 
  Search,
  Bell,
  ChevronRight,
  Clock,
  MapPin,
  GraduationCap,
  Wallet,
  Home,
  LogOut,
  LogIn,
  User,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AboutUs, ContactSection, FloatingChat, PricingAndRegister, FeatureGrid } from './PublicComponents';
import { DashboardView, ThemeSettingsView } from './AdminPanel';
import { AdminInstructorManager, StudentInstructorView } from './InstructorViews';
import { MemberPortalView } from './MemberPortal';
import { ScheduleView } from './ScheduleView';
import { Toaster } from 'sonner';
import { CLASSES } from './constants';

// --- Types ---

type Role = 'Public' | 'Student' | 'Admin';
type Module = 'Dashboard' | 'Schedule' | 'Students' | 'Instructors' | 'Memberships' | 'Payments' | 'Settings' | 'My Portal' | 'Theme Settings';

// --- Components ---

const Sidebar = ({ activeModule, setActiveModule, role }: { activeModule: Module, setActiveModule: (m: Module) => void, role: Role }) => {
  const adminItems = [
    { icon: Home, label: 'Dashboard' as Module },
    { icon: Calendar, label: 'Schedule' as Module },
    { icon: GraduationCap, label: 'Students' as Module },
    { icon: Users, label: 'Instructors' as Module },
    { icon: CreditCard, label: 'Memberships' as Module },
    { icon: Wallet, label: 'Payments' as Module },
    { icon: Settings, label: 'Theme Settings' as Module },
  ];

  const studentItems = [
    { icon: User, label: 'My Portal' as Module },
    { icon: Calendar, label: 'Schedule' as Module },
    { icon: Users, label: 'Instructors' as Module },
    { icon: Settings, label: 'Settings' as Module },
  ];

  const menuItems = role === 'Admin' ? adminItems : studentItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-maroon text-cream flex flex-col z-50">
      <div className="p-6 border-b border-cream/10">
        <h1 className="text-2xl font-bold tracking-tighter italic">S-sync <span className="text-[10px] font-light block opacity-70 uppercase tracking-widest">CLOUD TECHNOLOGY</span></h1>
      </div>

      {role === 'Admin' && (
        <div className="px-4 py-6 border-b border-cream/5">
          <label className="text-[10px] uppercase tracking-widest opacity-50 mb-2 block font-bold">Managing Studio</label>
          <select className="bg-maroon-dark text-xs w-full p-2.5 rounded-xl border border-cream/10 focus:outline-none focus:ring-2 focus:ring-gold/50 appearance-none cursor-pointer">
            <option>OKEY Dance (Paris)</option>
            <option>Studio B (Lyon)</option>
            <option>+ Add New Merchant</option>
          </select>
        </div>
      )}
      
      <nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveModule(item.label)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeModule === item.label 
                ? 'bg-cream text-maroon shadow-lg' 
                : 'hover:bg-maroon-dark text-cream/70 hover:text-cream'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-cream/10">
        <div className="flex items-center gap-3">
          <img 
            src={`https://picsum.photos/seed/${role.toLowerCase()}/100/100`} 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-gold"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm font-semibold">{role} User</p>
            <p className="text-xs opacity-50">{role === 'Admin' ? 'Studio Manager' : 'Student'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const TopNav = ({ activeModule, role, onLogout }: { activeModule: Module, role: Role, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  const getTabs = (module: Module) => {
    switch (module) {
      case 'Schedule':
        return ['Day View', 'Week View', 'Month View', 'Resource Planner'];
      case 'Dashboard':
        return ['Overview', 'Analytics', 'Reports'];
      case 'Students':
        return ['All Students', 'Attendance', 'Registration'];
      case 'Instructors':
        return ['Profiles', 'Payroll', 'Performance'];
      default:
        return ['General', 'Details'];
    }
  };

  const tabs = getTabs(activeModule);

  return (
    <header className="fixed top-0 left-64 right-0 bg-cream/80 backdrop-blur-md border-b border-maroon/10 h-20 flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-8">
        <nav className="flex gap-6">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`relative py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === index ? 'text-maroon' : 'text-maroon/40 hover:text-maroon'
              }`}
            >
              {tab}
              {activeTab === index && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon/30" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${activeModule}...`} 
            className="bg-maroon/5 border-none rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:ring-2 focus:ring-gold outline-none transition-all"
          />
        </div>
        <button className="p-2 hover:bg-maroon/5 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full border-2 border-cream" />
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-maroon text-cream rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-maroon-dark transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};

const PublicNav = ({ onLogin, showLoginOptions, setShowLoginOptions }: { onLogin: (role: Role) => void, showLoginOptions: boolean, setShowLoginOptions: (val: boolean) => void }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-cream/80 backdrop-blur-md border-b border-maroon/10 flex items-center justify-between px-12 z-50">
      <div className="flex items-center gap-12">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black italic tracking-tighter text-maroon leading-none">S-sync</h1>
          <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-maroon/40">Studio Excellence</span>
        </div>
        <nav className="hidden md:flex gap-8">
          {['Features', 'About', 'Pricing', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-xs font-bold uppercase tracking-widest text-maroon/60 hover:text-maroon transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6 relative">
        <a href="#pricing" className="text-xs font-bold uppercase tracking-widest text-maroon hover:underline">Register</a>
        <div className="relative">
          <button 
            onClick={() => setShowLoginOptions(!showLoginOptions)}
            className="px-8 py-3 bg-maroon text-cream rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-maroon-dark transition-all shadow-lg flex items-center gap-2"
          >
            <LogIn size={16} /> Login
          </button>
          
          <AnimatePresence>
            {showLoginOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-maroon/5 p-2 z-50"
              >
                <button 
                  onClick={() => { onLogin('Student'); setShowLoginOptions(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-maroon/5 rounded-xl text-xs font-bold text-maroon flex items-center gap-3"
                >
                  <User size={16} className="text-gold" /> Student Portal
                </button>
                <button 
                  onClick={() => { onLogin('Admin'); setShowLoginOptions(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-maroon/5 rounded-xl text-xs font-bold text-maroon flex items-center gap-3"
                >
                  <ShieldCheck size={16} className="text-maroon" /> Admin Panel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// --- Main App ---

export default function App() {
  const [role, setRole] = useState<Role>('Public');
  const [activeModule, setActiveModule] = useState<Module>('Dashboard');
  const [primaryColor, setPrimaryColor] = useState('#800020');
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  // Apply theme color
  React.useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    // Generate a darker version for maroon-dark (simplified)
    const darken = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.max(0, r - 32)}, ${Math.max(0, g - 32)}, ${Math.max(0, b - 32)})`;
    };
    document.documentElement.style.setProperty('--primary-color-dark', darken(primaryColor));
  }, [primaryColor]);

  // Feature 1: Booking State Management
  const [credits, setCredits] = useState(12);
  const [bookedClasses, setBookedClasses] = useState<string[]>(['1', '2']); // IDs
  const [bookings, setBookings] = useState<any[]>([
    { id: '1', title: 'K-POP', instructor: 'J-hope', time: '09:00 - 10:30', date: 'Today', location: 'Studio A' },
    { id: '2', title: 'MV Dance', instructor: 'Liku', time: '11:00 - 12:30', date: 'Tomorrow', location: 'Studio B' },
  ]);

  const handleLogin = (newRole: Role) => {
    setRole(newRole);
    setActiveModule(newRole === 'Admin' ? 'Dashboard' : 'My Portal');
  };

  const handleLogout = () => {
    setRole('Public');
  };

  if (role === 'Public') {
    return (
      <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
        <PublicNav onLogin={handleLogin} showLoginOptions={showLoginOptions} setShowLoginOptions={setShowLoginOptions} />
        <main className="pt-24">
          {/* Hero Section */}
          <section className="h-[80vh] flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-0"
            >
              <img 
                src="https://picsum.photos/seed/studio/1920/1080" 
                alt="Studio" 
                className="w-full h-full object-cover opacity-10 grayscale"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="relative z-10 max-w-5xl">
              <div className="inline-block px-4 py-1 bg-maroon/5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-maroon mb-8">
                Enterprise Cloud for Street Dance
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-[10rem] font-black italic tracking-tighter text-maroon leading-[0.8] mb-8"
              >
                SYNC YOUR <br /> <span className="text-gold">COMMERCE.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-maroon/60 font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                The high-performance operating system for modern dance studios. 
                Scale your business with our proprietary multi-tenant cloud engine.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-12 flex gap-6 justify-center"
              >
                {/* 主操作：开始使用/注册 */}
                <a 
                  href="#pricing"
                  className="bg-maroon text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center shadow-xl"
                >
                  GET STARTED
                </a>
                
                {/* 次要操作：从 View Schedule 改为更有技术感的词 */}
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setShowLoginOptions(true);
                  }}
                  className="border-2 border-maroon text-maroon px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-maroon hover:text-white transition-all flex items-center justify-center"
                >
                  EXPLORE ENGINE
                </button>
              </motion.div>
            </div>
          </section>

          <FeatureGrid />
          <AboutUs />
          <PricingAndRegister />
          <ContactSection />
          <FloatingChat />

          <footer className="py-20 px-8 bg-white border-t border-maroon/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-4xl font-black italic tracking-tighter text-maroon">S-sync</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-maroon/40 mt-2">© 2026 Studio Management System</p>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                  <h3 className="font-black italic text-maroon">Platform</h3>
                  <a href="#features" className="text-sm text-maroon/60 hover:text-gold transition-colors">Infrastructure</a>
                  <a href="#pricing" className="text-sm text-maroon/60 hover:text-gold transition-colors">Pricing</a>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-black italic text-maroon">Community</h3>
                  <a href="#" className="text-sm text-maroon/60 hover:text-gold transition-colors">Events</a>
                  <a href="#" className="text-sm text-maroon/60 hover:text-gold transition-colors">Gallery</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-cream">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} role={role} />
      <Toaster position="top-right" expand={false} richColors />
      
      <main className="flex-1 ml-64 pt-20">
        <TopNav activeModule={activeModule} role={role} onLogout={handleLogout} />
        
        <div className="p-8 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {role === 'Admin' && activeModule === 'Dashboard' && <DashboardView />}
              {role === 'Admin' && activeModule === 'Instructors' && <AdminInstructorManager />}
              {role === 'Admin' && activeModule === 'Theme Settings' && (
                <ThemeSettingsView primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />
              )}
              {role === 'Student' && activeModule === 'My Portal' && (
                <MemberPortalView 
                  credits={credits} 
                  setCredits={setCredits} 
                  bookings={bookings} 
                  setBookings={setBookings} 
                  setBookedClasses={setBookedClasses}
                />
              )}
              {role === 'Student' && activeModule === 'Schedule' && (
                <ScheduleView 
                  credits={credits} 
                  setCredits={setCredits} 
                  bookedClasses={bookedClasses} 
                  setBookedClasses={setBookedClasses} 
                  setBookings={setBookings}
                />
              )}
              {role === 'Student' && activeModule === 'Instructors' && <StudentInstructorView />}
              
              {/* Fallback for other modules */}
              {((role === 'Admin' && !['Dashboard', 'Instructors', 'Theme Settings'].includes(activeModule)) || 
                (role === 'Student' && !['My Portal', 'Schedule', 'Instructors'].includes(activeModule))) && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <div className="w-20 h-20 bg-maroon/5 rounded-full flex items-center justify-center text-maroon mb-6">
                    <Settings size={40} />
                  </div>
                  <h2 className="text-2xl font-bold italic">{activeModule} Module</h2>
                  <p className="text-maroon/50 mt-2">This section is currently under development for {role}s.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
