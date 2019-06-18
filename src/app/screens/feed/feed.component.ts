import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";

import { checkAuth } from '../../actions/auth';
import { listPosts, deletePost, getPostById } from '../../actions/post';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-screen-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class FeedComponent implements OnInit {

	page = 0;
	categorys = [];
	editingPost = false;
	loading = true;
	title = 'Feed';
	actual_year = new Date().getFullYear();
	feed = [];

	form_edit = {
		medias: [],
		categorys: [],
		text: '',
		_id: null,
	}

	constructor(private route: ActivatedRoute, private titleService: Title ) { 
		
		this.titleService.setTitle( this.title );

		this.route.params.subscribe(res => console.log(res.id));

	}

	async openModalEdit( publication )
	{

		this.form_edit.medias = [], // @TODO fazer
		this.form_edit.categorys_name = publication.categorys_name,
		this.form_edit.text = publication.text
		this.form_edit._id = publication._id

		this.editingPost = true;

	}

	async addPublication( obj_publication )
	{

		var post = await getPostById( obj_publication.metadata._id );
		this.feed.unshift( post.metadata );

	}

	closeModalEditPost()
	{
		console.log( ' chegou aqui ')
		this.editingPost = false;
	}

	removePublication( _id )
	{

		var feed_changed = this.feed.filter( ( item ) => { return _id.toString() !== item._id.toString() } );

		deletePost( _id );

		this.feed = feed_changed;

	}

	updatePost( publication )
	{

		let self = this;

		if( publication._id ){

			for( var i in self.feed ){

				if( self.feed[i]._id.toString() === publication._id.toString() ){

					self.feed[i] = publication;

				}

			}

		}

	}

	async loadPosts()
	{

		let self = this;

		self.page = self.page + 1;

		var posts = await listPosts( self.page, self.categorys );

		for( var i in posts.metadata ){
			console.log( posts.metadata )
			self.feed.push( posts.metadata[i] );
		}

		return true;

	}

	async ngOnInit() {

		let self = this;

		let authenticated = await checkAuth();
		
		if( authenticated !== true ){
			window.location.href = '/login';
		} else {
			self.loading = false;
		}

		await self.loadPosts();

	}

}
