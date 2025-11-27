import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { UserProfile } from '../../../../core/models/usuario';
import { AutenticacionService } from '../../../../services/autenticacion.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.css'],
  standalone: false
})
export class MiPerfilComponent implements OnInit {

  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AutenticacionService);

  perfilForm: FormGroup;
  usuario: UserProfile | null = null;
  cargando = false;
  mensajeExito = '';
  mensajeError = '';

  // Para mostrar las iniciales en el avatar
  iniciales = '';

  constructor() {
    this.perfilForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      documentoIdentidad: [{ value: '', disabled: true }], // El DNI no se suele editar
      telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]] // Opcional
    });
  }

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando = true;
    // Opción 1: Usar servicio si tienes el endpoint
    this.usuarioService.obtenerPerfil().subscribe({
      next: (data) => {
        this.usuario = data;
        this.actualizarFormulario(data);
        this.calcularIniciales(data);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando perfil', err);
        // Fallback: Intentar leer del token/auth service si falla el endpoint
        // const datosLocales = this.authService.obtenerDatosUsuarioLocal(); 
        this.cargando = false;
      }
    });
  }

  actualizarFormulario(data: UserProfile): void {
    this.perfilForm.patchValue({
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      documentoIdentidad: data.documentoIdentidad,
      // telefono: data.telefono // Si tu backend devuelve teléfono en UserProfile
    });
  }

  calcularIniciales(data: UserProfile): void {
    const nombre = data.nombres ? data.nombres.charAt(0) : '';
    const apellido = data.apellidos ? data.apellidos.charAt(0) : '';
    this.iniciales = (nombre + apellido).toUpperCase();
  }

  guardarCambios(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    // Solo enviamos los campos editables, no el documento de identidad
    const datosActualizados = {
      nombres: this.perfilForm.get('nombres')?.value,
      apellidos: this.perfilForm.get('apellidos')?.value,
      email: this.perfilForm.get('email')?.value,
      telefono: this.perfilForm.get('telefono')?.value || null
    };

    this.usuarioService.actualizarPerfil(datosActualizados).subscribe({
      next: (usuarioActualizado) => {
        this.usuario = usuarioActualizado;
        this.mensajeExito = '¡Perfil actualizado correctamente!';
        this.cargando = false;

        // Opcional: Actualizar estado global si usas signals/subjects en AuthService
        // this.authService.actualizarUsuarioSesion(usuarioActualizado);
      },
      error: (err) => {
        this.mensajeError = 'No se pudo actualizar el perfil. Intente nuevamente.';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}