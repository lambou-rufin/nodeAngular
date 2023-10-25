import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../component/change-password/change-password.component';
import { ConfirmationComponent } from '../component/confirmation/confirmation.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: any;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  user: string = 'Rufin';


  constructor(private router: Router,
    private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    
   }

  SideNavToggled() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = {
      message: 'logout'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }
  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ChangePasswordComponent, dialogConfig)
  }
}


