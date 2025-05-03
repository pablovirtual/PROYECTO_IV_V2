import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageRatingComponent } from '../image-rating/image-rating.component';
import { RatingService, ImageRating } from '../../services/rating.service';

export interface GalleryImage {
  src: string;
  alt: string;
  id?: string; // Identificador único para la imagen
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ImageRatingComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() images: GalleryImage[] = [];
  @Input() showThumbnails: boolean = true;
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 5000; // en milisegundos
  @Input() enableRating: boolean = false; // Nueva propiedad para activar/desactivar calificaciones

  currentIndex: number = 0;
  showFullscreen: boolean = false;
  private autoPlayTimer: any;
  imageRatings: Map<string, ImageRating> = new Map();

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    if (this.autoPlay && this.images.length > 1) {
      this.startAutoPlay();
    }
    
    // Asegurar que cada imagen tenga un ID único
    this.images = this.images.map((image, index) => {
      if (!image.id) {
        return { ...image, id: `img_${index}` };
      }
      return image;
    });
    
    // Suscribirse a los cambios en las valoraciones
    if (this.enableRating) {
      this.ratingService.ratings$.subscribe(ratings => {
        this.imageRatings = ratings;
      });
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay(); // Limpiar cualquier temporizador existente
    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  selectImage(index: number): void {
    this.currentIndex = index;
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay(); // Reiniciar el temporizador
    }
  }

  previous(): void {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay(); // Reiniciar el temporizador
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay(); // Reiniciar el temporizador
    }
  }

  toggleFullscreen(): void {
    this.showFullscreen = !this.showFullscreen;
    if (this.showFullscreen) {
      document.body.style.overflow = 'hidden'; // Prevenir scroll cuando esté en pantalla completa
    } else {
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
  // Obtiene la valoración actual para una imagen
  getImageRating(imageId: string): ImageRating {
    return this.ratingService.getImageRating(imageId);
  }
  
  // Maneja el evento de calificación de una imagen
  onRateImage(event: {imageId: string, rating: number}): void {
    this.ratingService.rateImage(event.imageId, event.rating);
  }
}
