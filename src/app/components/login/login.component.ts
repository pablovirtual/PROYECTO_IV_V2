import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './login.component.html',
  styleUrls: [] 
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Por favor, introduce email y contraseña';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials.email, this.credentials.password)
      .subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          
          // Creamos un objeto de usuario en caso de que la API no lo proporcione
          const userData = response.user || { 
            email: this.credentials.email,
            name: this.credentials.email.split('@')[0] // Extraemos nombre del email como alternativa
          };
          
          // Almacenamos explícitamente los datos del usuario
          localStorage.setItem('currentUser', JSON.stringify(userData));
          
          // Forzamos una recarga completa de la autenticación desde localStorage
          this.authService.refreshAuthState();
          
          // Asegurarnos de que el estado de autenticación se actualice correctamente
          setTimeout(() => {
            // Redireccionar con un pequeño delay para permitir la actualización del estado
            this.router.navigateByUrl('/home');
            this.isLoading = false;
          }, 300);
        },
        error: (error) => {
          console.error('Error de login', error);
          
          // Mensaje específico para credenciales incorrectas
          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Usuario y contraseña incorrectos';
          } else {
            this.errorMessage = 'Error en el servidor. Intente más tarde.';
          }
          
          this.isLoading = false;
        }
      });
  }
}
