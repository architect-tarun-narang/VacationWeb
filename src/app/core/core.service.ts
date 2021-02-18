import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IAppSettings } from '../shared/interfaces/appSettings.interface';
import { environment } from 'src/environments/environment';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { ITrainingTypes } from '../shared/interfaces/trainingTypes.interface';
import { Observable, throwError } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { VacationDTO } from '../shared/Models/VacationDTO';
import { WFHDaysDTO } from '../shared/Models/WFHDaysDTO';
import { IEmployeeWFHDays } from '../shared/interfaces/employeeWFHDays.interface';
import { IEmployeeDetails } from '../shared/interfaces/employeeDetails.interface';
import { IEmployeeGraphProfile } from '../shared/interfaces/employee.profile.interface';
import { EmployeeHelper } from '../shared/functions/employees.helper';
@Injectable({
    providedIn: 'root'
})
export class CoreService{
    public appSettings: IAppSettings;

    constructor(private http: HttpClient){
        this.appSettings = environment.settings;
    }
    employeeDetails: IEmployeeDetails;    
    loadEmployee(employeeId:string): Observable<void> {
    let id = employeeId
      let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.employeeInformationById}/${employeeId}`;
      return this.http.get<IEmployeeDetails>(url)
      .pipe(
        map(result => {
          if (result) {
            this.employeeDetails = result;
          }
        }),
        catchError(this.handleError)
      );     

    }
  
    profile: IEmployeeGraphProfile;
    getProfile(): Observable<any> {
      debugger
      let url = `${ConstantsMaster.GRAPH_ENDPOINT}`;
      return this.http.get<IEmployeeGraphProfile>(url)
      .pipe(
        map(result => {
          if (result) {
            this.profile = result;
            console.log("Result##############="+result)
            debugger
            return result;
          }
        }),
        catchError(this.handleError)
      );     

    }
  
      getAllEmployeesById(code: string, leaveFrom: string, leaveTo: string): Observable<IEmployee> {
        let dateTo = null;
        let dateFrom = new Date(leaveFrom).toISOString();
        if(leaveTo === undefined){
           dateTo = new Date().toISOString();
        }else{
           dateTo = new Date(leaveTo).toISOString();
        }
       let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.employeeLeavesDetailsById}/${code}/${dateFrom}/${dateTo}`;         
      return this.http.get<IEmployee>(url)
        .pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );        
      }

      getAllEmployees(leaveFrom:string, leaveTo: string): Observable<IEmployee> {
        let dateFrom = null;
        let dateTo = null;
        //let dateFrom = new Date(leaveFrom);
        var emp = new EmployeeHelper();
        emp.getFirstLastYearsDate();
        
        if(leaveFrom === undefined){
          dateFrom = new Date(emp.firstDay).toUTCString();
       }else{
          dateFrom = new Date(leaveFrom).toUTCString();
       }
        if(leaveTo === undefined){
           dateTo = new Date(emp.lastDay).toUTCString();
        }else{
           dateTo = new Date(leaveTo).toUTCString();
        }
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.employeeLeavesDetails}/${dateFrom}/${dateTo}`;
        debugger
        return this.http.get<IEmployee>(url)
        .pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );        
      }

      getWFHDays(): Observable<IEmployeeWFHDays> {
      let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.employeeWFHDays}`;
      return this.http.get<IEmployeeWFHDays>(url)
        .pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );        
      }

      getTrainingTypes(): Observable<ITrainingTypes> {
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.trainingTypes}`;
        return this.http.get<ITrainingTypes>(url)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );        
        }
  
      addWFHDays(wfhDaysDTO: WFHDaysDTO): Observable<WFHDaysDTO> {
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.addEmployeeWFHDays}`;    
        return this.http.post<WFHDaysDTO>(
          url, wfhDaysDTO)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

      deleteWFHDays(employeeId:string,vacationTypeId:number,WFHDaysId:number): Observable<ArrayBuffer> {
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.deleteEmployeeWFHDays}/${employeeId}/${vacationTypeId}/${WFHDaysId}`;    
        return this.http.delete<ArrayBuffer>(
          url)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

      addEmployeeLeave(vacationDTO: VacationDTO): Observable<VacationDTO> {
        //userPreferences.employeeCode = this.loggedInUser.employeeCode;
        debugger
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.addEmployeeLeaves}`;    
        return this.http.post<VacationDTO>(
          url, vacationDTO)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
    
      deleteEmployeeLeave(id: string): Observable<ArrayBuffer> {
        //userPreferences.employeeCode = this.loggedInUser.employeeCode;
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.deleteEmployeeLeaves}/${id}`;    
        return this.http.delete<ArrayBuffer>(
          url)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

      private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
}