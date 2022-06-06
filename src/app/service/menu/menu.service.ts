import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Clase para no perder datos mientras navegamos y mostrarlo
export class MenuService {
  userID:number=0
  ticket= []
  platos={}
  showMenu:boolean =false;
  cuentaTotal=0;
  outStock = [];
  constructor() {
    
   }
  
  
}
