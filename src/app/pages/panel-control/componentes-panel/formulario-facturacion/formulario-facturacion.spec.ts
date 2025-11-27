import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFacturacion } from './formulario-facturacion';

describe('FormularioFacturacion', () => {
  let component: FormularioFacturacion;
  let fixture: ComponentFixture<FormularioFacturacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioFacturacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioFacturacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
