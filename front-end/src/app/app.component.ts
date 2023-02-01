import { Component,OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  sideBarOpen = true;
  constructor (private ngxService: NgxUiLoaderService){

  }
  ngOnInit(): void { 
    this.ngxService.start();
    
    setTimeout(() => {
      this.ngxService.stop()
    }, 2000);
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
