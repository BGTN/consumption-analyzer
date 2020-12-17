import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-power-consumption',
  templateUrl: './power-consumption.component.html',
  styleUrls: ['./power-consumption.component.css']
})
export class PowerConsumptionComponent {
  public powerConsumptions: PowerConsumption[];
  public powerConsumption: PowerConsumption;
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.fetchPowerConsumptions();
    this.powerConsumption = new PowerConsumption();
  }

  add() {
    this.http.post<PowerConsumption>(this.baseUrl + 'powerconsumption', this.powerConsumption).subscribe(result => {
      this.fetchPowerConsumptions();
      this.powerConsumption = new PowerConsumption();
    }, error => console.log(error));
  }

  delete(item: PowerConsumption) {
    console.log(item);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item,
    };
    this.http.delete<PowerConsumption>(this.baseUrl + 'powerconsumption', options).subscribe(result => {
      console.log(result);
      this.fetchPowerConsumptions();
    }, error => console.log(error));
  }

  fetchPowerConsumptions() {
    this.http.get<PowerConsumption[]>(this.baseUrl + 'powerconsumption').subscribe(result => {
      this.powerConsumptions = result;
    }, error => console.error(error));
  }
}

class PowerConsumption {
  Id: string;
  created: string;
  powerLevelInKWh: number;

  constructor() {
    this.created = new Date(Date.now()).toUTCString().substring(0, 10);
  }
}
