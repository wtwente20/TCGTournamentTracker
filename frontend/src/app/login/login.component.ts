import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('http://localhost:5000/users/login', this.user)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']); // Redirect to home or dashboard page
      }, error => {
        console.error(error);
        // Handle error
      });
  }
}
