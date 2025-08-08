import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBtnIconComponent } from './ui-btn-icon.component';

describe('UiBtnIconComponent', () => {
  let component: UiBtnIconComponent;
  let fixture: ComponentFixture<UiBtnIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBtnIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiBtnIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
