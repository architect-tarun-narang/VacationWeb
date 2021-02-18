import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacationComponent } from './vacation.component';

export const routes: Routes = [
    {
        path : '',
        component: VacationComponent
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []

})
export class VacationRoutingModule{}