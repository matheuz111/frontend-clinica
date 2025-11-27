import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout'; // <--- Importación corregida
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutenticacionService } from '../../../../services/autenticacion.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ], // <--- Nombre corregido
      imports: [
        RouterTestingModule,     // Necesario porque usas routerLink y router-outlet
        HttpClientTestingModule  // Necesario porque AutenticacionService usa HttpClient
      ],
      providers: [ AutenticacionService ],
      schemas: [NO_ERRORS_SCHEMA] // Evita errores si no reconoce componentes hijos en el test
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});