import { Component } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { Books } from '../books';

@Component({
  selector: 'bib-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendingBooks: Books[] = [];

}
