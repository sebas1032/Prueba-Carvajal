import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vuelosI } from '../interfaces/vuelos.interface';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  vuelosLista: vuelosI[];

  constructor(private service: ServicioService, private router: Router) { }

  errorStatus: boolean = false;
  errorMsj: any = "";

  ngOnInit(): void {
    this.CargarVuelos()
  }

  CargarVuelos() {
    this.service.ObtenerVuelos(0).subscribe(response => {
      console.log(response)
      this.vuelosLista = response
    })
  }

  Editar(vueloId: number) {
    this.router.navigate(['/editar', vueloId]);
  }

  eliminarVuelo(vueloId: number) {
    this.service.EliminarVuelo(vueloId).subscribe(response => {
      console.log(response)
      if (response.codigo == '50001') {
        this.CargarVuelos();
      }
      else {
        this.errorStatus = true;
        this.errorMsj = response.mensaje
      }
    })
  }


}
