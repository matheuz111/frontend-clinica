import { PersonaBase } from './persona';
import { Usuario } from './usuario'; // Asegúrate de tener este modelo o defínelo abajo

export interface Paciente extends PersonaBase {
    // CORRECCIÓN: El backend envía 'id', no 'pacienteId'
    id: number; 
    
    // Estos campos coinciden con tu backend
    fechaNacimiento?: Date; // O string, dependiendo de cómo llegue el JSON
    genero?: string;
    direccion?: string;
    alergias?: string;
    telefono?: string;

    // CORRECCIÓN: El documento de identidad viene dentro del objeto usuario
    usuario?: Usuario; 
}