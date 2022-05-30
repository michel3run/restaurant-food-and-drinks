import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private toastController: ToastController, private api: ApiService) { }
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
  async creditCardToast() {
    const toast = await this.toastController.create({
      message: 'Error el correo ya existe.',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }
  register() {
    let error = false
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const repeatPassword = (document.getElementById("repeatPassword") as HTMLInputElement).value;
    const creditCard = (document.getElementById("creditCard") as HTMLInputElement).value;
    let verifyemail: boolean
    this.api.searchUser(email).subscribe((data) => {
      if (data.length > 0) {
        error=true
        this.emailToast()
        //verifyemail = true
      } else {
        //verifyemail = false
      }
      
    })
  
    
    
   
    if (password != repeatPassword) {
      this.passToast()
      error = true;
    } else if (false) {
      this.emailToast();
      error = true;
    } else {
      if (creditCard.length < 16) {
        this.creditCardToast()
        error= true;
      }
    }

    if (!error) {
      // enviar a la bbdd
    }
  }
}
