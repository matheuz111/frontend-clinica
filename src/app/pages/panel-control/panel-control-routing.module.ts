import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Importamos el Layout Principal (el marco con menú lateral)
import { LayoutComponent } from './componentes-panel/layout/layout';

// 2. Importamos las Páginas (el contenido cambiante)
import { InicioComponent } from './paginas-panel/inicio/inicio';
import { CalendarioCitasComponent } from './paginas-panel/calendario-citas/calendario-citas';
import { GestionPacientesComponent } from './paginas-panel/gestion-pacientes/gestion-pacientes';
import { GestionOdontologosComponent } from './paginas-panel/gestion-odontologos/gestion-odontologos';
import { GestionUsuariosComponent } from './paginas-panel/gestion-usuarios/gestion-usuarios';
import { GestionFacturacionComponent } from './paginas-panel/gestion-facturacion/gestion-facturacion';
import { MiPerfilComponent } from './paginas-panel/mi-perfil/mi-perfil';
import { HistoriaClinicaComponent } from './paginas-panel/historia-clinica/historia-clinica';
import { GestionConfiguracionComponent } from './paginas-panel/gestion-configuracion/gestion-configuracion';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent, // Carga el Sidebar y Navbar
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirección por defecto
      { path: 'inicio', component: InicioComponent },
      { path: 'citas', component: CalendarioCitasComponent },
      { path: 'pacientes', component: GestionPacientesComponent },
      { path: 'odontologos', component: GestionOdontologosComponent },
      { path: 'usuarios', component: GestionUsuariosComponent },
      { path: 'facturacion', component: GestionFacturacionComponent },
      { path: 'historial', component: HistoriaClinicaComponent },
      { path: 'perfil', component: MiPerfilComponent },
      { path: 'configuracion', component: GestionConfiguracionComponent },
      { path: '**', redirectTo: 'inicio' } // Ruta comodín para errores
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usamos forChild porque es un módulo hijo
  exports: [RouterModule]
})
export class PanelControlRoutingModule { }