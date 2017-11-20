import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {ListPage} from "../list/list";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: boolean;
  constructor(private navCtrl: NavController, private auth: AuthServiceProvider) {
    this.loading = false;
  }
  status: any;
  user = {};
  logForm() {
    this.loading = true;
    status = "trying to login";
    console.log(this.user);
    this.auth.login(this.user['username'], this.user['password'])
      .subscribe(
        data => {
          this.loading = false;
          localStorage.setItem('token', data['access_token']);
          console.log(JSON.stringify(localStorage));
          this.auth.setToken();
          this.navCtrl.push(ListPage);
        },
        error2 => {
            console.log(error2);
            this.loading = false;
            this.status = "Mot de passe incorrect"}
      );
  }
}
