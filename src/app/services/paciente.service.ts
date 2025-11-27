import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../environments/environments';
import { Paciente } from '../core/models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) { }

  /**
   * Listar todos los pacientes
   */
  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  /**
   * Obtener un paciente por ID
   */
  obtenerPorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  /**
   * Buscar paciente por DNI/Documento de Identidad
   * NOTA: Ajusta el endpoint según tu backend
   */
  buscarPorDni(dni: string): Observable<Paciente | null> {
    // Opción A: Endpoint específico (recomendado)
    // return this.http.get<Paciente>(`${this.apiUrl}/buscar/dni/${dni}`);
    
    // Opción B: Query parameter
    const params = new HttpParams().set('documentoIdentidad', dni);
    return this.http.get<Paciente[]>(`${this.apiUrl}/buscar`, { params }).pipe(
      map(pacientes => pacientes.length > 0 ? pacientes[0] : null),
      catchError(() => of(null))
    );
  }

  /**
   * Buscar pacientes por nombre (búsqueda parcial)
   */
  buscarPorNombre(nombre: string): Observable<Paciente[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Paciente[]>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * Crear un nuevo paciente
   */
  crear(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  /**
   * Actualizar un paciente existente
   */
  actualizar(id: number, paciente: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  /**
   * Eliminar un paciente
   */
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener historial médico del paciente
   */
  obtenerHistorial(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${pacienteId}/historial`);
  }
}