import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import {ApiService} from '../../service/api/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router , private api:ApiService) {
  }

  ngOnInit() {
   
 }
  

  login(){
  const  prueba = new AppComponent
 /* this.api.getAllUser().subscribe(data=>{
    console.log(data)
  })*/
/*
  this.api.getUser("michel@gmail.com").subscribe((data)=>{
    console.log(data)
  })*/

this.api.postUser("michel","contraseña")

   // this.router.navigateByUrl("primarydish")
    
  }
}
