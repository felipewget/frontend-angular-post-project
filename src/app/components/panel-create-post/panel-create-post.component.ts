import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { FormsModule,ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Categorys } from './../../shared/categorys';

import { publish } from '../../actions/post';
import { uploadMedia } from '../../actions/media';

@Component({
  selector: 'component-panel-create-post',
  templateUrl: './panel-create-post.component.html',
  styleUrls: ['./panel-create-post.component.css']
})

export class PanelCreatePostComponent implements OnInit {

	loadingPost = false;
	containerImages = false;
	text = '';

	formCategoryLabels: FormGroup;

	@Output() emitCreatedPost = new EventEmitter();

	public categorys_to_post = [];
	public images_to_post = [];

	constructor( private formBuilder: FormBuilder ){}

	openContainerImages()
	{

		this.images_to_post = [];
		this.containerImages = true;

	}

	createCategoryForm( categorys: Categorys ) {
	    this.formCategoryLabels = this.formBuilder.group({
	      category		: [categorys.name],
	    })
	}

	deleteCategoryLabel( evenet, index )
	{

		let self = this;

		self.categorys_to_post.splice(index, 1);
	
		return false;

	}

	onAddLabel() {

		let self = this;

		var { category } = self.formCategoryLabels.value;

		category = category !== "" && category != null
					? category.toLowerCase()
					: category ;

		if( category.trim().length < 1 ){
			// simplesmente nao adiciona
		} else if( self.categorys_to_post.indexOf( category ) > -1 ){
			alert("Categoria ja adicionada")
		} else {
			self.categorys_to_post.push( category.toLowerCase() );
			self.formCategoryLabels.reset();
		}
		
		return false;

	}

	async fileChanged( event )
	{

		var file = event.target.files[0]

		let media = await uploadMedia( file );

		this.containerImages = true;
		this.images_to_post.push( media.metadata )

	}

	removeMedia( index )
	{

		this.images_to_post.splice(index, 1);

	}

	async createPost()
	{
	
		this.loadingPost = true;
		let res = await publish( this.text, [], this.categorys_to_post );

		this.emitCreatedPost.emit( res )

		this.categorys_to_post = [];
		this.images_to_post = [];
		this.containerImages = false;
		this.text = '';

		this.loadingPost = false;
		

	}

	ngOnInit(){
		this.createCategoryForm(new Categorys());
	}

}
