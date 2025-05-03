import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ImageRating {
  imageId: string;
  averageRating: number;
  totalVotes: number;
  userRating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // Almacenamiento local de valoraciones
  private ratingsMap = new Map<string, ImageRating>();
  
  // Observable para que los componentes puedan suscribirse a cambios en valoraciones
  private ratingsSubject = new BehaviorSubject<Map<string, ImageRating>>(this.ratingsMap);
  public ratings$ = this.ratingsSubject.asObservable();

  constructor() {
    // Cargar valoraciones guardadas al iniciar el servicio
    this.loadRatings();
  }

  // Obtener la valoración para una imagen específica
  getImageRating(imageId: string): ImageRating {
    if (!this.ratingsMap.has(imageId)) {
      // Si no existe valoración para esta imagen, crear una por defecto
      this.ratingsMap.set(imageId, {
        imageId,
        averageRating: 0,
        totalVotes: 0
      });
    }
    return this.ratingsMap.get(imageId)!;
  }

  // Registrar una nueva valoración de usuario para una imagen
  rateImage(imageId: string, rating: number, userId: string = 'anonymous'): void {
    const currentRating = this.getImageRating(imageId);
    
    // Simular actualización de valoración (en una implementación real, esto
    // se conectaría a una base de datos y evitaría votos duplicados)
    const newTotalVotes = currentRating.totalVotes + 1;
    const newAverageRating = (
      (currentRating.averageRating * currentRating.totalVotes) + rating
    ) / newTotalVotes;
    
    // Actualizar valoración en el mapa
    this.ratingsMap.set(imageId, {
      imageId,
      averageRating: newAverageRating,
      totalVotes: newTotalVotes,
      userRating: rating
    });
    
    // Notificar a los suscriptores
    this.ratingsSubject.next(this.ratingsMap);
    
    // Guardar en localStorage
    this.saveRatings();
  }

  // Guardar valoraciones en localStorage
  private saveRatings(): void {
    const ratingsObject: Record<string, ImageRating> = {};
    this.ratingsMap.forEach((value, key) => {
      ratingsObject[key] = value;
    });
    localStorage.setItem('imageRatings', JSON.stringify(ratingsObject));
  }

  // Cargar valoraciones desde localStorage
  private loadRatings(): void {
    const savedRatings = localStorage.getItem('imageRatings');
    if (savedRatings) {
      try {
        const ratingsObject = JSON.parse(savedRatings) as Record<string, ImageRating>;
        Object.entries(ratingsObject).forEach(([key, value]) => {
          this.ratingsMap.set(key, value);
        });
        this.ratingsSubject.next(this.ratingsMap);
      } catch (error) {
        console.error('Error loading image ratings:', error);
      }
    }
  }
}
