import {Component, inject, OnInit} from '@angular/core';
import {StudentsService} from "../../../services/students.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../../models/student";
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {StudentSheetService} from "../../../services/student-sheet.service";
import {Sheet} from "../../../models/sheet.model";
import {SheetStatistics} from "../../../models/sheet-statistics.model";
import {TableModule} from "primeng/table";
import {Tag} from "primeng/tag";
import {ProgressBar} from "primeng/progressbar";
import {Tooltip} from "primeng/tooltip";
import {Dialog} from "primeng/dialog";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-student-sheet',
  imports: [
    Button,
    Card,
    TableModule,
    Tag,
    ProgressBar,
    Tooltip,
    Dialog
  ],
  templateUrl: './student-sheet.component.html',
  styleUrl: './student-sheet.component.scss'
})
export class StudentSheetComponent implements OnInit {
  studentService = inject(StudentsService)
  studentSheetService = inject(StudentSheetService)
  public authService = inject(AuthService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  studentId: string | null | undefined;
  student: Student | undefined;
  studentSheet: Sheet | undefined;
  studentSheetStatistics: SheetStatistics | undefined;
  visible: boolean = false;
  note!: string;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.studentId = paramMap.get('studentId');

      if (this.studentId) {
        this.getStudent(this.studentId);
        this.getStudentSheet(this.studentId);
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

  getStudentSheet(studentId: string) {
    this.studentSheetService.getStudentClasses(studentId).subscribe({
      next: (sheet) => {
        this.studentSheet = sheet;
        this.getSheetStatistics(sheet.id);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getSheetStatistics(sheetId: string) {
    this.studentSheetService.getStudentSheetStatistics(sheetId).subscribe({
      next: resp => {
        this.studentSheetStatistics = resp;
      }
    })
  }

  showAttendanceNotes(notes: string) {
    this.visible = true;
    this.note = notes;
  }
}
