import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-pay-request',
  templateUrl: './pay-request.page.html',
  styleUrls: ['./pay-request.page.scss'],
})
export class PayRequestPage implements OnInit {
  userID: number
  cuentaTotal: number
  ticket=[];
  carrito = []
  constructor(private api: ApiService, private menu: MenuService, private cookieService: CookiesService, private router: Router, private actionSheetController: ActionSheetController, private alertController: AlertController) {
    this.menu.showMenu = true
    this.ticket = this.menu.ticket
    this.userID = this.menu.userID
    this.cuentaTotal = this.menu.cuentaTotal
  }

  ngOnInit() {

    let claves = Object.keys(this.menu.platos)
    console.log(this.carrito.length)
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i]
      this.carrito.push(clave + " x " + this.menu.platos[clave])
    }
  }

  async presentAlertNegative() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Atención debe pedir algun producto',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async presentAlertPositive(idPedido: number) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Su pedido ha sido recibido',
      message: `Nº del pedido ${idPedido}`,
      buttons: [{
        text: 'GRACIAS',
        handler: () => {
          this.cookieService.removeAll()
          this.cookieService.addCookie("userID", String(this.menu.userID))
          this.menu.ticket=[]
          this.carrito=[]
          this.menu.platos={}
          this.router.navigateByUrl('primarydish', { replaceUrl: true })
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Atención se va a pedir su pedido ',
      // cssClass: 'my-custom-class',
      buttons: [{
        text: 'Seguir comprando',
        icon: 'arrow-back-outline',
        handler: () => {
        }
      }, {
        text: 'Enviar mi pedido y pagar',
        icon: 'arrow-forward-outline',
        data: 10,
        handler: () => {
          if (this.menu.cuentaTotal == 0) {
            this.presentAlertNegative()
          } else {
            let dateTime = new Date()
            let fecha = dateTime.toLocaleDateString().split("/").join("-") + " " + dateTime.toLocaleTimeString()
            this.api.postPedidos(this.menu.userID, fecha, "pagado", this.cuentaTotal).subscribe();

            this.api.getProductDate(this.menu.userID, fecha).subscribe((data => {

              for (let item of this.menu.ticket) {
                this.api.postLineaPedidos(data[0].id, item).subscribe();
              }
              console.log(data[0].id)
              this.presentAlertPositive(data[0].id)



            }))


          }
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
  pay() {

    this.presentActionSheet()
  }
}



