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
  // para pintar y redirigir el menu
  public appPages = [
    { title: 'Primer plato', url: 'primarydish', icon: 'paper-plane' },
    { title: 'Segundo plato', url: 'secondarydish', icon: 'heart' },
    { title: 'Bebidas', url: 'drinks', icon: 'archive' },
    { title: 'Postre', url: 'dessert', icon: 'trash' },
    { title: 'Pagar/Pedir', url: 'pay-request', icon: 'warning' },
  ];
  constructor(private cookieService: CookiesService,private router: Router,private menu :MenuService,) {
  }
  // Al desloguearnos
  signOff() {
    //borramos las cookies
    this.cookieService.removeAll()
    //ocultamos el menu
    this.menu.showMenu = false;
    // quitamos los platos
    this.menu.platos={}
    //redirigimos al login sin que tenga el boton de atras
    this.router.navigateByUrl('login',{ replaceUrl: true })
  }
  
  



}
