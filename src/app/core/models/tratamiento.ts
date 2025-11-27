export interface TipoTratamiento {
    tipoTratamientoId: number;
    nombreTratamiento: string;
    descripcion?: string;
    costo: number;
}

export interface HistorialTratamiento {
    historialId: number;
    citaId: number;
    diagnostico?: string;
    fechaRealizacion: Date;
    
    // Lista de detalles (tratamientos realizados en esa sesión)
    detalles?: DetalleTratamiento[];
}

export interface DetalleTratamiento {
    detalleId: number;
    historialId: number;
    tipoTratamientoId: number;
    observaciones?: string;
    
    // Relación opcional para mostrar nombre y costo en la UI
    tratamientoInfo?: TipoTratamiento;
}