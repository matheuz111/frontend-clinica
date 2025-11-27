import { Component, OnInit, inject } from '@angular/core';
import { OdontologoService } from '../../../../services/odontologo.service';
import { Odontologo } from '../../../../core/models/odontologo';
// CORRECCIÓN 1: Importar ColumnConfig desde la ubicación correcta (shared)
import { ColumnConfig } from '../../../../shared/tabla-generica/tabla-generica';

@Component({
  selector: 'app-gestion-odontologos',
  templateUrl: './gestion-odontologos.html',
  styleUrls: ['./gestion-odontologos.css'],
  standalone: false // CORRECCIÓN 2: Necesario para que funcione en tu PanelControlModule
})
export class GestionOdontologosComponent implements OnInit {
  
  private odontologoService = inject(OdontologoService);

  odontologos: Odontologo[] = [];
  
  // Variables para Modales
  mostrarFormulario = false;
  mostrarConfirmacion = false;
  
  odontologoSeleccionado: Odontologo | null = null; // Para editar
  odontologoAEliminar: Odontologo | null = null;

  // Configuración de la Tabla
  columnas: ColumnConfig[] = [
    { name: 'nombre', header: 'Nombre' },
    { name: 'apellido', header: 'Apellido' },
    { name: 'especialidad', header: 'Especialidad' },
    { name: 'telefono', header: 'Teléfono' },
    { name: 'email', header: 'Correo' }
  ];

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.odontologoService.listar().subscribe({
      next: (data) => this.odontologos = data,
      error: (e) => console.error('Error al cargar odontólogos', e)
    });
  }

  // --- Acciones de la Tabla ---

  abrirCrear(): void {
    this.odontologoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(odontologo: Odontologo): void {
    this.odontologoSeleccionado = odontologo;
    this.mostrarFormulario = true;
  }

  abrirEliminar(odontologo: Odontologo): void {
    this.odontologoAEliminar = odontologo;
    this.mostrarConfirmacion = true;
  }

  // --- Lógica de Guardado ---

  guardarOdontologo(datos: Odontologo): void {
    if (datos.id) {
      // Actualizar
      this.odontologoService.actualizar(datos.id, datos).subscribe(() => {
        this.cargarLista();
        this.mostrarFormulario = false;
      });
    } else {
      // Crear
      this.odontologoService.crear(datos).subscribe(() => {
        this.cargarLista();
        this.mostrarFormulario = false;
      });
    }
  }

  confirmarEliminacion(): void {
    if (this.odontologoAEliminar && this.odontologoAEliminar.id) {
      // Nota: Asegúrate de tener el método eliminar en tu servicio.
      // this.odontologoService.eliminar(this.odontologoAEliminar.odontologoId).subscribe(...)
      console.log('Eliminando a:', this.odontologoAEliminar.nombre);
      
      // Simulación visual si falta el endpoint
      this.odontologos = this.odontologos.filter(o => o.id !== this.odontologoAEliminar?.id);
    }
    this.mostrarConfirmacion = false;
    this.odontologoAEliminar = null;
  }
}