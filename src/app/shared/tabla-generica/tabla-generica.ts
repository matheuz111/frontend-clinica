import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnConfig {
  name: string;       // Nombre de la propiedad (ej: 'nombre', 'paciente.apellido')
  header: string;     // Título de la columna
  isDate?: boolean;   // ¿Es fecha?
  isCurrency?: boolean; // ¿Es moneda?
}

@Component({
  selector: 'app-tabla-generica',
  standalone: false, // Asegúrate que siga siendo false
  templateUrl: './tabla-generica.html',
  styleUrls: ['./tabla-generica.css']
})
export class TablaGenerica { 
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() columnConfig: ColumnConfig[] = [];
  @Input() addButtonText: string = 'Agregar';
  @Input() permissionManage: string = '';
  
  // NUEVO INPUT: Para poder ocultar el botón de agregar
  @Input() showAddButton: boolean = true; 

  // ... (resto de Outputs y métodos igual que antes)
  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onRowClicked = new EventEmitter<any>();

  getValor(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : ''), obj);
  }
}