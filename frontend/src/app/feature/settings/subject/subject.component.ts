import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {TableModule} from "primeng/table";
import {SettingsService} from "../../../services/settings.service";
import {Subject} from "../../../models/subject.model";
import {Card} from "primeng/card";
import {Button} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {SubjectCreationComponent} from "./subject-creation/subject-creation.component";


@Component({
  selector: 'app-subject',
  imports: [
    TableModule,
    Card,
    Button,
    Tooltip,
    SubjectCreationComponent
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
  @ViewChild('subjectCreationComponent') subjectDialog!: SubjectCreationComponent;

  settingsService = inject(SettingsService);

  subjects: Subject[] = [];

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.settingsService.getSubjects().subscribe({
      next: resp => {
        this.subjects = resp;
      }
    })
  }

  addNewSubject() {
    this.subjectDialog.showDialog();
  }

  editSubject(subject: Subject) {
    this.subjectDialog.showDialog(subject);
  }

  removeSubject(id: string, event: Event) {

  }

  onSaveSubject() {
    this.getSubjects();
  }
}
