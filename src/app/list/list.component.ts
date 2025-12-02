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
