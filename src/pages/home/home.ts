import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, public app: App) {

  }

  isAuthenticated() {
    return this.auth.authenticated();
  }

  loginUser() {
    this.navCtrl.push(LoginPage);
  }

  logoutUser() {
    this.auth.logout();
  }


}
