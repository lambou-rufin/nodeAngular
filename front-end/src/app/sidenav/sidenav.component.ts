import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard/home',
    },
    {
      number: '2',
      name: 'Categorie',
      icon: 'category',
      url: '/dashboard/category',
    },
    {
      number: '2',
      name: 'Produit',
      icon: 'product',
      url: '/dashboard/produit',
    },
    {
      number: '3',
      name: 'Bill',
      icon: 'bill',
      url: '/dashboard/bill',
    },
  ];

  constructor() {}
  ngOnInit(): void {}
}
