import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})

export class MyNavComponent implements OnInit {
  ngOnInit() {
    console.log("I am inside nav component");
  }
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver,
    private authService:AuthService,
    private router: Router) { }


   //showSpinner: boolean = false;
   loadComponent: boolean = false;
  logout():void {
    let data='';
    console.log("logout");
    //this.showSpinner = true;
    this.authService.logout(data).subscribe(response =>{
      if(response['raws']['status']=='200')
      {
        //this.showSpinner = false;
        localStorage.removeItem('currentUser');
        this.router.navigate(["login"]);
        
      }
      else{
        alert("Invalid credentials");
        //this.showSpinner = false;
        //console.log(response['raws']['status']);
      }
     
    })
  }

  // loadMyChildComponent(value) {
  //   console.log(value);
  //   this.loadComponent = value;
  // }
}
