import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TratamientoService } from '../../../../services/tratamiento.service';
import { PacienteService } from '../../../../services/paciente.service';
import { HistorialTratamiento } from '../../../../core/models/tratamiento';
import { ColumnConfig } from '../../../../shared/tabla-generica/tabla-generica'; // Importación correcta
import { Paciente } from '../../../../core/models/paciente';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.html',
  styleUrls: ['./historia-clinica.css'],
  standalone: false // <--- CORRECCIÓN IMPORTANTE
})
export class HistoriaClinicaComponent implements OnInit {
  
  private tratamientoService = inject(TratamientoService);
  private pacienteService = inject(PacienteService);
  private route = inject(ActivatedRoute);

  historial: HistorialTratamiento[] = [];
  pacienteActual: Paciente | null = null;
  
  // Configuración de Tabla
  columnas: ColumnConfig[] = [
    { name: 'fechaRealizacion', header: 'Fecha', isDate: true },
    { name: 'cita.odontologo.nombre', header: 'Odontólogo' }, 
    { name: 'diagnostico', header: 'Diagnóstico' },
    { name: 'tratamiento', header: 'Tratamiento' } 
  ];

  // Modal
  mostrarDetalle = false;
  registroSeleccionado: any = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pacienteId = params['pacienteId'];
      if (pacienteId) {
        this.cargarHistorialPaciente(+pacienteId);
      } else {
        this.agregarColumnaPaciente();
        this.cargarHistorialGeneral();
      }
    });
  }

  agregarColumnaPaciente(): void {
    // Verifica si ya existe para no duplicarla si se recarga
    if (!this.columnas.some(c => c.header === 'Paciente')) {
        this.columnas.unshift({ name: 'cita.paciente.nombre', header: 'Paciente' });
    }
  }

  cargarHistorialPaciente(id: number): void {
    this.pacienteService.obtenerPorId(id).subscribe(p => this.pacienteActual = p);
    
    this.tratamientoService.obtenerHistorialPorPaciente(id).subscribe({
      next: (data) => this.historial = data,
      error: (err) => console.error('Error cargando historial', err)
    });
  }

  cargarHistorialGeneral(): void {
    this.tratamientoService.listarHistorialGeneral().subscribe({
      next: (data) => this.historial = data,
      error: (err) => console.error('Error cargando historial general', err)
    });
  }

  // --- Acciones ---

  verDetalle(registro: HistorialTratamiento): void {
    this.registroSeleccionado = {
      odontologoId: registro.citaId ? 0 : 0, 
      motivo: 'Consulta Histórica',
      diagnostico: registro.diagnostico,
      tratamiento: registro.detalles?.[0]?.observaciones || 'Ver detalles...',
      notas: ''
    };
    this.mostrarDetalle = true;
  }
}