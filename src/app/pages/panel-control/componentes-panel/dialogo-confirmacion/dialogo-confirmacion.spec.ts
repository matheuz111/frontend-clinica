import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConfirmacion } from './dialogo-confirmacion';

describe('DialogoConfirmacion', () => {
  let component: DialogoConfirmacion;
  let fixture: ComponentFixture<DialogoConfirmacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoConfirmacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoConfirmacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
