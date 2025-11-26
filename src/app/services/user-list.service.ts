import { Injectable } from '@angular/core';
import { ListItem, ReadingLists } from '../userLists'
import { ModalSubmissionData } from '../modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private list:ReadingLists = {
    Reading: [],
    Completed: [],
    Dropped: [],
    PlanToRead: []
  };

  private STATUS_MAP: Record<string, keyof ReadingLists> = {
    "Reading": "Reading",
    "Completed": "Completed",
    "Dropped": "Dropped",
    "Plan to Read": "PlanToRead"
  };

  constructor() {  }


  saveLists():void{
    localStorage.setItem('ReadingLists', JSON.stringify(this.list));
  }

  addBook(submission:ModalSubmissionData):void{
    var alreadyExists = Object.values(this.list).some((arr:ListItem[]) => arr.some((b) => b.key === submission.book.key));
    if(!alreadyExists){
      var listItem:ListItem = {
        cover: submission.book.cover,
        title: submission.book.title,
        author: submission.book.author,
        score: submission.score,
        finishDate: submission.finishDate,
        key: submission.book.key
      };
      var listKey = this.STATUS_MAP[submission.status];
      this.list[listKey].push(listItem);
      this.saveLists();
    }else{
      console.log("already exists. Move to list");
    }
  }

  removeBook():void{}

  get currentlyReadingList(){
    return this.list.Reading;
  }

  get completedList(){
    return this.list.Completed;
  }

  get droppedList(){
    return this.list.Dropped;
  }

  get planToReadList(){
    return this.list.PlanToRead;
  }
}
