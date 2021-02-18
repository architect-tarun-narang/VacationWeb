import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WFHDaysComponent } from './wfhdays.component';

export const routes: Routes = [
    {
        path : '',
        component: WFHDaysComponent
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []

})
export class WFHDaysRoutingModule{}