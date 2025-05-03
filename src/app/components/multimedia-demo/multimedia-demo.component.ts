import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { GalleryComponent, GalleryImage } from '../gallery/gallery.component';
import { ImageRatingComponent } from '../image-rating/image-rating.component';

@Component({
  selector: 'app-multimedia-demo',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, GalleryComponent, ImageRatingComponent],
  templateUrl: './multimedia-demo.component.html',
  styleUrls: ['./multimedia-demo.component.css']
})
export class MultimediaDemoComponent {
  // Videos de ejemplo (IDs de YouTube)
  videoExamples = [
    {
      videoId: 'GV-UOVvtdlk',  // Video de análisis técnico
      title: 'Introducción al Análisis Técnico en Trading'
    },
    {
      videoId: 'Xn7KWR9EOGQ',  // Video sobre trading
      title: 'Estrategias de Trading para Principiantes'
    }
  ];
  
  // Imágenes de ejemplo para la galería
  galleryImages: GalleryImage[] = [
    {
      id: 'img_1',
      src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&h=600',
      alt: 'Gráfico de trading',
      title: 'Análisis de Mercado',
      description: 'Vista detallada de un gráfico de velas japonesas con indicadores técnicos'
    },
    {
      id: 'img_2',
      src: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=900&h=600',
      alt: 'Traders trabajando',
      title: 'Trading Room',
      description: 'Profesionales analizando los mercados financieros en tiempo real'
    },
    {
      id: 'img_3',
      src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&h=600',
      alt: 'Gráficos financieros',
      title: 'Patrones de Precio',
      description: 'Identificación de patrones de precio importantes para tomar decisiones de trading'
    },
    {
      id: 'img_4',
      src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&h=600',
      alt: 'Trading con laptop',
      title: 'Trading en Movimiento',
      description: 'La flexibilidad del trading digital permite operar desde cualquier lugar'
    }
  ];
  
  // Imágenes para la galería con valoración habilitada
  galleryImagesWithRating: GalleryImage[] = [
    {
      id: 'rated_1',
      src: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=900&h=600',
      alt: 'Análisis avanzado',
      title: 'Estrategias de Trading Avanzadas',
      description: 'Descubre técnicas profesionales para mejorar tus operaciones'
    },
    {
      id: 'rated_2',
      src: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=900&h=600',
      alt: 'Trading con multiples pantallas',
      title: 'Estación de Trading Profesional',
      description: 'Configuración de múltiples monitores para trading de alta frecuencia'
    },
    {
      id: 'rated_3',
      src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=900&h=600',
      alt: 'Indicadores técnicos',
      title: 'Indicadores Técnicos Esenciales',
      description: 'Los mejores indicadores para tomar decisiones informadas en el mercado'
    }
  ];
  
  // Método para manejar eventos de valoración independientes (fuera de la galería)
  onImageRated(event: {imageId: string, rating: number}) {
    console.log(`Imagen ${event.imageId} valorada con ${event.rating} estrellas`);
    // Aquí se podría implementar lógica adicional como guardar en base de datos
  }
}
