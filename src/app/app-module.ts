// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // 1. Importar HTTP_INTERCEPTORS

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';

// 2. Importar tu interceptor
import { JwtInterceptor } from './core/interceptors/jwt-interceptor';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    // 3. REGISTRAR EL INTERCEPTOR AQUÍ
    // Esto le dice a Angular: "Usa JwtInterceptor para todas las peticiones HTTP"
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }