import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-primarydish',
  templateUrl: './primarydish.page.html',
  styleUrls: ['./primarydish.page.scss'],
})
export class PrimarydishPage implements OnInit {
  primeros = [];
  cuenta = [];
  total: number = 0
  constructor(private api: ApiService, private menu: MenuService) { }

  ngOnInit() {
    this.menu.showMenu = true
    this.api.getAllProduct().subscribe((data) => {
      for (let item of data) {
        this.primeros.push(item.nombre + " " + item.precio + "€")
        this.cuenta.push(Number(item.precio))
      }
    })
  }
  add(i:string ) {
    var unidad = document.getElementById('unidad-' + i);
    unidad!.innerText = String(Number(unidad!.innerText) + 1);
    this.total += this.cuenta[Number(i)] 
  }

  delete(i: string) {
    var unidad = document.getElementById('unidad-' + i);
    if (Number(unidad!.innerText) > 0) {
      unidad!.innerText = String(Number(unidad!.innerText) - 1);
      this.total -= this.cuenta[Number(i)]
    }

  }
}
