import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { FormsModule,ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Users } from './../../shared/users';

import { register, authenticate } from '../../actions/auth';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'component-form-register',
  templateUrl: './form-register.component.html',
})

export class FormRegisterComponent implements OnInit {

	formRegister: FormGroup;

	loadingForm: boolean = false;
	error: string = '';

	constructor( private formBuilder: FormBuilder ) {}

	ngOnInit() {
		this.createForm(new Users());
	}

	createForm( users: Users ) {
	    this.formRegister = this.formBuilder.group({
	      name		: [users.name],
	      email		: [users.email],
	      password  : [users.password]
	    })
	}

	async onSubmit() {

		let self = this;

		self.loadingForm = true;

		let { name, email, password } = self.formRegister.value;

		let login_response = await register( name, email, password );

		if( login_response.success === false ){
			
			if( login_response.error ){
				self.error = login_response.error;
			}

			if( login_response.message ){
				self.error = login_response.message;
			}
			
			self.loadingForm = false;

		} else {

			authenticate( email, password )

		}
		
		return false;

	}

}
