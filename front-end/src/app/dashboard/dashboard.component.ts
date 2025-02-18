import { AfterViewInit, Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globalconstants } from '../global-constants';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  responseMessage: any;
  data: any;
  ngAfterViewInit() { }
  constructor(private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService) {

    this.ngxService.start();
    this.dashboardData();
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.data = response;
      }, error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        // this.snackbarService.openSnackBar(this.responseMessage,Globalconstants.error);
      }
    }
    )
  }

}
