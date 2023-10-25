import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  const token;
  //  const infoUser;
  constructor(private router: Router, private httpClient: HttpClient) { }
  url = environment.apiUrl;

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Récupérez le token stocké côté client
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }
//   function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// }

// function getUser() {
//   var token = localStorage.getItem('token');
//   var infoUser = parseJwt(token);
  

//  }
}