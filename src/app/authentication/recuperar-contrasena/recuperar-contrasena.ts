import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true, // Hacemos explícito que es standalone
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './recuperar-contrasena.html',
  styleUrls: ['./recuperar-contrasena.css']
})
export class RecuperarContrasenaComponent { // <--- Nombre corregido
  
  formRecuperacion: FormGroup;
  mensajeExito: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AutenticacionService
  ) {
    this.formRecuperacion = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarSolicitud(): void {
    if (this.formRecuperacion.invalid) {
      this.formRecuperacion.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';

    const email = this.formRecuperacion.get('email')?.value;

    this.authService.recuperarContrasena(email).subscribe({
      next: () => {
        this.cargando = false;
        this.mensajeExito = 'Se ha enviado un enlace de recuperación a tu correo.';
        this.formRecuperacion.reset();
      },
      // AQUÍ ESTÁ EL CAMBIO: agregamos ": any"
      error: (err: any) => { 
        this.cargando = false;
        console.error(err); // Buena práctica loguear el error real
        this.error = 'No se pudo procesar la solicitud. Verifica el correo.';
      }
    });
  }

  volver(): void {
    this.router.navigate(['/authentication/login']);
  }
}