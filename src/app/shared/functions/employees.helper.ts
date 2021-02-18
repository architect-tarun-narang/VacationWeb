import { IEmployee } from '../interfaces/employee.interface';
import { IEmployeeDataDetails } from '../interfaces/employeeDataDetails.interface';
import { IEmployeeViewDetails } from '../interfaces/employeeViewDetails.interface';
import { ConstantsMaster } from '../constants/constantsMaster';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmployeeHelper{

    employeeDataDetails: IEmployeeDataDetails
    firstDay: string
    lastDay: string
    public getEmployeeSpecificDetails(employeesMap: Map<string, IEmployee[]>):IEmployeeDataDetails
    {
        debugger;
      if(employeesMap!=null || undefined)
      {
        let vacationMap = new Map<string,number>();
        let countLeave = 0;
        let countTravel = 0;
        let countWFHAdhoc = 0;
          for(let key in employeesMap)
          {
            let empCode = key;
             let value =  employeesMap[key];
              this.employeeDataDetails.employeeTrainingCount = value.employeeTraining.length;
              if(value.employeeTraining.length > 0)
              {
                for(let training of value.employeeTraining)
                {
                  let trainingView =  new IEmployeeViewDetails();
                  trainingView.empCode = empCode;
                  trainingView.vacationType = "Training"; 
                  trainingView.employeeName = value.firstName +" "+value.lastName;
                  trainingView.trainingName = training.training[0].name;
                  trainingView.strDateFrom = training.strDateFrom;
                  trainingView.strDateTo = training.strDateTo;
                  trainingView.durationDays = this.calculateDaysDiff(training.strDateTo, training.strDateFrom);                    
                  trainingView.trainingHours = training.trainingHours;
                  trainingView.trainingRemarks = training.training[0].description;
                  this.employeeDataDetails.allTraining.push(trainingView);
                }
              }
              if(value.employeeWFH.length > 0)
              {
                for(let wfhFix of value.employeeWFH)
                {
                  let wfhPermanentView = new IEmployeeViewDetails();
                  wfhPermanentView.empCode = empCode; 
                  wfhPermanentView.vacationType = "WFHFixedDay"; 
                  wfhPermanentView.employeeName = value.firstName +" "+value.lastName;
                  wfhPermanentView.wfhFixedDay = wfhFix.wfhDays[0].days; 
                  this.employeeDataDetails.allWFHDays.push(wfhPermanentView);
                }
             }   
             if(value.employeeVacation.length > 0)
             {
                for(let vacation of value.employeeVacation)
                {
                  let vacationType = vacation.vacationType[0].type;
                  if( vacationType == ConstantsMaster.dashboardConstants.LEAVE)
                  {
                    countLeave = countLeave +1;
                    vacationMap.set(ConstantsMaster.dashboardConstants.LEAVE,countLeave);
                    let leaveView =  new IEmployeeViewDetails();
                    leaveView.empCode = empCode; 
                    leaveView.vacationType = vacationType; 
                    leaveView.employeeName = value.firstName +" "+value.lastName;
                    leaveView.strDateFrom = vacation.strDateFrom;
                    leaveView.strDateTo = vacation.strDateTo;
                    leaveView.durationDays = this.calculateDaysDiff(vacation.strDateTo, vacation.strDateFrom);                    
                    leaveView.vacationRemarks = vacation.remarks;
                    this.employeeDataDetails.allLeave.push(leaveView);
                  }else if( vacationType == ConstantsMaster.dashboardConstants.TRAVEL)
                  {
                    countTravel = countTravel +1;
                    vacationMap.set(ConstantsMaster.dashboardConstants.TRAVEL,countTravel);
                    let travelView =  new IEmployeeViewDetails();
                    travelView.empCode = empCode; 
                    travelView.vacationType = vacationType; 
                    travelView.employeeName = value.firstName +" "+value.lastName;
                    travelView.strDateFrom = vacation.strDateFrom;
                    travelView.strDateTo = vacation.strDateTo;
                    travelView.durationDays = this.calculateDaysDiff(vacation.strDateTo, vacation.strDateFrom);                    
                    travelView.vacationRemarks = vacation.remarks;
                    this.employeeDataDetails.allTravel.push(travelView);

                  }else if( vacationType == ConstantsMaster.dashboardConstants.WFHADHOC)
                  {
                    countWFHAdhoc = countWFHAdhoc +1;
                    vacationMap.set(ConstantsMaster.dashboardConstants.WFHADHOC,countWFHAdhoc);

                    let wfhAdhocView =  new IEmployeeViewDetails();
                    wfhAdhocView.empCode = empCode; 
                    wfhAdhocView.vacationType = vacationType; 
                    wfhAdhocView.employeeName = value.firstName +" "+value.lastName;
                    wfhAdhocView.strDateFrom = vacation.strDateFrom;
                    wfhAdhocView.strDateTo = vacation.strDateTo;
                    wfhAdhocView.durationDays = this.calculateDaysDiff(vacation.strDateTo, vacation.strDateFrom);                    
                    wfhAdhocView.vacationRemarks = vacation.remarks;
                    this.employeeDataDetails.allWFHAdhoc.push(wfhAdhocView);
                  }                    
                }
             }
                         
          }
          if(vacationMap.has(ConstantsMaster.dashboardConstants.LEAVE))
          {
            this.employeeDataDetails.employeeLeaveCount = vacationMap.get(ConstantsMaster.dashboardConstants.LEAVE)
          }
          if(vacationMap.has(ConstantsMaster.dashboardConstants.TRAVEL))
          {
            this.employeeDataDetails.employeeTravelCount = vacationMap.get(ConstantsMaster.dashboardConstants.TRAVEL)
          }
          if(vacationMap.has(ConstantsMaster.dashboardConstants.WFHADHOC))
          {
            this.employeeDataDetails.employeeWFHAdhocCount = vacationMap.get(ConstantsMaster.dashboardConstants.WFHADHOC)
          }
          return this.employeeDataDetails;
      }
    }
 
    calculateDaysDiff(dateTo, dateFrom)
    {
      let _dateTo = new Date(dateTo);  
      let _dateFrom = new Date(dateFrom);
      let daysDiff =  Math.floor((Date.UTC(_dateTo.getFullYear(), _dateTo.getMonth(), _dateTo.getDate())
       - Date.UTC(_dateFrom.getFullYear(), _dateFrom.getMonth(), _dateFrom.getDate()) ) /(1000 * 60 * 60 * 24));       
       return daysDiff+1;
    }    

    getMonthDate() { 
      var date = new Date(); 
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 
      this.firstDay=`${firstDay.getMonth() + 1}/${firstDay.getDate()}/${firstDay.getFullYear()}`
      let lastDay =  new Date(date.getFullYear(), date.getMonth() + 1, 0); 
      this.lastDay=`${lastDay.getMonth() + 1}/${lastDay.getDate()}/${lastDay.getFullYear()}`
    }

    getFirstLastYearsDate() { 
      var date = new Date(); 
      let firstDay = new Date(date.getFullYear(), 0, 1); 
      this.firstDay=`${firstDay.getMonth() + 1}/${firstDay.getDate()}/${firstDay.getFullYear()}`
      let lastDay =  new Date(date.getFullYear(), 12, 0); 
      this.lastDay=`${lastDay.getMonth() + 1}/${lastDay.getDate()}/${lastDay.getFullYear()}`
    }

    convertDateToString(dateToConvert:Date):string { 
      let convertedDate=`${dateToConvert.getMonth()}/${dateToConvert.getDate()}/${dateToConvert.getFullYear()}`
      return convertedDate;
    }

}