import { OnInit, Component, Output,EventEmitter } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VacationErrorStateMatcher } from '../../shared/ErrorHandler/VacationErrorStateMatcher';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MessageService } from '../../shared/services/MessageService';
import { EmployeeHelper } from 'src/app/shared/functions/employees.helper';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

    filterFromDate: string;
    filterToDate: string;

    //@Output() dateFromEvent = new EventEmitter<string>();
    //@Output() dateToEvent = new EventEmitter<string>();

    public vacationForm = new FormGroup({
        frmFromDate: new FormControl(''),
        frmToDate: new FormControl('')
    });
    
    public matcher = new VacationErrorStateMatcher();  

    private listTitles: any[];
    location: Location;
    constructor(location: Location, private messageService: MessageService, private employeeHelper:EmployeeHelper) {
        this.location = location;            
      }
    ngOnInit(){     
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        //this.resetValues();       
    }    
    addFromDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        let inputType = type;
        this.filterFromDate = this.changeDateFormat(event.value);        
        //this.dateFromEvent.emit(this.filterFromDate);
    }

    addToDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        let inputType = type;
        this.filterToDate = this.changeDateFormat(event.value);
        if(this.filterToDate!=null){
            this.sendMessage();
        }
    }
    resetValues(){
        this.employeeHelper.getFirstLastYearsDate();
        let firstDayOfTheYear = this.employeeHelper.firstDay;
        let lastDayOfTheYear = this.employeeHelper.lastDay;
        this.vacationForm.setValue({frmFromDate:'',frmToDate:''});
        this.filterFromDate = firstDayOfTheYear; 
        this.filterToDate = lastDayOfTheYear;
        this.sendMessage();
      }
    changeDateFormat(date:Date): string{
        if(date!=null){
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        }
    } 
    sendMessage(): void {
        // send message to subscribers via observable subject
        let messageDates : string[] = [this.filterFromDate, this.filterToDate];
        this.messageService.sendMessage(messageDates);
    }
    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());    
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
        for(var item = 0; item < this.listTitles.length; item++){ 
            if(this.listTitles[item].path === titlee){            
                return this.listTitles[item].title;
            }
        }
        return 'My Dashboard';
      }
  
    
}