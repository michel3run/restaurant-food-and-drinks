import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { ApiService } from '../../service/api/api.service';
import * as JsHashes  from 'jshashes';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private api: ApiService, private menu: MenuService , private toastController: ToastController,private cookie: CookiesService ) {
  }

  ngOnInit() {

  }
  //Toast error de que has fallado el usuario o contraseña
  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Error el usuario o contraseña son incorrectos.',
      duration: 2000
    });
    toast.present();
  }
//cuando haces click al login
  login() {
    //Cogo lo que hay en los input del html
    const email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    //pasamos la contraseña a md5
    password = this.getMD5(password)
    //hacemos una consulta en la base de dato con el usuario y contraseña para ver si existe
   this.api.login(email, password).subscribe((data => {
      console.log(data)
      // Si la longitud == 1 es que ha devuelto algo
      if (data.length == 1) {
        this.menu.showMenu = !this.menu.showMenu
                this.cookie.addCookie("userID",`${data[0].id}`)
        this.router.navigateByUrl("primarydish")
      } else {
        // si no llamamos al error
        this.errorToast()
      }
    }))
    

  }
  //Funcion para pasar una string a MD5
  getMD5(value: string): string {
    const hash =  new JsHashes.MD5;
    return hash.hex(value);
 }
 //Función cuando le damos al boton register
  register(){
    this.router.navigateByUrl("register")
  }
}
