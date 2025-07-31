import {Component, inject, OnInit} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from "primeng/stepper";
import {Button} from "primeng/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {FloatLabel} from "primeng/floatlabel";
import {DatePicker} from "primeng/datepicker";
import {Select} from "primeng/select";
import {Student} from "../../../models/student";
import {Textarea} from "primeng/textarea";
import {Message} from "primeng/message";
import {Tooltip} from "primeng/tooltip";
import {Checkbox} from "primeng/checkbox";
import {StudentsService} from "../../../services/students.service";
import {Router} from "@angular/router";
import {AppMessageService} from "../../../services/message.service";
import {MultiSelect} from "primeng/multiselect";
import {SettingsService} from "../../../services/settings.service";
import {Packs} from "../../../models/packs.model";
import {Subject} from "../../../models/subject.model";

@Component({
  selector: 'app-student-creation',
  imports: [
    Stepper,
    StepList,
    Step,
    StepPanel,
    StepPanels,
    Button,
    ReactiveFormsModule,
    InputText,
    FloatLabel,
    DatePicker,
    Select,
    Textarea,
    Message,
    Tooltip,
    Checkbox,
    MultiSelect
  ],
  templateUrl: './student-creation.component.html',
  styleUrl: './student-creation.component.scss'
})
export class StudentCreationComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _studentService = inject(StudentsService);
  private readonly _router = inject(Router);
  private readonly messageService = inject(AppMessageService);
  private readonly settingsService = inject(SettingsService);

  protected readonly Student = Student;
  activeStep: number = 1;
  packs: Packs[] = [];
  subjects: Subject[] = [];

  ngOnInit() {
    this.getPacks();
    this.getSubjects();
  }

  getSubjects() {
    this.settingsService.getSubjects().subscribe({
      next: resp => {
        this.subjects = resp;
      }
    })
  }

  getPacks() {
    this.settingsService.getPacks().subscribe({
      next: packs => {
        this.packs = packs;
      }
    })
  }

  studentForm = this._formBuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    studentClass: ['', Validators.required],
    profile: ['', Validators.required],
    subjects: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    observations: [''],
  });

  parentForm = this._formBuilder.group({
    parentName: ['', Validators.required],
    parentPhoneNumber: ['', Validators.required],
    parentEmail: ['', [Validators.required, Validators.email]],
  });
  financialForm = this._formBuilder.group({
    pack: [null, Validators.required],
    firstAppointment: ['', Validators.required],
    contacted: ['', Validators.required],
    confirmed: ['', Validators.required],
  });

  get name() {
    return this.studentForm.get('name')
  }

  get phoneNumber() {
    return this.studentForm.get('phoneNumber')
  }

  get studentClass() {
    return this.studentForm.get('studentClass')
  }

  get profile() {
    return this.studentForm.get('profile')
  }

  get subject() {
    return this.studentForm.get('subjects')
  }

  get dateOfBirth() {
    return this.studentForm.get('dateOfBirth')
  }

  get parentName() {
    return this.parentForm.get('parentName')
  }

  get parentPhoneNumber() {
    return this.parentForm.get('parentPhoneNumber')
  }

  get parentEmail() {
    return this.parentForm.get('parentEmail')
  }

  get pack() {
    return this.financialForm.get('pack')
  }

  get firstAppointment() {
    return this.financialForm.get('firstAppointment')
  }

  saveStudent() {
    const formValue: any = {
      ...this.studentForm.value,
      ...this.parentForm.value,
      ...this.financialForm.value,
    };

    const student = new Student(formValue);
    this._studentService.saveStudent(student).subscribe({
      next: (response) => {
        this.messageService.success('Studentul a fost adaugat cu succes')
        this._router.navigate(['students']);
      },
      error: error => {
        this.messageService.error(error.error.message)
      }
    })
  }
}
