import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/service/menu/menu.service';
import { ApiService } from '../../service/api/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private api: ApiService, private menu:MenuService) {
  }

  ngOnInit() {

  }


  login() {
    this.menu.showMenu=!this.menu.showMenu
    /* this.api.getAllUser().subscribe(data=>{
       console.log(data)
     })*/
    /*
      this.api.getUser("michel@gmail.com").subscribe((data)=>{
        console.log(data)
      })*/

    //this.api.postUser("login", "contraseña").subscribe()

     this.router.navigateByUrl("primarydish")

  }
}
