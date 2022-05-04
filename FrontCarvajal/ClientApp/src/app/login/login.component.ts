import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { loginI } from '../interfaces/login.interface';
import { ServicioService } from '../servicios/servicio.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  login: loginI;


  constructor(private fb: FormBuilder, private api: ServicioService, private router: Router)
  {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  errorStatus: boolean = false;
  errorMsj: any = "";


  ngOnInit(): void {
  }

  LoginUsuario() {
    console.log(this.form)

    this.login = {
      Correo: this.form.get('correo')!.value,
      Contraseña: this.form.get('contraseña')!.value
    }

    console.log(this.login)  
    this.Login(this.login)

  }

  Login(login: loginI) {

    this.api.loginUsuario(login).subscribe(data => {
      console.log(data)
      //if success {
        if (data.codigo == '50001') {

          this.router.navigate(['/vuelos']);
        }
        else {
          //popup
          this.errorStatus = true;
          this.errorMsj = data.mensaje
        }
    }, (err: any) => {
      console.error('fallo: ' + err);
      this.router.navigate(['/error500']);
    }
    )
  }

}
