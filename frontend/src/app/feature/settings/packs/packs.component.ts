import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {Packs} from "../../../models/packs.model";
import {Card} from "primeng/card";
import {SettingsService} from "../../../services/settings.service";
import {PackCreationComponent} from "./pack-creation/pack-creation.component";
import {Tooltip} from "primeng/tooltip";
import {ConfirmationService} from "primeng/api";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-packs',
  imports: [
    Button,
    TableModule,
    Card,
    PackCreationComponent,
    Tooltip
  ],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.scss'
})
export class PacksComponent implements OnInit {
  @ViewChild('packCreationComponent') packCreation!: PackCreationComponent;

  confirmationService = inject(ConfirmationService)
  _toastrService = inject(ToastrService)
  settingsService = inject(SettingsService);

  packs: Packs[] | undefined;

  ngOnInit() {
    this.getPacks();
  }

  getPacks() {
    this.settingsService.getPacks().subscribe({
      next: resp => {
        this.packs = resp;
      }
    })
  }

  addNewPack() {
    this.packCreation.showDialog();
  }

  onSavePack() {
    this.getPacks();
  }

  removePack(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esti sigur ca vrei sa stergi pachetul?',
      header: 'Stergere pachet',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Renunta',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sterge',
        severity: 'danger'
      },
      accept: () => {
        this.settingsService.removePack(id).subscribe({
          next: () => {
            this._toastrService.success('Pachetul a fost sters cu succes');
            this.getPacks();
          }
        })

      },
      reject: () => {

      },
    });
  }

  editPack(pack: Packs) {
    this.packCreation.showDialog(pack);
  }
}
