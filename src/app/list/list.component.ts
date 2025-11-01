import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bib-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  isListEmpty:boolean = true;
}
