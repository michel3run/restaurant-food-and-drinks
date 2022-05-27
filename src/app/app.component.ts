import { Component } from '@angular/core';
import { LoginPage } from './pages/login/login.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public islogin="false"
  

  public appPages = [
    { title: 'Primer plato', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Segundo plato', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Bebidas', url: '/folder/Archived', icon: 'archive' },
    { title: 'Postre', url: '/folder/Trash', icon: 'trash' },
    { title: 'Pagar/Pedir', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor() {}
}
