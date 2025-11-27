import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMedico } from './perfil-medico';

describe('PerfilMedico', () => {
  let component: PerfilMedico;
  let fixture: ComponentFixture<PerfilMedico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilMedico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilMedico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
