import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../userLists';
import { UserListService } from '../services/user-list.service';
import { ListTableComponent } from "./list-table/list-table.component";

@Component({
  selector: 'bib-list',
  imports: [CommonModule, ListTableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  list:ListItem[] = [];
  currentList:string = '';

  constructor(
    private userListSvc:UserListService
  ){}

  gettingList(ListType:string){
    switch (ListType){
      case "Reading":
        this.list = this.userListSvc.currentlyReadingList;
        break;
      case "Completed":
        this.list = this.userListSvc.completedList;
        break;
      case "Dropped":
        this.list = this.userListSvc.droppedList;
        break;
      case "Plan to Read":
        this.list = this.userListSvc.planToReadList;
        break;
    }
    this.currentList = ListType;
  }
  
  deleteBookItem(book:ListItem):void{
    this.userListSvc.removeBook(book, this.currentList);
  }

  editBookItem():void{
    console.log("Editing the book item...");
  }
}
