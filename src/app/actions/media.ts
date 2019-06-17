import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";

export function uploadMedia( media ){
	
	return new Promise( async (resolve, reject) => {

		let auth_token = localStorage.getItem('auth_token');

		var form = new FormData();
		await form.append('file', media );
		await form.append('token', auth_token );

		var resp = await axios.post('//localhost:8080/media/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } } );

		console.log( resp );

		return resolve( resp.data );

	});

}