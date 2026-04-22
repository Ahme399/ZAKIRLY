
export interface UserProfile {
  name: string;
  age: string;
  stage: string;
  governorate: string;
  language: 'arabic' | 'languages';
}

export interface SchoolStaff {
  id: string;
  name: string;
  subject: string;
  role: 'teacher' | 'principal';
}

export interface PrayerStatus {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
