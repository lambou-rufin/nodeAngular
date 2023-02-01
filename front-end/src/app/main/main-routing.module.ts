import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { HomeComponent } from '../home/home.component';
import { SharedModule } from '../shared.module';

export const mainRoutes: Routes = [
  { path: '', redirectTo: 'home', 'pathMatch': 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule]
})
export class MainRoutingModule { }
