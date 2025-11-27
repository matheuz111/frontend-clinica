import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../../../services/autenticacion.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ChangePasswordPayload } from '../../../../core/models/usuario';

@Component({
  selector: 'app-gestion-configuracion',
  templateUrl: './gestion-configuracion.html',
  styleUrls: ['./gestion-configuracion.css'],
  standalone: false
})
export class GestionConfiguracionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AutenticacionService);
  private usuarioService = inject(UsuarioService);

  formPassword!: FormGroup;
  cargando = false;
  mensajeExito = '';
  mensajeError = '';
  
  // Datos del usuario para mostrar en la tarjeta
  usuarioActual: any = {
    nombre: 'Cargando...',
    rol: ''
  };

  ngOnInit(): void {
    this.initForm();
    this.cargarDatosUsuario();
  }

  initForm(): void {
    this.formPassword = this.fb.group({
      contrasenaActual: ['', Validators.required],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.checkPasswords });
  }

  cargarDatosUsuario(): void {
    // Opción A: Usar datos del token (más rápido)
    this.usuarioActual.rol = this.authService.rolUsuario();
    
    // Opción B: Traer datos frescos del backend (mejor práctica)
    // Descomenta si tu backend tiene este endpoint listo:
    /*
    this.usuarioService.obtenerPerfil().subscribe({
      next: (perfil) => {
        this.usuarioActual.nombre = `${perfil.nombres} ${perfil.apellidos}`;
        this.usuarioActual.email = perfil.email;
      },
      error: () => this.usuarioActual.nombre = 'Usuario'
    });
    */
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  checkPasswords(group: FormGroup) {
    const pass = group.get('nuevaContrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { notSame: true };
  }

  actualizarPassword(): void {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    const payload: ChangePasswordPayload = {
      contrasenaActual: this.formPassword.value.contrasenaActual,
      nuevaContrasena: this.formPassword.value.nuevaContrasena
    };

    this.usuarioService.cambiarContrasena(payload).subscribe({
      next: () => {
        this.cargando = false;
        this.mensajeExito = '¡Contraseña actualizada con éxito!';
        this.formPassword.reset();
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
        // Manejo de errores comunes
        if (err.status === 400 || err.status === 401) {
          this.mensajeError = 'La contraseña actual es incorrecta.';
        } else {
          this.mensajeError = 'Ocurrió un error al actualizar. Intente nuevamente.';
        }
      }
    });
  }
}