import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Odontologo } from '../../../../core/models/odontologo';

@Component({
  selector: 'app-formulario-odontologo',
  templateUrl: './formulario-odontologo.html',
  styleUrls: ['./formulario-odontologo.css'],
  standalone: false
})
export class FormularioOdontologoComponent implements OnInit {
  @Input() odontologo: Odontologo | null = null; // Si es null, es creación
  @Input() visible: boolean = false;
  
  @Output() onGuardar = new EventEmitter<Odontologo>();
  @Output() onCancelar = new EventEmitter<void>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      especialidad: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]], // Ejemplo validación Perú
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.odontologo) {
      this.form.patchValue(this.odontologo);
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datosFormulario = this.form.value;
    // Si editamos, mantenemos el ID y usuarioId, si creamos son nuevos
    const odontologoFinal: Odontologo = {
      ...this.odontologo, 
      ...datosFormulario
    };

    this.onGuardar.emit(odontologoFinal);
    this.cerrar();
  }

  cerrar(): void {
    this.onCancelar.emit();
    this.form.reset();
  }
}