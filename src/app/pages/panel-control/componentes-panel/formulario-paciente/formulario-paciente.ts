import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../../../core/models/paciente';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.html',
  styleUrls: ['./formulario-paciente.css'],
  standalone: false
})
export class FormularioPacienteComponent implements OnInit {
  @Input() paciente: Paciente | null = null; // Si es null, es nuevo
  @Input() visible: boolean = false;

  @Output() onGuardar = new EventEmitter<Paciente>();
  @Output() onCancelar = new EventEmitter<void>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      // El documento de identidad suele ser único y vital
      documentoIdentidad: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.pattern(/^[0-9]{9,15}$/)]],
      email: ['', [Validators.email]], // Opcional en tu BD, pero validamos formato si se escribe
      fechaNacimiento: [''],
      genero: [''],
      direccion: [''],
      alergias: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente']) {
      this.actualizarFormulario();
    }
  }

  ngOnInit(): void {
    // Inicialización adicional si fuera necesaria
  }

  private actualizarFormulario(): void {
    if (this.paciente) {
      this.form.patchValue(this.paciente);
    } else {
      this.form.reset();
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.getRawValue();
    // Combinamos datos existentes (id, usuarioId) con los del form
    const pacienteFinal: Paciente = {
      ...this.paciente,
      ...datos
    };

    this.onGuardar.emit(pacienteFinal);
    this.cerrar();
  }

  cerrar(): void {
    this.onCancelar.emit();
    this.form.reset();
  }
}