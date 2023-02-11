import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globalconstants } from 'src/app/global-constants';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LogginComponent>,
    private ngxService: NgxUiLoaderService,
    // private snackbarService: SnackbarService
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(Globalconstants.emailRegex)]],
      password: [null, [Validators.required]],
    })
  }
  handleSubmit() {
    // this.ngxService.start();
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe({
      next: (response: any) => {
        // this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        console.log(response);
        this.router.navigate(['dashboard']);
      }, error: (error) => {
        // this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        // this.snackbarService.openSnackBar(this.responseMessage,Globalconstants.error);
      }
    }
    )
  }
}