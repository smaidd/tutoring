import {Student} from "../student";
import {Presence} from "../presence.model";
import {Subject} from "../subject.model";

export interface PresenceCreation {
  classDate: string;
  students: StudentPresence[];
  subject: Subject;
}

interface StudentPresence extends Presence {
  student: Student;
}
