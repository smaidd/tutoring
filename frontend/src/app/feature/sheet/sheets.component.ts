import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {StudentSheetService} from "../../services/student-sheet.service";
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {TableModule, TablePageEvent} from "primeng/table";
import {Sheet} from "../../models/sheet.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Tooltip} from "primeng/tooltip";
import {StudentAttendanceComponent} from "./student-attendance/student-attendance.component";

@Component({
  selector: 'app-sheets',
  imports: [
    Button,
    Card,
    TableModule,
    Tooltip,
    StudentAttendanceComponent
  ],
  templateUrl: './sheets.component.html',
  styleUrl: './sheets.component.scss'
})
export class SheetsComponent implements OnInit {
  @ViewChild('studentDialog') studentDialog!: StudentAttendanceComponent;

  sheetService = inject(StudentSheetService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  pageSize: number = 10;
  pageIndex: number = 0;
  sheets: Sheet[] = []

  ngOnInit() {
    this.getSheets();
  }

  getSheets() {
    this.sheetService.getSheets(this.pageSize, this.pageIndex).subscribe({
      next: resp => {
        if (resp.content) {
          this.sheets = resp.content;
        }
      }
    })
  }

  pageChange(pageEvent: TablePageEvent) {

  }

  showStudentSheet(studentId: string) {
    this.router.navigate(['students', 'sheet', studentId]);
  }

  createPresents() {
    this.router.navigate(['sheets', 'new'])
  }
}
