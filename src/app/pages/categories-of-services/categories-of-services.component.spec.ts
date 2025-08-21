import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOfServicesComponent } from './categories-of-services.component';

describe('CategoriesOfServicesComponent', () => {
  let component: CategoriesOfServicesComponent;
  let fixture: ComponentFixture<CategoriesOfServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesOfServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesOfServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
