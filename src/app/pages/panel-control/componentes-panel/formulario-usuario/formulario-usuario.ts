import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile, CreateUserPayload } from '../../../../core/models/usuario';
import { Rol } from '../../../../core/models/rol';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.html',
  styleUrls: ['./formulario-usuario.css'],
  standalone: false
})
export class FormularioUsuarioComponent implements OnInit {
  @Input() usuario: UserProfile | null = null; // Si es null, modo creación
  @Input() visible: boolean = false;
  
  @Output() onGuardar = new EventEmitter<CreateUserPayload | UserProfile>();
  @Output() onCancelar = new EventEmitter<void>();

  form: FormGroup;
  rolesDisponibles = Object.values(Rol); // ['Administrador', 'Odontologo', etc.]
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      // Documento es vital en tu DB para el login
      documentoIdentidad: ['', [Validators.required, Validators.minLength(8)]], 
      email: ['', [Validators.required, Validators.email]],
      rol: [Rol.RECEPCIONISTA, Validators.required],
      password: [''] // Se valida condicionalmente en ngOnInit
    });
  }

  ngOnInit(): void {
    if (this.usuario) {
      // Modo Edición
      this.form.patchValue(this.usuario);
      // No requerimos password al editar, y bloqueamos el DNI
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
      this.form.get('documentoIdentidad')?.disable();
    } else {
      // Modo Creación: Password obligatoria
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // getRawValue incluye campos deshabilitados (como DNI en edición)
    const datos = this.form.getRawValue(); 
    
    const usuarioFinal = this.usuario 
      ? { ...this.usuario, ...datos } // Update: mantiene ID
      : datos; // Create: payload puro

    this.onGuardar.emit(usuarioFinal);
    this.cerrar();
  }

  cerrar(): void {
    this.onCancelar.emit();
    this.form.reset();
  }
}