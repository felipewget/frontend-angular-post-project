import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";

export function checkAuth(){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		if( auth_token != undefined && auth_token != null && auth_token != "" ){

			let res = await axios.get('//localhost:8080/authenticate?token=' + auth_token );

		  	if( res.data.metadata && res.data.metadata._id ){
		  		
		  		localStorage.setItem('username', res.data.metadata.name.first_name + ' ' + res.data.metadata.name.last_name );
			  	localStorage.setItem('auth_token', auth_token );
			  	localStorage.setItem('_id', res.data.metadata._id );
			  	return resolve( true );

		  	} else {

		  		localStorage.removeItem('auth_token');
		  		return resolve( false );

		  	}

	  	} else {

	  		return resolve( false );

	  	}

	});

}

export function authenticate( login , password ){
	
	return new Promise( async (resolve, reject) => {

		let res = await axios.post('//localhost:8080/authenticate', 
								   	{
	  									login: login,
									  	password: password
									});
		
		if( res.data && res.data.metadata && res.data.metadata.access_token ){

			localStorage.setItem('auth_token', res.data.metadata.access_token );
			localStorage.setItem('_id', res.data.metadata._id );
			location.reload();

			return resolve( true )

		} else {

			return resolve( false )

		}
		
	});

}

export function register( name, login , password ){
	
	return new Promise( async (resolve, reject) => {

		let res = await axios.post('//localhost:8080/register', 
								   	{
								   		name	: name,
	  									login	: login,
									  	password: password
									});
		
		return resolve( res.data )
		
	});

}

export function logout(){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		let res = await axios.delete('//localhost:8080/logout?token=' + auth_token);
		console.log( logout );
		console.log( res );
		localStorage.removeItem('auth_token');
		location.reload();
		
		return resolve( true )
		
	});

}