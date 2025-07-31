import {inject, Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Student} from "../models/student";
import {ElementPage} from "../models/element-page.model";
import {StudentFilters} from "../models/student/student.filters.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  url = environment.API_URL
  private readonly http = inject(HttpClient);

  saveStudent(student: Student) {
    return this.http.post(`${this.url}/student`, student);
  }

  getStudents(pageSize: number, pageIndex: number) {
    let params = new HttpParams().set("pageSize", pageSize).set("pageNumber", pageIndex);
    return this.http.get<ElementPage<Student>>(`${this.url}/student`, {
      params: params
    });
  }

  getStudentsByFilters(filters: StudentFilters) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      params = params.set(key, value);
    });
    return this.http.get<Student[]>(`${this.url}/student/filter`, {params});
  }

  getStudentById(studentId: string) {
    return this.http.get<Student>(`${this.url}/student/${studentId}`);
  }

  updateStudent(updatedStudent: Student) {
    return this.http.put<Student>(`${this.url}/student/${updatedStudent.id}`, updatedStudent);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.url}/student/${id}`);
  }
}
