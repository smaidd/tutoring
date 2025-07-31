import {Component, inject, OnInit, output} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {Button} from "primeng/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {AppMessageService} from "../../../services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-creation',
  imports: [
    Dialog,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './teacher-creation.component.html',
  styleUrl: './teacher-creation.component.scss'
})
export class TeacherCreationComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  teacherService = inject(TeacherService);
  messageService = inject(AppMessageService);
  router = inject(Router);

  saveEmitter = output();

  visible = false
  teacherForm!: FormGroup;

  ngOnInit() {
    this.teacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
    })
  }

  showDialog() {
    this.visible = true;
  }

  saveTeacher() {
    const teacher: Teacher = this.teacherForm.getRawValue();


    this.teacherService.saveTeacher(teacher).subscribe({
      next: resp => {
        this.messageService.success("Ati creat cu succes un nou profesor")
        this.visible = false;
        this.saveEmitter.emit();
      }
    })
  }
}
