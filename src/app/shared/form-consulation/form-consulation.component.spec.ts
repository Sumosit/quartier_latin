import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsulationComponent } from './form-consulation.component';

describe('FormConsulationComponent', () => {
  let component: FormConsulationComponent;
  let fixture: ComponentFixture<FormConsulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConsulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
