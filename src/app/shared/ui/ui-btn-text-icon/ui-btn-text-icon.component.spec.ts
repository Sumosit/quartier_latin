import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBtnTextIconComponent } from './ui-btn-text-icon.component';

describe('UiBtnTextIconComponent', () => {
  let component: UiBtnTextIconComponent;
  let fixture: ComponentFixture<UiBtnTextIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBtnTextIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiBtnTextIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
