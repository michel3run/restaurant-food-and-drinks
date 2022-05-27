import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  prueba = new AppComponent()
  escribe = this.prueba.islogin
  constructor() { }

  ngOnInit() {
  }
  login(){
    //this.escribe= false
  }
}
