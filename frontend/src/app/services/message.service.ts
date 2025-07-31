import {inject, Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class AppMessageService {
  private toastrService = inject(ToastrService);

  success(message: string): void {
    this.toastrService.success(message, 'Succes')
  }

  info(message: string): void {
    this.toastrService.info(message, 'Info')
  }

  warn(message: string): void {
    this.toastrService.warning(message, 'Atentie')
  }

  error(message: string): void {
    this.toastrService.error(message, 'Eroare')
  }

}
