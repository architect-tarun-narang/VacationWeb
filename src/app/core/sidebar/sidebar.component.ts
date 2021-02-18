import { OnInit, Component } from '@angular/core';


declare const $: any;    
declare interface RouteInfo{
    path: string;
    title: string;
    icon: string;
    class: string;

}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'My Dashboard', icon: 'dashboard', class: ''},
    {path: '/employeesdashboard', title: 'Employees Dashboard', icon: 'dashboard', class: ''},
    {path: '/vacation', title: 'Vacation', icon: 'desktop_access_disabled', class: ''},
    {path: '/travel', title: 'Travel', icon: 'flight_takeoff', class: ''},
    {path: '/training', title: 'Training', icon: 'local_library', class: ''},
    {path: '/adhocwfh', title: 'Adhoc WFH', icon: 'home', class: ''},
    {path: '/wfhdays', title: 'WFH', icon: 'no_transfer', class: ''}
]; 

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
    menuItems: any[];

    constructor(){        
    }
    ngOnInit(){
        this.menuItems = ROUTES.filter(menuitems => menuitems);         
    }
}