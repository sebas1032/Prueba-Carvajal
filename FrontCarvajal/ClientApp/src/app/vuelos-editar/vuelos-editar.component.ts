import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { vuelosI } from '../interfaces/vuelos.interface';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-vuelos-editar',
  templateUrl: './vuelos-editar.component.html',
  styleUrls: ['./vuelos-editar.component.css']
})
export class VuelosEditarComponent implements OnInit {

  vuelosLista: vuelosI[];
  form: FormGroup;
  vuelosId: number;
  ciudadOrigen: string;
  ciudadDestino: string;
  fecha: string;
  horaSalida: string;
  horaLlegada: string;
  numeroVuelo: string;
  aerolinea: string;
  estadoVuelo: string;

  errorStatus: boolean = false;
  errorMsj: any = "";


  constructor(private service: ServicioService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.iniciarForm()
  }

  iniciarForm() {
    this.form = this.fb.group({

      ciudadOrigen: '',
      ciudadDestino: '',
      fecha: '',
      horaSalida: '',
      horaLlegada: '',
      numeroVuelo: '',
      aerolinea: '',
      estadoVuelo: ''

    })
  }

  ngOnInit(): void {

    this.vuelosId = this.activatedRoute.snapshot.params['vuelosId'];
    console.log("vuelosId:" + this.vuelosId)
    this.service.ObtenerVuelos(this.vuelosId).subscribe(response => {
      console.log(response)
      this.vuelosLista = response

      console.log(this.vuelosLista)
      this.ciudadOrigen = this.vuelosLista[0].ciudadOrigen;
      this.ciudadDestino = this.vuelosLista[0].ciudadDestino;
      this.fecha = this.vuelosLista[0].fecha;
      this.horaSalida = this.vuelosLista[0].horaSalida;
      this.horaLlegada = this.vuelosLista[0].horaLlegada;
      this.numeroVuelo = this.vuelosLista[0].numeroVuelo;
      this.aerolinea = this.vuelosLista[0].aerolinea;
      this.estadoVuelo = this.vuelosLista[0].estadoVuelo;

    })

  }


  GuardarEdicionVuelos() {
    const vuelos: vuelosI = {
      vuelosId: this.vuelosId,
      ciudadOrigen: this.form.controls['ciudadOrigen'].value ? this.form.controls['ciudadOrigen'].value : this.ciudadOrigen,
      ciudadDestino: this.form.get('ciudadDestino')?.value ? this.form.get('ciudadDestino')?.value : this.ciudadDestino,
      fecha: this.form.get('fecha')?.value ? this.form.get('fecha')?.value : this.fecha,

      horaSalida: this.form.controls['horaSalida'].value ? this.form.controls['horaSalida'].value : this.horaSalida,
      horaLlegada: this.form.get('horaLlegada')?.value ? this.form.get('horaLlegada')?.value : this.horaLlegada,
      numeroVuelo: this.form.get('numeroVuelo')?.value ? this.form.get('numeroVuelo')?.value : this.numeroVuelo,
      aerolinea: this.form.controls['aerolinea'].value ? this.form.controls['aerolinea'].value : this.aerolinea,
      estadoVuelo: this.form.get('estadoVuelo')?.value ? this.form.get('estadoVuelo')?.value : this.estadoVuelo,

    }

    console.log(vuelos)
    this.service.EditarVuelo(vuelos).subscribe(data => {
      console.log(data)
      if (data.codigo == '50001') {
        this.router.navigate(['/vuelos']);

      }
      else {
        //popup
        this.errorStatus = true;
        this.errorMsj = data.mensaje
      }
    })

  }
}
