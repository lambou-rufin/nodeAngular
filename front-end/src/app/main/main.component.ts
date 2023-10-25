import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'front-end';
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
  ];
}
