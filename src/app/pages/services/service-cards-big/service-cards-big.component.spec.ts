import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardsBigComponent } from './service-cards-big.component';

describe('ServiceCardsBigComponent', () => {
  let component: ServiceCardsBigComponent;
  let fixture: ComponentFixture<ServiceCardsBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardsBigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCardsBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
