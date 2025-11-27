import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  if (authService.estaLogueado()) {
    return true;
  }

  // Si no está logueado, redirigir al login
  return router.createUrlTree(['/authentication/login']);
};