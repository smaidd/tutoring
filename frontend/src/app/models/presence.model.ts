import {Teacher} from "./teacher.model";

export interface Presence {
  id: string;
  classDate: string; // ISO format, parse to `Date` if needed
  subject: string;
  professor: Teacher;
  present: boolean;
  delayMinutes: number | null;
  homeworkPercentage: number | null;
  participationPercentage: number | null;
  notes: string;
}
