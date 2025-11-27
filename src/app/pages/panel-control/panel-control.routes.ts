import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos el Layout principal del panel (el que tiene el sidebar y navbar)
import { LayoutComponent } from './componentes-panel/layout/layout';

// Importamos las páginas del panel
import { InicioComponent } from './paginas-panel/inicio/inicio';
import { CalendarioCitasComponent } from './paginas-panel/calendario-citas/calendario-citas';
import { GestionPacientesComponent } from './paginas-panel/gestion-pacientes/gestion-pacientes';
import { GestionOdontologosComponent } from './paginas-panel/gestion-odontologos/gestion-odontologos';
import { GestionUsuariosComponent } from './paginas-panel/gestion-usuarios/gestion-usuarios';
import { GestionFacturacionComponent } from './paginas-panel/gestion-facturacion/gestion-facturacion';
import { MiPerfilComponent } from './paginas-panel/mi-perfil/mi-perfil';
import { HistoriaClinicaComponent } from './paginas-panel/historia-clinica/historia-clinica';
// Asegúrate de que la ruta a GestionConfiguracion sea correcta si existe
import { GestionConfiguracionComponent } from './paginas-panel/gestion-configuracion/gestion-configuracion';

const routes: Routes = [
  {
    path: '', // Ruta base: /panel
    component: LayoutComponent, // Carga el esqueleto (Sidebar + RouterOutlet)
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirige /panel a /panel/inicio
      { path: 'inicio', component: InicioComponent },
      { path: 'citas', component: CalendarioCitasComponent },
      { path: 'pacientes', component: GestionPacientesComponent },
      { path: 'odontologos', component: GestionOdontologosComponent },
      { path: 'usuarios', component: GestionUsuariosComponent },
      { path: 'facturacion', component: GestionFacturacionComponent },
      { path: 'historial', component: HistoriaClinicaComponent },
      { path: 'perfil', component: MiPerfilComponent },
      { path: 'configuracion', component: GestionConfiguracionComponent },
      // Ruta comodín interna del panel
      { path: '**', redirectTo: 'inicio' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelControlRoutingModule { }