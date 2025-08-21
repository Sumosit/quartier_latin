import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDynamicBlocksComponent } from './services-dynamic-blocks.component';

describe('ServicesDynamicBlocksComponent', () => {
  let component: ServicesDynamicBlocksComponent;
  let fixture: ComponentFixture<ServicesDynamicBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesDynamicBlocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesDynamicBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
