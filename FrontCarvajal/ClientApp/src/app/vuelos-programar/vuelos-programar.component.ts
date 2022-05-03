import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { vuelosI } from '../interfaces/vuelos.interface';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-vuelos-programar',
  templateUrl: './vuelos-programar.component.html',
  styleUrls: ['./vuelos-programar.component.css']
})
export class VuelosProgramarComponent implements OnInit {

  form: FormGroup;

  constructor(private service: ServicioService, private fb: FormBuilder, private router: Router) {

    this.form = this.fb.group({
      ciudadOrigen: [''],
      ciudadDestino: [''],
      fecha: [''],
      horaSalida: [''],
      horaLlegada: [''],
      numeroVuelo: [''],
      aerolinea: [''],
      estadoVuelo: [''],

    })
  }

  errorStatus: boolean = false;
  errorMsj: any = "";


  ngOnInit(): void {
  }


  ProgramarNuevoVuelo() {
    const vuelos: vuelosI = {
      vuelosId: 0,
      ciudadOrigen: this.form.get('ciudadOrigen')?.value,
      ciudadDestino: this.form.get('ciudadDestino')?.value,
      fecha: this.form.get('fecha')?.value,
      horaSalida: this.form.get('horaSalida')?.value,
      horaLlegada: this.form.get('horaLlegada')?.value,
      numeroVuelo: this.form.get('numeroVuelo')?.value,
      aerolinea: this.form.get('aerolinea')?.value,
      estadoVuelo: this.form.get('estadoVuelo')?.value,
    }
    console.log(vuelos)

    this.service.AgregarNuevoVuelo(vuelos).subscribe(data => {
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
