import { NgModule } from '@angular/core';
import { FormPostComponent } from './form-post/form-post';
import { PostComponent } from './post/post';
@NgModule({
	declarations: [FormPostComponent,
    PostComponent],
	imports: [],  // <- Add],
	exports: [FormPostComponent,
    PostComponent]
})
export class ComponentsModule {}
