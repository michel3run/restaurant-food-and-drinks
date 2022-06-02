import { Component, OnInit } from '@angular/core';
import { MenuService } from './service/menu/menu.service';
import { Router } from '@angular/router';
import { CookiesService } from './service/cookie/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  public appPages = [
    { title: 'Primer plato', url: 'primarydish', icon: 'paper-plane' },
    { title: 'Segundo plato', url: 'secondarydish', icon: 'heart' },
    { title: 'Bebidas', url: 'drinks', icon: 'archive' },
    { title: 'Postre', url: 'dessert', icon: 'trash' },
    { title: 'Pagar/Pedir', url: 'pay-request', icon: 'warning' },
  ];
  constructor(private cookieService: CookiesService,private router: Router,private menu :MenuService,) {
  }
  
  signOff() {
    this.cookieService.removeAll()
    this.menu.showMenu = false;
    this.menu.platos={}
    this.router.navigateByUrl('login',{ replaceUrl: true })
  }
  
  



}
