import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { FormsModule,ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Users } from './../../shared/users';

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

	onSubmit() {

		let self = this;

		self.loadingForm = true;

		self.error = 'mensagem de erro';

		setTimeout( function(){

			self.loadingForm = false;
			console.log(self.formRegister.value);
	  		return false;

		}, 3000)

	}

}
