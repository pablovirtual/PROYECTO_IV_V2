import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthService } from '../../services/auth.service';
import { SliderComponent, SlideItem } from '../slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Propiedades y métodos del componente home
  title = 'Plataforma Educativa de Trading';
  currentUser: any = null;
  isLoggedIn = false;
  showWelcome = false;
  
  // Slides para el carousel
  homeSlides: SlideItem[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200',
      title: 'Aprende Trading Profesional',
      subtitle: 'Domina las estrategias de trading con nuestra plataforma educativa completa',
      buttonText: 'Explorar Cursos',
      buttonLink: '/cursos',
      altText: 'Gráficos de trading'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1200',
      title: 'Análisis Técnico Avanzado',
      subtitle: 'Aprende a identificar patrones y tendencias en los mercados financieros',
      buttonText: 'Ver Metodología',
      buttonLink: '/about',
      altText: 'Análisis técnico de mercados'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1200',
      title: 'Únete a Nuestra Comunidad',
      subtitle: 'Conecta con traders de todo el mundo y comparte experiencias',
      buttonText: 'Registrarse',
      buttonLink: '/registro',
      altText: 'Comunidad de trading'
    }
  ];
  
  constructor(
    private authService: AuthService,
    private ngZone: NgZone
  ) {}
  
  ngOnInit(): void {
    console.log('HomeComponent: Inicializando');
    
    // Verificar estado inicial
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    
    // Si está autenticado al cargar, mostrar mensaje de bienvenida
    if (this.isLoggedIn && this.currentUser) {
      this.showWelcome = true;
      console.log('HomeComponent: Usuario ya autenticado, mostrando bienvenida');
    }
    
    // Suscribirse al estado de autenticación
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        console.log('HomeComponent: Estado de autenticación actualizado:', isLoggedIn);
        
        // Ejecutar dentro de NgZone para garantizar la actualización de la UI
        this.ngZone.run(() => {
          this.isLoggedIn = isLoggedIn;
          
          // Si cambió a autenticado y tenemos un usuario, mostrar mensaje
          if (isLoggedIn && this.currentUser) {
            this.showWelcome = true;
            console.log('HomeComponent: Usuario autenticado, mostrando bienvenida');
          }
        });
      }
    );
    
    // Suscribirse al usuario actual
    this.authService.currentUser$.subscribe(
      user => {
        console.log('HomeComponent: Usuario actualizado:', user);
        
        // Ejecutar dentro de NgZone para garantizar la actualización de la UI
        this.ngZone.run(() => {
          this.currentUser = user;
          
          // Si ya está autenticado y ahora recibimos info del usuario, mostrar mensaje
          if (this.isLoggedIn && user) {
            this.showWelcome = true;
            console.log('HomeComponent: Información de usuario recibida, mostrando bienvenida');
          }
        });
      }
    );
  }
}
