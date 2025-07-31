import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, throwError} from "rxjs";
import {AppMessageService} from "../services/message.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).getAuthToken();
  if (authToken) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });
    return next(newReq)
  }

  return next(req);
}

export function errorHttpInterceptor(request: HttpRequest<any>,
                                     next: HttpHandlerFn) {
  const messageService = inject(AppMessageService);
  return next(request)
    .pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        if (error.error instanceof ErrorEvent) {
          messageService.error(error.error.message)
        } else {
          if (!error.error) {
            return throwError(() => new Error('Something went wrong!'));
          }
          if (error.error.statusCode === 500 || error.error.statusCode === 400) {
            messageService.error(error.error.message)
          } else if (error.error.statusCode === 401 || error.error.statusCode === 403) {
            messageService.error("Tokenul de autentificare a expirat. Te rog sa te autentifici din nou!")
            localStorage.clear()
            window.location.reload()
          }
        }
        return throwError(() => new Error('Something went wrong!'));
      })
    )
}
