import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { checkAuth } from '../../actions/auth';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-screen-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class FeedComponent implements OnInit {

	loading:boolean = true;
	title = 'Feed';
	actual_year = new Date().getFullYear();

	constructor(private route: ActivatedRoute, private titleService: Title ) { 
		
		this.titleService.setTitle( this.title );

		this.route.params.subscribe(res => console.log(res.id));

	}

	async ngOnInit() {

		let self = this;

		let authenticated = await checkAuth();
		
		if( authenticated !== true ){
			window.location.href = '/login';
		} else {
			self.loading = false;
		}

	}

}
