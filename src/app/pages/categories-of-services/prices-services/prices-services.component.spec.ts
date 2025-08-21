import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesServicesComponent } from './prices-services.component';

describe('PricesServicesComponent', () => {
  let component: PricesServicesComponent;
  let fixture: ComponentFixture<PricesServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricesServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
