import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPortal } from './layout-portal';

describe('LayoutPortal', () => {
  let component: LayoutPortal;
  let fixture: ComponentFixture<LayoutPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
