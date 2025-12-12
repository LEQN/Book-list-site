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
    "Plan to Read": "PlanToRead",
    "PlanToRead": "PlanToRead"
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
    }
  }

  saveLists():void{
    localStorage.setItem('ReadingLists', JSON.stringify(this.list));
  }

  addBook(submission:ModalSubmissionData):void{
    var alreadyExists = Object.values(this.list).some((arr:ListItem[]) => arr.some((b) => b.key === submission.book.key));
    var listItem:ListItem = {
      cover: submission.book.cover,
      title: submission.book.title,
      author: submission.book.author,
      score: submission.score,
      finishDate: submission.finishDate,
      key: submission.book.key
    };
    if(!alreadyExists){
      var listKey = this.STATUS_MAP[submission.status];
      this.list[listKey].push(listItem);
      this.saveLists();
    }else{
      this.editBook(listItem, submission.status);
    }
  }

  removeBook(book:ListItem, listType:string):void{
    // get key name for array of list being deleted from
    var listTypeKey = this.STATUS_MAP[listType];
    const bookIndex = this.list[listTypeKey].indexOf(book);
    this.list[listTypeKey].splice(bookIndex, 1);
    this.saveLists();
  }

  // edit list item of a book, could be updating values or moving list
  editBook(book:ListItem, moveToCategory:string):void{
    // find which list book currently belongs too
    const prevInstanceList = Object.keys(this.list).find(key => 
      this.list[this.STATUS_MAP[key]]?.some(b => b.key === book.key));

    if(!prevInstanceList){
      console.log("Couldnt find array!", Object.keys(this.list));
      return;
    }
    const prevInstanceIndex = this.list[this.STATUS_MAP[prevInstanceList]].findIndex(listItem => listItem.key === book.key);
    this.list[this.STATUS_MAP[prevInstanceList]].splice(prevInstanceIndex, 1);

    this.list[this.STATUS_MAP[moveToCategory]].push(book);
    this.saveLists();
  }

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
