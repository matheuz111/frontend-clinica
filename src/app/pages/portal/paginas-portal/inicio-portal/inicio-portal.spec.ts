import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPortal } from './inicio-portal';

describe('InicioPortal', () => {
  let component: InicioPortal;
  let fixture: ComponentFixture<InicioPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
