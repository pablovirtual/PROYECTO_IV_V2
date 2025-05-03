import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string = '';
  @Input() title: string = 'Video';
  @Input() autoplay: boolean = false;
  @Input() width: number = 560;
  @Input() height: number = 315;

  safeUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateVideoUrl();
  }

  ngOnChanges(): void {
    this.updateVideoUrl();
  }

  private updateVideoUrl(): void {
    if (this.videoId) {
      // Crear la URL de YouTube con los parámetros adecuados
      const url = `https://www.youtube.com/embed/${this.videoId}?rel=0&autoplay=${this.autoplay ? 1 : 0}`;
      
      // Sanitizar la URL para evitar problemas de seguridad
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
