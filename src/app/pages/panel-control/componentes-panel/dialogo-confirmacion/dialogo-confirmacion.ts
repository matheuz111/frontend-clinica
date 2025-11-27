import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.html',
  styleUrls: ['./dialogo-confirmacion.css'],
  standalone: false
})
export class DialogoConfirmacionComponent {
  @Input() titulo: string = 'Confirmar Acción';
  @Input() mensaje: string = '¿Estás seguro de realizar esta acción?';
  @Input() textoConfirmar: string = 'Sí, confirmar';
  @Input() textoCancelar: string = 'Cancelar';
  @Input() visible: boolean = false; // Controla si se muestra o no

  @Output() onConfirmar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  confirmar(): void {
    this.onConfirmar.emit();
    this.visible = false;
  }

  cancelar(): void {
    this.onCancelar.emit();
    this.visible = false;
  }
}