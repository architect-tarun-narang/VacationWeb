import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { VacationRoutingModule } from './vacation.routing.module';
import { VacationComponent } from './vacation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [VacationComponent],
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,     
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        //CoreModule,
        VacationRoutingModule       
    ],        
    exports: [],
    providers: []
})
export class VacationModule{}