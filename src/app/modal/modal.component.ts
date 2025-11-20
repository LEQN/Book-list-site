import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Books } from '../books';

export interface ModalSubmissionData {
  book: Books;
  status: string;
  score?: number;
  finishDate?: Date;
}

@Component({
  selector: 'bib-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  statusOptions:string[] = ["Reading", "Completed", "Dropped", "Plan to Read"];
  scoreOptions: number[] = [1,2,3,4,5,6,7,8,9,10];
  inputForm!: FormGroup;

  @Input() currentBook!: Books;
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter<ModalSubmissionData>();

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder
  ){
    this.inputForm = this.fb.group({
          status: ['', Validators.required],
          score: [''],
          finishDate: ['', this.validDate()]
        });
  }

  close(): void{
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void{
    if(this.inputForm.valid){
      const submissionData: ModalSubmissionData = {
        book: this.currentBook,
        status: this.inputForm.get('status')?.value,
        score: this.inputForm.get('score')?.value,
        finishDate: this.inputForm.get('finishDate')?.value
      }
      // console.log("payload: ", submissionData);
      this.elementRef.nativeElement.remove();
      this.submitEvent.emit(submissionData);
    }
  }

    get today(): string{
      return new Date().toISOString().split('T')[0];
    }
  
    validDate():ValidatorFn{
      return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value){return null;}
        const input = new Date(control.value);
        const today = new Date();
        return input > today ? {futureDate: true} : null; 
      };
    }
}
