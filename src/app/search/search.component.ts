import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryDataService } from '../services/library-data.service';
import { Books } from '../books';

@Component({
  selector: 'bib-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  query: string = "";
  searchTypes: string[] = ["Title", "Author", "Genre"];
  searchType: string = this.searchTypes[0];
  books: Books[] = [];
  currentlySearching: boolean =  false;

  constructor( 
    private router:ActivatedRoute,
    private librarySvc: LibraryDataService
  ){}

  ngOnInit(){
    this.router.queryParams.subscribe((param) => {
      this.query = param['query'] || "";
      if(this.query !== ""){
        this.getSearch();
       }
    });
  }

  getSearch(){
    this.currentlySearching = true;
    this.librarySvc.getSearchBooks(this.query).subscribe((books) => this.books = books);
  }

  submitSearchForm(){
    this.currentlySearching = true;
    switch(this.searchType){
      case "Title":
        this.librarySvc.getTitleSearch(this.query).subscribe((books) => this.books = books);
        break;
      case "Author":
        this.librarySvc.getAuthorSearch(this.query).subscribe((books) => this.books = books);
        break;
      case "Genre":
        this.librarySvc.getGenreSearch(this.query).subscribe((books)=> this.books = books);
        break;
    }
  }

}