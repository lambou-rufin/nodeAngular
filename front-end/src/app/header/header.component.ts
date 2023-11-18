import { Component, EventEmitter, OnInit, Output, HostBinding } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../component/change-password/change-password.component';
import { ConfirmationComponent } from '../component/confirmation/confirmation.component';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SampleDialogComponent } from '../component/sample-dialog/sample-dialog.component';
import { UserService } from '../services/user.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   data: any;
  role: any;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  users!: any[];
  title = 'Angular material dark mode';
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  constructor(private router: Router,
    private dialog: MatDialog,
     private authService: AuthService,
     private userService: UserService,
      private overlay: OverlayContainer) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });

    this.userService.getCurrentUser(this.data)
    .subscribe({
      next: (user) => {
        console.log('Utilisateur courant :', user);
        console.log(this.users);
        // Traitez les données de l'utilisateur comme vous le souhaitez
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur courant :', error);
      }
      
    }); 
  }
   
  showDialog(): void {
    this.dialog.open(SampleDialogComponent,
      {
        width: '500px'
      });
  }


  SideNavToggled() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.data = {
      message: ' se deconnecter'
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


