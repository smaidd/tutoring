import {Routes} from '@angular/router';
import {StudentComponent} from "./feature/student/student.component";
import {StudentCreationComponent} from "./feature/student/student-creation/student-creation.component";
import {StudentEditComponent} from "./feature/student/student-edit/student-edit.component";
import {StudentSheetComponent} from "./feature/sheet/student-sheet/student-sheet.component";
import {HomeComponent} from "./feature/home/home.component";
import {LoginComponent} from "./feature/login/login.component";
import {canActivateRoute} from "./security/can-activate";
import {TeachersComponent} from "./feature/teachers/teachers.component";
import {SheetsComponent} from "./feature/sheet/sheets.component";
import {StudentAttendanceComponent} from "./feature/sheet/student-attendance/student-attendance.component";
import {SettingsComponent} from "./feature/settings/settings.component";
import {TeacherSheetComponent} from "./feature/teachers/teacher-sheet/teacher-sheet.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [canActivateRoute]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'students',
    component: StudentComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Studenti',
      roles: ['ADMIN']
    }
  },
  {
    path: 'students/new',
    component: StudentCreationComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Creare student',
      roles: ['ADMIN']
    }
  },
  {
    path: 'students/edit/:studentId',
    component: StudentEditComponent,
    data: {
      breadcrumb: 'Editare student',
      roles: ['ADMIN']
    }
  },
  {
    path: 'students/sheet/:studentId',
    component: StudentSheetComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Fisa student',
      roles: ['ADMIN', 'PROFESSOR']
    }
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Profesori',
      roles: ['ADMIN']
    }
  },
  {
    path: 'teachers/view/:teacherId',
    component: TeacherSheetComponent,
    data: {
      breadcrumb: 'Vizualizare fise profesor',
      roles: ['ADMIN']
    }
  },
  {
    path: 'sheets',
    component: SheetsComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Fise',
      roles: ['ADMIN', 'PROFESSOR']
    }
  },
  {
    path: 'sheets/new',
    component: StudentAttendanceComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Fisa prezenta',
      roles: ['ADMIN', 'PROFESSOR']
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [canActivateRoute],
    data: {
      breadcrumb: 'Setari',
      roles: ['ADMIN']
    }
  }
];
