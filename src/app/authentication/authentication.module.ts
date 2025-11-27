import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticationRoutingModule } from './authentication-routing.module';

// Importamos los componentes
import { LoginComponent } from './login/login';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena';

@NgModule({
  declarations: [
    // AQUÍ NO van los componentes standalone
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Los componentes Standalone se ponen AQUÍ, como si fueran módulos
    LoginComponent,
    RecuperarContrasenaComponent 
  ]
})
export class AuthenticationModule { }