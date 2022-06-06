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
  //para coger el id del usuaruio que está comprando
  userID: number
  // para cogert la cueenta total
  cuentaTotal: number
  //Array de los ids de los productos que ha pediod sin simplificar es decir que se repide los ids
  ticket = [];
  //Para mostar el carrrito al usuario
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
// Al iniciar mostarmos el carrito recorriendo los platos
  ngOnInit() {

    let claves = Object.keys(this.menu.platos)
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i]
      this.carrito.push(clave + " x " + this.menu.platos[clave]+" ")
    }
  }
  //Para llamar a una ventana modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalStockPage,
      // cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
//Alerta negativa por ser la cuenta total 0
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
  // Alerta positiva que le pasamos el id del pedido para que lo sepa el cliente
  async presentAlertPositive(idPedido: number) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Su pedido ha sido recibido',
      message: `Nº del pedido ${idPedido}`,
      buttons: [{
        text: 'GRACIAS',
        handler: () => {
          //Al darle al boton borramos las cookies le volvemos añadir el usuario a una cooki apra que siga compran y le borramos todo
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


// Para que siga comprando o envie el pedido
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
          if (this.menu.cuentaTotal == 0) {
            this.presentAlertNegative()
          } else {

            for (let i = 0; i < claves.length; i++) {
              //recorremos todos los paltos y vemos si estan disponible
              this.api.getAllProductDishes(claves[i]).subscribe((data) => {

                if (data[0].disponible == "0") {
                  this.menu.outStock.push(data[0].nombre)
                }
                if (i == claves.length - 1) {
                  //cuando llegemos al ulitmo si la  longitud del stock es 0 añadimos
                  if (this.menu.outStock.length == 0) {
                    
                    //insertamos con la fecha y hora hactual 
                      let dateTime = new Date()
                      let fecha = dateTime.toLocaleDateString().split("/").join("-") + " " + dateTime.toLocaleTimeString()
                      const comentario = (document.getElementById("comentario") as HTMLTextAreaElement).value;
                      //insertamos el pedido
                      this.api.postPedidos(this.menu.userID, fecha, "pagado", comentario, this.cuentaTotal).subscribe();
                      // buscamos el pediodo que acabamod de insertar
                      this.api.getProductDate(this.menu.userID, fecha).subscribe((data2 => {
                        //recorremos el ticke para insertarlo en linea pedidos
                        for (let item of this.menu.ticket) {
                            
                            this.api.postLineaPedidos(data2[0].id, item).subscribe();

                           
                          
                        }
                        //Mostramos la alerta positiva y  le pasamos el id de nuestro pedido
                        this.presentAlertPositive(data2[0].id)



                      }))



                    

                  } else {
                    //si no presentamos el modal con los productos fuera de stock
                    console.log(this.menu.outStock)
                    this.presentModal()
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
  //funcion para borrar un elemento de un array
  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
  }
  // cuaando le damos a pagar
  pay() {
    //mostarmso el actionSheet
    this.presentActionSheet()
  }
}



