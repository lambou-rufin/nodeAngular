import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globalconstants } from 'src/app/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    // private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(Globalconstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(Globalconstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(Globalconstants.contactNumberRegex)]],
      password: [null, [Validators.required]],
    })
  }
  handleSubmit() {
    // this.ngxService.start();
    let formData = this.signupForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
      this.userService.signup(data).subscribe({next:(response: any) => {
      // this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      // this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/']);
    },error: (error) => {
      // this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = Globalconstants.genericError;
      }
      // this.snackbarService.openSnackBar(this.responseMessage,Globalconstants.error);
    }}
    )
  }
}
