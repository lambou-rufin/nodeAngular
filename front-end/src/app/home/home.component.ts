import { AfterViewInit, Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globalconstants } from '../global-constants';
import { HomeService } from '../services/home.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  ngAfterViewInit() {}
  constructor(
    private homeService: HomeService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {
    this.ngxService.start();
    this.dashboardData();
  }

  dashboardData() {
    this.homeService.getDetails().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.data = response;
      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,Globalconstants.error);
      },
    });
  }
}
