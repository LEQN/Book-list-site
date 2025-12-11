import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../userLists';
import { UserListService } from '../services/user-list.service';
import { ListTableComponent } from "./list-table/list-table.component";
import { Books } from '../books';
import { ModalService } from '../services/modal.service';

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
    private userListSvc:UserListService,
    private modalSvc: ModalService
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

  editBookItem(book:ListItem):void{
    const bookData: Books = {
        author: book.author,
        cover: book.cover,
        key: book.key,
        title: book.title
    };
    this.modalSvc.open(bookData);
  }
}
