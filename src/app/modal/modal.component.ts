import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bib-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
  ){}

  close(): void{

    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void{
      this.elementRef.nativeElement.remove();
      this.submitEvent.emit();
    }

}
