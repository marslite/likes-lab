
// import { response } from "express";
import tokenService from "./tokenService";


const BASE_URL = '/api';

export function create(id){
    return fetch(`${BASE_URL}/posts/${id}/likes`,{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json()
        throw new Error('Something went wront with create Like');
    });
}

export function removeLike(id){
    return fetch(`${BASE_URL}/likes/${id}`,{
        method: 'DELETE',
        headers:{
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error('Something went wrong with remove Like')
    });
}