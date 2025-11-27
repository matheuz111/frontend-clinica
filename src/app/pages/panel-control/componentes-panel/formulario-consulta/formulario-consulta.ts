import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OdontologoService } from '../../../../services/odontologo.service';
import { Odontologo } from '../../../../core/models/odontologo';

@Component({
  selector: 'app-formulario-consulta',
  templateUrl: './formulario-consulta.html',
  styleUrls: ['./formulario-consulta.css'],
  standalone: false
})
export class FormularioConsultaComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() citaId: number | null = null; // ID de la cita que se está atendiendo
  @Input() pacienteNombre: string = ''; // Para mostrar en el título
  
  // Si estamos editando una consulta existente (historial)
  @Input() consultaData: any | null = null; 

  @Output() onGuardar = new EventEmitter<any>();
  @Output() onCancelar = new EventEmitter<void>();

  formConsulta: FormGroup;
  odontologos: Odontologo[] = [];
  cargando = false;

  private fb = inject(FormBuilder);
  private odontologoService = inject(OdontologoService);

  constructor() {
    this.formConsulta = this.fb.group({
      odontologoId: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(500)]], // Motivo de la consulta actual
      diagnostico: ['', [Validators.required, Validators.maxLength(1000)]],
      tratamiento: ['', [Validators.required, Validators.maxLength(1000)]], // Descripción del tratamiento
      notas: [''] // Notas adicionales
    });
  }

  ngOnInit(): void {
    this.cargarOdontologos();

    if (this.consultaData) {
      this.formConsulta.patchValue(this.consultaData);
    }
  }

  cargarOdontologos(): void {
    this.odontologoService.listar().subscribe({
      next: (data) => this.odontologos = data,
      error: (err) => console.error('Error al cargar odontólogos', err)
    });
  }

  guardar(): void {
    if (this.formConsulta.invalid) {
      this.formConsulta.markAllAsTouched();
      return;
    }

    this.cargando = true;
    
    // Armamos el objeto final
    const resultado = {
      citaId: this.citaId,
      ...this.formConsulta.value,
      fechaRegistro: new Date()
    };

    // Emitimos al padre para que él llame al servicio de Historial
    this.onGuardar.emit(resultado);
    
    // Reset y cerrar
    this.cargando = false;
    this.cerrar();
  }

  cerrar(): void {
    this.onCancelar.emit();
    this.formConsulta.reset();
  }
}