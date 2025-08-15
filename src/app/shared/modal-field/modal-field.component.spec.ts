import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFieldComponent } from './modal-field.component';

describe('ModalFieldComponent', () => {
  let component: ModalFieldComponent;
  let fixture: ComponentFixture<ModalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
