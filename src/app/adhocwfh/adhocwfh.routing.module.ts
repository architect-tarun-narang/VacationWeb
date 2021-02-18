import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdhocWFHComponent } from './adhocwfh.component';

export const routes: Routes = [
    {
        path : '',
        component: AdhocWFHComponent
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []

})
export class AdhocWFHRoutingModule{}