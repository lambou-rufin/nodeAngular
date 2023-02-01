import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../component/forgot-password/forgot-password.component';
import { LogginComponent } from '../component/loggin/loggin.component';
import { SignupComponent } from '../component/signup/signup.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe({
        next: (response: any) => {
          this.router.navigate(['/dashboard']);
        }, error: (error) => {
          console.log(error);
        }
      })
    }
  }
  signupAction() {
    const dialogRef = this.dialog.open(SignupComponent, { data: null, width: "500px" });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  loginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(LogginComponent, dialogConfig);
  }
  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }
}
