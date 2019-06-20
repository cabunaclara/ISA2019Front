import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  password: string;
  repeatedPasswotd: string;
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
  user: User;

  constructor(private userService: UsersService) {
    this.username = '';
    this.password = '';
    this.repeatedPasswotd = '';
    this.firstName = '';
    this.lastName = '';
    this.city = '';
    this.phoneNumber = '';
    this.user = {
      username : '',
      password: '',
      firstName: '',
      lastName: '',
      city: '',
      phoneNumber: '',
    };


  }

  ngOnInit() {
    console.log(this.userService.getCurrentUser());
    this.userService.getCurrentUserInfo().subscribe(
      result => {
        console.log(result.username);
        this.user = result;
      },
      error => {
        console.log(error);
      }
    );
  }

}
