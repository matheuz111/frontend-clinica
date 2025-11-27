import { Rol } from './rol';

export interface Usuario {
    usuarioId: number;           // usuario_id
    documentoIdentidad: string;  // documento_identidad
    contrasenaHash?: string;     // contrasena_hash (no se envía al frontend normalmente)
    rolId: number;               // rol_id
    intentosFallidos: number;    // intentos_fallidos
    bloqueado: boolean;          // bloqueado
}

export interface LoginPayload {
    documentoIdentidad: string;
    password: string;
}

export interface RegisterPayload {
    nombre: string;
    apellido: string;
    documentoIdentidad: string;
    fechaNacimiento?: string;     // formato: 'YYYY-MM-DD'
    genero?: string;
    telefono?: string;
    email: string;
    direccion?: string;
    alergias?: string;
    password: string;
}

export interface UserProfile {
    usuarioId: number;
    documentoIdentidad: string;
    nombres: string;              // Combinación frontend
    apellidos: string;            // Combinación frontend
    email: string;
    telefono?: string;
    rol: string;                  // nombre_rol desde JOIN
    permisos?: string[];
    fechaRegistro?: Date | string;
}

export interface ChangePasswordPayload {
    contrasenaActual: string;
    nuevaContrasena: string;
}

export interface CreateUserPayload {
    documentoIdentidad: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    rol: Rol;
    password: string;
}