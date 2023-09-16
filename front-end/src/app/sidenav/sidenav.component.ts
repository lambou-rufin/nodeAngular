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
      icon: 'fas fa-spinner fa-house',
    },
    {
      number: '1',
      name: 'Categorie',
      icon: 'fa fa-dashboard',
    },
    {
      number: '1',
      name: 'Produit',
      icon: 'fa fa-dashboard',
    },
  ];

  constructor() {}
  ngOnInit(): void {}
}
