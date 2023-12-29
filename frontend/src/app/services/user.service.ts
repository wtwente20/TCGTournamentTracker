import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private isActive: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(username: string, email: string, password: string, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { username, email, password, status });
  }

  loginUser(identifier: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { identifier, password });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const body = { oldPassword, newPassword };
    return this.http.put(`${this.apiUrl}/users/change-password`, body, { headers });
  }

  deactivateUser(): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/deactivate`, {}, { headers: this.getAuthHeaders() });
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete`, { headers: this.getAuthHeaders() });
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  updateUserDetails(details: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/details`, details, { headers: this.getAuthHeaders() });
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/details`, { headers: this.getAuthHeaders() });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }
}
