import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public powerConsumptions: PowerConsumption[];
  public newPowerConsumptionRequest: NewPowerConsumptionRequest;
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.http.get<PowerConsumption[]>(baseUrl + 'powerconsumption').subscribe(result => {
      this.powerConsumptions = result;
    }, error => console.error(error));

    this.newPowerConsumptionRequest = new NewPowerConsumptionRequest();
  }

  add(powerLevelInKWh: number) {
    this.newPowerConsumptionRequest.powerLevelInKWh = powerLevelInKWh;
    this.http.post<PowerConsumption>(this.baseUrl + 'powerconsumption', this.newPowerConsumptionRequest).subscribe(result => {
      this.powerConsumptions.push(result);
    }, error => console.log(error));
  }
}


interface PowerConsumption {
  created: string;
  PowerLevelInKWh: number;
}

class NewPowerConsumptionRequest {
  created: Date;
  powerLevelInKWh: number;

  constructor() {
    this.created = new Date();
  }
}
