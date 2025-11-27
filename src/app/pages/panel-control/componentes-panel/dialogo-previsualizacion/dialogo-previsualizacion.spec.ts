import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPrevisualizacion } from './dialogo-previsualizacion';

describe('DialogoPrevisualizacion', () => {
  let component: DialogoPrevisualizacion;
  let fixture: ComponentFixture<DialogoPrevisualizacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoPrevisualizacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoPrevisualizacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
