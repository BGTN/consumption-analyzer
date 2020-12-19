import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionMeasurementComponent } from './power-consumption.component';

describe('ConsumptionMeasurementComponent', () => {
  let component: ConsumptionMeasurementComponent;
  let fixture: ComponentFixture<ConsumptionMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
