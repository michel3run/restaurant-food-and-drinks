import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
 }
  

  login(){
  const  prueba = new AppComponent
  
   // this.router.navigateByUrl("primarydish")
    
  }
}
