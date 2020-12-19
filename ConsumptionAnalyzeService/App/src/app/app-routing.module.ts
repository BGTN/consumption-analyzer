import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsumptionMeasurementComponent } from './power-consumption/power-consumption.component';
import { WaterConsumptionKitchenComponent } from './water-consumption-kitchen/water-consumption-kitchen.component';
import { WaterConsumptionComponent } from './water-consumption/water-consumption.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'power', component: ConsumptionMeasurementComponent },
  { path: 'water', component: WaterConsumptionComponent },
  { path: 'water-kitchen', component: WaterConsumptionKitchenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
