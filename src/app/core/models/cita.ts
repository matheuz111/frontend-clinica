import { Paciente } from "./paciente";
import { Odontologo } from "./odontologo";

export interface Cita {
    // CORRECCIÓN: El backend envía 'id', no 'citaId'
    id?: number; 
    
    // Campos para enviar al crear (si los usas planos)
    pacienteId?: number;
    odontologoId?: number;

    // Campos para leer al listar (objetos completos)
    paciente?: Paciente;
    odontologo?: Odontologo;

    fechaCita: string; // 'YYYY-MM-DD'
    horaCita: string;  // 'HH:mm'
    motivo: string;
    estado?: string;
}