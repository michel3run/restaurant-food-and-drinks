import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  showMenu:boolean =false;
  cuentaTotal:number=0;
  constructor() {
    Math.min(this.cuentaTotal,0)
   }
  
  
}
