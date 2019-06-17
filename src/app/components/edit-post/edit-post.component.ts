import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { FormsModule,ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Categorys } from './../../shared/categorys';

import { updatePost } from '../../actions/post';

@Component({
  selector: 'component-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {

	loadingComponent = false;
	loadingPost = false;
	containerImages = false;

	formCategoryLabels: FormGroup;

	@Input() form_edit;
	@Output() emitUpdatePost = new EventEmitter();
	@Output() emitCloseModal  = new EventEmitter();

	public categorys_to_post = [];
	public images_to_post = [{
		state	: "loading",
		id 		: "84984984",
		preview : "https://i.stack.imgur.com/Nc30D.png"
	}];

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

	closeModalEdit()
	{

		let self = this;

		this.emitCloseModal.emit( true );

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

	async updatePost()
	{
	
		this.loadingPost = true;

		let res = await updatePost( this.form_edit._id, this.form_edit.text, [], this.categorys_to_post );

		this.emitUpdatePost.emit( res.metadata );
		this.emitCloseModal.emit( true );

		this.categorys_to_post = [];
		this.images_to_post = [];
		this.containerImages = false;

		this.loadingPost = false;
		

	}

	ngOnInit(){

		this.categorys_to_post = this.form_edit.categorys_name.map( (item) => item.name );

		console.log( this.form_edit );
		this.createCategoryForm(new Categorys());

	}

}
