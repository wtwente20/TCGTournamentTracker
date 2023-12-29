import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Adjust the import path as needed

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

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.loginUser(this.user.username, this.user.password)
      .subscribe(response => {
        localStorage.setItem('token', response.token); // Assuming the token is returned in the response
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error(error);
        // Handle error
      });
  }
}
