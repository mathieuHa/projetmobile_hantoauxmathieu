import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Post} from '../../Classes/Post';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {PostwId} from '../../Classes/PostwId';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoginPage} from '../login/login';

/**
 * Generated class for the EditpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editpost',
  templateUrl: 'editpost.html',
})
export class EditpostPage {
  post: Post;
  postwId: PostwId;
  loading: boolean;
  buttonName: string;
  postUpdated: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private psp: PostServiceProvider, private auth: AuthServiceProvider) {
    this.loading = true;
    this.postUpdated = false;
    this.buttonName = "Modification du Post";
    const id = navParams.get('id');
    console.log(id);
    this.post = new Post(id, '', '');
    this.getPost(id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpostPage');
  }

  ionViewCanEnter() {
    if (!this.auth.authenticated()){
      console.log("Not autenticated");
      setTimeout(() =>{
        this.navCtrl.push(LoginPage).catch((res=>console.log(res)));
      }, 600);
    }
    return this.auth.authenticated();
  }

  private getPost(id) {
    console.log("Looking for the Post");
    this.psp.getPost(id)
      .subscribe(data => {
        console.log(data);
        this.post = data;
        this.loading=false;
        console.log("got it");
      },err => {
        console.log(err)
      })
  }

  editPostForm() {
    this.postUpdated = false;
    this.loading= true;
    console.log("editing the post");
    this.postwId = new PostwId(this.post.titre, this.post.texte)
    this.psp.editPost(this.postwId, this.post.id)
      .subscribe(data => {
        console.log(data);
        this.post = data;
        this.loading=false;
        this.postUpdated = true;
        console.log("got it");
      },err => {
        console.log(err)
      })
  }

}
