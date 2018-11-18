import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private authService:AuthService) { }
  email: string;
  password: string;
  loginForm: FormGroup;
  cookieValue = 'UNKNOWN';
  //loading = false;
  showSpinner: boolean = false; // this variable is used to show spinner when submit registration
  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),

    });
  }
  // login() : void {
  //   if(this.email == 'admin' && this.password == 'admin'){
  //    this.router.navigate(["nav"]);
  //   //  this.router.navigateByUrl('/user');
  //   }else {
  //     alert("Invalid credentials");
  //   }
  // }
  login(data)
   { 
     //localStorage.removeItem('currentUser');
    this.showSpinner = true;
    //this.loading = true;
   // let obs = this.http.get('https://api.github.com/users/koushikkothagal');
    //obs.subscribe((response)=>console.log(response));
    this.authService.login(data).subscribe(response =>{
      if(response['raws']['status']=='200')
      {
        this.router.navigate(["nav"]);
        this.showSpinner = false;
      }
      else{
        alert("Invalid credentials");
        this.showSpinner = false;
        //console.log(response['raws']['status']);
      }
     
    })
  }


}
