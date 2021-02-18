import { IEmployeeDetails } from './employeeDetails.interface';
import { IEmployeeTraining } from './employeetraining.interface';
import { IEmployeeVacation } from './employeeVacation.interface';
import { IEmployeeWFH } from './employeeWFH.interface';

export class IEmployee {
    employeeAllDetails: IEmployeeDetails;
    employeeAllDetailsTraining: IEmployeeTraining[];
    employeeAllDetailsVacation: IEmployeeVacation[];
    employeeAllDetailsWFH: IEmployeeWFH[];
}