import React from 'react';
import { toast } from 'sonner';
import { CheckCircle2, MapPin } from 'lucide-react';
import { CLASSES, INSTRUCTORS } from './constants';
import { motion } from 'motion/react';

interface ScheduleViewProps {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  bookedClasses: string[];
  setBookedClasses: React.Dispatch<React.SetStateAction<string[]>>;
  setBookings: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ScheduleView = ({ credits, setCredits, bookedClasses, setBookedClasses, setBookings }: ScheduleViewProps) => {
  
  const handleBooking = async (classId: string) => {
    if (bookedClasses.includes(classId)) {
      toast.error('Already Booked', {
        description: "You are already registered for this class."
      });
      return;
    }

    if (credits <= 0) {
      toast.error('Insufficient Credits', {
        description: "Please top up your credits to book more classes."
      });
      return;
    }

    const classDetails = CLASSES.find(c => c.id === classId);
    if (!classDetails) return;

    const instructor = INSTRUCTORS.find(i => i.id === classDetails.instructorId);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Update state
    setCredits(prev => prev - 1);
    setBookedClasses(prev => [...prev, classId]);
    
    const newBooking = {
      id: classId,
      title: classDetails.title,
      instructor: instructor?.name || 'Unknown',
      time: `${classDetails.startTime} - ${classDetails.endTime}`,
      date: classDetails.day,
      location: classDetails.location
    };
    setBookings(prev => [...prev, newBooking]);

    toast.success('Booking Successful!', {
      description: `You are registered for ${classDetails.title}. ${credits - 1} credits remaining.`,
      icon: <CheckCircle2 className="text-green-500" />,
      className: "bg-cream border-maroon text-maroon font-bold italic"
    });
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const times = ['09:00', '10:00', '11:00', '14:00', '16:00', '18:00'];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-5xl font-black text-maroon uppercase italic tracking-tighter leading-none">Weekly Schedule</h2>
        <p className="text-maroon/40 font-bold text-[10px] mt-4 uppercase tracking-[0.3em]">
          Book your spot today • Your remaining credits: <span className="text-maroon underline decoration-gold decoration-2 underline-offset-4">{credits}</span>
        </p>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-[3rem] shadow-2xl border border-maroon/5 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-6 border-b border-maroon/5 bg-maroon/[0.02]">
          <div className="p-6 border-r border-maroon/5"></div>
          {days.map(day => (
            <div key={day} className="p-6 text-center font-black italic text-maroon uppercase tracking-widest border-r border-maroon/5 last:border-none">
              {day}
            </div>
          ))}
        </div>

        {/* Time Rows */}
        {times.map(time => (
          <div key={time} className="grid grid-cols-6 border-b border-maroon/5 min-h-[160px] last:border-none">
            {/* Time Column */}
            <div className="p-6 text-xs font-black text-maroon/20 border-r border-maroon/5 flex items-center justify-center italic">
              {time}
            </div>
            
            {/* Day Columns */}
            {days.map(day => {
              const classItem = CLASSES.find(c => c.day === day && c.startTime === time);
              const isBooked = classItem && bookedClasses.includes(classItem.id);

              return (
                <div key={`${day}-${time}`} className="p-4 border-r border-maroon/5 last:border-none relative group">
                  {classItem ? (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`h-full p-5 rounded-3xl text-white shadow-lg transition-all flex flex-col justify-between ${
                        isBooked ? 'bg-stone-400 opacity-60' : 'bg-maroon'
                      }`}
                      style={{ backgroundColor: isBooked ? undefined : classItem.color }}
                    >
                      <div>
                        <h4 className="font-black italic text-lg leading-tight">{classItem.title}</h4>
                        <div className="flex items-center gap-1 text-[10px] opacity-70 mt-2 font-bold uppercase tracking-widest">
                          <MapPin size={10} /> {classItem.location}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleBooking(classItem.id)}
                        disabled={isBooked}
                        className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          isBooked 
                            ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                            : 'bg-white/20 hover:bg-white/40 text-white'
                        }`}
                      >
                        {isBooked ? 'BOOKED' : 'BOOK NOW'}
                      </button>
                    </motion.div>
                  ) : (
                    <div className="h-full w-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-1 h-1 bg-maroon/10 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="text-center">
        <p className="text-[10px] text-maroon/20 font-black uppercase tracking-[0.4em]">
          Proprietary Scheduling Engine v2.4 • Powered by S-sync Cloud Tech
        </p>
      </div>
    </div>
  );
};
