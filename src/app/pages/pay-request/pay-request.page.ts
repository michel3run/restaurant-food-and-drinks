import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-request',
  templateUrl: './pay-request.page.html',
  styleUrls: ['./pay-request.page.scss'],
})
export class PayRequestPage implements OnInit {
  
  constructor(private api: ApiService, private menu: MenuService, private cookieService: CookiesService, private router: Router) { 
 
  }
  userID:number
  cuentaTotal:number
  ticket;
  prueba=[]
  ngOnInit() {
    this.menu.showMenu=true
    this.ticket=this.menu.ticket
    this.userID = this.menu.userID
    this.cuentaTotal=this.menu.cuentaTotal
    let claves = Object.keys(this.menu.platos)
    for(let i=0;i<claves.length;i++){
      let clave = claves[i]
      console.log("aqui----------"+clave +"-------"+this.menu.platos[clave])
      this.prueba.push(clave+" x "+this.menu.platos[clave])
    }
  }
  pay(){
    let dateTime = new Date()
    let fecha =dateTime.toLocaleDateString().split("/").join("-")+" "+dateTime.toLocaleTimeString()
    
    this.api.postPedidos(this.menu.userID,fecha,"pagado",this.cuentaTotal).subscribe();

     this.api.getProductDate(this.menu.userID,fecha).subscribe(( data=>{
        
       for(let item of this.menu.ticket){
          this.api.postLineaPedidos(data[0].id,item).subscribe();
       }
       
    }))
  }
}



