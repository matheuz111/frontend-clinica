import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';

import { PanelControlRoutingModule } from './panel-control-routing.module';

// === COMPONENTES REUTILIZABLES ===
import { LayoutComponent } from './componentes-panel/layout/layout';
import { BusquedaPacienteComponent } from './componentes-panel/busqueda-paciente/busqueda-paciente';
import { DialogoConfirmacionComponent } from './componentes-panel/dialogo-confirmacion/dialogo-confirmacion';
import { DialogoPrevisualizacionComponent } from './componentes-panel/dialogo-previsualizacion/dialogo-previsualizacion';

// === IMPORTA TU TABLA AQUÍ ===
// Nota: Verifica la ruta. Basado en tus archivos parece ser esta:
import { TablaGenerica } from '../../shared/tabla-generica/tabla-generica'; 

// === FORMULARIOS ===
import { FormularioCitaComponent } from './componentes-panel/formulario-cita/formulario-cita';
import { FormularioConsultaComponent } from './componentes-panel/formulario-consulta/formulario-consulta';
import { FormularioFacturacionComponent } from './componentes-panel/formulario-facturacion/formulario-facturacion';
import { FormularioOdontologoComponent } from './componentes-panel/formulario-odontologo/formulario-odontologo';
import { FormularioPacienteComponent } from './componentes-panel/formulario-paciente/formulario-paciente';
import { FormularioUsuarioComponent } from './componentes-panel/formulario-usuario/formulario-usuario';

// === PÁGINAS ===
import { InicioComponent } from './paginas-panel/inicio/inicio';
import { CalendarioCitasComponent } from './paginas-panel/calendario-citas/calendario-citas';
import { GestionPacientesComponent } from './paginas-panel/gestion-pacientes/gestion-pacientes';
import { GestionOdontologosComponent } from './paginas-panel/gestion-odontologos/gestion-odontologos';
import { GestionUsuariosComponent } from './paginas-panel/gestion-usuarios/gestion-usuarios';
import { GestionFacturacionComponent } from './paginas-panel/gestion-facturacion/gestion-facturacion';
import { MiPerfilComponent } from './paginas-panel/mi-perfil/mi-perfil';
import { HistoriaClinicaComponent } from './paginas-panel/historia-clinica/historia-clinica';
import { GestionConfiguracionComponent } from './paginas-panel/gestion-configuracion/gestion-configuracion';

@NgModule({
  declarations: [
    // Componentes
    LayoutComponent,
    BusquedaPacienteComponent,
    DialogoConfirmacionComponent,
    DialogoPrevisualizacionComponent,
    
    // AÑADE LA TABLA AQUÍ
    TablaGenerica, 
    
    // Formularios
    FormularioCitaComponent,
    FormularioConsultaComponent,
    FormularioFacturacionComponent,
    FormularioOdontologoComponent,
    FormularioPacienteComponent,
    FormularioUsuarioComponent,
    
    // Páginas
    InicioComponent,
    CalendarioCitasComponent,
    GestionPacientesComponent,
    GestionOdontologosComponent,
    GestionUsuariosComponent,
    GestionFacturacionComponent,
    MiPerfilComponent,
    HistoriaClinicaComponent,
    GestionConfiguracionComponent
  ],
  imports: [
    CommonModule, // Esto habilita los pipes date y currency para la Tabla
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    PanelControlRoutingModule
  ]
})
export class PanelControlModule { }