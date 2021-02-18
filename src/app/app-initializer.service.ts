import { Injectable } from '@angular/core';
import { CoreService } from './core/core.service';

@Injectable()
export class AppInitializerService {

  constructor(private coreService: CoreService) { }

  initializeGraphProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      //const configDeps: Promise<any>[] = [];
      const promise = this.coreService.getProfile().toPromise()
      .then(data => {
        Object.assign(this, data);
            this.coreService.loadEmployee(data.employeeId).toPromise()
          .then(data => {
            Object.assign(this, data);
            return data;
          })
          .then(() => {
            resolve("promise returns...");
          });
        return data;
      })
      return promise;
  });
}

  // initializeApp(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const promise = this.coreService.loadEmployee().toPromise()
  //     .then(data => {
  //       Object.assign(this, data);
  //       return data;
  //     })
  //     .then(() => {
  //       resolve("promise returns...");
  //     });
  //     return promise;
  // });
//}
}
