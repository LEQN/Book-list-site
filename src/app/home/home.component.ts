import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "./carousel/carousel.component";
import { Books } from '../books';
import { LibraryDataService } from '../services/library-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bib-home',
  imports: [CarouselComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendingBooks: Books[] = [];
  classicBooks: Books[] = [];
  fictionBooks: Books[] = [];

  searchQuery: string = "";

  constructor(private librarySvc:LibraryDataService, private router:Router){}

  ngOnInit(){
    this.getTrending();
    this.getClassics();
    this.getFiction();
  }

  getTrending(){
    this.librarySvc.getTrendingBooks().subscribe(books => this.trendingBooks = books);
  }

  getClassics(){
    this.librarySvc.getClassicBooks().subscribe(books => this.classicBooks = books);
  }

  getFiction(){
    this.librarySvc.getFictionBooks().subscribe(books => this.fictionBooks = books);
  }

  onSubmit(){
    this.router.navigate(['search'], {queryParams:{query:this.searchQuery.toLowerCase()}});
  }
}
