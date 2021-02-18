//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { EmployeesDashboardComponent } from './employees.dashboard.component';
import { EmployeesDashboardRoutingModule } from './employees.dahboard.routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    EmployeesDashboardComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //HttpModule,
    //CoreModule,
    EmployeesDashboardRoutingModule
  ],
  providers: [],
  exports:[
  ]
})
export class EmployeesDashboardModule { }