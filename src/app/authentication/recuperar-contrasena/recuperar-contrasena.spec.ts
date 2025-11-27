import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContrasenaComponent } from './recuperar-contrasena'; // <--- Nombre corregido
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutenticacionService } from '../../services/autenticacion.service';

describe('RecuperarContrasenaComponent', () => {
  let component: RecuperarContrasenaComponent;
  let fixture: ComponentFixture<RecuperarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Como es standalone, lo importamos, no lo declaramos
      imports: [
        RecuperarContrasenaComponent, 
        ReactiveFormsModule,
        HttpClientTestingModule, // Simula las peticiones HTTP
        RouterTestingModule      // Simula el router
      ],
      // Si el servicio no está en 'root', lo proveemos aquí
      providers: [AutenticacionService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});