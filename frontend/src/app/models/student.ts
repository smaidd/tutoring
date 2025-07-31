import {Packs} from "./packs.model";
import {Subject} from "./subject.model";

export class Student {
  id?: string;
  name?: string;
  phoneNumber?: string;
  studentClass?: string;
  profile?: string;
  subjects?: Subject[];
  observations?: string;
  parentName?: string;
  parentPhoneNumber?: string;
  parentEmail?: string;
  pack?: Packs;
  numberOfSessions?: number;
  firstAppointment?: string;
  dateOfBirth?: string;
  contacted?: boolean;
  confirmed?: boolean;

  constructor(data: Partial<Student> = {}) {
    this.id = data.id;
    this.name = data.name ?? '';
    this.phoneNumber = data.phoneNumber ?? '';
    this.studentClass = data.studentClass ?? '';
    this.profile = data.profile ?? '';
    this.subjects = data.subjects ?? [];
    this.observations = data.observations ?? '';
    this.parentName = data.parentName ?? '';
    this.parentPhoneNumber = data.parentPhoneNumber ?? '';
    this.parentEmail = data.parentEmail ?? '';
    this.pack = data.pack;
    this.numberOfSessions = data.numberOfSessions ?? 0;
    if (data.firstAppointment) {
      const appointment = new Date(data.firstAppointment)
      this.firstAppointment = new Date(appointment.getFullYear(), appointment.getMonth(), appointment.getDate(), appointment.getHours(), appointment.getMinutes() - appointment.getTimezoneOffset()).toISOString();
    }

    if (data.dateOfBirth) {
      const birth = new Date(data.dateOfBirth)
      this.dateOfBirth = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes() - birth.getTimezoneOffset()).toISOString();
    }
    this.contacted = data.contacted ?? false;
    this.confirmed = data.confirmed ?? false;
  }

  static subjects: string[] = [
    "matematică",
    "limba și literatura română",
    "biologie",
    "chimie",
    "engleză",
    "logică",
    "istorie",
    "informatică",
    "geografie"
  ]
}
