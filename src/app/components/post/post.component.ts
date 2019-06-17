import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

import { timestampToDate } from './../../utils/dateUtil';

@Component({
  selector: 'component-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {

	@Input() publication;
	my_user_id:String;
	my_publication = false;

	@Output() emitRemovePost = new EventEmitter();
	@Output() emitEditPost = new EventEmitter();

	constructor(){}

	removePost( index )
	{	
		this.emitRemovePost.emit( index )
	}

	convertTimestampToDate( timestamp )
	{
		return timestampToDate( timestamp );
	}

	checkIfIsMyPost( my_user_id, publication )
	{

		return my_user_id.toString() === publication.user[0]._id.toString()
			? true
			: false ;

	}

	openModalEdit( publication )
	{

		this.emitEditPost.emit( publication );

	}

	ngOnInit(){

		let self = this;
		let my_user_id = localStorage.getItem('_id');
		self.my_publication = self.checkIfIsMyPost( my_user_id, this.publication );
	}

}
