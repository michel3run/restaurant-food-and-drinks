import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  userID:number
  ticket= []
  showMenu:boolean =false;
  cuentaTotal=0;
  constructor() {
   }
  
  
}
