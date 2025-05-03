import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-rating.component.html',
  styleUrls: ['./image-rating.component.css']
})
export class ImageRatingComponent {
  @Input() imageId: string = '';
  @Input() currentRating: number = 0;
  @Input() readonly: boolean = false;
  @Input() showCount: boolean = true;
  @Input() totalVotes: number = 0;
  @Input() maxStars: number = 5;
  @Output() rateChange = new EventEmitter<{imageId: string, rating: number}>();

  stars: number[] = [];
  hoveredStar: number = 0;

  ngOnInit() {
    this.stars = Array(this.maxStars).fill(0).map((_, i) => i + 1);
  }

  rate(rating: number): void {
    if (this.readonly) return;
    
    this.currentRating = rating;
    this.rateChange.emit({
      imageId: this.imageId,
      rating: rating
    });
  }

  onStarHover(star: number): void {
    if (this.readonly) return;
    this.hoveredStar = star;
  }

  onStarLeave(): void {
    this.hoveredStar = 0;
  }

  // Determina si una estrella debe estar coloreada (llena)
  isStarFilled(star: number): boolean {
    return (this.hoveredStar >= star) || (!this.hoveredStar && this.currentRating >= star);
  }
}
