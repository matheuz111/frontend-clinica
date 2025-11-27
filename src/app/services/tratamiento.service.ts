import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { HistorialTratamiento, TipoTratamiento } from '../core/models/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  // --- Catálogo ---
  listarTipos(): Observable<TipoTratamiento[]> {
    return this.http.get<TipoTratamiento[]>(`${this.apiUrl}/tipos-tratamientos`);
  }

  // --- Historial ---
  // Obtener todo el historial (para administradores o vista general)
  listarHistorialGeneral(): Observable<HistorialTratamiento[]> {
    return this.http.get<HistorialTratamiento[]>(`${this.apiUrl}/historial-tratamientos`);
  }

  // Obtener por paciente específico
  obtenerHistorialPorPaciente(pacienteId: number): Observable<HistorialTratamiento[]> {
    return this.http.get<HistorialTratamiento[]>(`${this.apiUrl}/pacientes/${pacienteId}/historial`);
  }

  // Registrar o actualizar
  guardarTratamiento(historial: HistorialTratamiento): Observable<HistorialTratamiento> {
    if (historial.historialId) {
      return this.http.put<HistorialTratamiento>(`${this.apiUrl}/historial-tratamientos/${historial.historialId}`, historial);
    }
    return this.http.post<HistorialTratamiento>(`${this.apiUrl}/historial-tratamientos`, historial);
  }
}