import {
  BookOpen,
  // ClipboardList,
  Plane,
  ScrollText,
  Settings,
  Store,
} from 'lucide-react';

export const apps = [
  { icon: ScrollText, title: 'Education', path: '/exams' },
  // { icon: ClipboardList, title: 'Quiz', path: '/quiz' },
  { icon: Plane, title: 'Rent a Plane', path: '/rentaplane' },
  { icon: BookOpen, title: 'Logbook', path: '/logbook' },
  { icon: Store, title: 'Store', path: '/store' },
  { icon: Settings, title: 'Config', path: '/config' },
];