import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { TrainingRoutingModule } from './training.routing.module';
import { TrainingComponent } from './training.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [TrainingComponent],
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        //CoreModule,
        TrainingRoutingModule       
    ],        
    exports: [],
    providers: []
})
export class TrainingModule{}