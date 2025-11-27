import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { UserProfile } from '../../../../core/models/usuario';
// CORRECCIÓN 1: Importar ColumnConfig desde la ubicación correcta (shared)
import { ColumnConfig } from '../../../../shared/tabla-generica/tabla-generica';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.html',
  styleUrls: ['./gestion-usuarios.css'],
  standalone: false // CORRECCIÓN 2: Necesario por estar en un NgModule
})
export class GestionUsuariosComponent implements OnInit {

  private usuarioService = inject(UsuarioService);

  usuarios: UserProfile[] = [];

  // Control de Modales
  mostrarFormulario = false;
  mostrarConfirmacion = false;

  usuarioSeleccionado: UserProfile | null = null;
  usuarioAEliminar: UserProfile | null = null;

  // Columnas para Tabla Genérica
  columnas: ColumnConfig[] = [
    { name: 'documentoIdentidad', header: 'Usuario/Doc' },
    { name: 'nombres', header: 'Nombres' },
    { name: 'apellidos', header: 'Apellidos' },
    { name: 'email', header: 'Correo' },
    { name: 'rol', header: 'Rol' }
  ];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.listarTodos().subscribe({
      next: (data: any[]) => {
        console.log('Raw API Response:', data); // DEBUG: Inspect raw data
        // Mapeo de datos para asegurar que la tabla los lea correctamente
        this.usuarios = data.map(u => {
          const mapped = {
            ...u,
            // Mapeo de campos si vienen diferentes del backend
            nombres: u.nombres || u.nombre,
            apellidos: u.apellidos || u.apellido,
            email: u.email || u.correo,
            // Aplanar el objeto rol si viene anidado
            rol: (typeof u.rol === 'object' && u.rol !== null) ? (u.rol.nombre || u.rol.name || 'Sin Rol') : u.rol,
            // Asegurar que exista usuarioId (algunos backends mandan 'id')
            usuarioId: u.usuarioId || u.id
          };
          console.log('Mapped User:', mapped); // DEBUG: Inspect mapped user
          return mapped;
        });
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  // --- Acciones ---

  abrirCrear(): void {
    this.usuarioSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(usuario: UserProfile): void {
    this.usuarioSeleccionado = usuario;
    this.mostrarFormulario = true;
  }

  abrirEliminar(usuario: UserProfile): void {
    this.usuarioAEliminar = usuario;
    this.mostrarConfirmacion = true;
  }

  // --- Guardado ---

  guardarUsuario(datos: any): void {
    // CORRECCIÓN 3: Verificar 'usuarioId' en lugar de 'id' para consistencia con el modelo
    // (Si tu formulario envía 'id', usa: const id = datos.usuarioId || datos.id;)
    const id = datos.usuarioId || datos.id;

    if (id) {
      // Actualizar
      this.usuarioService.actualizar(id, datos).subscribe(() => {
        this.cargarUsuarios();
        this.mostrarFormulario = false;
      });
    } else {
      // Crear
      this.usuarioService.crear(datos).subscribe(() => {
        this.cargarUsuarios();
        this.mostrarFormulario = false;
      });
    }
  }

  confirmarEliminacion(): void {
    // CORRECCIÓN 4 (El error reportado): Usar .usuarioId que es lo que existe en UserProfile
    // CORRECCIÓN 4: Usar usuarioId o id según lo que tengamos mapeado
    if (this.usuarioAEliminar && (this.usuarioAEliminar.usuarioId || (this.usuarioAEliminar as any).id)) {
      const id = this.usuarioAEliminar.usuarioId || (this.usuarioAEliminar as any).id;
      this.usuarioService.eliminar(id).subscribe(() => {
        this.cargarUsuarios();
        this.mostrarConfirmacion = false;
        this.usuarioAEliminar = null;
      });
    }
  }
}