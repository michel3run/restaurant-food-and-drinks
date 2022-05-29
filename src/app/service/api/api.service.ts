import { Injectable } from '@angular/core';
import {listaUser} from '../../model/usuario.interface'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080/user'
  constructor(private http:HttpClient) { }

  getAllUser():Observable<listaUser[]>{
    return this.http.get<listaUser[]>(this.url);
  }

  getUser(id:string):Observable<listaUser>{
    return this.http.get<listaUser>(this.url +"/"+id)
  }

  postUser(user:string,pass:string){
     this.http.post<any>(this.url+'/userImport',{usuario: user , password : pass})
  }
  
}