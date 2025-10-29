import { Component } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { Books } from '../books';
import { LibraryDataService } from '../services/library-data.service';

@Component({
  selector: 'bib-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendingBooks: Books[] = [];

  constructor(private librarySvc:LibraryDataService){}

  ngOnInit(){
    this.getTrending();
  }

  getTrending(){
    this.librarySvc.getTrendingBooks().subscribe(books => this.trendingBooks = books);
  }
}
