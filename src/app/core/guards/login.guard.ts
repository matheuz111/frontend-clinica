import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  if (authService.estaLogueado()) {
    const rol = authService.rolUsuario();
    
    // CORRECCIÓN: Usamos 'ROLE_PACIENTE'
    if (rol === 'ROLE_PACIENTE') {
      return router.createUrlTree(['/portal/inicio']);
    } else {
      return router.createUrlTree(['/panel/inicio']);
    }
  }

  return true; // Si no está logueado, permite ver el login
};