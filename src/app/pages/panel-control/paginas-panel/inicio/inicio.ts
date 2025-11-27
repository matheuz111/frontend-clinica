import { Component, OnInit, inject } from '@angular/core';
import { AutenticacionService } from '../../../../services/autenticacion.service';
import { CitaService } from '../../../../services/cita.service';
import { PacienteService } from '../../../../services/paciente.service';
import { Cita } from '../../../../core/models/cita';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css'],
  standalone: false
})
export class InicioComponent implements OnInit {
  
  private authService = inject(AutenticacionService);
  private citaService = inject(CitaService);
  private pacienteService = inject(PacienteService);

  // Datos del usuario
  nombreUsuario = '';
  rolUsuario = '';

  // KPIs (Indicadores Clave)
  totalPacientes = 0;
  citasHoy = 0;
  citasPendientes = 0;
  
  // Listas para mostrar
  listaCitasHoy: Cita[] = [];
  cargando = true;

  ngOnInit(): void {
    // 1. Obtener info del usuario actual
    this.nombreUsuario = 'Usuario'; // Podrías decodificar el token si tienes el nombre ahí
    this.rolUsuario = this.authService.rolUsuario() || '';

    // 2. Cargar datos del Dashboard
    this.cargarKpis();
  }

  cargarKpis(): void {
    this.cargando = true;
    const hoy = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Cargar Citas (Filtrando en frontend por simplicidad si el backend no filtra)
    this.citaService.listar().subscribe({
      next: (citas) => {
        // Citas de Hoy
        this.listaCitasHoy = citas.filter(c => c.fechaCita.toString().startsWith(hoy));
        this.citasHoy = this.listaCitasHoy.length;

        // Citas Pendientes (Total)
        this.citasPendientes = citas.filter(c => c.estado === 'Pendiente').length;
        
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando citas', err);
        this.cargando = false;
      }
    });

    // Cargar Total Pacientes
    this.pacienteService.listar().subscribe({
      next: (pacientes) => {
        this.totalPacientes = pacientes.length;
      }
    });
  }

  // Helper para obtener color según estado
  getColorEstado(estado: string): string {
    switch (estado) {
      case 'Confirmada': return 'success';
      case 'Pendiente': return 'warning';
      case 'Cancelada': return 'danger';
      case 'Completada': return 'primary';
      default: return 'secondary';
    }
  }
}