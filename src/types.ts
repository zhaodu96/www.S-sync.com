export interface Instructor {
  id: string;
  name: string;
  bio: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface ClassSession {
  id: string;
  title: string;
  instructorId: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  location: 'Studio A' | 'Studio B';
  color: string;
}

export interface PrivateLesson {
  id: string;
  studentName: string;
  studentAvatar: string;
  startTime: string;
  endTime: string;
  date: string;
}

export interface Booking {
  id: string;
  title: string;
  instructor: string;
  time: string;
  date: string;
  location: string;
}
