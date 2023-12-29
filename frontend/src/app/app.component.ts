import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TCGTT';
  private subscription = new Subscription();
  username: string = '';
  userId: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLoginState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkLoginState(): void {
    const token = localStorage.getItem('token');
    if (token && !this.isTokenExpired(token)) {
      const decodedToken = jwtDecode<any>(token);
      this.username = decodedToken.username; // Adjust based on your token structure
      this.userId = decodedToken.userId;
    } else {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  logout() {
    // Implement logout logic, e.g., remove token from local storage
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode<any>(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp < currentTime;
  }
}
