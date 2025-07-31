import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {TeacherService} from "../../services/teacher.service";
import {TeacherCreationComponent} from "./teacher-creation/teacher-creation.component";
import {Teacher} from "../../models/teacher.model";
import {TableModule, TablePageEvent} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {AppMessageService} from "../../services/message.service";
import {ConfirmationService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teachers',
  imports: [
    Card,
    Button,
    TeacherCreationComponent,
    TableModule,
    Tooltip
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {
  teacherService = inject(TeacherService);
  messageService = inject(AppMessageService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  pageSize: number = 10;
  pageIndex: number = 0;
  teachers!: Teacher[];

  @ViewChild('teacherCreationComponent') teacherDialog!: TeacherCreationComponent;

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getTeachers(this.pageSize, this.pageIndex).subscribe({
      next: teachers => {
        if (teachers.content) {
          this.teachers = teachers.content
        }
      }
    })
  }

  createProfessor() {
    this.teacherDialog.showDialog();
  }

  onTeacherSave() {
    this.getTeachers();
  }

  pageChange(pageEvent: TablePageEvent) {
    this.pageIndex = pageEvent.first;
    this.pageSize = pageEvent.rows;
    this.getTeachers();
  }

  editTeacher(id: string) {

  }

  deleteTeacher(id: string) {
    this.confirmationService.confirm({
      message: 'Esti sigur ca vrei sa stergi profesorul?',
      header: 'Stergere profesor',
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
        this.teacherService.deleteTeacher(id).subscribe({
          next: () => {
            this.messageService.success("Ati sters cu succes profesorul");
            this.getTeachers();
          }
        })
      }
    });
  }

  viewSheet(id: string) {
    this.router.navigate(['view', id], {relativeTo: this.route});
  }
}
