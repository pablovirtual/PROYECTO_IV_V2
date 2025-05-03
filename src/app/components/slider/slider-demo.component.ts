import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SliderComponent, SlideItem } from './slider.component';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, SliderComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    
    <div class="container-fluid p-0">
      <!-- Implementación básica del slider -->
      <app-slider [slides]="slides" [height]="'500px'"></app-slider>
      
      <div class="container my-5">
        <h2 class="mb-4">Demo del Componente Slider</h2>
        
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Cómo usar el componente Slider</h5>
                <p>Este componente te permite crear carruseles de imágenes con texto y botones superpuestos.</p>
                
                <h6 class="mt-4">1. Importar el componente</h6>
                <pre><code>import {{'{'}} SliderComponent, SlideItem {{'}'}} from '../slider/slider.component';</code></pre>
                
                <h6 class="mt-3">2. Añadir al array de imports</h6>
                <pre><code>imports: [CommonModule, SliderComponent]</code></pre>
                
                <h6 class="mt-3">3. Definir tus slides</h6>
                <pre><code>slides: SlideItem[] = [
  {{'{'}}
    imageUrl: 'assets/images/slide1.jpg',
    title: 'Aprende Trading',
    subtitle: 'Cursos diseñados por expertos',
    buttonText: 'Ver Cursos',
    buttonLink: '/cursos'
  {{'}'}}
];</code></pre>
                
                <h6 class="mt-3">4. Usar el componente en tu HTML</h6>
                <pre><code>&lt;app-slider 
  [slides]="slides"
  [autoplay]="true"
  [height]="'500px'"
&gt;&lt;/app-slider&gt;</code></pre>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Opciones disponibles</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    slides
                    <span class="badge bg-primary">Requerido</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    height
                    <span class="badge bg-secondary">Default: 500px</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    autoplay
                    <span class="badge bg-secondary">Default: true</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    autoplayInterval
                    <span class="badge bg-secondary">Default: 5000</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    showControls
                    <span class="badge bg-secondary">Default: true</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    showIndicators
                    <span class="badge bg-secondary">Default: true</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    pre {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 5px;
    }
    code {
      color: #d63384;
    }
  `]
})
export class SliderDemoComponent {
  // Ejemplos de slides para la demostración
  slides: SlideItem[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200',
      title: 'Aprende Trading Profesional',
      subtitle: 'Cursos diseñados por expertos en mercados financieros',
      buttonText: 'Ver Cursos',
      buttonLink: '/cursos',
      altText: 'Gráficos de trading con velas japonesas'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1200',
      title: 'Comunidad de Traders',
      subtitle: 'Conecta con otros traders y aprende juntos',
      buttonText: 'Únete Ahora',
      buttonLink: '/registro',
      altText: 'Personas colaborando en trading'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1200',
      title: 'Herramientas Exclusivas',
      subtitle: 'Accede a simuladores y herramientas de análisis',
      buttonText: 'Explorar',
      buttonLink: '/herramientas',
      altText: 'Análisis técnico de mercados'
    }
  ];
}
