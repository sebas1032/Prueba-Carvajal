import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { VuelosProgramarComponent } from './vuelos-programar/vuelos-programar.component';
import { VuelosEditarComponent } from './vuelos-editar/vuelos-editar.component';
import { FooterComponent } from './footer/footer.component';
import { Error500Component } from './error500/error500.component';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    VuelosComponent,
    VuelosProgramarComponent,
    VuelosEditarComponent,
    FooterComponent,
    Error500Component,


  
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,   

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'vuelos', component: VuelosComponent },
      { path: 'home', component: HomeComponent },
      { path: 'programar', component: VuelosProgramarComponent },
      { path: 'editar/:vuelosId', component: VuelosEditarComponent },
      { path: 'error500', component: Error500Component },
     
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
