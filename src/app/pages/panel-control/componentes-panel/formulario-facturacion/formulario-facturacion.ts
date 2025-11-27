import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Factura } from '../../../../core/models/facturacion';
import { CitaService } from '../../../../services/cita.service';
import { Cita } from '../../../../core/models/cita';

@Component({
  selector: 'app-formulario-facturacion',
  templateUrl: './formulario-facturacion.html',
  styleUrls: ['./formulario-facturacion.css'],
  standalone: false
})
export class FormularioFacturacionComponent implements OnInit {
  @Input() factura: Factura | null = null;
  @Input() visible: boolean = false;
  
  @Output() onGuardar = new EventEmitter<any>();
  @Output() onCancelar = new EventEmitter<void>();

  form: FormGroup;
  citasPendientes: Cita[] = [];
  cargando = false;

  private fb = inject(FormBuilder);
  private citaService = inject(CitaService);

  constructor() {
    this.form = this.fb.group({
      citaId: ['', Validators.required],
      montoTotal: [0, [Validators.required, Validators.min(0)]],
      estadoPago: ['Pendiente', Validators.required],
      tipoComprobante: ['Boleta', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCitas();
    
    if (this.factura) {
      // Modo Edición
      this.form.patchValue({
        // CORRECCIÓN: Usamos 'citaId' si existe, o el ID del paciente como fallback temporal
        // Lo ideal es que tu Factura tenga el objeto 'cita' o 'citaId'
        citaId: this.factura.citaId || this.factura.paciente?.id, 
        montoTotal: this.factura.montoTotal,
        estadoPago: this.factura.estadoPago,
        tipoComprobante: this.factura.tipoComprobante
      });
      this.form.get('citaId')?.disable();
    }
  }

  cargarCitas(): void {
    this.citaService.listar().subscribe(citas => {
      this.citasPendientes = citas; 
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.getRawValue();
    
    const facturaAGuardar = {
        ...this.factura,
        ...datos,
        citaId: Number(datos.citaId)
    };

    this.onGuardar.emit(facturaAGuardar);
    this.cerrar();
  }

  cerrar(): void {
    this.onCancelar.emit();
    this.form.reset({
      estadoPago: 'Pendiente',
      tipoComprobante: 'Boleta',
      montoTotal: 0
    });
  }
}