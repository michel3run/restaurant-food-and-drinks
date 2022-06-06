import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import * as JsHashes  from 'jshashes';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  constructor(private toastController: ToastController, private api: ApiService, private router: Router) { }
  // Toast de errores
  async passToast() {
    const toast = await this.toastController.create({
      message: 'Error la contraseña no son iguales.',
      duration: 2000
    });
    toast.present();
  }

  async emailToast() {
    const toast = await this.toastController.create({
      message: 'Error el correo ya existe.',
      duration: 2000
    });
    toast.present();
  }
  async emailErrorExp() {
    const toast = await this.toastController.create({
      message: 'Error debes de introducir un correo electronico.',
      duration: 2000
    });
    toast.present();
  }
  async creditCardToast() {
    const toast = await this.toastController.create({
      message: 'La tarjeta de credito no es valida.',
      duration: 2000
    });
    toast.present();
  }
  async initialToast() {
    const toast = await this.toastController.create({
      message: 'Por favor relleno todos los campos.',
      duration: 2000
    });
    toast.present();
  }
  


  ngOnInit() {


  }
  //Función para que no pongamos letras en el campo de la targeja de credito
  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  //Cuando le damos a registrar
  register() {
    // centinela para que no inserte con errores
    let error = false
    //Cogemos el valor de los inputs
    const email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    const repeatPassword = (document.getElementById("repeatPassword") as HTMLInputElement).value;
    const creditCard = (document.getElementById("creditCard") as HTMLInputElement).value;
    //Comprobamos si ha escrito algo en todos los campos ya que son obligatorios
    if (email == "" || password == "" || repeatPassword == "" || creditCard == "") {
      this.initialToast()
  
    } else {
      //Expresion general para verificare que ponemos un correo electronico
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

      if (password != repeatPassword) {
        //Si las contraseña no son iguales
        this.passToast()
        error = true;
      } else if (creditCard.length < 16) {
        //Todas las targeta de credito son de 16 por lo tanto un numero menor seria error
        this.creditCardToast()
        error = true;
      } else if(!emailRegex.test(email)){
        //Si no es un email da error
        this.emailErrorExp()
      
      } else {
        //buscamos si el usuario ya existe
        this.api.searchUser(email).subscribe((data) => {
          if (data.length > 0) {
            this.emailToast()
            error = true
          } else {
            //si no existe insertamos y con el centinela se ha quedado en false no inserta
            if (!error) {
              // enviar a la bbdd
              //pasamos a md5 la contraseña
              password = this.getMD5(password)
              //insertamos
              this.api.postUser(email, password, creditCard).subscribe()
              //redirigimos al login
              this.router.navigateByUrl('login')

            }
          }


        })
      }
    }

  }
  //Función cuando hacemo click a ya tienes cuenta
  goTologin() {
    this.router.navigateByUrl('login')
  }
  //Funcion para pasar a md5
  getMD5(value: string): string {
    const hash =  new JsHashes.MD5;
    return hash.hex(value);
 }
}
