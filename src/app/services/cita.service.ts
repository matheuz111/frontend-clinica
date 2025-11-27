import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Cita } from '../core/models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) { }

  // Listar con filtros opcionales (fecha, odontólogo, paciente)
  listar(fecha?: string, odontologoId?: number, pacienteId?: number): Observable<Cita[]> {
    let params = new HttpParams();
    if (fecha) params = params.set('fecha', fecha);
    if (odontologoId) params = params.set('odontologoId', odontologoId);
    if (pacienteId) params = params.set('pacienteId', pacienteId);
    
    return this.http.get<Cita[]>(this.apiUrl, { params });
  }

  crear(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  // Ej: cambiar estado a 'Cancelada' o 'Completada'
  actualizarEstado(id: number, estado: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/estado`, { estado });
  }
  
  // Reprogramar cita
  reprogramar(id: number, nuevaFecha: Date, nuevaHora: string): Observable<Cita> {
    return this.http.patch<Cita>(`${this.apiUrl}/${id}/reprogramar`, { 
      fechaCita: nuevaFecha, 
      horaCita: nuevaHora 
    });
  }
}