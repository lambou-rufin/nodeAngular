import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: any[];
  data: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(this.data).subscribe({
      next: (user) => {
        console.log('Utilisateur courant :', user);
        this.users = this.data;
        // Traitez les données de l'utilisateur comme vous le souhaitez
      },
      error: (error) => {
        console.error(
          "Erreur lors de la récupération de l'utilisateur courant :",
          error
        );
      },
    });
  }
}
