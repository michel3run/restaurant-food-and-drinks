import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public  islogin = true
  

  public appPages = [
    { title: 'Primer plato', url: 'primarydish', icon: 'paper-plane' },
    { title: 'Segundo plato', url: 'secondarydish', icon: 'heart' },
    { title: 'Bebidas', url: 'drinks', icon: 'archive' },
    { title: 'Postre', url: 'dessert', icon: 'trash' },
    { title: 'Pagar/Pedir', url: 'pay-request', icon: 'warning' },
  ];
  constructor() {}
 
  
 
  



}
