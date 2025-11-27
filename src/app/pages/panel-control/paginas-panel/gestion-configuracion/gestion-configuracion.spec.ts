import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionConfiguracion } from './gestion-configuracion';

describe('GestionConfiguracion', () => {
  let component: GestionConfiguracion;
  let fixture: ComponentFixture<GestionConfiguracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionConfiguracion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionConfiguracion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
