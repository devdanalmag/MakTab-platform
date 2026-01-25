// User roles
export type UserRole = 'student' | 'teacher' | 'management';

// Language options
export type Language = 'en' | 'ar' | 'ha';

// Onboarding slide data
export interface OnboardingSlide {
    id: number;
    titleKey: string;
    descriptionKey: string;
    image: string;
    bgColor: string;
}

// User profile
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    avatar?: string;
}

// Tahfeez progress data
export interface TahfeezProgress {
    percentage: number;
    currentJuz: number;
    currentSurah: string;
    ayahRange: string;
    lastRecited: string;
    status: 'on-track' | 'behind' | 'ahead';
}

// Quick action item
export interface QuickAction {
    id: string;
    icon: string;
    labelKey: string;
    route: string;
    color: string;
}

// Muraja'a (revision) item
export interface MurajaItem {
    id: string;
    surahName: string;
    dueTime: string;
    type: 'revision' | 'new';
}

// Assignment item
export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded';
    subject: string;
}

// Feedback item
export interface Feedback {
    id: string;
    teacherName: string;
    teacherAvatar?: string;
    message: string;
    audioUrl?: string;
    timestamp: string;
    type: 'text' | 'audio';
}
