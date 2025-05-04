import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/home">
          <!-- Imagen del logotipo -->
          <img src="assets/images/logotipo.png" alt="Trading Academy Logo" style="height: 40px; margin-right: 10px;">
          <span>Trading Academy</span>
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" 
                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">
                <i class="bi bi-house-door me-1"></i>Inicio
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/about" routerLinkActive="active">
                <i class="bi bi-info-circle me-1"></i>Nosotros
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cursos" routerLinkActive="active">
                <i class="bi bi-book me-1"></i>Cursos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/chat" routerLinkActive="active">
                <i class="bi bi-chat-dots me-1"></i>Chat
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/contacto" routerLinkActive="active">
                <i class="bi bi-envelope me-1"></i>Contacto
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/tienda" routerLinkActive="active">
                <i class="bi bi-shop me-1"></i>Tienda
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/multimedia" routerLinkActive="active">
                <i class="bi bi-collection-play me-1"></i>Multimedia
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/faq" routerLinkActive="active">
                <i class="bi bi-question-circle me-1"></i>FAQ
              </a>
            </li>
            <!-- Se ha eliminado el enlace a la prueba API -->
          </ul>
          
          <div class="d-flex align-items-center">
            <!-- Mostrar el email del usuario cuando está autenticado -->
            <span *ngIf="isLoggedIn && currentUser" class="text-light me-3">
              <i class="bi bi-person-circle me-1"></i>
              {{ currentUser.name || currentUser.email }}
            </span>
            
            <!-- Botones de registro/login cuando NO está autenticado -->
            <ng-container *ngIf="!isLoggedIn; else logoutButton">
              <a routerLink="/login" class="btn btn-outline-light me-2">
                <i class="bi bi-box-arrow-in-right me-1"></i>Iniciar Sesión
              </a>
              <a routerLink="/registro" class="btn btn-primary">
                <i class="bi bi-person-plus me-1"></i>Registrarse
              </a>
            </ng-container>
            
            <!-- Botón de logout cuando SÍ está autenticado -->
            <ng-template #logoutButton>
              <button class="btn btn-outline-danger" (click)="logout()" [disabled]="isLogoutLoading">
                <i class="bi bi-box-arrow-right me-1"></i>
                <span *ngIf="isLogoutLoading">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Saliendo...
                </span>
                <span *ngIf="!isLogoutLoading">Cerrar Sesión</span>
              </button>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    
    .nav-link.active {
      font-weight: 500;
    }
  `]
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  isLogoutLoading = false;
  currentUser: any = null;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    console.log('NavBarComponent: Inicializando');
    
    // Suscribirse al estado de autenticación
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        console.log('NavBarComponent: Estado de autenticación actualizado:', isLoggedIn);
        this.isLoggedIn = isLoggedIn;
      }
    );
    
    // Suscribirse al usuario actual
    this.authService.currentUser$.subscribe(
      user => {
        console.log('NavBarComponent: Usuario actualizado:', user);
        this.currentUser = user;
      }
    );
    
    // Comprobar si ya hay un token almacenado
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    console.log('NavBarComponent: Estado inicial -', 
      'isLoggedIn:', this.isLoggedIn, 
      'currentUser:', this.currentUser
    );
  }
  
  logout(): void {
    console.log('NavBarComponent: Iniciando logout');
    this.isLogoutLoading = true;
    
    // Versión con API (producción)
    this.authService.logout().subscribe({
      next: () => {
        console.log('NavBarComponent: Logout exitoso');
        this.isLogoutLoading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('NavBarComponent: Error durante el logout:', error);
        this.isLogoutLoading = false;
        
        // Aún si hay error, limpiamos el token para cerrar sesión localmente
        this.authService.clearToken();
        this.router.navigate(['/login']);
      }
    });
  }
}
