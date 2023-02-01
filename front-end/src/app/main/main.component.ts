import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'front-end';
  sideBarOpen = true;
  
  ngOnInit(): void { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
