import {Component, inject, OnInit, output} from '@angular/core';
import {Button} from "primeng/button";
import {StudentsService} from "../../../services/students.service";
import {Student} from "../../../models/student";
import {DatePicker} from "primeng/datepicker";
import {FloatLabel} from "primeng/floatlabel";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StudentSheetService} from "../../../services/student-sheet.service";
import {DateUtils} from "../../../shared/date.utils";
import {AppMessageService} from "../../../services/message.service";
import {Router} from "@angular/router";
import {Select, SelectChangeEvent} from "primeng/select";
import {StudentFilters} from "../../../models/student/student.filters.model";
import {Card} from "primeng/card";
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from "primeng/accordion";
import {Tooltip} from "primeng/tooltip";
import {Checkbox} from "primeng/checkbox";
import {InputText} from "primeng/inputtext";
import {Slider} from "primeng/slider";
import {Textarea} from "primeng/textarea";
import {PresenceCreation} from "../../../models/http/presence-creation.model";
import {Subject} from "../../../models/subject.model";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'app-student-attendance',
  imports: [
    Button,
    DatePicker,
    FloatLabel,
    ReactiveFormsModule,
    FormsModule,
    Select,
    Card,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    Tooltip,
    Checkbox,
    InputText,
    Slider,
    Textarea
  ],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss'
})
export class StudentAttendanceComponent implements OnInit {
  visible = false
  studentId: string = '';

  studentService = inject(StudentsService)
  studentSheetService = inject(StudentSheetService)
  formBuilder = inject(FormBuilder)
  messageService = inject(AppMessageService)
  private readonly settingsService = inject(SettingsService);
  router = inject(Router)

  presenceForm!: FormGroup;
  student: Student | undefined;

  saveEmitter = output();
  protected readonly Student = Student;

  students: Student[] = []
  subjects: Subject[] = [];

  ngOnInit() {
    const presence = history.state.presence;
    console.log(presence)
    this.presenceForm = this.formBuilder.group({
      id: [presence?.id ?? null],
      classDate: [presence?.classDate ?? '', Validators.required],
      subject: [presence?.subject ?? null, Validators.required],
      students: this.formBuilder.array([])
    })

    this.getSubjects();
  }

  getSubjects() {
    this.settingsService.getSubjects().subscribe({
      next: resp => {
        this.subjects = resp;
      }
    })
  }

  save() {
    const presence: PresenceCreation = this.presenceForm.getRawValue();
    presence.classDate = DateUtils.fromUtcToLocalString(presence.classDate).toString();

    this.studentSheetService.savePresenceSheet(presence).subscribe({
      next: resp => {
        this.messageService.success('Ati creat cu succes fisa de sedinta');
        this.router.navigate(['sheets'])
      }
    });
  }

  onChangeSubject(changeEvent: SelectChangeEvent) {
    let subject = changeEvent.value;
    const filters: StudentFilters = new StudentFilters();
    filters.subject = subject.id;

    this.studentService.getStudentsByFilters(filters).subscribe({
      next: resp => {
        this.students = resp;
      }
    })
  }

  addStudent() {
    this.studentArray.push(this.createStudentGroup());
  }

  createStudentGroup(): FormGroup {
    return this.formBuilder.group({
      student: [null, Validators.required],
      present: [false, Validators.required],
      delayMinutes: [null, [Validators.required, Validators.min(0)]],
      homeworkPercentage: ['', Validators.required],
      participationPercentage: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  get studentArray(): FormArray {
    return this.presenceForm.get('students') as FormArray;
  }
}
