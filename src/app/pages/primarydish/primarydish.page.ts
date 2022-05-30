import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-primarydish',
  templateUrl: './primarydish.page.html',
  styleUrls: ['./primarydish.page.scss'],
})
export class PrimarydishPage implements OnInit {

  constructor(private api : ApiService) { }

  ngOnInit() {
    this.api.getAllProduct().subscribe((data)=>{
      console.log(data)
    })
  }

}
