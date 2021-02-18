import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IAppSettings } from '../shared/interfaces/appSettings.interface';
import { environment } from '../../environments/environment';
import { ConstantsMaster } from '../shared/constants/constantsMaster';
import { IEmployee } from '../shared/interfaces/employee.interface';
import { Observable, throwError } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { IEmployeeTraining } from '../shared/interfaces/employeetraining.interface';
import { TrainingDTO } from '../shared/Models/TrainingDTO';

@Injectable({
    providedIn: 'root'
})
export class TrainingService{
    public appSettings: IAppSettings;

    constructor(private http: HttpClient){
        this.appSettings = environment.settings;
    }

      getEmployeeTrainings(code: string, vacationTypeId: number, leaveFrom: string, leaveTo: string): Observable<TrainingDTO[]> {
        //12/23/2020
        let employeeCode = null;        
        let dateFrom = null;
        let dateTo = null;

        if(code!=null)
        {
          employeeCode = code;
        }
        if (leaveFrom!=null)
        {
          dateFrom = new Date(leaveFrom).toISOString(); // .toUTCString();
        }
        if(leaveTo!=null)
        {
          dateTo = new Date(leaveTo).toISOString(); //.toUTCString();
        }        
      let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.employeeTrainingsDetails}/${employeeCode}/${vacationTypeId}/${dateFrom}/${dateTo}`;         
      return this.http.get<TrainingDTO[]>(url)
        .pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );        
      }

      addEmployeeTraining(trainingDTO: TrainingDTO): Observable<TrainingDTO> {
        //userPreferences.employeeCode = this.loggedInUser.employeeCode;
        debugger
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.addEmployeeTraining}`;    
        return this.http.post<TrainingDTO>(
          url, trainingDTO)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
    
      deleteEmployeeTraining(id: number): Observable<any> {
        //userPreferences.employeeCode = this.loggedInUser.employeeCode;
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.deleteEmployeeTraining}/${id}`;    
        return this.http.delete<any>(
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