import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";

export function listPosts( page, categorys ){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		let res = await axios.get( '//localhost:8080/posts?page=' + page + '&categorys=' + categorys + '&token=' + auth_token );

		return resolve( res.data );

	});

}

export function getPostById( _id ){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		let res = await axios.get( '//localhost:8080/post/' + _id + '?token=' + auth_token );

		return resolve( res.data );
		
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

		return resolve( res.data );
		
	});

}

export function deletePost( id ){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		let res = await axios.delete('//localhost:8080/post?post_id=' + id + '&token=' + auth_token );
		
		console.log( res );

		// @TODO fazer
		return resolve( false );
		
	});

}

export function updatePost( id, text, medias, categorys ){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		let res = await axios.put('//localhost:8080/post/' + id + '/edit',
									{
										text		: text ,
									  	medias		: [], // @todo fazer
									  	categorys	: categorys,
									  	token		: auth_token,
									});
		
		return resolve( res.data );
		
	});

}