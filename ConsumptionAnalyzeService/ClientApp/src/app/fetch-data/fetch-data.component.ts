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
    this.http.get<PowerConsumption[]>(baseUrl + 'powerconsumption').subscribe(result => {
      this.powerConsumptions = result;
    }, error => console.error(error));

    this.powerConsumption = new PowerConsumption();
  }

  add(powerLevelInKWh: number) {
    this.powerConsumption.powerLevelInKWh = Number(powerLevelInKWh);
    this.http.post<PowerConsumption>(this.baseUrl + 'powerconsumption', this.powerConsumption).subscribe(result => {
      this.powerConsumptions.push(result);
    }, error => console.log(error));
  }
}

/*
interface PowerConsumption {
  created: Date;
  PowerLevelInKWh: number;
}
*/

class PowerConsumption {
  created: Date;
  powerLevelInKWh: number;

  constructor() {
    this.created = new Date();
  }
}
