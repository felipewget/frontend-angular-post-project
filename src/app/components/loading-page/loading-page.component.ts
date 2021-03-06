import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { FormsModule,ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Categorys } from './../../shared/categorys';

@Component({
  selector: 'component-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css'],
})

export class LoadingPageComponent implements OnInit {

	formCategoryLabels: FormGroup;

	public categorys_to_post = [];
	public images_to_post = [{
		state	: "loading",
		id 		: "84984984",
		preview : "https://i.stack.imgur.com/Nc30D.png"
	}];

	constructor( private formBuilder: FormBuilder ){}

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

	ngOnInit(){
		this.createCategoryForm(new Categorys());
	}

}
