import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
@Component({
  selector: 'app-secondarydish',
  templateUrl: './secondarydish.page.html',
  styleUrls: ['./secondarydish.page.scss'],
})
export class SecondarydishPage implements OnInit {

  constructor(private api: ApiService, private menu: MenuService) { }

  ngOnInit() {
    this.menu.showMenu=true
  }

}
