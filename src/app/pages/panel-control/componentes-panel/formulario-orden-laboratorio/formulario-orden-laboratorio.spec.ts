import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOrdenLaboratorio } from './formulario-orden-laboratorio';

describe('FormularioOrdenLaboratorio', () => {
  let component: FormularioOrdenLaboratorio;
  let fixture: ComponentFixture<FormularioOrdenLaboratorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioOrdenLaboratorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOrdenLaboratorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
