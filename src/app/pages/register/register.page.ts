import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private toastController: ToastController , private api: ApiService) { }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error la contraseña no son iguales.',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
  }
  register() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const repeatPassword = (document.getElementById("repeatPassword") as HTMLInputElement).value;
    const creditCard = (document.getElementById("creditCard") as HTMLInputElement).value;
    const verifyEmail = this.api.searchUser(email)
    if (password != repeatPassword) {
      this.presentToast()
    } else if(email){

    }

  }
}
