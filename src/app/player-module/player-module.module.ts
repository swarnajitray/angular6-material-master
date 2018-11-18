import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddplayerComponentComponent } from './addplayer-component/addplayer-component.component';
import { CommonService } from '../_services/common.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { NgxPaginateModule } from 'ngx-paginat';
import { NgxPaginationModule } from 'ngx-pagination';//npm install ngx-pagination --save
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSortModule, 
} from '@angular/material';
import { ListPlayerComponent } from './list-player/list-player.component';
import { ListcricketPlayerComponent } from './listcricket-player/listcricket-player.component';


// const appRoutes1: Routes = [ 
//  // {path:'edit/:id',component:AddplayerComponentComponent},
//   //{ path: 'addplayer', component: AddplayerComponentComponent},
// ];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSortModule,

    
    //NgxPaginateModule,
    NgxPaginationModule,
    HttpClientModule,
    RouterModule,
    
  ],
  declarations: [AddplayerComponentComponent, ListPlayerComponent, ListcricketPlayerComponent],
  exports:[
    AddplayerComponentComponent,
    ListPlayerComponent,
    ListcricketPlayerComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
  
  ],
  providers: [AuthService, CommonService
  ],
})
export class PlayerModuleModule {
  // constructor(private svc:CommonService){
  //   this.svc.addProfile("Got the service inside player module"); 
  // }

 }
