import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';

export const routes: Routes = [
    {
        path : '',
        component: TrainingComponent
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []

})
export class TrainingRoutingModule{}