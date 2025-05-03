import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';

export interface SlideItem {
  imageUrl: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  altText?: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: SlideItem[] = [];
  @Input() autoplay: boolean = true;
  @Input() autoplayInterval: number = 5000; // ms
  @Input() showControls: boolean = true;
  @Input() showIndicators: boolean = true;
  @Input() height: string = '500px';
  
  activeSlide: number = 0;
  private autoplaySubscription?: Subscription;
  
  ngOnInit(): void {
    // Configurar autoplay si está habilitado
    if (this.autoplay && this.slides.length > 1) {
      this.startAutoplay();
    }
  }
  
  ngOnDestroy(): void {
    // Cancelar suscripción cuando se destruye el componente
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
    }
  }
  
  // Iniciar autoplay
  startAutoplay(): void {
    this.autoplaySubscription = interval(this.autoplayInterval).subscribe(() => {
      this.nextSlide();
    });
  }
  
  // Pausar autoplay (al hacer hover o interactuar)
  pauseAutoplay(): void {
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
    }
  }
  
  // Reanudar autoplay
  resumeAutoplay(): void {
    if (this.autoplay) {
      this.startAutoplay();
    }
  }
  
  // Navegar a un slide específico
  goToSlide(index: number): void {
    this.activeSlide = index;
    this.resetAutoplay();
  }
  
  // Ir al slide anterior
  prevSlide(): void {
    this.activeSlide = this.activeSlide === 0 ? this.slides.length - 1 : this.activeSlide - 1;
    this.resetAutoplay();
  }
  
  // Ir al slide siguiente
  nextSlide(): void {
    this.activeSlide = this.activeSlide === this.slides.length - 1 ? 0 : this.activeSlide + 1;
    this.resetAutoplay();
  }
  
  // Resetear autoplay despues de interacción manual
  private resetAutoplay(): void {
    if (this.autoplay) {
      this.pauseAutoplay();
      this.resumeAutoplay();
    }
  }
  
  // Obtener clase para indicar el slide activo
  getIndicatorClass(index: number): string {
    return index === this.activeSlide ? 'active' : '';
  }
}
