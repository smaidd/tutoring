import {Component, inject, OnInit, output} from '@angular/core';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SettingsService} from "../../../../services/settings.service";
import {Packs} from "../../../../models/packs.model";
import {AppMessageService} from "../../../../services/message.service";

@Component({
  selector: 'app-pack-creation',
  imports: [
    Button,
    Dialog,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './pack-creation.component.html',
  styleUrl: './pack-creation.component.scss'
})
export class PackCreationComponent {
  formBuilder = inject(FormBuilder);
  packService = inject(SettingsService);
  messageService = inject(AppMessageService);

  saveEmitter = output();

  visible = false;
  packForm!: FormGroup;

  createPackForm(pack?: Packs) {
    this.packForm = this.formBuilder.group({
      id: [pack?.id ?? null, Validators.required],
      name: [pack?.name ?? '', Validators.required],
      numberOfSessions: [pack?.numberOfSessions ?? '', [Validators.required, Validators.min(1)]],
      price: [pack?.price ?? '', [Validators.required, Validators.min(1)]],
    })
  }

  showDialog(pack?: Packs) {
    this.visible = true;
    this.createPackForm(pack);
  }

  savePack() {
    const pack: Packs = this.packForm.getRawValue();
    this.packService.savePack(pack).subscribe({
      next: () => {
        this.messageService.success("Ati creat cu succes un nou pachet")
        this.visible = false;
        this.saveEmitter.emit();
      }
    })
  }
}
