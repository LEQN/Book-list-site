import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Books } from '../../books';

@Component({
  selector: 'bib-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() books:Books[] = [];
  currentIndex: number = 0;
  cardsPerView: number = 4;

  get totalCards(): number{
    return Math.max(0, this.books.length- this.cardsPerView+1);
  }

  get visibleBooks():any[]{
    const endIndex = this.currentIndex + this.cardsPerView;
    return this.books.slice(this.currentIndex, endIndex); 
  }

  goToPrevious(){
    if(this.currentIndex > 0){
      this.currentIndex--;
    }else if(this.books.length > this.cardsPerView){
      this.currentIndex = this.books.length-this.cardsPerView;
    }
  }

  goToNext(){
    if(this.currentIndex < this.totalCards -1){
      this.currentIndex++;
    }else{
      this.currentIndex = 0;
    }
  }
}
