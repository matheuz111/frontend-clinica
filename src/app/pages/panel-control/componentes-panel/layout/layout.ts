import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../../../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: false
})
export class LayoutComponent {
  private authService = inject(AutenticacionService);
  private router = inject(Router);

  // Controla si el sidebar está expandido o colapsado
  sidebarAbierto: boolean = true;

  // Obtenemos el rol para mostrarlo en la barra superior
  rolUsuario = this.authService.rolUsuario;
  nombreUsuario = this.authService.nombreUsuario;
  apellidoUsuario = this.authService.apellidoUsuario;

  toggleSidebar(): void {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  cerrarSesion(): void {
    this.authService.logout();
    // La redirección ya la maneja el servicio, pero por seguridad:
    this.router.navigate(['/authentication/login']);
  }
}