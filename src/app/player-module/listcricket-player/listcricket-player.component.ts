import { Component, OnInit,OnDestroy,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../_services/common.service';
import { FormGroup, FormControl } from '@angular/forms';
import { detachProjectedView } from '@angular/core/src/view/view_attach';

@Component({
  selector: 'app-listcricket-player',
  templateUrl: './listcricket-player.component.html',
  styleUrls: ['./listcricket-player.component.css']
})
export class ListcricketPlayerComponent implements OnInit , OnDestroy{

  constructor(private router: Router, private commonService: CommonService) { }
  profiles: any;
  pageno: number = 1;
  searchByName: string;
  itemsPerPage: number = 4;
  count: number;
  searchForm: FormGroup;
  subscriptions:any;
  ngOnInit() {
    //console.log("I aM here ngOnInit");
    this.searchForm = new FormGroup({
      'searchByName': new FormControl('')
    });
    this.getProfiles(this.pageno, this.itemsPerPage);
  }


  getProfiles(pageno, itemsPerPage, searchByName = '') {
    this.subscriptions= this.commonService.getListProfile(pageno, itemsPerPage, searchByName).subscribe(response => {

      if (response['raws']['status'] == '200') {

        this.profiles = response['raws']['data']['dataset'];
        this.count = response['raws']['data']['count'];
        this.pageno = pageno;
      }
      else {
        alert(response['raws']['error_message']);
        this.count = response['raws']['data']['count'];
        //this.router.navigate(['/login']);
      }
    })
  }

  deleteProfile(id) {
    let confirm_alert = confirm('Are you sure you want to delete this profile?');
    if (confirm_alert == true) {
      this.commonService.deleteProfile(id).subscribe(response => {
        if (response['raws']['status'] == '200') {
          alert(response['raws']['success_message']);
          this.getProfiles(this.pageno, this.itemsPerPage);
        }
        else {
          alert(response['raws']['error_message']);
          this.router.navigate(['/nav']);
        }
      })
    }
    else {
      alert("cancel button");
    }
  }

  doSearch(searchParam) {
    this.pageno = 1;
    this.searchByName = searchParam.searchByName;
    this.getProfiles(this.pageno, this.itemsPerPage, this.searchByName);
  }
  
  ngOnDestroy(){
    if(this.subscriptions){
    //console.log(this.subscriptions);
    this.subscriptions.unsubscribe();
    }
  }

  // ngDoCheck(){
  //   console.log("i am inside on change");
  // }
}
