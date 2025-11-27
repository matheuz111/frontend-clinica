import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSeguro } from './formulario-seguro';

describe('FormularioSeguro', () => {
  let component: FormularioSeguro;
  let fixture: ComponentFixture<FormularioSeguro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioSeguro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioSeguro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
