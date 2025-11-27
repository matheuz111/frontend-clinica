import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOdontologos } from './gestion-odontologos';

describe('GestionOdontologos', () => {
  let component: GestionOdontologos;
  let fixture: ComponentFixture<GestionOdontologos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionOdontologos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionOdontologos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
