import {Component, Input} from '@angular/core';
import {Post} from '../../Classes/Post';


/**
 * Generated class for the PostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {
  @Input() post: Post;

  constructor() {
    console.log('Hello PostComponent Component');
  }

}
