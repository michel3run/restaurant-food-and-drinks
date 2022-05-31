import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-primarydish',
  templateUrl: './primarydish.page.html',
  styleUrls: ['./primarydish.page.scss'],
})
export class PrimarydishPage implements OnInit {
  primeros = [];
  cuenta = [];
  cookies: Object;
  keys: Array<string>;
  cName: string;
  cValue: string;
  rName: string;
  checkName: string;
  constructor(private api: ApiService, private menu: MenuService) {
    this.update()
    console.log(Cookie.get('unidad-0'))
    console.log(this.keys)
    
  }

  ngAfterContentChecked(){
    for(let item of this.keys){
      console.log(item)
      var unidad = document.getElementById(item);
      try {
        unidad!.innerText = Cookie.get(item);
      } catch (error) {
        
      }
      
    }
  }
  ngOnInit() {
    this.menu.showMenu = true
    this.api.getAllProduct().subscribe((data) => {
      for (let item of data) {
        this.primeros.push(item.nombre + " " + item.precio + "€")
        this.cuenta.push(Number(item.precio))
      }

     
    })
  
  }


  update() {
    this.cookies = Cookie.getAll();
    this.keys = Object.keys(this.cookies);
  }

  addCookie(cName: string, cValue: string) {
    console.log('Adding: ', cName, cValue);
    Cookie.set(cName, cValue);
    this.update();
  }
  removeCookie(rName: string) {
    console.log('Removing: ', rName);
    Cookie.delete(rName);
    this.update();
  }
  removeAll() {
    console.log('Removing all cookies');
    Cookie.deleteAll();
    this.update();
  }
  checkCookie() {
    console.log('Checking: ', this.checkName);
    console.log(Cookie.check(this.checkName));
    window.alert('Check cookie ' + this.checkName + ' returned ' + Cookie.check(this.checkName));
  }


  add(i:string ) {
    var unidad = document.getElementById('unidad-' + i);
    unidad!.innerText = String(Number(unidad!.innerText) + 1);
    this.menu.cuentaTotal += this.cuenta[Number(i)]
    this.addCookie('unidad-' + i,unidad!.innerText)
    this.addCookie('total',String(this.menu.cuentaTotal))
    this.update()
    
  }

  delete(i: string) {
    var unidad = document.getElementById('unidad-' + i);
    if (Number(unidad!.innerText) > 0) {
      unidad!.innerText = String(Number(unidad!.innerText) - 1);
      this.menu.cuentaTotal -= this.cuenta[Number(i)]
    }
    this.addCookie('unidad-' + i,unidad!.innerText)
    this.addCookie('total',String(this.menu.cuentaTotal))

    this.update()
  }

  load(){
    for(let item of this.keys){
      console.log(item)
      var unidad = document.getElementById(item);
      unidad!.innerText = Cookie.get(item);
    }
  }
}
