import {ActivatedRoute, CanMatchFn, Data, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const canActivateRoute: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const data = route.data

  let authToken = authService.getAuthToken();
  if (!authToken) {
    router.navigate(['/login'])
    return false;
  }
  if (!checkRoute(data, authService.getUserRole())) {
    router.navigate(['/home'])
    return false;
  }
  return true;
}

function checkRoute(data: Data | undefined, userRole: string | null): boolean {
  if (!data) {
    return true
  }

  if (!userRole) {
    return false;
  }

  const roles: string[] = data['roles']
  if (!roles || roles.length === 0) {
    return true;
  }
  return roles.includes(userRole);
}
