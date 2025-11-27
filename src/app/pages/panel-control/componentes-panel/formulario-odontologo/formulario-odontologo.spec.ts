import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOdontologo } from './formulario-odontologo';

describe('FormularioOdontologo', () => {
  let component: FormularioOdontologo;
  let fixture: ComponentFixture<FormularioOdontologo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioOdontologo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioOdontologo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
