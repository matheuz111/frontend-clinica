import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConsulta } from './formulario-consulta';

describe('FormularioConsulta', () => {
  let component: FormularioConsulta;
  let fixture: ComponentFixture<FormularioConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
