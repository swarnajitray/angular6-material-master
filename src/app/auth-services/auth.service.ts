import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = 'http://localhost/laravel/test_project/api/';
  objheaders: HttpHeaders = new HttpHeaders();
  options: any;
  token: any;
  constructor(private http: HttpClient) {
    this.objheaders = this.objheaders.append('Content-Type', 'application/json');
    this.objheaders = this.objheaders.append('X-Requested-With', 'XMLHttprequest');
    this.options = { headers: this.objheaders };
  }
  login(info) {
    //console.log(info);
    //let objheaders = new HttpHeaders();
    // objheaders = objheaders.append('Content-Type','application/json');
    // objheaders = objheaders.append('X-Requested-With','XMLHttprequest');
    let data = JSON.stringify(info);
    return this.http.post(this.server + "login", data, this.options).pipe(map(res => {
      if (res && res['raws']['status'] == '200') {
        //console.log(res['raws']['data']['token']);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res));
      }
      return res;
    }));
  }

  isLoggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(currentUser);
    if (currentUser != null) {
      this.token = (currentUser['raws']['data']['token']);
    }
    else {
      this.token = 'jgfjgfrjg';
    }
    let logobjheaders = new HttpHeaders();
    logobjheaders = logobjheaders.append('Accept', 'application/json');
    logobjheaders = logobjheaders.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(this.server + "validateToken", { headers: logobjheaders }).pipe(map(res => {
      return res;
    }));
  }

  logout(data) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(currentUser);
    this.token = (currentUser['raws']['data']['token']);
    let logoutobjheaders = new HttpHeaders();
    logoutobjheaders = logoutobjheaders.append('Accept', 'application/json');
    logoutobjheaders = logoutobjheaders.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(this.server + "userLogout", { headers: logoutobjheaders }).pipe(map(res => {
      return res;
    }));
  }

}
