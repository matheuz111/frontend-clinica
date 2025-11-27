import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPaciente } from './busqueda-paciente';

describe('BusquedaPaciente', () => {
  let component: BusquedaPaciente;
  let fixture: ComponentFixture<BusquedaPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
