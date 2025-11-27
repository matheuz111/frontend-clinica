import { Component, OnInit, inject } from '@angular/core';
import { PacienteService } from '../../../../services/paciente.service';
import { Paciente } from '../../../../core/models/paciente';
import { ColumnConfig } from '../../../../shared/tabla-generica/tabla-generica';

@Component({
  selector: 'app-gestion-pacientes',
  templateUrl: './gestion-pacientes.html',
  styleUrls: ['./gestion-pacientes.css'],
  standalone: false
})
export class GestionPacientesComponent implements OnInit {
  
  private pacienteService = inject(PacienteService);

  pacientes: Paciente[] = [];
  
  // Estado de los Modales
  mostrarFormulario = false;
  mostrarConfirmacion = false;
  
  pacienteSeleccionado: Paciente | null = null;
  pacienteAEliminar: Paciente | null = null;

  // Configuración de Columnas para Tabla
  columnas: ColumnConfig[] = [
    // CORRECCIÓN: Accedemos al DNI a través de la propiedad anidada usuario
    { name: 'usuario.documentoIdentidad', header: 'DNI/Doc' }, 
    { name: 'nombre', header: 'Nombre' },
    { name: 'apellido', header: 'Apellido' },
    { name: 'telefono', header: 'Teléfono' },
    { name: 'email', header: 'Correo' }
  ];

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.listar().subscribe({
      next: (data) => {
        console.log('Pacientes cargados:', data); // Útil para depurar
        this.pacientes = data;
      },
      error: (e) => console.error('Error al cargar pacientes', e)
    });
  }

  // --- Acciones ---

  abrirCrear(): void {
    this.pacienteSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(paciente: Paciente): void {
    this.pacienteSeleccionado = paciente;
    this.mostrarFormulario = true;
  }

  abrirEliminar(paciente: Paciente): void {
    this.pacienteAEliminar = paciente;
    this.mostrarConfirmacion = true;
  }

  // --- Lógica de Persistencia ---

  guardarPaciente(datos: Paciente): void {
    // CORRECCIÓN: Usamos 'id' en lugar de 'pacienteId'
    if (datos.id) {
      // Actualizar
      this.pacienteService.actualizar(datos.id, datos).subscribe({
        next: () => {
          this.cargarPacientes();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      // Crear
      this.pacienteService.crear(datos).subscribe({
        next: () => {
          this.cargarPacientes();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  confirmarEliminacion(): void {
    // CORRECCIÓN: Verificamos que exista 'id'
    if (this.pacienteAEliminar && this.pacienteAEliminar.id) {
      this.pacienteService.eliminar(this.pacienteAEliminar.id).subscribe({
        next: () => {
          this.cargarPacientes();
          this.mostrarConfirmacion = false;
          this.pacienteAEliminar = null;
        },
        error: (err) => console.error('Error eliminando', err)
      });
    }
  }
}