import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService} from '../../../services/students.service';
import {Student} from "../../../models/student";
import {Card} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {FloatLabel} from "primeng/floatlabel";
import {DatePicker} from "primeng/datepicker";
import {Textarea} from "primeng/textarea";
import {Divider} from "primeng/divider";
import {Select} from "primeng/select";
import {Checkbox} from "primeng/checkbox";
import {IsoToDatePipe} from "../../../shared/pipes/iso-date.pipe";
import {Button} from "primeng/button";
import {Location} from "@angular/common";
import {ConfirmationService} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {Packs} from "../../../models/packs.model";
import {SettingsService} from "../../../services/settings.service";
import {MultiSelect} from "primeng/multiselect";
import {Subject} from "../../../models/subject.model";

@Component({
  selector: 'app-student-edit',
  imports: [
    Card,
    FormsModule,
    InputText,
    FloatLabel,
    DatePicker,
    ReactiveFormsModule,
    Textarea,
    Divider,
    Select,
    Checkbox,
    IsoToDatePipe,
    Button,
    MultiSelect
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent implements OnInit {
  route = inject(ActivatedRoute)
  confirmationService = inject(ConfirmationService)
  location = inject(Location)
  router = inject(Router)
  studentService = inject(StudentsService)
  settingsService = inject(SettingsService)
  _toastrService = inject(ToastrService)

  studentId: string | null | undefined;
  student: Student | undefined;
  packs: Packs[] = [];
  subjects: Subject[] = [];

  protected readonly Student = Student;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.studentId = paramMap.get('studentId');

      if (this.studentId) {
        this.getStudent(this.studentId);
        this.getPacks();
        this.getSubjects();
      }
    })
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

  getStudent(studentId: string) {
    this.studentService.getStudentById(studentId).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esti sigur ca vrei sa updatezi datele elevului?',
      header: 'Update date',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Renunta',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Salveaza',
        severity: 'success'
      },
      accept: () => {
        if (this.student) {
          this.updateStudent(this.student)
        }
      },
      reject: () => {

      },
    });
  }

  updateStudent(updatedStudent: Student) {
    this.studentService.updateStudent(updatedStudent).subscribe({
      next: (student) => {
        this._toastrService.success('Studentul a fost updatat cu succes');
        this.router.navigate(['students']);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  cancel() {
    this.location.back();
  }
}
