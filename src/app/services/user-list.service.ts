import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ListItem, ReadingLists } from '../userLists'
import { ModalSubmissionData } from '../modal/modal.component';
import { isPlatformBrowser } from '@angular/common';


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

  constructor(@Inject(PLATFORM_ID) platformId:Object) { 
      if(isPlatformBrowser(platformId)){
        console.log("now loading local storage ");
        this.loadLists();
      }
   }

  loadLists():void{
    const savedList = localStorage.getItem('ReadingLists');
    if(savedList){
      this.list = JSON.parse(savedList);
      // console.log(savedList);
    }
  }

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
