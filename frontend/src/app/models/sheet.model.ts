import {Presence} from "./presence.model";
import {Student} from "./student";

export interface Sheet {
  id: string;
  student: Student;
  presence: Presence[];
}
