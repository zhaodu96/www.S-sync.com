import React, { useState } from 'react';
import { PublicSchedule } from './PublicComponents';
import { toast } from 'sonner';
import { CheckCircle2, Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { CLASSES, INSTRUCTORS } from './constants';

interface ScheduleViewProps {
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  bookedClasses: string[];
  setBookedClasses: React.Dispatch<React.SetStateAction<string[]>>;
  setBookings: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ScheduleView = ({ credits, setCredits, bookedClasses, setBookedClasses, setBookings }: ScheduleViewProps) => {
  
  // Feature 4: Backend Integration (Mock)
  const handleBooking = async (classId: string) => {
    console.log(`Simulating database call: Booking class ${classId}...`);
    
    // Find class details
    const classDetails = CLASSES.find(c => c.id === classId);
    if (!classDetails) return;

    // Find instructor details
    const instructor = INSTRUCTORS.find(i => i.id === classDetails.instructorId);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Update state
    setCredits(prev => prev - 1);
    setBookedClasses(prev => [...prev, classId]);
    
    // Add to bookings list
    const newBooking = {
      id: classId,
      title: classDetails.title,
      instructor: instructor?.name || 'Unknown',
      time: `${classDetails.startTime} - ${classDetails.endTime}`,
      date: 'Upcoming',
      location: classDetails.location
    };
    setBookings(prev => [...prev, newBooking]);

    // Feature 3: Visual Feedback
    toast.success('Booking Successful!', {
      description: `You are registered for ${classDetails.title}. ${credits - 1} credits remaining.`,
      icon: <CheckCircle2 className="text-green-500" />,
      className: "bg-cream border-maroon text-maroon font-bold italic"
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-maroon">
            Class Schedule
          </h1>
          <p className="text-maroon/50 font-medium mt-1">
            Book your next session. You have <span className="text-maroon font-bold">{credits} credits</span> available.
          </p>
        </div>
      </header>

      <div className="bg-white rounded-[40px] shadow-sm border border-maroon/5 overflow-hidden">
        <PublicSchedule 
          isInteractive={true}
          credits={credits}
          bookedClasses={bookedClasses}
          onBook={handleBooking}
        />
      </div>
    </div>
  );
};
