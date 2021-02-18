import { OnInit, Component, ViewChild } from '@angular/core';
import { CoreService } from '../core/core.service';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { IEmployeeWFHDays } from '../shared/interfaces/employeeWFHDays.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { WFHDaysDTO } from '../shared/Models/WFHDaysDTO';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { VacationErrorStateMatcher } from '../shared/ErrorHandler/VacationErrorStateMatcher';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../shared/services/MessageService';
import { EmployeeHelper } from '../shared/functions/employees.helper';


@Component({
  selector: 'app-wfhdays',
  templateUrl: './wfhdays.component.html',
  styleUrls: ['./wfhdays.component.scss']
})

export class WFHDaysComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();



  wfhControl = new FormControl('', Validators.required);

  employeeAllDetails: IEmployee;
  WFHDays: IEmployeeWFHDays;

  errorMessage: any;
  employeeCode: string;
  firstName: string;
  lastName: string;
  vacationTypeId: number;
  counter: number;

  public wfhDaysForm = new FormGroup({
    frmDaysId: new FormControl('')
  });

  public matcher = new VacationErrorStateMatcher();
  messages: any[] = [];
  subscription: Subscription;
  constructor(private messageService: MessageService, private coreService: CoreService, private router: Router) {
    this.counter = 0;
    this.employeeAllDetails = null;
    this.subscription = this.messageService.onMessage().subscribe(message => {
      debugger
      if (message) {
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }
  firstDay: string
  lastDay: string
  ngOnInit() {
    var emp = new EmployeeHelper();
    emp.getFirstLastYearsDate();
    this.firstDay = emp.firstDay;
    this.lastDay = emp.lastDay;
    this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
    this.getWFHDays();
  }

  
  getAllEmployeesById(empId: string, dateFrom: string, dateTo: string) {
    this.coreService.getAllEmployeesById(empId, dateFrom, dateTo).subscribe({
      next: employees => {
        this.employeeAllDetails = employees;
        this.getEmployeeDetails(this.employeeAllDetails);
      },
      error: err => this.errorMessage = err
    });
  }

  getWFHDays() {
    this.coreService.getWFHDays().subscribe({
      next: wfhDays => {
        this.WFHDays = wfhDays;
        debugger
      },
      error: err => this.errorMessage = err
    });
  }

  getEmployeeDetails(employeeDetails: IEmployee): void {
    this.employeeCode = employeeDetails.employeeAllDetails.id;
    this.firstName = employeeDetails.employeeAllDetails.firstName;
    this.lastName = employeeDetails.employeeAllDetails.lastName;
    this.vacationTypeId = ConstantsMaster.WFHPERMANENT_VACATION_TYPE_ID;
  }

  selectedWFHID: number;
  onWFHSelection(selectedWFHID)
  {
    this.selectedWFHID =  selectedWFHID;
   }

  addWFHDays(): void {
    let wfhDaysDTO = new WFHDaysDTO();
    wfhDaysDTO.EmployeeId = this.employeeCode;
    wfhDaysDTO.VacationTypeId = ConstantsMaster.WFHPERMANENT_VACATION_TYPE_ID;
    //wfhDaysDTO.WFHDaysId = this.wfhDaysForm.get("frmDaysId").value;
    wfhDaysDTO.WFHDaysId = this.selectedWFHID; 
    this.coreService.addWFHDays(wfhDaysDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
          this.resetValues();
        },
        (error) => {
          this.errorMessage.showError('Error while adding WFH Days');
        }
      );
  }


  deleteWFHDays(WFHDaysId: number) : void {
    this.coreService.deleteWFHDays(this.employeeCode,this.vacationTypeId,WFHDaysId) 
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
           this.getAllEmployeesById(this.coreService.employeeDetails.id,this.firstDay,this.lastDay);
         },
        (error) => {
          this.errorMessage.showError('Error while deleting WFH Days');
        }
      );
  }

  resetValues() {
    this.wfhDaysForm.setValue({ frmFromDaysId: '' });
  }

}