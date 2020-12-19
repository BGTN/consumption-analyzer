import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterConsumptionKitchenComponent } from './water-consumption-kitchen.component';

describe('WaterConsumptionKitchenComponent', () => {
  let component: WaterConsumptionKitchenComponent;
  let fixture: ComponentFixture<WaterConsumptionKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterConsumptionKitchenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterConsumptionKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
