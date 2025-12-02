import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../../userLists';

@Component({
  selector: 'bib-list-table',
  imports: [CommonModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent {
  @Input() list!:ListItem[];

}
