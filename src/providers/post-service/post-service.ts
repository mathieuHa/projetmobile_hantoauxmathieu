import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthServiceProvider} from '../auth-service/auth-service';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {
  private urlApi:string;
  constructor(public http: HttpClient, private auth: AuthServiceProvider) {
    console.log('Hello PostServiceProvider Provider');
    this.urlApi = "http://api.hanotaux.fr/api/post";
  }

  getPosts() : Observable<any> {
    return this.http
      .get(this.urlApi+'s', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken()),
      });
  }

  getPost(id) : Observable<any> {
    return this.http
      .get(this.urlApi+'/'+id, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken()),
      });
  }

  addPosts(post) : Observable<any> {
    return this.http
      .post(this.urlApi, post, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken()),
      });
  }

  addComment(comment, id) : Observable<any> {
    return this.http
      .post(this.urlApi+'/'+id+'/comment', comment, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken()),
      });
  }

  deletePost(id) : Observable<any> {
    return this.http
      .delete(this.urlApi + '/' + id, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken()),
      });
  }

  editPost(post, id) : Observable<any> {
    console.log(this.auth.getToken());
    return this.http
      .put(this.urlApi + '/' + id, post, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken()),
      });
  }

}
