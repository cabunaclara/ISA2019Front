import { AuthenticationService } from './../service/authentication.service';
import { UsersService } from './../service/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: String;
  public password: String;

  constructor(private usersService: UsersService, private router: Router, private authenticationService: AuthenticationService) {
    this.username = '';
    this.password = '';
   }

  ngOnInit() {
  }

  login() {
    this.usersService.login(this.loginToJSON()).subscribe(
      result => {
        console.log(result);
        if (result === true) {
          this.router.navigate(['/profile']);
        }
      },
      error => {
        console.log(error);
        alert(error);
      }
    );
  }

  loginToJSON() {
    return JSON.stringify({
      'username' : this.username,
      'password' : this.password
    });
  }



}
