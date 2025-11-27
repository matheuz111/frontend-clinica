import { PersonaBase } from './persona';

export interface Odontologo extends PersonaBase {
    id: number;
    especialidad?: string;
}