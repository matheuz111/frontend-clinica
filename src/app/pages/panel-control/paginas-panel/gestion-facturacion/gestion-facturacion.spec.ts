import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFacturacion } from './gestion-facturacion';

describe('GestionFacturacion', () => {
  let component: GestionFacturacion;
  let fixture: ComponentFixture<GestionFacturacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionFacturacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionFacturacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
