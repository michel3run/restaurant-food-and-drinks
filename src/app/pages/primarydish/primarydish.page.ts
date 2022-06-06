import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { Cookie } from 'ng2-cookies';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primarydish',
  templateUrl: './primarydish.page.html',
  styleUrls: ['./primarydish.page.scss'],
})
export class PrimarydishPage implements OnInit {
  //Array para mostarar al usuario
  primeros = [];
  //Para saber que platos y cuantos ha pedido
  cuenta = {};
  //cogemos por orden los id de los pedido para las cookies
  primerosID = [];
  // cogemos los ingredientes para mostrarlos
  ingredientes = [];
  constructor(private api: ApiService, private menu: MenuService, private cookieService: CookiesService, private router: Router) {
    //actualizamos las cookies
    this.cookieService.update()
    // mostraamos el menu lateral
    this.menu.showMenu = true
    //cogemos el id con el que nos hemos logeado
    this.menu.userID = Number(Cookie.get("userID"))
    console.log(this.menu.cuentaTotal)
    //igualamos la cuenta total
    this.menu.cuentaTotal = this.menu.cuentaTotal
  }
  //para cuando vuelvan inserte los valores si tiene cookies
  ngAfterContentChecked() {
    //recorremos las cookies e importamos en un try catcht para no estropear la web
    for (let item of this.cookieService.keys) {
      console.log(item)
      var unidad = document.getElementById(item);
      try {
        unidad!.innerText = Cookie.get(item);
      } catch (error) {

      }

    }
    this.menu.cuentaTotal = Number(Cookie.get('total'))

  }
  // al iniciar pintamos y cogemos lo necesario de nuestros atributos
  ngOnInit() {

    this.api.getAllProduct("primero").subscribe((data) => {

      for (let item of data) {
        this.primeros.push(item.nombre + " " + item.precio + "€")
        this.cuenta[item.id] = item.precio
        this.primerosID.push(Number(item.id));
        this.ingredientes.push(item.ingredientes)
      }


    })

  }



  //Funcion añadir sumamos 1 a unidades , actualizamos las cookies y el total

  add(i: string) {
    var unidad = document.getElementById('unidad-primeros-' + i);
    unidad!.innerText = String(Number(unidad!.innerText) + 1);
    console.log("primero", this.menu.cuentaTotal)
    console.log("medio", this.cuenta[i])

    this.menu.cuentaTotal += this.cuenta[i]
    console.log("segundo", this.menu.cuentaTotal)

    this.cookieService.addCookie('unidad-primeros-' + i, unidad!.innerText)
    this.cookieService.addCookie('total', String(this.menu.cuentaTotal))
    this.cookieService.update()
    this.menu.ticket.push(i)

    this.api.getProductID(i).subscribe((data) => {

      this.menu.platos[data[0].nombre] = unidad!.innerText
    })

  }
  //Funcion borrar restamos 1 a unidades hasta llegar a 0 , actualizamos las cookies y el total
  delete(i: string) {
    var unidad = document.getElementById('unidad-primeros-' + i);
    if (Number(unidad!.innerText) > 0) {
      unidad!.innerText = String(Number(unidad!.innerText) - 1);
      this.menu.cuentaTotal -= this.cuenta[i]
      const index = this.menu.ticket.indexOf(i, 0);
      if (index > -1) {
        this.menu.ticket.splice(index, 1);
      }
      this.api.getProductID(i).subscribe((data) => {

        this.menu.platos[data[0].nombre] = unidad!.innerText
        if (Number(unidad!.innerText) == 0) {
          const nombre = data[0].nombre
          delete this.menu.platos[data[0].nombre]
        }
      })
    }
    this.cookieService.addCookie('unidad-primeros-' + i, unidad!.innerText)
    this.cookieService.addCookie('total', String(this.menu.cuentaTotal))

    this.cookieService.update()


  }

}
