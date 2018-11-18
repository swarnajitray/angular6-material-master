import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../_services/common.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, } from '@angular/forms';
//import { AuthService } from '../auth-services/auth.service';
//import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-addplayer-component',
  templateUrl: './addplayer-component.component.html',
  styleUrls: ['./addplayer-component.component.css']
})
export class AddplayerComponentComponent implements OnInit {

  addPlayerForm: FormGroup;
  showSpinner: boolean = false;
  id: number;
  name: string;
  address: string;
  type: string;
  gender: string;
  selectedFile: File = null;
  //url:any;

  constructor(private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute,
    //private http:HttpClient,
  ) { }


  ngOnInit() {
    //console.log("inside ngOnInit");
    this.getPrfoileDetails();
  }

  oninit() {
    this.addPlayerForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
        // Validators.email
      ])),
      'address': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      'type': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'gender': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'id': new FormControl(this.id, Validators.compose([
        //Validators.required
      ])),
      'uploadFile': new FormControl('', Validators.compose([
      ])),

    });
  }

  getPrfoileDetails() {
    let id = this.route.snapshot.params.id;
    //console.log(id);
    if (id) {
      this.commonService.profileDetails(id).subscribe(response => {
        this.name = response['raws']['data']['dataset']['name'];
        this.address = response['raws']['data']['dataset']['address'];
        this.gender = response['raws']['data']['dataset']['gender'];
        this.type = response['raws']['data']['dataset']['type'];
        this.id = response['raws']['data']['dataset']['id'];
        this.addPlayerForm.patchValue({ name: this.name });
        this.addPlayerForm.patchValue({ address: this.address });
        this.addPlayerForm.patchValue({ gender: this.gender });
        this.addPlayerForm.patchValue({ type: this.type });
        this.addPlayerForm.patchValue({ id: this.id });
        if(response['raws']['data']['dataset']['img_name']!=null)
        {
        var output = document.getElementById('image');
        let img_name="http://localhost/laravel/test_project/storage/app/thumb_img/"+response['raws']['data']['dataset']['img_name'];
        output['src'] =img_name;
        }
      });
    }
    this.oninit();
  }

  addPlayer(data) {
    console.log(data);
    let fd = new FormData;
    if (this.selectedFile != null) {
      fd.append('uploadFile', this.selectedFile, this.selectedFile.name);
    }
    fd.append('id', data.id);
    fd.append('name', data.name);
    fd.append('address', data.address);
    fd.append('type', data.type);
    fd.append('gender', data.gender);
    console.log(fd);
    this.showSpinner = true;
    this.commonService.addProfile(fd).subscribe(response => {
      if (response['raws']['status'] == '200') {
        if (response['raws']['success_message'] == 'Player edited  Successfully') {
          this.router.navigate(["/nav/edit/:", this.id]);
          alert("Date Edited Successful");
        }
        if (response['raws']['success_message'] == 'Player added  Successfully') {
          this.router.navigate(["/nav/listPlayer"]);
          alert("Data Added Successful");
        }
        this.showSpinner = false;
      }
      else {
        alert(response['raws']['error_message']);
        this.showSpinner = false;
        //console.log(response['raws']['status']);
      }
    })
  }


  onFileSelected(event) {
    this.selectedFile = <File>event['target']['files'][0];
    this.addPlayerForm.patchValue({ 'uploadFile': this.selectedFile });
    var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed 
        var output = document.getElementById('image');
          //output['src'] = reader.result;  // we can also use this
          output['src'] = event['target']['result'];// we are appending data
      }
    
    //console.log(this.selectedFile);
    // console.log($event['target']['files'][0]['name']);
  }

}
