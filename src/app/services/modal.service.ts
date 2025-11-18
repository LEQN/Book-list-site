import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifier?: Subject<string>;
  constructor(
     private resolver: ComponentFactoryResolver,
     private injector: Injector,
     @Inject(DOCUMENT) private document:Document
  ) { }

  open(){
    const ModalComponentFactory = this.resolver.resolveComponentFactory(ModalComponent);
    const modalComponent = ModalComponentFactory.create(this.injector);

    const sub = modalComponent.instance.inputForm.valueChanges.subscribe(() => {
      modalComponent.hostView.detectChanges();
    });
    modalComponent.instance.closeEvent.subscribe(() => {
      sub.unsubscribe();
      this.closeModal();
    });
    modalComponent.instance.submitEvent.subscribe(() => {
      sub.unsubscribe();
      this.submitModal();
    });
    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier.asObservable();
  }

  closeModal(){
    document.body.style.overflow = '';
    this.modalNotifier?.complete();
  }

  submitModal(){
    this.modalNotifier?.next("Confirm");
    this.closeModal();
  }
}
