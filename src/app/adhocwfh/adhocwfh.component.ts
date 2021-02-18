import { OnInit, Component, ViewChild } from '@angular/core';
import { CoreService } from '../core/core.service';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { VacationDTO } from '../shared/Models/VacationDTO';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { VacationErrorStateMatcher } from '../shared/ErrorHandler/VacationErrorStateMatcher';
import { Router } from '@angular/router';
import { MessageService } from '../shared/services/MessageService';
import { Subscription } from 'rxjs';
import { EmployeeHelper } from '../shared/functions/employees.helper';

@Component({
    selector: 'app-adhocwfh',
    templateUrl: './adhocwfh.component.html',
    styleUrls: ['./adhocwfh.component.scss']
})
export class AdhocWFHComponent implements OnInit{
  private destroy$: Subject<boolean> = new Subject<boolean>();

  employeeAllDetails: IEmployee;
    errorMessage: any;
    employeeCode: string;
    firstName:  string;
    lastName: string;
    vacationTypeId: number;
    counter: number;
    firstDay: string;
    lastDay: string;
    minDate = new Date();
    maxDate = new Date(new Date().setDate(60));
    public matcher = new VacationErrorStateMatcher();
    messages: string[];
    subscription: Subscription;
    dateFrom: string = null;
    dateTo: string = null;

    public vacationForm = new FormGroup({
      frmFromDate: new FormControl(''),
      frmToDate: new FormControl(''),
      frmRemarks: new FormControl('',[Validators.required,Validators.maxLength(50)])
    });

    constructor(private messageService: MessageService, private coreService: CoreService, private router: Router){
      this.counter=0;
      this.employeeAllDetails = null;
      this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message) {

          this.dateFrom = message[0];
          this.dateTo = message[1];           
          this.getAllEmployeesById(this.coreService.employeeDetails.id,message[0],message[1]);
          //this.messages.push(message);
      } else {
          // clear messages when empty message received
          this.messages = [];
      }
    });
    }
    
    ngOnInit(){
      //this.getMonthDate();
      var emp = new EmployeeHelper();
      emp.getFirstLastYearsDate();
      this.firstDay = emp.firstDay;
      this.lastDay = emp.lastDay;
      this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
    }


    getAllEmployeesById(empId: string, dateFrom: string, dateTo: string){
      this.coreService.getAllEmployeesById(empId,dateFrom,dateTo).subscribe({
        next: employees => {
          this.employeeAllDetails = employees;
          this.getEmployeeDetails(this.employeeAllDetails);
        },
        error: err => this.errorMessage = err
      });         
    }
    

    getEmployeeDetails(employeeDetails: IEmployee):void{
          this.employeeCode = employeeDetails.employeeAllDetails.id;
          this.firstName = employeeDetails.employeeAllDetails.firstName;
          this.lastName = employeeDetails.employeeAllDetails.lastName;
          this.vacationTypeId = ConstantsMaster.WFHADHOC_VACATION_TYPE_ID;
      }
      
    addLeave(): void{
      let vacationDTO = new VacationDTO();
      vacationDTO.EmployeeId = this.employeeCode;
      vacationDTO.VacationTypeId = ConstantsMaster.WFHADHOC_VACATION_TYPE_ID;
      vacationDTO.DateFrom = this.vacationForm.get("frmFromDate").value;
      vacationDTO.DateTo = this.vacationForm.get("frmToDate").value;
      vacationDTO.Remarks = this.vacationForm.get("frmRemarks").value;
         this.coreService.addEmployeeLeave(vacationDTO)
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           (data) => {
            this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
            this.resetValues();
           },
           (error) => {
             this.errorMessage.showError('Error while adding Employee Leave');
           }
         );
    }

    deleteLeave(id: string):void{      
         this.coreService.deleteEmployeeLeave(id)
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           (data) => {
            this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
           },
           (error) => {
             this.errorMessage.showError('Error while deleting Employee Leave');
           }
         );
    }

    resetValues(){
      this.vacationForm.setValue({frmFromDate:'',frmToDate:'', frmRemarks:''});
    }
    getNextCounter(): number{      
       this.counter = this.counter +1;
       console.log("this.counter"+this.counter);
       return this.counter;
    }
    calculateDaysDiff(dateTo, dateFrom){
      if(dateTo!=null && dateFrom!=null){
        let _dateTo = new Date(dateTo);  
        let _dateFrom = new Date(dateFrom);
        let daysDiff =  Math.floor((Date.UTC(_dateTo.getFullYear(), _dateTo.getMonth(), _dateTo.getDate())
         - Date.UTC(_dateFrom.getFullYear(), _dateFrom.getMonth(), _dateFrom.getDate()) ) /(1000 * 60 * 60 * 24));       
         return daysDiff+1;
      }
    }
      getMonthDate() { 
        var date = new Date(); 
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 
        this.firstDay=`${firstDay.getMonth() + 1}/${firstDay.getDate()}/${firstDay.getFullYear()}`
        let lastDay =  new Date(date.getFullYear(), date.getMonth() + 1, 0); 
        this.lastDay=`${lastDay.getMonth() + 1}/${lastDay.getDate()}/${lastDay.getFullYear()}`
      }

    
}