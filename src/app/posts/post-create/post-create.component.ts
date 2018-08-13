import { Component, Output } from '@angular/core';
import { NgForm } from "@angular/forms"
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{
  title = '';
  content = '';

  constructor(public postsService: PostsService) {}

  onAddPost(form:NgForm){
    console.log('posts.create.onAddPost function called');
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
    console.log('posts.create.onAddPost form UI reset');
  }
}
