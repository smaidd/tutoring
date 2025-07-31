import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from '../../services/students.service';
import {TableModule, TablePageEvent} from "primeng/table";
import {Student} from "../../models/student";
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {StudentAttendanceComponent} from "../sheet/student-attendance/student-attendance.component";
import {AppMessageService} from "../../services/message.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-student',
  imports: [
    TableModule,
    Card,
    Button,
    Tooltip
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly studentService = inject(StudentsService);
  readonly messageService = inject(AppMessageService);
  readonly confirmationService = inject(ConfirmationService);


  students!: Student[];
  pageSize: number = 10;
  pageIndex: number = 0;
  showAttendanceDialog = false;

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents(this.pageSize, this.pageIndex).subscribe({
      next: (response) => {
        if (response.content) {
          this.students = response.content
        }
      },
      error: error => {

      }
    })
  }

  createStudent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  pageChange(pageEvent: TablePageEvent) {
    this.pageIndex = pageEvent.first;
    this.pageSize = pageEvent.rows;
    this.getStudents();
  }

  editStudent(studentId: string) {
    this.router.navigate(['edit', studentId], {relativeTo: this.route});
  }

  showStudentSheet(studentId: string) {
    this.router.navigate(['sheet', studentId], {relativeTo: this.route});
  }

  removeStudent(id: string) {
    this.confirmationService.confirm({
      message: 'Esti sigur ca vrei sa stergi studentul?',
      header: 'Stergere student',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Nu',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Da',
      },
      accept: () => {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            this.messageService.success("Ati sters cu succes studentul")
            this.getStudents();
          }
        })
      }
    });
  }
}
