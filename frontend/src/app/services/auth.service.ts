import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = jwtDecode<any>(token);
    return decodedToken.userId;
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const decodedToken = jwtDecode<any>(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp < currentTime;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired();
  }
}
