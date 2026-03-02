export type DayKey = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';

export interface EventItem {
  id: string;
  title: string;
  day: DayKey;
  startHour: number;
  durationHours: number;
  color: string;
}