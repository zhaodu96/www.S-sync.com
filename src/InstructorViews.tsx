import React from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Edit2, Trash2, User, Star } from 'lucide-react';

// --- Admin View: Staff Management ---
export const AdminInstructorManager = () => {
  const instructors = [
    { id: '1', name: 'J-hope', status: 'Active', classes: 12 },
    { id: '2', name: 'Liku', status: 'Active', classes: 8 },
    { id: '3', name: 'Likaa', status: 'On Leave', classes: 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-maroon uppercase italic tracking-tighter">Staff Management</h2>
          <p className="text-maroon/40 text-[10px] font-bold uppercase tracking-widest mt-1">Merchant Control Panel</p>
        </div>
        <button className="bg-maroon text-cream px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-maroon-dark transition-all shadow-lg flex items-center gap-2">
          <PlusCircle size={16} /> Add New Instructor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {instructors.map((inst) => (
          <motion.div 
            key={inst.id} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-3xl border border-maroon/5 flex justify-between items-center shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon">
                <User size={32} />
              </div>
              <div>
                <h4 className="font-black italic text-xl text-maroon">{inst.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${inst.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {inst.status}
                  </span>
                  <span className="text-[10px] text-maroon/40 uppercase font-bold tracking-widest">{inst.classes} Classes Assigned</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 text-maroon/40 hover:text-maroon hover:bg-maroon/5 rounded-xl transition-all border border-maroon/5">
                <Edit2 size={18} />
              </button>
              <button className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-red-100">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pt-8 border-t border-maroon/5">
        <p className="text-[10px] text-maroon/20 font-black uppercase tracking-[0.3em]">Powered by S-sync Cloud Infrastructure</p>
      </div>
    </div>
  );
};

// --- Student View: Instructor Gallery ---
export const StudentInstructorView = () => {
  const instructors = [
    { name: "J-hope", style: "Street Dance / K-POP", bio: "Industry veteran with global performance experience." },
    { name: "Liku", style: "MV Dance / Jazz", bio: "Specializing in commercial choreography and stage presence." },
    { name: "Likaa", style: "Hip Hop / Foundational", bio: "Focusing on core techniques and rhythmic precision." }
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-black text-maroon uppercase italic tracking-tighter leading-none">Our Instructors</h2>
        <p className="text-maroon/40 font-bold mt-4 uppercase tracking-widest text-xs">Learn from the world-class experts curated by this studio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {instructors.map((inst) => (
          <InstructorCard key={inst.name} name={inst.name} style={inst.style} bio={inst.bio} />
        ))}
      </div>
    </div>
  );
};

const InstructorCard = ({ name, style, bio }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-[3rem] shadow-sm border border-maroon/5 hover:shadow-2xl transition-all flex flex-col items-center text-center group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-2 bg-maroon/5 group-hover:bg-gold transition-colors" />
    <div className="relative mb-8">
      <div className="w-32 h-32 bg-maroon/5 rounded-full overflow-hidden border-4 border-white shadow-inner flex items-center justify-center text-maroon/20">
        <User size={64} />
      </div>
      <span className="absolute bottom-2 right-0 bg-maroon text-cream text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
        <Star size={8} fill="currentColor" /> Expert
      </span>
    </div>
    <h3 className="text-3xl font-black text-maroon italic tracking-tight">{name}</h3>
    <p className="text-[10px] font-black text-gold mt-2 uppercase tracking-[0.2em]">{style}</p>
    <p className="text-sm text-maroon/60 mt-6 leading-relaxed font-medium">{bio}</p>
    <button className="mt-10 text-[10px] font-black text-maroon/30 hover:text-maroon transition-colors uppercase tracking-[0.3em] border-t border-maroon/5 pt-6 w-full">
      View Full Profile
    </button>
  </motion.div>
);
