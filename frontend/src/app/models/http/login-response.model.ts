export interface LoginResponse {
  jwtToken: string;
  expirationTime: number;
  role: string;
}
