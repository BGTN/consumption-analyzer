import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

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
  powerConsumptionForm;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.fetchPowerConsumptions();
    this.powerConsumption = new PowerConsumption();
    this.powerConsumptionForm = this.formBuilder.group({
      created: '',
      powerLevelInKWh: ''
    });
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

  onSubmit(powerConsumption: PowerConsumption) {
    this.http.post<PowerConsumption>(this.baseUrl + 'powerconsumption', powerConsumption).subscribe(result => {
      this.fetchPowerConsumptions();
      this.powerConsumption = new PowerConsumption();
    }, error => console.log(error));
    this.powerConsumptionForm.reset();
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
