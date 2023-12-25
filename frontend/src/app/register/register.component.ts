import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  onRegister() {
    this.http.post('http://localhost:5000/users/register', this.user)
      .subscribe(response => {
        console.log(response);
        // Handle response
      }, error => {
        console.error(error);
        // Handle error
      });
  }
}
