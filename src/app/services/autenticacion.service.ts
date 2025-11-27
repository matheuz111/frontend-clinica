import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environments';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

// Interfaz que coincide exactamente con tu AuthResponseDTO.java
export interface AuthResponse {
  token: string;
  rol: string;
}

// Payload para registro
export interface RegisterPayload {
  nombre: string;
  apellido: string;
  documentoIdentidad: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  genero?: string;
}

// Estructura del token decodificado (Claim 'rol' viene de JwtUtil.java)
interface DecodedToken {
  sub: string;
  rol: string;
  exp: number;
  nombres?: string;
  apellidos?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private apiUrl = `${environment.apiUrl}/auth`;

  // Signals para gestionar el estado globalmente
  usuarioLogueado = signal<boolean>(false);
  rolUsuario = signal<string>('');
  nombreUsuario = signal<string>('');
  apellidoUsuario = signal<string>('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Al iniciar la app (o recargar), verificamos si hay sesión guardada
    this.verificarTokenAlCargar();
  }

  // --- LÓGICA DE LOGIN MEJORADA ---
  login(documentoIdentidad: string, contrasena: string): Observable<AuthResponse> {
    const payload = { documentoIdentidad, password: contrasena };

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload)
      .pipe(
        tap(response => {
          // 1. Guardamos el token
          localStorage.setItem('jwt_token', response.token);

          // 2. Actualizamos las señales INMEDIATAMENTE con el dato del backend
          // (Ya no esperamos a decodificar el token para esto)
          this.usuarioLogueado.set(true);
          this.rolUsuario.set(response.rol);
        })
      );
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, payload).pipe(
      tap(() => {
        // Opcional: Podrías hacer autologin aquí si lo deseas
        console.log('Registro exitoso');
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.usuarioLogueado.set(false);
    this.rolUsuario.set('');
    this.nombreUsuario.set('');
    this.apellidoUsuario.set('');
    this.router.navigate(['/authentication/login']);
  }

  // --- MANEJO DE TOKEN Y PERSISTENCIA ---

  private verificarTokenAlCargar(): void {
    const token = this.getToken();
    if (token) {
      if (this.esTokenExpirado(token)) {
        this.logout();
      } else {
        // Si recargamos la página, recuperamos el rol desde el token
        this.procesarToken(token);
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  estaLogueado(): boolean {
    const token = this.getToken();
    return !!token && !this.esTokenExpirado(token);
  }

  private procesarToken(token: string): void {
    try {
      const payload: DecodedToken = jwtDecode(token);
      this.usuarioLogueado.set(true);
      // JwtUtil pone el rol en la claim "rol"
      this.rolUsuario.set(payload.rol || '');
      this.nombreUsuario.set(payload.nombres || '');
      this.apellidoUsuario.set(payload.apellidos || '');
    } catch (error) {
      console.error('Error al decodificar token:', error);
      this.logout();
    }
  }

  private esTokenExpirado(token: string): boolean {
    try {
      const payload: DecodedToken = jwtDecode(token);
      if (!payload.exp) return true;
      return (payload.exp * 1000) < Date.now();
    } catch {
      return true;
    }
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-contrasena`, { email });
  }
}