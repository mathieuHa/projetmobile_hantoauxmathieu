import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoginPage} from '../login/login';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {EditpostPage} from '../editpost/editpost';
import {Post} from '../../Classes/Post';
import {Comment} from '../../Classes/Comment';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  postList: Post[];
  post: Post;
  mycom: Comment;
  loading: boolean;
  waiting: boolean;
  buttonName: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private psp: PostServiceProvider) {
    //this.selectedItem = navParams.get('item');
    this.post = new Post(1, '', '');
    this.mycom = new Comment(1, '');
    console.log(this.post.toString());
    this.buttonName = "Ajout du Post";
    this.waiting = true;
    this.loading = false;
    this.getPosts();
  }
  editPost(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EditpostPage, {
      id
    });
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

  private getPosts() {
    this.psp.getPosts()
      .subscribe(data => {
        console.log(data);
        this.postList = data;
        console.log("PostList "+ this.postList.toString());
        this.waiting=false;
      },err => {
        console.log(err);
        this.waiting=false;
      })
  }

  deletePost(post){
    const index = this.postList.indexOf(post);

    if(index > -1){
      this.postList.splice(index, 1);
      this.psp.deletePost(post.id)
        .subscribe(data => {
          console.log(data);
        },err => {
          console.log(err);
        })
    }
  }

  addPostForm(): void {
    this.loading = true;
    console.log(this.post);
    this.psp.addPosts(this.post)
      .subscribe(
        data => {
          console.log(data);
          this.postList.splice(0, 0, data);
          this.loading = false;
        },
        error2 => {
          console.log(error2);
          this.loading = false;
        }
      );
  }

  addComForm(): void {
    this.loading = true;
    console.log(this.mycom);
    this.psp.addComment(this.mycom, 7)
      .subscribe(
        data => {
          console.log(data);
          this.postList[0].comments.splice(0, 0, data);
          this.loading = false;
        },
        error2 => {
          console.log(error2);
          this.loading = false;
        }
      );
  }
}
