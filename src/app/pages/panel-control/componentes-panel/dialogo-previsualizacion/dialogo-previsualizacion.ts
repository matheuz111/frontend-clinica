import { Component, EventEmitter, Input, Output } from '@angular/core';

// Interfaz para tipar los datos que recibe el modal
export interface PrevisualizacionData {
  titulo: string;
  headers: string[];
  rows: any[][];
}

@Component({
  selector: 'app-dialogo-previsualizacion',
  templateUrl: './dialogo-previsualizacion.html',
  styleUrls: ['./dialogo-previsualizacion.css'],
  standalone: false
})
export class DialogoPrevisualizacionComponent {
  @Input() visible: boolean = false; // Controla si se muestra el modal
  @Input() data: PrevisualizacionData | null = null; // Los datos a mostrar

  @Output() onCerrar = new EventEmitter<void>();

  cerrar(): void {
    this.onCerrar.emit();
    // Opcional: resetear visibilidad localmente si se prefiere, 
    // aunque lo ideal es que el padre controle esto.
    this.visible = false; 
  }
}