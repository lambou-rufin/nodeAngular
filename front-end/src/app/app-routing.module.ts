import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    loadChildren: () =>
      import('src/app/login/login.module').then((m) => m.LoginModule), //this is the loading
    //  canActivate:[RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },
  {
    path: 'dashboard',
    component: MainComponent,
    loadChildren: () =>
      import('src/app/main/main.module').then((m) => m.MainModule), //this is the loading
    // canActivate:[AuthGuardGuard],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
