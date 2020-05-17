import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {

  items: any;
  loading: boolean = true;
  userId: string;
  displayName: string;
  organizationName: string;

  public vehicleStatusWithCountData = [];
  public vehicleAssignCountData = [];

  constructor(private dashboardService: DashboardService, private authService: AuthService, private appService: AppService){

  }
  public vehicleWithStatusCountSubscription : Subscription;
  public vehicleAssignCountSubscription : Subscription;
  ngOnInit() {
    
    this.loadVehicleWithStatusCount();
    this.loadVehicleAssignCount();
    this.loadDemographicData();
  }

  public loadVehicleWithStatusCount(){
    this.vehicleWithStatusCountSubscription = this.dashboardService.loadVehicleStatusByCount().subscribe((d)=>{
      this.vehicleStatusWithCountData = d["data"];

    },(error)=>{
      console.log(error);
    });
  }


  public loadVehicleAssignCount(){
    this.vehicleAssignCountSubscription = this.dashboardService.vehicleDataByAssign().subscribe((d)=>{
      this.vehicleAssignCountData = d["data"];
      
    },(error)=>{
      console.log(error);
    });
  }


  public loadDemographicData(){


    const token = this.authService.getToken();
    if(token) {
      const decodedToken = this.authService.decodeToken(token);
      console.log(decodedToken);
      this.userId = decodedToken.userId;
      // this.intializaMenuItems(decodedToken.userId);
  

        const promises = [];
        // Intialize all the 
        promises.push(this.appService.getDemographicsData(decodedToken.userId));
        promises.push(this.appService.getUserDetails(decodedToken.userId));
        promises.push(this.appService.getOrganizationDetails(decodedToken.userId));
        Promise.all(promises).then(([demographicsData, userDetails, organizationDetails]) => {
          if(userDetails.success) {
            const user = userDetails.user;
            this.organizationName = organizationDetails.organization ? organizationDetails.organization.organizationName : '';
            this.displayName = user ? `${user.firstName} ${user.lastName}` : 'User name';
            console.log(this.organizationName);
            this.appService.setLoggedInUser(user);
            this.appService.setDemographicsData(demographicsData.data);
            this.appService.setOrganizationDetails(organizationDetails.organization);
            console.log('Inside COns')
            this.loading = false;
          }
        })
     

  }
  }

}
