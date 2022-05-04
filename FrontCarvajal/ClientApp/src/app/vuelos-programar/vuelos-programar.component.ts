import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { vuelosI } from '../interfaces/vuelos.interface';
import { ServicioService } from '../servicios/servicio.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as myjQuery from 'jquery';
import { combosI } from '../interfaces/combos.interface';



@Component({
  selector: 'app-vuelos-programar',
  templateUrl: './vuelos-programar.component.html',
  styleUrls: ['./vuelos-programar.component.css']
})
export class VuelosProgramarComponent implements OnInit {

  form: FormGroup;
  model: NgbDateStruct;
  ciudades: combosI[];
  estados: combosI[];
  aerolineas: combosI[];
  date: { year: number, month: number };
  tipo: number
 
  


  constructor(private service: ServicioService, private fb: FormBuilder, private router: Router, private calendar: NgbCalendar) {

    this.form = this.fb.group({
      ciudadOrigen: [''],
      ciudadDestino: [''],
      fecha: [''],
      horaSalida: [''],
      minutoSalida: [''],
      franjaSalida: [''],
      horaLlegada: [''],
      minutoLlegada: [''],
      franjaLlegada: [''],
      numeroVuelo: [''],
      aerolinea: [''],
      estadoVuelo: [''],

    })
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }



  errorStatus: boolean = false;
  errorMsj: any = "";
  $: any;



  ngOnInit(): void {

    this.service.ObtenerCiudades().subscribe(response => {
      console.log(response)
      this.ciudades = response
    })

    this.service.ObtenerEstados().subscribe(response => {
      console.log(response)
      this.estados = response
    })

    this.service.ObtenerAerolineas().subscribe(response => {
      console.log(response)
      this.aerolineas = response
    })

  }






  ProgramarNuevoVuelo() {
    const vuelos: vuelosI = {
      vuelosId: 0,
      ciudadOrigen: this.form.get('ciudadOrigen')?.value,
      ciudadDestino: this.form.get('ciudadDestino')?.value,
      fecha: this.form.get('fecha')?.value,
      horaSalida: this.form.get('horaSalida')?.value.toString() + ":" + (this.form.get('minutoSalida')?.value.toString() == 0 ? "00" : this.form.get('minutoSalida')?.value.toString()) + " " + (this.form.get('franjaSalida')?.value == "1" ? "AM":"PM"),
      horaLlegada: this.form.get('horaLlegada')?.value.toString() + ":" + (this.form.get('minutoLlegada')?.value.toString() == 0 ? "00" : this.form.get('minutoLlegada')?.value.toString()) + " " + (this.form.get('franjaLlegada')?.value == "1" ? "AM" : "PM"),
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
