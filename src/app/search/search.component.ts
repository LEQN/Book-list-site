import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryDataService } from '../services/library-data.service';
import { Books } from '../books';

@Component({
  selector: 'bib-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  query: string = "";
  books: Books[] = [];

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
    this.librarySvc.getSearchBooks(this.query).subscribe((books) => this.books = books);
  }

}