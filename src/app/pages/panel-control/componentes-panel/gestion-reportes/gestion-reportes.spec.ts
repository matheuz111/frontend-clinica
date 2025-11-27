import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReportes } from './gestion-reportes';

describe('GestionReportes', () => {
  let component: GestionReportes;
  let fixture: ComponentFixture<GestionReportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionReportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionReportes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
