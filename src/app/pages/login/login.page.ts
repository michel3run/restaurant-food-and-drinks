import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { ApiService } from '../../service/api/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private api: ApiService, private menu: MenuService , private toastController: ToastController ) {
  }

  ngOnInit() {

  }
  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Error el usuario o contraseña son incorrectos.',
      duration: 2000
    });
    toast.present();
  }

  login() {

    /* this.api.getAllUser().subscribe(data=>{
       console.log(data)
     })*/
    /*
      this.api.getUser("michel@gmail.com").subscribe((data)=>{
        console.log(data)
      })*/

    //this.api.postUser("login", "contraseña").subscribe()
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    this.api.login(email, password).subscribe((data => {
      console.log(data)
      if (data.length == 1) {
        this.menu.showMenu = !this.menu.showMenu
        this.router.navigateByUrl("primarydish")
      } else {
        this.errorToast()
      }
    }))
    

  }
}
