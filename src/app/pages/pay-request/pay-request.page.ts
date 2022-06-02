import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalStockPage } from './modalOutStock/modal-stock/modal-stock.page';


@Component({
  selector: 'app-pay-request',
  templateUrl: './pay-request.page.html',
  styleUrls: ['./pay-request.page.scss'],
})
export class PayRequestPage implements OnInit {
  userID: number
  cuentaTotal: number
  ticket = [];
  carrito = [];

  constructor(
    private api: ApiService,
    private menu:
      MenuService,
    private cookieService: CookiesService,
    private router: Router,
    private actionSheetController: ActionSheetController
    , private alertController: AlertController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet) {
    this.menu.showMenu = true
    this.ticket = this.menu.ticket
    this.userID = this.menu.userID
    this.cuentaTotal = this.menu.cuentaTotal
  }

  ngOnInit() {

    let claves = Object.keys(this.menu.platos)
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i]
      this.carrito.push(clave + " x " + this.menu.platos[clave])
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalStockPage,
      // cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
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
          this.menu.ticket = []
          this.carrito = []
          this.menu.platos = {}
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
          //primero vemos si hay algo en el objeto del platos que no este disponible durante la compra
          let claves = Object.keys(this.menu.platos)
          let error = false
          if (this.menu.cuentaTotal == 0) {
            this.presentAlertNegative()
          } else {
            for (let i = 0; i < claves.length; i++) {

              this.api.getAllProductDishes(claves[i]).subscribe((data) => {
                if (data[0].diponible == "0") {
                  error = true
                  this.menu.outStock.push(data[0].nombre)
                }
                if (i == claves.length - 1) {

                  if (!error) {
                    {

                      let dateTime = new Date()
                      let fecha = dateTime.toLocaleDateString().split("/").join("-") + " " + dateTime.toLocaleTimeString()
                      this.api.postPedidos(this.menu.userID, fecha, "pagado", this.cuentaTotal).subscribe();

                      this.api.getProductDate(this.menu.userID, fecha).subscribe((data => {

                        let cont = 0
                        for (let item of this.menu.ticket) {
                          const comentario = (document.getElementById("comentario-" + cont) as HTMLInputElement).value;
                           this.api.postLineaPedidos(data[0].id, item,comentario).subscribe();
                          
                          cont++
                        }
                        this.presentAlertPositive(data[0].id)



                      }))



                    }


                  } else {

                    this.presentModal()
                    // this.menu.outStock=[]
                  }
                }

              })

            }


          }







        }
      }]
    });
    await actionSheet.present();
  }
  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
  }
  pay() {

    this.presentActionSheet()
  }
}



