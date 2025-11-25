import { Injectable } from '@angular/core';
import { Books } from '../books';
import { ModalSubmissionData } from '../modal/modal.component';

export interface ReadingLists{
  currentlyReading:Books[],
  completed: Books[],
  dropped: Books[],
  planToRead: Books[]
}

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor() { }

  addBook(submission:ModalSubmissionData):void{
    console.log("Book added to list", submission);
  }

  removeBook():void{}

  get currentlyReadingList(){
    return "";
  }

  get completedList(){
    return "";
  }

  get droppedList(){
    return "";
  }

  get planToReadList(){
    return "";
  }
}
