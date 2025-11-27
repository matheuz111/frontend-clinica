import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importa tus guards
import { authGuard } from './core/guards/auth.guard.js';
import { rolGuard } from './core/guards/rol.guard.js';
import { loginGuard } from './core/guards/login.guard.js';

const routes: Routes = [
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
  
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module.js').then(m => m.AuthenticationModule),
    canActivate: [loginGuard] 
  },
  {
    path: 'panel',
    // Carga perezosa del módulo del panel
    loadChildren: () => import('./pages/panel-control/panel-control.module').then(m => m.PanelControlModule),
    canActivate: [authGuard, rolGuard] // Protegido
  },
  // ... ruta portal ...
  { path: '**', redirectTo: 'authentication/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }