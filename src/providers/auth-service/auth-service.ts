import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private isLoggedIn = false;
  private token;

  constructor(private http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login(username, password) : Observable<any> {
    const body = {
      'username': username,
      'password': password,
      'grant_type': 'password',
      'client_id': '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
      'client_secret': '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k'
    };
    return this.http
      .post('http://api.hanotaux.fr/api/oauth/v2/token', body);
  }

  // Logout a user, destroy token and remove
  // every information related to a user
  logout() : void {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
    this.token = null;
  }

  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated() : boolean {
    if (!localStorage.getItem('token')){
      this.isLoggedIn = false;
      this.token = null;
    }
    return this.isLoggedIn;
  }

  getToken() : boolean {
    return this.token;
  }

  setToken() {
    this.token = localStorage.getItem('token');
    this.isLoggedIn = true;
  }
}
