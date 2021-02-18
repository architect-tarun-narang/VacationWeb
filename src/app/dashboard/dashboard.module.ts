//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dahboard.routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //CoreModule,
    DashboardRoutingModule
  ],
  providers: [],
  exports:[
  ]
})
export class DashboardModule { }