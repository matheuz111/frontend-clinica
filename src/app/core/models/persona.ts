// Interfaz base para no repetir campos comunes
export interface PersonaBase {
    nombre: string;
    apellido: string;
    telefono?: string;
    email?: string;
    usuarioId: number; // FK hacia la tabla Usuarios
}