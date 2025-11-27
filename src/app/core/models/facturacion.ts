import { Paciente } from './paciente';

export interface Factura {
    // CORRECCIÓN: Usamos 'id' para coincidir con el backend
    id: number; 
    
    // Relaciones y datos
    citaId?: number; // Para enviar al crear
    paciente?: Paciente; // Para leer al listar

    fechaEmision: string; // Date suele dar problemas en JSON, string es más seguro
    montoTotal: number;
    estadoPago: 'Pendiente' | 'Pagado' | 'Parcial' | 'Anulado'; 
    tipoComprobante: 'Boleta' | 'Factura';
    
    pagos?: Pago[];
}

export interface Pago {
    id: number;
    comprobanteId: number;
    fechaPago: string;
    montoPagado: number;
    metodoPago?: string;
}