import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {Post} from '../../Classes/Post';
import {ListPage} from "../list/list";

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
  status: any;
  loading: boolean;
  buttonName: string;
  postCreated: boolean;
  post: Post;
  newPost: Post;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private psp: PostServiceProvider) {
    this.loading = false;
    this.postCreated = false;
    this.post = new Post(1, '', '');
    this.buttonName = "Ajout du Post";
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

  goToList() {
    this.navCtrl.push(ListPage);
  }

  addPostForm(): void {
    this.postCreated = false;
    this.loading = true;
    console.log(this.post);
    this.psp.addPosts(this.post)
      .subscribe(
        data => {
          this.postCreated = true;
          this.newPost = data;
          console.log(data);
          this.loading = false;
        },
        error2 => {
          console.log(error2);
          this.loading = false;

        }
      );
  }

}
