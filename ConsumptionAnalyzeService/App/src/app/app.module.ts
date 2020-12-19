import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsumptionMeasurementComponent } from './power-consumption/power-consumption.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WaterConsumptionComponent } from './water-consumption/water-consumption.component';
import { WaterConsumptionKitchenComponent } from './water-consumption-kitchen/water-consumption-kitchen.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsumptionMeasurementComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    WaterConsumptionComponent,
    WaterConsumptionKitchenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
