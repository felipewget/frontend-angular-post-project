import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

import { logout } from '../../actions/auth';

@Component({
  selector: 'component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {

	username = '';

	constructor(){}

	logoutFeed()
	{
	console.log( 'aaa');
		logout();
	}

	ngOnInit(){

		this.username = localStorage.getItem( 'username' );
		
	}

}
