import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
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

  fetchPowerConsumptions() {
    this.http.get<PowerConsumption[]>(this.baseUrl + 'powerconsumption').subscribe(result => {
      this.powerConsumptions = result;
    }, error => console.error(error));
  }
}

class PowerConsumption {
  created: string;
  powerLevelInKWh: number;

  constructor() {
    this.created = new Date(Date.now()).toISOString().substring(0, 10);
  }
}
