import {  inject } from '@angular/core';
import { Router } from "@angular/router";



export const blockPage = () => {

    const router = inject(Router) ;
    
    if (localStorage.getItem('token de admin')) {
        return true;
    } else {
        router.navigate(['/login'])
        return false ;        
    }
}