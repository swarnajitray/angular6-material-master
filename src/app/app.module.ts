import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,MatProgressSpinnerModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth-services/auth.service';
import { AlertService, } from './_services';
import { AuthGuard } from './_guards';
import { loginRedirectGuard } from './_guards';
//import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// used to create fake backend
//import { fakeBackendProvider } from './_helpers';
import { AlertComponent } from './_directives';
import { PlayerModuleModule } from './player-module/player-module.module';
import { AddplayerComponentComponent } from './player-module/addplayer-component/addplayer-component.component';
import { ListPlayerComponent } from './player-module/list-player/list-player.component';
import { ListcricketPlayerComponent } from './player-module/listcricket-player/listcricket-player.component';
const appRoutes: Routes = [
  //{ path: 'first-page', component: FirstPageComponent},
  // { path: 'second-page', component: SecondPageComponent},
  { path: 'nav', component: MyNavComponent,canActivate: [AuthGuard],
        children:[
          { path: 'first-page', component: FirstPageComponent},
          { path: 'second-page', component: SecondPageComponent},
          { path: 'third-page', component: ThirdPageComponent},
          //{ path: 'addplayer', loadChildren : () => PlayerModuleModule},
          { path: 'addplayer', component: AddplayerComponentComponent},
          { path: 'staticList', component: ListPlayerComponent},
          { path: 'listPlayer', component: ListcricketPlayerComponent},
          {path:  'edit/:id',component:AddplayerComponentComponent}
        ]
      },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent,canActivate: [loginRedirectGuard] },
  //{path:'nav1/:id',component:MyNavComponent,canActivate: [AuthGuard]},
 
  {path:'',redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    LoginComponent,
    UserComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpModule,
    HttpClientModule,
    PlayerModuleModule
    
  ],
  exports:[RouterModule],
  providers: [AuthService,
              AuthGuard,
              AlertService,loginRedirectGuard
              // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
              // fakeBackendProvider,
            ],
            bootstrap: [AppComponent]
})
export class AppModule { }
