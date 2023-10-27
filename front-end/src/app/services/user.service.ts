import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
    return this.httpClient.post(this.url + 'user/signup', data, {
      headers: new HttpHeaders().set('Cotent-Type', 'application/json'),
    });
  }
  forgotPassword(data: any) {
    return this.httpClient.post(this.url + 'user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  login(data: any) {
    return this.httpClient.post(this.url + 'user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  checkToken() {
    return this.httpClient.get(this.url + 'user/checkToken');
  }
  changePassword(data: any) {
    return this.httpClient.post(this.url + 'user/changePassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  getCurrentUser(data: any): Observable<any> {
    return this.httpClient.get(this.url + 'user/getCurrentUser'); // Assurez-vous que l'URL correspond à l'URL de votre API
  }
  getUsers(data: any): Observable<any> {
    return this.httpClient.get(this.url + 'user/getUsers'); // Assurez-vous que l'URL correspond à l'URL de votre API
  }
  
}
