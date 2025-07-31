import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../../../services/teacher.service";
import {Teacher} from '../../../models/teacher.model';
import {DatePicker} from "primeng/datepicker";
import {FormsModule} from "@angular/forms";
import {FloatLabel} from "primeng/floatlabel";
import {Button} from "primeng/button";
import {formatDateOnly} from "../../../services/utils";
import {Card} from "primeng/card";
import {TeacherSession} from "../../../models/teacher-session.model";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-teacher-sheet',
  imports: [
    DatePicker,
    FormsModule,
    FloatLabel,
    Button,
    Card,
    TableModule
  ],
  templateUrl: './teacher-sheet.component.html',
  styleUrl: './teacher-sheet.component.scss'
})
export class TeacherSheetComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly teacherService = inject(TeacherService);

  teacherId: string | null | undefined;
  teacher: Teacher | undefined;
  rangeDates: Date[] | undefined;
  teacherSessions: TeacherSession[] | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.teacherId = paramMap.get('teacherId');

      if (this.teacherId) {
        this.getTeacher(this.teacherId);
      }
    })
  }

  getTeacher(teacherId: string) {
    this.teacherService.getTeacher(teacherId).subscribe({
      next: res => {
        this.teacher = res;
      }
    })
  }

  searchSheet() {
    if (this.rangeDates) {
      const from = formatDateOnly(this.rangeDates[0]);
      const to = formatDateOnly(this.rangeDates[1]);

      this.teacherService.getTeacherSheet(this.teacherId!, from, to).subscribe({
        next: res => {
          this.teacherSessions = res;
          console.log(res)
        }
      })
    }
  }

  get totalNumberOfSessions() {
    return this.teacherSessions?.length || 0;
  }

  get totalRemuneration() {
    return this.teacherSessions?.map(session => session.remuneration).reduce((acc, curr) => acc + curr, 0) || 0;
  }
}
