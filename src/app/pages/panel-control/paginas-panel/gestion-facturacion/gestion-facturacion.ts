import { Component, OnInit, inject } from '@angular/core';
import { FacturacionService } from '../../../../services/facturacion.service';
import { Factura } from '../../../../core/models/facturacion';
import { ColumnConfig } from '../../../../shared/tabla-generica/tabla-generica';

@Component({
  selector: 'app-gestion-facturacion',
  templateUrl: './gestion-facturacion.html',
  styleUrls: ['./gestion-facturacion.css'],
  standalone: false
})
export class GestionFacturacionComponent implements OnInit {
  
  private facturacionService = inject(FacturacionService);

  facturas: Factura[] = [];
  facturaSeleccionada: Factura | null = null;
  
  // Control de Modales
  mostrarFormulario = false;
  mostrarConfirmacion = false;
  facturaParaEditar: Factura | null = null;
  facturaParaEliminar: Factura | null = null;

  // Configuración de Columnas
  columnas: ColumnConfig[] = [
    // CORRECCIÓN: 'id' en lugar de 'facturaId'
    { name: 'id', header: 'ID' },
    { name: 'paciente.nombre', header: 'Paciente' }, 
    { name: 'fechaEmision', header: 'Fecha', isDate: true },
    { name: 'montoTotal', header: 'Monto', isCurrency: true },
    { name: 'estadoPago', header: 'Estado' }
  ];

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    // CORRECCIÓN: Usamos listar() para ver todas las facturas, no solo las de un paciente
    this.facturacionService.listar().subscribe({
        next: (data) => {
          this.facturas = data;
          console.log('Facturas cargadas:', data);
        },
        error: (err) => console.error('Error cargando facturas:', err)
    });
  }

  // --- Eventos de la Tabla ---

  alSeleccionar(factura: Factura): void {
    this.facturaSeleccionada = factura;
  }

  alAgregar(): void {
    this.facturaParaEditar = null;
    this.mostrarFormulario = true;
  }

  alEditar(factura: Factura): void {
    this.facturaParaEditar = factura;
    this.mostrarFormulario = true;
  }

  alEliminar(factura: Factura): void {
    this.facturaParaEliminar = factura;
    this.mostrarConfirmacion = true;
  }

  // --- Lógica de Guardado/Eliminado ---

  guardarFactura(datos: any): void {
    console.log('Guardando factura...', datos);
    
    // Llamada al servicio para crear la factura
    this.facturacionService.generarFactura(datos).subscribe({
      next: (facturaCreada) => {
        console.log('Factura creada exitosamente:', facturaCreada);
        this.mostrarFormulario = false; // Cerrar modal
        this.cargarFacturas(); // Recargar lista
      },
      error: (err) => {
        console.error('Error al guardar factura:', err);
        alert('Hubo un error al generar la factura. Verifica los datos.');
      }
    });
  }

  confirmarEliminacion(): void {
    if (this.facturaParaEliminar && this.facturaParaEliminar.id) {
      this.facturacionService.eliminar(this.facturaParaEliminar.id).subscribe({
        next: () => {
          this.cargarFacturas();
          this.mostrarConfirmacion = false;
          this.facturaParaEliminar = null;
        },
        error: (err) => console.error('Error eliminando factura:', err)
      });
    }
  }
}