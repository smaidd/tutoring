import {inject, Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ElementPage} from "../models/element-page.model";
import {Sheet} from "../models/sheet.model";
import {Presence} from "../models/presence.model";
import {SheetStatistics} from "../models/sheet-statistics.model";
import {PresenceCreation} from "../models/http/presence-creation.model";

@Injectable({
  providedIn: 'root'
})
export class StudentSheetService {
  url = environment.API_URL
  private readonly http = inject(HttpClient);

  getSheets(pageSize: number, pageIndex: number) {
    let params = new HttpParams().set("pageSize", pageSize).set("pageNumber", pageIndex);
    return this.http.get<ElementPage<Sheet>>(`${this.url}/sheet`, {
      params: params
    });
  }

  getStudentClasses(studentId: string) {
    return this.http.get<Sheet>(`${this.url}/sheet/${studentId}`);
  }

  savePresenceToStudentSheet(presence: Presence, studentId: string) {
    return this.http.post<any>(`${this.url}/sheet/presence/${studentId}`, presence)
  }

  savePresenceSheet(presenceSheet: PresenceCreation) {
    return this.http.post<any>(`${this.url}/sheet/presenceSheet`, presenceSheet)
  }

  getStudentSheetStatistics(sheetId: string) {
    return this.http.get<SheetStatistics>(`${this.url}/sheet/statistics/${sheetId}`);
  }
}
