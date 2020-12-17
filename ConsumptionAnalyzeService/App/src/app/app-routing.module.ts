import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PowerConsumptionComponent } from './power-consumption/power-consumption.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'power', component: PowerConsumptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
