import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainComponent } from './main/main.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { LoginComponent } from './login/login.component';


const NgxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Loading....",
  textColor: "#ffffff",
  textPosition: "center-center",
  pbColor: "red",
  bgsColor: "red",
  fgsColor:"red",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}

@NgModule({
  declarations: [    
    MainComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig)

  ],
  exports: [
    RouterModule,
    MainComponent,
    LoginComponent,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class SharedModule { }
