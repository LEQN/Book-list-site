import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map, Observable } from 'rxjs';
import { Books, genre, rawSearch, rawSearchAuthor, rawTrending } from '../books';

@Injectable({
  providedIn: 'root'
})
export class LibraryDataService {

  apiRoot:String = "https://openlibrary.org/";

  constructor(
    private http:HttpClient
  ) { }

  getTrendingBooks(): Observable<Books[]>{
    return this.http.get<rawTrending>(`${this.apiRoot}trending/daily.json`).pipe(
      map(response => {
        return response.works.filter(item => this.isValidBook(item) &&
        (item.hasOwnProperty('author_name') && item.author_name.length > 0 && typeof item.author_name[0] === 'string')
      ).map((item:any) => ({
          author: item.author_name[0],
          cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
          publishYear: item.first_publish_year,
          key: item.key,
          title: item.title,
        }) as Books);
      }),catchError(err => {
        console.error('API ERROR:', err);
        return throwError(()=> new Error('Failed to fetch trending books'));
      })
    );
  }

  getClassicBooks(): Observable<Books[]>{
    return this.http.get<genre>(`${this.apiRoot}subjects/classic_literature.json?limit=100`).pipe(
      map(response => {
        return response.works.filter(item => this.isValidBook(item) && 
        (item.hasOwnProperty('authors') && item.authors.length > 0 && typeof item.authors[0].name === 'string'))
        .map((item:any) => ({
          author: item.authors[0].name,
          cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
          publishYear: item.first_publish_year,
          key: item.key,
          title: item.title
        }) as Books);
      }), catchError(err => {
        console.error('API ERROR:', err);
        return throwError(() => new Error('Failed to fetch classic books'));
      })
    );
  }

  getFictionBooks(): Observable<Books[]>{
    return this.http.get<genre>(`${this.apiRoot}subjects/fiction.json?limit=100`).pipe(
      map(response => {
        return response.works.filter(item => this.isValidBook(item) &&
      (item.hasOwnProperty('authors') && item.authors.length > 0 && typeof item.authors[0].name === 'string'))
      .map((item:any) => ({
          author:item.authors[0].name,
          cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
          publishYear: item.first_publish_year,
          key: item.key,
          title: item.title
        }) as Books);
      }), catchError(err => {
        console.error('API ERROR: ', err);
        return throwError(() => new Error('Failed to fetch Fiction books'))
      })
    );
  }

  // get books from query search
  getSearchBooks(query: string): Observable<Books[]>{
    return this.http.get<rawSearch>(`${this.apiRoot}search.json?q=${query}`).pipe(
      map(response => {
        return response.docs.filter(item => this.isValidBook(item) &&
        (item.hasOwnProperty('author_name') && item.author_name.length > 0 && typeof item.author_name[0] === 'string'))
        .map((item:any) => ({
          author: item.author_name[0],
          cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
          publishYear: item.first_publish_year,
          key: item.key,
          title: item.title
        }) as Books);
      }), catchError(err => {
        console.error('API ERROR: ', err);
        return throwError(() => new Error('Failed to fetch search results.'));
      })
    );
  }

  // get results from title search
  getTitleSearch(title: string):Observable<Books[]>{
    return this.http.get<rawSearch>(`${this.apiRoot}search.json?title=${title}`).pipe(
      map(response => {
        return response.docs.filter((item:any) => this.isValidBook(item) &&
          (item.hasOwnProperty('author_name') && item.author_name.length > 0 && typeof item.author_name[0] === 'string'))
          .map((item:any) => ({
            author:item.author_name[0],
            cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
            publishYear: item.first_publish_year,
            key: item.key,
            title: item.title
          }) as Books);
      }), catchError(err => {
        console.log('API ERROR: ', err);
        return throwError(() => new Error(`Failed to fetch ${title} results`));
      })
    );
  }

  // get results from author search
  getAuthorSearch(author:string):Observable<Books[]>{
    return this.http.get<rawSearchAuthor>(`${this.apiRoot}search/authors.json?q=${author}`).pipe(
      map(response => {
        return response.docs.filter((item:any) => this.isValidBook(item) && 
            (item.hasOwnProperty('author_name') && item.author_name.length > 0 && typeof item.author_name[0] === 'string'))
            .map((item:any) => ({
              author:item.author_name[0],
              cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
              publishYear: item.first_publish_year,
              key: item.key,
              title: item.title
              }) as Books);
      }), catchError(err => {
        console.log('API ERROR: ', err);
        return throwError(() => new Error(`Failed to fetch for author ${author}`));
      })
    );
  }
  // get results from subject/genre search
  getGenreSearch(genre:string):Observable<Books[]>{
    return this.http.get<genre>(`${this.apiRoot}subjects/${genre}.json?limit=100`).pipe(
      map(response => {
        return response.works.filter((item:any) => this.isValidBook(item) && 
        (item.hasOwnProperty('authors') && item.authors.length > 0 && typeof item.authors[0].name === 'string'))
        .map((item:any) => ({
          author: item.authors[0].name,
          cover: `http://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
          publishYear: item.first_publish_year,
          key: item.key,
          title: item.title
        }) as Books);
      }), catchError(err => {
        console.log('API ERROR: ', err);
        return throwError(()=> new Error(`Failed api fetch searching for genre ${genre}`));
      })
    );
  }

   // check book item is valid, containing all the necessary attributes with typing
   isValidBook(item:any):boolean{
    return (
      item.hasOwnProperty('title') && typeof item.title === 'string' &&
      item.hasOwnProperty('key') && typeof item.key === 'string' &&
      item.hasOwnProperty('first_publish_year') && typeof item.first_publish_year === 'number' &&
      item.hasOwnProperty('cover_edition_key') && typeof item.cover_edition_key === 'string'
    );
  }
}
