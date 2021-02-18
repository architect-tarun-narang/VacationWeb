import { OnInit, Component, ViewChild } from '@angular/core';
import { CoreService } from '../core/core.service';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingDTO } from '../shared/Models/TrainingDTO';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { VacationErrorStateMatcher } from '../shared/ErrorHandler/VacationErrorStateMatcher';
import { TrainingService } from './training.service';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { EmployeeHelper } from '../shared/functions/employees.helper';
import { MessageService } from '../shared/services/MessageService';
import { ITrainingTypes } from '../shared/interfaces/trainingTypes.interface';


@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit{
  private destroy$: Subject<boolean> = new Subject<boolean>();
    employeeAllDetails: IEmployee;
    trainingTypes: ITrainingTypes;
    errorMessage: any;
    employeeCode: string;
    firstName:  string;
    lastName: string;
    vacationTypeId: number;
    firstDay: string;
    lastDay: string;    
    subscription: Subscription;
    dateFrom: string = null;
    dateTo: string = null;
    messages: string[];

    minDate = new Date();
    maxDate = new Date(new Date().setDate(60));

    public trainingForm = new FormGroup({
      frmFromDate: new FormControl(''),
      frmToDate: new FormControl(''),
      frmTrainingId: new FormControl(''),
      frmTrainingHours: new FormControl('',[Validators.required]),
      frmRemarks: new FormControl('',[Validators.required,Validators.maxLength(50)])
    });

    trainingControl = new FormControl('', Validators.required);
    public wfhDaysForm = new FormGroup({
      frmDaysId: new FormControl('')
    });

    selectedTrainingID: number;
    onTrainingSelection(selectedTrainingID)
    {
      this.selectedTrainingID =  selectedTrainingID;
    }
    

    public matcher = new VacationErrorStateMatcher();

    constructor(private messageService: MessageService, private coreService: CoreService, private trainingService: TrainingService){
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
      this.getTrainingTypes();
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
     

     getTrainingTypes(){
      this.coreService.getTrainingTypes().subscribe({
        next: trainingTypes => {
          this.trainingTypes = trainingTypes;
        },
        error: err => this.errorMessage = err
      });         
     }


     getEmployeeDetails(employeeDetails: IEmployee):void{            
          this.employeeCode = employeeDetails.employeeAllDetails.id==null?"":employeeDetails.employeeAllDetails.id;
          this.firstName = employeeDetails.employeeAllDetails.firstName==null?"":employeeDetails.employeeAllDetails.firstName;
          this.lastName = employeeDetails.employeeAllDetails.lastName==null?"":employeeDetails.employeeAllDetails.lastName;
          this.vacationTypeId = ConstantsMaster.TRAINING_VACATION_TYPE_ID;          
    }
    addTraining():void{
      let trainingDTO = new TrainingDTO();
      trainingDTO.employeeId = this.employeeCode;
      trainingDTO.vacationTypeId = ConstantsMaster.TRAINING_VACATION_TYPE_ID;
      trainingDTO.dateFrom = this.trainingForm.get("frmFromDate").value;
      trainingDTO.dateTo = this.trainingForm.get("frmToDate").value;
      trainingDTO.remarks = this.trainingForm.get("frmRemarks").value;
      //trainingDTO.trainingId = this.trainingForm.get("frmTrainingId").value;
      trainingDTO.trainingId = this.selectedTrainingID;
      trainingDTO.trainingHours = +(this.trainingForm.get("frmTrainingHours").value); 
      debugger   
      this.trainingService.addEmployeeTraining(trainingDTO)
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           (data) => {
            this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
           },
           (error) => {
             this.errorMessage.showError('Error while adding Training');
           }
         );
         this.resetValues();     
    }

    deleteTraining(id: number):void{
         this.trainingService.deleteEmployeeTraining(id)
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           (data) => {
            this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
           },
           (error) => {
             this.errorMessage.showError('Error while deleting Employee Training');
           }
         );
    }

    resetValues(){
      this.trainingForm.setValue({frmFromDate:'',frmToDate:'',frmTrainingId: '', frmTrainingHours:'', frmRemarks: ''});
    }
    calculateDaysDiff(dateTo, dateFrom){
        let _dateTo = new Date(dateTo);  
        let _dateFrom = new Date(dateFrom);
        let daysDiff =  Math.floor((Date.UTC(_dateTo.getFullYear(), _dateTo.getMonth(), _dateTo.getDate())
         - Date.UTC(_dateFrom.getFullYear(), _dateFrom.getMonth(), _dateFrom.getDate()) ) /(1000 * 60 * 60 * 24));
       
         return daysDiff+1;
      }
}