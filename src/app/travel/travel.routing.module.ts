import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelComponent } from './travel.component';

export const routes: Routes = [
    {
        path : '',
        component: TravelComponent
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []

})
export class TravelRoutingModule{}