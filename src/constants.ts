import { Instructor, ClassSession, PrivateLesson } from './types';

export const COLORS = {
  maroon: '#800020',
  cream: '#F5F5DC',
  gold: '#D4AF37',
  tan: '#C2B280',
};

export const INSTRUCTORS: Instructor[] = [
  { 
    id: '1', 
    name: 'J-hope', 
    bio: 'Specializing in Street Dance and K-POP choreography with over 10 years of performance experience.',
    status: 'active', 
    avatar: 'https://picsum.photos/seed/jhope/100/100' 
  },
  { 
    id: '2', 
    name: 'Liku', 
    bio: 'Expert in MV Dance and Jazz, focusing on expressive movement and stage presence.',
    status: 'active', 
    avatar: 'https://picsum.photos/seed/liku/100/100' 
  },
  { 
    id: '3', 
    name: 'Likaa', 
    bio: 'Hip Hop specialist known for high-energy classes and foundational technique.',
    status: 'active', 
    avatar: 'https://picsum.photos/seed/likaa/100/100' 
  },
];

export const CLASSES: ClassSession[] = [
  { id: '1', title: 'K-POP', instructorId: '1', day: 'Mon', startTime: '09:00', endTime: '10:30', location: 'Studio A', color: '#800020' },
  { id: '2', title: 'MV Dance', instructorId: '2', day: 'Mon', startTime: '11:00', endTime: '12:30', location: 'Studio B', color: '#D4AF37' },
  { id: '3', title: 'Hip Hop', instructorId: '3', day: 'Tue', startTime: '14:00', endTime: '15:30', location: 'Studio A', color: '#800020' },
  { id: '4', title: 'K-POP', instructorId: '1', day: 'Wed', startTime: '10:00', endTime: '11:30', location: 'Studio B', color: '#800020' },
  { id: '5', title: 'Jazz', instructorId: '2', day: 'Thu', startTime: '16:00', endTime: '17:30', location: 'Studio A', color: '#D4AF37' },
  { id: '6', title: 'MV Dance', instructorId: '3', day: 'Fri', startTime: '09:00', endTime: '10:30', location: 'Studio B', color: '#D4AF37' },
  { id: '7', title: 'K-POP Advanced', instructorId: '1', day: 'Mon', startTime: '14:00', endTime: '15:30', location: 'Studio A', color: '#800020' },
  { id: '8', title: 'Street Dance', instructorId: '3', day: 'Mon', startTime: '16:00', endTime: '17:30', location: 'Studio B', color: '#800020' },
  { id: '9', title: 'MV Dance Pro', instructorId: '2', day: 'Mon', startTime: '18:00', endTime: '19:30', location: 'Studio A', color: '#D4AF37' },
];

export const PRIVATE_LESSONS: PrivateLesson[] = [
  { id: '1', studentName: 'Alex Kim', studentAvatar: 'https://picsum.photos/seed/alex/100/100', startTime: '13:00', endTime: '14:00', date: '2026-03-30' },
  { id: '2', studentName: 'Sarah Lee', studentAvatar: 'https://picsum.photos/seed/sarah/100/100', startTime: '15:00', endTime: '16:00', date: '2026-03-30' },
];
