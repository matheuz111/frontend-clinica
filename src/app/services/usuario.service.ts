import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
// Asegúrate de que UserProfile y CreateUserPayload coincidan con lo que espera tu backend
import { UserProfile, CreateUserPayload, ChangePasswordPayload } from '../core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;

  // --- Métodos de Mi Perfil (Ya existían) ---
  obtenerPerfil(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/perfil`);
  }

  actualizarPerfil(datos: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.apiUrl}/perfil`, datos);
  }

  cambiarContrasena(payload: ChangePasswordPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cambiar-password`, payload);
  }

  // --- NUEVOS: Gestión de Usuarios (Admin) ---

  listarTodos(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.apiUrl);
  }

  crear(usuario: CreateUserPayload): Observable<UserProfile> {
    // Este endpoint debe manejar la creación en la tabla Usuarios y la tabla relacionada (ej. Recepcionistas)
    return this.http.post<UserProfile>(this.apiUrl, usuario);
  }

  actualizar(id: number, usuario: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}