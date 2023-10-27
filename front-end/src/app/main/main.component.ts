import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { OverlayContainer } from '@angular/cdk/overlay';
import { SampleDialogComponent } from '../component/sample-dialog/sample-dialog.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'Angular material dark mode';

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  sideNavStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fas fa-spinner fa-house',
      url: '/dashboard/home',
      
    },
    {
      number: '1',
      name: 'Categorie',
      icon: 'fa fa-dashboard',
      url: '/dashboard/category',
    },
    {
      number: '1',
      name: 'Produit',
      icon: 'fa fa-dashboard',
      url: '/dashboard/produit',

    },
    {
      number: '1',
      name: 'User',
      icon: 'fa fa-user',
      url: '/dashboard/user',

    },
  ];
  constructor(private dialog: MatDialog, private overlay: OverlayContainer) { }
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  showDialog(): void {
    this.dialog.open(SampleDialogComponent,
      {
        width: '500px'
      });
  }
}
