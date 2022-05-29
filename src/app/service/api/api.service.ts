import { Injectable } from '@angular/core';
import {listaUser} from '../../model/usuario.interface'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080/event'
  constructor(private http:HttpClient) { }

  getAllUser():Observable<listaUser[]>{
    return this.http.get<listaUser[]>(this.url);
  }
}
