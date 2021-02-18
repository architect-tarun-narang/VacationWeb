import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../core/core.service';
import { IEmployeeGraphProfile } from '../shared/interfaces/employee.profile.interface';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: IEmployeeGraphProfile;

  constructor(private http: HttpClient, private coreService: CoreService) { }
  ngOnInit() {
    this.profile = this.coreService.profile;
  }

}
