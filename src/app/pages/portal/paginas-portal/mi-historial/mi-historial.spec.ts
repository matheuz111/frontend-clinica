import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistorial } from './mi-historial';

describe('MiHistorial', () => {
  let component: MiHistorial;
  let fixture: ComponentFixture<MiHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiHistorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
