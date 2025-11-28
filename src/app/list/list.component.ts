import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../userLists';
import { UserListService } from '../services/user-list.service';

@Component({
  selector: 'bib-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  isListEmpty:boolean = true;
  list:ListItem[] = [];

  constructor(
    private userListSvc:UserListService
  ){}

  gettingList(ListType:string){
    switch (ListType){
      case "reading":
        this.list = this.userListSvc.currentlyReadingList;
        break;
      case "completed":
        this.list = this.userListSvc.completedList;
        break;
      case "dropped":
        this.list = this.userListSvc.droppedList;
        break;
        case "plan":
          this.list = this.userListSvc.planToReadList;
          break;
    }
    console.log(this.list);
  }
}
