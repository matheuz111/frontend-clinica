import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Odontologo } from '../core/models/odontologo';
import { HorarioDisponible } from '../core/models/horario';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  private apiUrl = `${environment.apiUrl}/odontologos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Odontologo[]> {
    return this.http.get<Odontologo[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Odontologo> {
    return this.http.get<Odontologo>(`${this.apiUrl}/${id}`);
  }

  crear(odontologo: Odontologo): Observable<Odontologo> {
    return this.http.post<Odontologo>(this.apiUrl, odontologo);
  }

  actualizar(id: number, odontologo: Odontologo): Observable<Odontologo> {
    return this.http.put<Odontologo>(`${this.apiUrl}/${id}`, odontologo);
  }

  // Obtener horarios para mostrar en el calendario al agendar
  obtenerHorarios(odontologoId: number): Observable<HorarioDisponible[]> {
    return this.http.get<HorarioDisponible[]>(`${this.apiUrl}/${odontologoId}/horarios`);
  }
}