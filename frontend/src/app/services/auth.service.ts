import {inject, Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {LoginResponse} from "../models/http/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.API_URL
  readonly JWT_TOKEN_KEY = 'JWT_TOKEN'
  readonly BEARER_JWT_TOKEN_KEY = 'BEARER_JWT_TOKEN'
  readonly JWT_TOKEN_EXPIRATION_KEY = 'JWT_TOKEN_EXPIRATION'
  readonly USER_ROLE_KEY = 'USER_ROLE'

  http = inject(HttpClient)

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.url}/auth/login`, {username: username, password: password})
      .pipe(
        tap(response => {
          localStorage.setItem(this.JWT_TOKEN_KEY, response.jwtToken)
          localStorage.setItem(this.JWT_TOKEN_EXPIRATION_KEY, response.expirationTime.toString())
          localStorage.setItem(this.BEARER_JWT_TOKEN_KEY, `Bearer ${response.jwtToken}`)
          localStorage.setItem(this.USER_ROLE_KEY, response.role)
        })
      )
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.BEARER_JWT_TOKEN_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }
}
