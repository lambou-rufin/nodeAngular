import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { mainRoutes } from './main-routing.module';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from '../manage/category/category.component';
import { ProductComponent } from '../manage/product/product.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(mainRoutes),

  ]
})
export class MainModule { }
