import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  currentModal: string | 'form-consultation' = '';

  constructor() { }
}
