import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { Cookie } from 'ng2-cookies';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.page.html',
  styleUrls: ['./dessert.page.scss'],
})
export class DessertPage implements OnInit {

  postres = [];
  cuenta = {};
  postresID = [];

  constructor( private api: ApiService, private menu: MenuService, private cookieService: CookiesService) {
    this.cookieService.update()
    this.menu.showMenu = true

  }

  ngAfterContentChecked(){
    for(let item of  this.cookieService.keys){
      console.log(item)
      var unidad = document.getElementById(item);
      try {
        unidad!.innerText = Cookie.get(item);
      } catch (error) {
        
      }
      
    }
    this.menu.cuentaTotal = Number(Cookie.get('total'))
  }
  ngOnInit() {
    this.menu.showMenu = true
    this.api.getAllProduct("postre").subscribe((data) => {
      for (let item of data) {
        this.postres.push(item.nombre + " " + item.precio + "€")
        this.cuenta[item.id] = item.precio
        this.postresID.push(Number(item.id));

      }

     
    })
  
  }


  


  add(i:string ) {
    var unidad = document.getElementById('unidad-postres-' + i);
    unidad!.innerText = String(Number(unidad!.innerText) + 1);
    this.menu.cuentaTotal += this.cuenta[Number(i)]
    this.cookieService.addCookie('unidad-postres-' + i,unidad!.innerText)
    this.cookieService.addCookie('total',String(this.menu.cuentaTotal))
    this.cookieService.update()
    this.menu.ticket.push(i)
    this.api.getProductID(i).subscribe((data)=>{

      this.menu.platos[data[0].nombre]=unidad!.innerText
    })
  }

  delete(i: string) {
    var unidad = document.getElementById('unidad-postres-' + i);
    if (Number(unidad!.innerText) > 0) {
      unidad!.innerText = String(Number(unidad!.innerText) - 1);
      this.menu.cuentaTotal -= this.cuenta[Number(i)]
      const index = this.menu.ticket.indexOf(i, 0);
      if (index > -1) {
        this.menu.ticket.splice(index, 1);
      }
      this.api.getProductID(i).subscribe((data)=>{

        this.menu.platos[data[0].nombre]=unidad!.innerText
        if(Number(unidad!.innerText)==0){
          const nombre = data[0].nombre
          delete this.menu.platos[data[0].nombre]
        }
      })
    }
    this.cookieService.addCookie('unidad-postres-' + i,unidad!.innerText)
    this.cookieService.addCookie('total',String(this.menu.cuentaTotal))

    this.cookieService.update()
  }

}
