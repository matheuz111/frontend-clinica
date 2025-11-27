import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Factura, Pago } from '../core/models/facturacion';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  private apiUrl = `${environment.apiUrl}/facturas`;

  constructor(private http: HttpClient) { }

  // Listar TODAS las facturas (para el panel de gestión)
  listar(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  // Crear una nueva factura
  generarFactura(factura: any): Observable<Factura> {
    return this.http.post<Factura>(this.apiUrl, factura);
  }

  // Obtener pendientes de un paciente (para el portal del paciente o perfil)
  obtenerPendientes(pacienteId: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/pendientes/paciente/${pacienteId}`);
  }

  // Registrar un pago (si lo usas)
  registrarPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${environment.apiUrl}/pagos`, pago);
  }
  
  // Eliminar factura (si lo necesitas)
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}