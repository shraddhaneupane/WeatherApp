import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email= '';
  password = '';


  constructor(private router: Router, private localService: LocalStorageService ){

  }

  ngOnInit() {

  }

  login(){
    
    console.log("Email: ", this.email);
    console.log("Password: ", this.password);

    if ( this.validateEmail(this.email) && this.password === 'test1234') {
    this.localService.setData('email', this.email)

    this.router.navigate(['/main']);
    } 
    else {
      alert('Invalid username or password.');
    }
   
  }
  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

