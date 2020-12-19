import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-power-consumption',
  templateUrl: './power-consumption.component.html'
})
export class ConsumptionMeasurementComponent {
  public consumptionMeasurements: ConsumptionMeasurement[];
  public consumptionMeasurement: ConsumptionMeasurement;
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.fetchConsumptionMeasurements();
    this.consumptionMeasurement = new ConsumptionMeasurement();
  }

  add() {
    this.http.post<ConsumptionMeasurement>(this.baseUrl + 'consumptionmeasurement', this.consumptionMeasurement).subscribe(result => {
      this.fetchConsumptionMeasurements();
      this.consumptionMeasurement = new ConsumptionMeasurement();
    }, error => console.log(error));
  }

  delete(item: ConsumptionMeasurement) {
    console.log(item);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item,
    };
    this.http.delete<ConsumptionMeasurement>(this.baseUrl + 'consumptionmeasurement', options).subscribe(result => {
      console.log(result);
      this.fetchConsumptionMeasurements();
    }, error => console.log(error));
  }

  fetchConsumptionMeasurements() {
    this.http.get<ConsumptionMeasurement[]>(this.baseUrl + 'consumptionmeasurement').subscribe(result => {
      this.consumptionMeasurements = result;
    }, error => console.error(error));
  }
}

class ConsumptionMeasurement {
  Id: string;
  date: string;
  level: number;

  constructor() {
    this.date = new Date(Date.now()).toUTCString().substring(0, 10);
  }
}
