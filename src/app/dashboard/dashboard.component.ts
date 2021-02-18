import { OnInit, Component } from '@angular/core';
import { CoreService } from '../core/core.service';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { IEmployeeVacation } from '../shared/interfaces/employeeVacation.interface';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { Subscription } from 'rxjs';
import { MessageService } from '../shared/services/MessageService';
import { EmployeeHelper } from '../shared/functions/employees.helper';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
    title:string = 'DashBoard !!!';
    employeeAllDetails: IEmployee;
    employeeTrainingCount: number;
    employeeVacationCount: number;
    employeeWFHAdhocCount: number;
    employeeLeaveCount: number;
    employeeTravelCount: number;
    wmployeeWFHDay: string;
    errorMessage: any;
    employeeCode: string;
    firstName:  string;
    lastName: string;
    vacationTypeId: number;
    firstDay: string;
    lastDay: string;
    minDate = new Date();
    maxDate = new Date(new Date().setDate(60));
    messages: string[];
    subscription: Subscription;
    dateFrom: string = null;
    dateTo: string = null;

    constructor(private messageService: MessageService, private coreService: CoreService){
      this.employeeAllDetails = null;
      this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message) {

          this.dateFrom = message[0];
          this.dateTo = message[1];         
          this.getAllEmployeesById(this.coreService.employeeDetails.id,message[0],message[1]);

      } else {
          // clear messages when empty message received
          this.messages = [];
      }
    });
    }

    ngOnInit(){
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
  
    getCounts(employeeDetails: IEmployee)
    {

      if(this.employeeAllDetails)
      {
        let vacationMap = new Map();

        //this.employeeCode =  +key;
        this.employeeTrainingCount = +employeeDetails.employeeAllDetailsTraining.length;
        this.employeeVacationCount = +employeeDetails.employeeAllDetailsVacation.length;          
        this.employeeWFHAdhocCount = +employeeDetails.employeeAllDetailsWFH.length;
          if(this.employeeVacationCount >0)
          {
            let list: string[] = []; 
            let count = 1; 
            let vacations: IEmployeeVacation[] = employeeDetails.employeeAllDetailsVacation;
              for(let vacation of vacations)
              {
                 let vacationType = vacation.type;
                 if(vacationMap.has(vacationType)){
                  count = +vacationMap.get(vacationType); 
                  vacationMap.set(vacationType,count +1);
                 }else{
                   count = 1;
                  vacationMap.set(vacationType,count);
                 }                  
              }
          }
          if(vacationMap.has(ConstantsMaster.dashboardConstants.LEAVE))
          {
            this.employeeLeaveCount = vacationMap.get(ConstantsMaster.dashboardConstants.LEAVE)
          }
          if(vacationMap.has(ConstantsMaster.dashboardConstants.TRAVEL))
          {
            this.employeeTravelCount = vacationMap.get(ConstantsMaster.dashboardConstants.TRAVEL)
          }
          if(vacationMap.has(ConstantsMaster.dashboardConstants.WFHADHOC))
          {
            this.employeeWFHAdhocCount = vacationMap.get(ConstantsMaster.dashboardConstants.WFHADHOC)
          }
      }
      else{
        console.log("Employee Map is Null");
      }
    }

    calculateDaysDiff(dateTo, dateFrom){
      let _dateTo = new Date(dateTo);  
      let _dateFrom = new Date(dateFrom);
      let daysDiff =  Math.floor((Date.UTC(_dateTo.getFullYear(), _dateTo.getMonth(), _dateTo.getDate())
       - Date.UTC(_dateFrom.getFullYear(), _dateFrom.getMonth(), _dateFrom.getDate()) ) /(1000 * 60 * 60 * 24));
     
       return daysDiff+1;
    }
            
}