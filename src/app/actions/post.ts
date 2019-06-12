import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";

export function listFeed( page, categorys ){
	
	return new Promise( async (resolve, reject) => {

		

	});

}

export function publish( text, medias, categorys ){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		let res = await axios.post('//localhost:8080/post/create', 
								   	{
	  									text		: text ,
									  	medias		: [], // @todo fazer
									  	categorys	: categorys,
									  	token		: auth_token,
									});
		
		console.log( res );

		return resolve( false );
		
	});

}

export function deletePost( id ){
	
}

export function updatePost( id ){
	
}