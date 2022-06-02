import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-modal-stock',
  templateUrl: './modal-stock.page.html',
  styleUrls: ['./modal-stock.page.scss'],
})
export class ModalStockPage implements OnInit {

  constructor(private api: ApiService,private menu : MenuService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menu.outStock=[]
  }
}
