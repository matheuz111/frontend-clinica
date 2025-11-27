import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosDentistas } from './nuestros-dentistas';

describe('NuestrosDentistas', () => {
  let component: NuestrosDentistas;
  let fixture: ComponentFixture<NuestrosDentistas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrosDentistas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestrosDentistas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
