import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  constructor(private toastController: ToastController, private api: ApiService,private router: Router) { }
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
      message: 'La tarjeta de credito no es valida.',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }
  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  register() {
    let error = false
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const repeatPassword = (document.getElementById("repeatPassword") as HTMLInputElement).value;
    const creditCard = (document.getElementById("creditCard") as HTMLInputElement).value;
    if (password != repeatPassword) {    
      this.passToast()
      error = true;
    } else if(creditCard.length<16) {
        this.creditCardToast()
        error= true;
    }

    this.api.searchUser(email).subscribe((data) => {
      if(data.length >0 ){
        this.emailToast()
        error=true
      }else{
        if (!error) {
          // enviar a la bbdd
         // this.api.postUser(email,password,creditCard).subscribe()
          this.router.navigateByUrl('login')
          
        }
      }

      
    })
  
    
    
   



  }
}
