import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";

import { checkAuth } from '../../actions/auth';
import { listPosts, deletePost } from '../../actions/post';

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
	loading = true;
	title = 'Feed';
	actual_year = new Date().getFullYear();
	feed = [];

	constructor(private route: ActivatedRoute, private titleService: Title ) { 
		
		this.titleService.setTitle( this.title );

		this.route.params.subscribe(res => console.log(res.id));

	}

	addPublication( obj_publication )
	{
	console.log( obj_publication.metadata._id );
		//this.feed.unshift( obj_publication.metadata );
	}

	removePublication( _id )
	{

		var feed_changed = this.feed.filter( ( item ) => { return _id.toString() !== item._id.toString() } );

		deletePost( _id );

		this.feed = feed_changed;

	}

	async loadPosts()
	{

		let self = this;

		self.page = self.page + 1;

		var posts = await listPosts( self.page, self.categorys );

		for( var i in posts.metadata ){
			console.log( posts.metadata[i] )
			self.feed.push( posts.metadata[i] );
		}

	}

	async ngOnInit() {

		let self = this;

		let authenticated = await checkAuth();
		
		if( authenticated !== true ){
			window.location.href = '/login';
		} else {
			self.loading = false;
		}

		self.loadPosts();

	}

}
