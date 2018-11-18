import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  server = 'http://localhost/laravel/test_project/api/';
  objheaders: HttpHeaders = new HttpHeaders();
  options: any;
  token: any;
  constructor(private http: HttpClient) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = (currentUser['raws']['data']['token']);
    //console.log(this.token);
    //let objheaders = new HttpHeaders();
    this.objheaders = this.objheaders.append('Content-Type', 'application/json');
    //this.objheaders = this.objheaders.append('X-Requested-With', 'XMLHttprequest');
    this.objheaders = this.objheaders.append('Authorization', 'Bearer ' + this.token);
    this.options = { headers: this.objheaders };
  }
  
  addProfile(info) {
    let data=info;
    //let data = JSON.stringify(info);
    //console.log(info);
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = (currentUser['raws']['data']['token']);
    let objheaders = new HttpHeaders();

    //objheaders = objheaders.append('Content-Type','application/json');
    //objheaders = objheaders.append('X-Requested-With', 'XMLHttprequest');
    objheaders = objheaders.append('Authorization', 'Bearer ' + this.token);

    return this.http.post(this.server + "addPlayer", data, { headers: objheaders }).pipe(map(res => {
      return res;
    }));
  }

  getListProfile(pageno, itemsPerPage, searchByName = '') {
    let param = {
      searchByName: searchByName,
      pageno: pageno,
      pagesize: itemsPerPage
    }
    let data = JSON.stringify(param);
    return this.http.post(this.server + "listPlayer", data, this.options).pipe(map(res => {
      return res;
    }));

  }

  profileDetails(player_id) {
    let param = {
      id: player_id,
    }
    let data = JSON.stringify(param);
    return this.http.post(this.server + "profileDetails", data, this.options).pipe(map(res => {
      return res;
    }));
  }

  deleteProfile(player_id) {
    let param = {
      id: player_id,
    }
    let data = JSON.stringify(param);
    return this.http.post(this.server + "deleteProfile", data, this.options).pipe(map(res => {
      return res;
    }));
  }


}
