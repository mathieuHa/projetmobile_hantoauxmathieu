import {Component, Input} from '@angular/core';
import {Post} from '../../Classes/Post';

/**
 * Generated class for the FormPostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-post',
  templateUrl: 'form-post.html'
})
export class FormPostComponent {
  @Input() post: Post;
  @Input() buttonName: string;
  @Input() loading: boolean;

  status: any;

  constructor() {
    console.log('Hello FormPostComponent Component');
    this.loading = false;
  }



}
