import {inject, Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Packs} from "../models/packs.model";
import {Subject} from "../models/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  url = environment.API_URL + "/settings"
  private readonly http = inject(HttpClient);

  getPacks() {
    return this.http.get<Packs[]>(`${this.url}/pack`)
  }

  savePack(pack: Packs) {
    return this.http.post(`${this.url}/pack`, pack)
  }

  removePack(id: string) {
    return this.http.delete(`${this.url}/pack/${id}`)
  }

  getSubjects() {
    return this.http.get<Subject[]>(`${this.url}/subject`)
  }

  saveSubject(subject: Subject) {
    return this.http.post(`${this.url}/subject`, subject)
  }
}
