import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesDashboardComponent } from './employees.dashboard.component';


export const routes: Routes = [
  {
      path: '',
      component: EmployeesDashboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesDashboardRoutingModule { } 