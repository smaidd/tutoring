import {Teacher} from "./teacher.model";
import {Student} from "./student";
import {Subject} from "./subject.model";

export interface TeacherSession {
  id: string;
  teacher: Teacher;
  students: Student[];
  remuneration: number;
  classDate: Date;
  subject: Subject;
}
