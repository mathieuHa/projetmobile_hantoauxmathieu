import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoginPage} from '../login/login';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {EditpostPage} from '../editpost/editpost';
import {Post} from '../../Classes/Post';
import {Comment} from '../../Classes/Comment';
import {Network} from "@ionic-native/network";
import {NativeStorage} from "@ionic-native/native-storage";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private psp: PostServiceProvider, public network: Network, private nativeStorage: NativeStorage) {
    //this.selectedItem = navParams.get('item');
    this.post = new Post(1, '', '');
    this.mycom = new Comment(1, '', 0);
    console.log(this.post.toString());
    this.buttonName = "Ajout du Post";
    this.waiting = true;
    this.loading = false;
    this.getPosts();

    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

// stop disconnect watch
    //disconnectSubscription.unsubscribe();
    setTimeout(() => {
      console.log("Network type " + this.network.type);
    }, 1000);

// watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    //connectSubscription.unsubscribe();
  }
  editPost(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EditpostPage, {
      id
    });
  }

  ionViewCanEnter() {
    /*if (!this.auth.authenticated()){
      console.log("Not autenticated");
      setTimeout(() =>{
        this.navCtrl.push(LoginPage).catch((res=>console.log(res)));
      }, 600);
    }
    return this.auth.authenticated();*/
  }



  private getPosts() {
    this.psp.getPosts()
      .subscribe(data => {
        console.log(data);
        this.postList = data;
        console.log("PostList "+ JSON.stringify(this.postList));
        this.nativeStorage.setItem('post', this.postList)
          .then(
            () =>
              console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );
        console.log("next");

        //NativeStorage.setItem('post', JSON.stringify(this.postList));
        this.waiting=false;
      },err => {
        console.log(err);
        this.nativeStorage.getItem('post')
          .then(
            data => {
              console.log(JSON.stringify(JSON.parse(data)));
              this.postList = JSON.parse(data);
            },
            error => console.error(error)
          );
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

  addComForm(postId, userId): void {
    this.loading = true;
    console.log(this.mycom);
    this.psp.addComment(this.mycom, postId)
      .subscribe(
        data => {
          console.log(data);
          console.log(postId);
          this.postList[postId-1].comments.push(data);
          console.log(this.postList[postId-1]);
          this.loading = false;
        },
        error2 => {
          console.log(error2);
          this.loading = false;
        }
      );
  }
}
