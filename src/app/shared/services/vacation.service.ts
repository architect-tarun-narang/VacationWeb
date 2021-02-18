import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppSettings } from '../interfaces/appSettings.interface';
import { environment } from 'src/environments/environment';
import { ConstantsMaster } from '../../shared/constants/constantsMaster';
import { IEmployeeVacation } from '../interfaces/employeeVacation.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VacationService{
    public appSettings: IAppSettings;
    constructor(private http: HttpClient){
        this.appSettings = environment.settings; 
    }
    
    addEmployeeLeaves(employeeVacationDTO: IEmployeeVacation):Observable<IEmployeeVacation>{
        
        let url = `${this.appSettings.applicationBaseUrl}/${ConstantsMaster.apiEndPoints.lookup.addEmployeeLeaves}`;
        return this.http.post<IEmployeeVacation>(url,employeeVacationDTO)
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