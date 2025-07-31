import {inject, Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ElementPage} from "../models/element-page.model";
import {Teacher} from "../models/teacher.model";
import {TeacherSession} from "../models/teacher-session.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  url = environment.API_URL
  private readonly http = inject(HttpClient);

  getTeachers(pageSize: number, pageIndex: number) {
    let params = new HttpParams().set("pageSize", pageSize).set("pageNumber", pageIndex);
    return this.http.get<ElementPage<Teacher>>(`${this.url}/teacher`, {
      params: params
    });
  }

  getTeacher(teacherId: string) {
    return this.http.get<Teacher>(`${this.url}/teacher/${teacherId}`);
  }

  getTeacherSheet(teacherId: string, from: string, to: string) {
    let params = new HttpParams().set("from", from).set("to", to);
    return this.http.get<TeacherSession[]>(`${this.url}/teacher/sheet/${teacherId}`, {
      params: params
    });
  }

  saveTeacher(teacher: Teacher) {
    return this.http.post<Teacher>(`${this.url}/teacher`, teacher);
  }

  deleteTeacher(id: string) {
    return this.http.delete(`${this.url}/teacher/${id}`)
  }
}
