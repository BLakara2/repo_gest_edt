import type { EventItem } from './types';

export const DAYS_ORDER = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
] as const;

export const PALETTE = [
  { color: '#E8C5A0', label: 'Sable'  },
  { color: '#A8C5A0', label: 'Sauge'  },
  { color: '#A0B8C5', label: 'Ciel'   },
  { color: '#C5A0B8', label: 'Mauve'  },
  { color: '#C5B8A0', label: 'Taupe'  },
  { color: '#A0C5BC', label: 'Menthe' },
];

export const mkId = (): string => Math.random().toString(36).slice(2, 9);

export const INITIAL_EVENTS: EventItem[] = [
  { id: mkId(), title: 'Algèbre', day: 'Lundi',    startHour: 9,  durationHours: 2, color: '#A8C5A0' },
  { id: mkId(), title: 'Travail', day: 'Mercredi', startHour: 14, durationHours: 3, color: '#A0B8C5' },
  { id: mkId(), title: 'Sport',   day: 'Vendredi', startHour: 8,  durationHours: 1, color: '#E8C5A0' },
];