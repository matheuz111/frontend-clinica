export interface HorarioDisponible {
    horarioId: number;
    odontologoId: number;
    diaSemana: string; // 'Lunes', 'Martes', etc.
    horaInicio: string; // Tipo Time suele manejarse como string 'HH:mm:ss' en JSON
    horaFin: string;
}