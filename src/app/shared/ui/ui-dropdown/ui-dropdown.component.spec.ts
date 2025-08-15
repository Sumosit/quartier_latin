import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputDropdownComponent } from './ui-dropdown.component';

describe('UiDropdownComponent', () => {
  let component: UiInputDropdownComponent;
  let fixture: ComponentFixture<UiInputDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiInputDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
