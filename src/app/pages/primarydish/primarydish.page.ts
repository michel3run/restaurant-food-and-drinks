import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-primarydish',
  templateUrl: './primarydish.page.html',
  styleUrls: ['./primarydish.page.scss'],
})
export class PrimarydishPage implements OnInit {
  arr=[];
  constructor(private api : ApiService ,  private menu: MenuService) { }

  ngOnInit() {
    this.menu.showMenu=true
    this.api.getAllProduct().subscribe((data)=>{
      for(let item of data){
        this.arr.push(item.nombre + " "+item.precio+"€")
      }
      console.log(data)
    })
  }

}
