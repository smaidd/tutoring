import {Component, inject, output} from '@angular/core';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SettingsService} from "../../../../services/settings.service";
import {AppMessageService} from "../../../../services/message.service";
import {Subject} from "../../../../models/subject.model";

@Component({
  selector: 'app-subject-creation',
  imports: [
    Button,
    Dialog,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './subject-creation.component.html',
  styleUrl: './subject-creation.component.scss'
})
export class SubjectCreationComponent {
  formBuilder = inject(FormBuilder);
  packService = inject(SettingsService);
  messageService = inject(AppMessageService);

  saveEmitter = output();

  visible = false;
  subjectForm!: FormGroup;

  createPackForm(subject?: Subject) {
    this.subjectForm = this.formBuilder.group({
      id: [subject?.id ?? null, Validators.required],
      name: [subject?.name ?? '', Validators.required]
    })
  }

  showDialog(subject?: Subject) {
    this.visible = true;
    this.createPackForm(subject);
  }

  saveSubject() {
    const subject: Subject = this.subjectForm.getRawValue();
    this.packService.saveSubject(subject).subscribe({
      next: () => {
        this.messageService.success("Ati creat cu succes o noua materie")
        this.visible = false;
        this.saveEmitter.emit();
      }
    })
  }
}
