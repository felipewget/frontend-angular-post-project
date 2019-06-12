import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";

import { checkAuth } from '../../actions/auth';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-screen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {

	loading: boolean = true;
	title: string = 'Login';
	actual_year = new Date().getFullYear();

	constructor(private route: ActivatedRoute, private titleService: Title ) { 
		
		this.titleService.setTitle( this.title );

		this.route.params.subscribe(res => console.log(res.id));

	}

	async ngOnInit() {

		let self = this;

		let authenticated = await checkAuth();
		
		if( authenticated === true ){
			window.location.href = '/feed';
		} else {
			self.loading = false;
		}

	}

}
