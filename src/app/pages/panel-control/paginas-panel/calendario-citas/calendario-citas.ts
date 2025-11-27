import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; 

import { CitaService } from '../../../../services/cita.service';
import { FormularioCitaComponent } from '../../componentes-panel/formulario-cita/formulario-cita';

@Component({
  selector: 'app-calendario-citas',
  templateUrl: './calendario-citas.html',
  styleUrls: ['./calendario-citas.css'],
  standalone: false
})
export class CalendarioCitasComponent implements OnInit {
  
  @ViewChild(FormularioCitaComponent) formularioCita!: FormularioCitaComponent;

  mostrarModalCreacion = false;
  eventosCalendario: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [] 
  };

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.listar().subscribe({
      next: (citas) => {
        console.log('Citas recibidas del backend:', citas); // Debug para ver estructura

        this.eventosCalendario = citas.map(cita => {
          // PROTECCIÓN: Verificar que los objetos existan para evitar errores
          const nombrePaciente = cita.paciente ? `${cita.paciente.nombre} ${cita.paciente.apellido}` : 'Paciente Desconocido';
          const nombreOdontologo = cita.odontologo ? `${cita.odontologo.nombre} ${cita.odontologo.apellido}` : 'No asignado';
          
          // CORRECCIÓN: Usamos cita.id (o fallback seguro si viene undefined)
          const citaId = cita.id ? cita.id.toString() : 'tmp-' + Math.random();

          return {
            id: citaId,
            title: `${nombrePaciente} - ${cita.motivo}`,
            start: `${cita.fechaCita}T${cita.horaCita}`, 
            backgroundColor: this.getColorEstado(cita.estado || 'pendiente'),
            borderColor: this.getColorEstado(cita.estado || 'pendiente'),
            extendedProps: {
              odontologo: nombreOdontologo,
              estado: cita.estado,
              pacienteCompleto: cita.paciente // Guardamos referencia útil
            }
          };
        });
        
        this.calendarOptions.events = this.eventosCalendario;
      },
      error: (err) => console.error('Error al cargar citas', err)
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.mostrarModalCreacion = true;
    setTimeout(() => {
      if (this.formularioCita) {
        this.formularioCita.formCita.patchValue({
          fechaCita: selectInfo.startStr.split('T')[0], 
          horaCita: selectInfo.startStr.includes('T') ? selectInfo.startStr.split('T')[1].substring(0, 5) : ''
        });
      }
    }, 100);
  }

  handleEventClick(clickInfo: EventClickArg) {
    const props = clickInfo.event.extendedProps;
    alert(`Cita de: ${clickInfo.event.title}\nOdontólogo: ${props['odontologo']}\nEstado: ${props['estado']}`);
  }

  onCitaGuardada(): void {
    this.mostrarModalCreacion = false;
    this.cargarCitas(); 
    alert('¡Cita agendada con éxito!');
  }

  cerrarModal(): void {
    this.mostrarModalCreacion = false;
  }

  private getColorEstado(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'confirmada': return '#198754'; 
      case 'pendiente': return '#ffc107'; 
      case 'programada': return '#0dcaf0'; // Nuevo estado de tu backend
      case 'cancelada': return '#dc3545'; 
      case 'completada': return '#0d6efd'; 
      default: return '#3788d8';
    }
  }
}