import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { combosI } from '../interfaces/combos.interface';
import { loginI } from '../interfaces/login.interface';
import { responseI } from '../interfaces/response.interface';
import { vuelosI } from '../interfaces/vuelos.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  urlLogin = environment.urlLogin;
  urlVuelosConsultar = environment.vuelosConsultar
  urlVuelosCrear = environment.vuelosCrear
  urlVuelosEditar = environment.vuelosEditar
  urlVuelosEliminar = environment.vuelosEliminar
  urlCiudades = environment.urlCiudades
  urlEstados = environment.urlEstados
  urlAerolineas = environment.urlAerolineas

  constructor(private http: HttpClient) { }



  loginUsuario(login: loginI): Observable<responseI> {
    let url = this.urlLogin
    return this.http.post<responseI>(url, login)
  }


  ObtenerVuelos(vuelosId: number): Observable<vuelosI[]> {
    return this.http.get<vuelosI[]>(this.urlVuelosConsultar + "/" + vuelosId)
  }


  AgregarNuevoVuelo(vuelos: vuelosI): Observable<responseI> {
    let url = this.urlVuelosCrear
    return this.http.post<responseI>(url, vuelos)
  }

  EliminarVuelo(vuelosId: Number): Observable<responseI> {
    let url = this.urlVuelosEliminar + vuelosId
    return this.http.get<responseI>(url)
  }


  EditarVuelo(vuelos: vuelosI): Observable<responseI> {
    let url = this.urlVuelosEditar
    return this.http.post<responseI>(url, vuelos)
  }


  ObtenerCiudades(): Observable<combosI[]> {
    return this.http.get<combosI[]>(this.urlCiudades)
  }

  ObtenerEstados(): Observable<combosI[]> {
    return this.http.get<combosI[]>(this.urlEstados)
  }

  ObtenerAerolineas(): Observable<combosI[]> {
    return this.http.get<combosI[]>(this.urlAerolineas)
  }

}
