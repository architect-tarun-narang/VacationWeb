import { OnInit, Component, ViewChild } from '@angular/core';
import { CoreService } from '../core/core.service';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { VacationDTO } from '../shared/Models/VacationDTO';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { VacationErrorStateMatcher } from '../shared/ErrorHandler/VacationErrorStateMatcher';
import { MessageService } from '../shared/services/MessageService';
import { EmployeeHelper } from '../shared/functions/employees.helper';


@Component({
    selector: 'app-travel',
    templateUrl: './travel.component.html',
    styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit{
  private destroy$: Subject<boolean> = new Subject<boolean>();

    employeeAllDetails: IEmployee;
    errorMessage: any;
    employeeCode: string;
    firstName:  string;
    lastName: string;
    vacationTypeId: number;
    counter :number;
    minDate = new Date();
    maxDate = new Date(new Date().setDate(60));
    messages: string[];
    subscription: Subscription;
    dateFrom: string = null;
    dateTo: string = null;
    firstDay: string;
    lastDay: string;

    public vacationForm = new FormGroup({
      frmFromDate: new FormControl(''),
      frmToDate: new FormControl(''),
      frmRemarks: new FormControl('',[Validators.required,Validators.maxLength(50)])
    });

    public matcher = new VacationErrorStateMatcher();


    constructor(private messageService: MessageService, private coreService: CoreService){
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

    getEmployeeDetails(employeeData: IEmployee):void{
        if(employeeData)
        {
          this.employeeCode = employeeData.employeeAllDetails.id;
          this.firstName = employeeData.employeeAllDetails.firstName;
          this.lastName = employeeData.employeeAllDetails.lastName;
        }
        this.vacationTypeId = ConstantsMaster.TRAVEL_VACATION_TYPE_ID;
    }

    addLeave():void{      
      let vacationDTO = new VacationDTO();
      vacationDTO.EmployeeId = this.employeeCode;
      vacationDTO.VacationTypeId = ConstantsMaster.TRAVEL_VACATION_TYPE_ID;
      vacationDTO.DateFrom = this.vacationForm.get("frmFromDate").value;
      vacationDTO.DateTo = this.vacationForm.get("frmToDate").value;
      vacationDTO.Remarks = this.vacationForm.get("frmRemarks").value;
      this.resetValues();
         this.coreService.addEmployeeLeave(vacationDTO)
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           (data) => {
            this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
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
      this.vacationForm.setValue({frmFromDate:'',frmToDate:'',frmRemarks: ''});
    }

    getNextCounter(): number{      
       this.counter = this.counter +1;
       console.log("this.counter"+this.counter);
       return this.counter;
    }
    calculateDaysDiff(dateTo, dateFrom){
        let _dateTo = new Date(dateTo);  
        let _dateFrom = new Date(dateFrom);
        let daysDiff =  Math.floor((Date.UTC(_dateTo.getFullYear(), _dateTo.getMonth(), _dateTo.getDate())
         - Date.UTC(_dateFrom.getFullYear(), _dateFrom.getMonth(), _dateFrom.getDate()) ) /(1000 * 60 * 60 * 24));
       
         return daysDiff+1;
      }
}