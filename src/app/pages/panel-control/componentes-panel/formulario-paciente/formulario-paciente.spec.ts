import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPaciente } from './formulario-paciente';

describe('FormularioPaciente', () => {
  let component: FormularioPaciente;
  let fixture: ComponentFixture<FormularioPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
