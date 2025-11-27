import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

export const rolGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  const rol = authService.rolUsuario(); 

  // CORRECCIÓN: Comprobamos contra 'ROLE_PACIENTE'
  // Si tiene rol y NO es paciente, puede entrar al Panel Administrativo
  if (rol && rol !== 'ROLE_PACIENTE') {
    return true;
  }

  // Si es paciente o no tiene rol, lo mandamos a su portal
  return router.createUrlTree(['/portal/inicio']);
};