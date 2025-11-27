import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../../../../services/cita.service';
import { OdontologoService } from '../../../../services/odontologo.service';
import { Paciente } from '../../../../core/models/paciente';
import { Odontologo } from '../../../../core/models/odontologo';
import { Cita } from '../../../../core/models/cita';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.html',
  styleUrls: ['./formulario-cita.css'],
  standalone: false
})
export class FormularioCitaComponent implements OnInit {
  
  @Output() onGuardar = new EventEmitter<Cita>();
  @Output() onCancelar = new EventEmitter<void>();

  formCita: FormGroup;
  pacienteSeleccionado: Paciente | null = null;
  odontologos: Odontologo[] = [];
  cargando = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private odontologoService: OdontologoService
  ) {
    this.formCita = this.fb.group({
      odontologoId: ['', Validators.required],
      fechaCita: ['', Validators.required],
      horaCita: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.cargarOdontologos();
  }

  cargarOdontologos(): void {
    this.odontologoService.listar().subscribe({
      next: (data) => this.odontologos = data,
      error: (err) => console.error('Error cargando odontólogos', err)
    });
  }

  recibirPaciente(paciente: Paciente): void {
    this.pacienteSeleccionado = paciente;
    this.mensajeError = '';
  }

  guardarCita(): void {
    if (!this.pacienteSeleccionado) {
      this.mensajeError = 'Debes buscar y seleccionar un paciente primero.';
      return;
    }

    if (this.formCita.invalid) {
      this.formCita.markAllAsTouched();
      return;
    }

    this.cargando = true;
    
    // Construimos el objeto Cita
    const nuevaCita: Cita = {
      // CORRECCIÓN AQUÍ: Usamos 'id' en lugar de 'citaId'
      id: 0, 
      
      // Asegúrate de que tu modelo Cita tenga pacienteId y odontologoId definidos como opcionales o obligatorios
      pacienteId: this.pacienteSeleccionado.id,
      odontologoId: +this.formCita.value.odontologoId,
      
      fechaCita: this.formCita.value.fechaCita,
      horaCita: this.formCita.value.horaCita,
      motivo: this.formCita.value.motivo,
      estado: 'Pendiente'
    };

    console.log('Enviando cita:', nuevaCita);

    this.citaService.crear(nuevaCita).subscribe({
      next: (citaCreada) => {
        this.cargando = false;
        this.onGuardar.emit(citaCreada);
        this.resetearFormulario(); 
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = 'Ocurrió un error al agendar la cita. Verifica la disponibilidad.';
        console.error(err);
      }
    });
  }

  cancelar(): void {
    this.onCancelar.emit();
    this.resetearFormulario(); 
  }

  resetearFormulario(): void {
    this.formCita.reset();           
    this.pacienteSeleccionado = null; 
    this.mensajeError = '';           
    this.cargando = false;            
  }
}