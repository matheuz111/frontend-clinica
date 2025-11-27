import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { finalize } from 'rxjs';

export function passwordMatcherValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const confirmarPassword = formGroup.get('confirmarPassword');
    if (!password || !confirmarPassword || !confirmarPassword.dirty) return null;
    return password.value !== confirmarPassword.value ? { passwordMismatch: true } : null;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  formularioRegistro: FormGroup;

  modo = signal<'login' | 'registro'>('login');
  mensajeError = signal<string>('');
  cargando = signal<boolean>(false);
  recordarme = false;
  mostrarContrasena = false;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      documentoIdentidad: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      documentoIdentidad: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['']
    }, { validators: passwordMatcherValidator() });
  }

  ngOnInit(): void {
    const recordarmeGuardado = localStorage.getItem('recordarme');
    this.recordarme = recordarmeGuardado ? JSON.parse(recordarmeGuardado) : false;
    if (this.recordarme) {
      const docRecordado = localStorage.getItem('documentoRecordado') || '';
      this.formularioLogin.get('documentoIdentidad')?.setValue(docRecordado);
    }
  }

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  cambiarModo(): void {
    this.modo.set(this.modo() === 'login' ? 'registro' : 'login');
    this.mensajeError.set('');
    this.formularioLogin.reset();
    this.formularioRegistro.reset();
  }

  enviarFormulario(): void {
    this.mensajeError.set('');

    if (this.modo() === 'login') {
      if (this.formularioLogin.invalid) {
        this.formularioLogin.markAllAsTouched();
        return;
      }

      this.cargando.set(true);
      const { documentoIdentidad, password } = this.formularioLogin.value;

      this.authService.login(documentoIdentidad, password)
        .pipe(finalize(() => this.cargando.set(false)))
        .subscribe({
          next: (response) => {
            if (this.recordarme) {
              localStorage.setItem('documentoRecordado', documentoIdentidad);
              localStorage.setItem('recordarme', JSON.stringify(true));
            } else {
              localStorage.removeItem('documentoRecordado');
              localStorage.removeItem('recordarme');
            }

            const rol = response.rol;
            console.log('Login correcto. Rol:', rol);
            this.redirigirSegunRol(rol);
          },
          error: (err) => {
            console.error(err);
            if (err.status === 403 || err.status === 401) {
              this.mensajeError.set('Credenciales incorrectas.');
            } else {
              this.mensajeError.set('Error de conexión o servidor.');
            }
          }
        });

    } else {
      // Lógica de registro...
      if (this.formularioRegistro.invalid) {
        this.formularioRegistro.markAllAsTouched();
        return;
      }
      this.cargando.set(true);
      const { confirmarPassword, ...registroData } = this.formularioRegistro.value;

      this.authService.register(registroData)
        // Eliminamos finalize aquí para manejar el loading manualmente en el flujo de auto-login
        .subscribe({
          next: () => {
            this.mensajeError.set('Registro exitoso. Iniciando sesión...');

            // AUTO-LOGIN
            this.authService.login(registroData.documentoIdentidad, registroData.password)
              .pipe(finalize(() => this.cargando.set(false)))
              .subscribe({
                next: (response) => {
                  if (this.recordarme) { // Aunque en registro no hay checkbox 'recordarme', por defecto es false
                    // Si quisieras podrías implementarlo, pero por ahora asumimos false o lo que esté
                  }
                  this.redirigirSegunRol(response.rol);
                },
                error: (err) => {
                  console.error('Error en auto-login', err);
                  this.modo.set('login');
                  this.mensajeError.set('Registro exitoso, pero falló el inicio de sesión automático. Por favor ingresa manualmente.');
                  this.formularioLogin.get('documentoIdentidad')?.setValue(registroData.documentoIdentidad);
                }
              });
          },
          error: (err) => {
            this.cargando.set(false);
            this.mensajeError.set(err.error?.mensaje || 'Error al registrarse.');
          }
        });
    }
  }

  get loginCtls() { return this.formularioLogin.controls; }
  get registroCtls() { return this.formularioRegistro.controls; }

  private redirigirSegunRol(rol: string): void {
    if (rol === 'ROLE_PACIENTE') {
      this.router.navigate(['/portal/inicio']);
    } else if (rol === 'ROLE_ADMIN' || rol === 'ROLE_ODONTOLOGO' || rol === 'ROLE_RECEPCIONISTA') {
      this.router.navigate(['/panel/inicio']);
    } else {
      console.warn('Rol desconocido:', rol);
      this.router.navigate(['/']);
    }
  }
}