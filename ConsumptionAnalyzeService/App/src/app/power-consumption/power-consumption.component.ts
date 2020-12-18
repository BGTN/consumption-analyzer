import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxChart } from '../model/ngxchart';

@Component({
  selector: 'app-power-consumption',
  templateUrl: './power-consumption.component.html',
  styleUrls: ['./power-consumption.component.css']
})

export class PowerConsumptionComponent {
  public powerConsumptions: PowerConsumption[];
  private http: HttpClient;
  private baseUrl: string;
  public powerConsumptionForm: FormGroup;

  // NGX CHART
  public ngxChart: NgxChart;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.getAll();
    this.powerConsumptionForm = this.formBuilder.group({
      created: new Date(Date.now()).toISOString().substring(0, 10),
      powerLevelInKWh: ''
    });
  }

  delete(item: PowerConsumption) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item,
    };
    this.http.delete<PowerConsumption>(this.baseUrl + 'powerconsumption', options).subscribe(result => {
      console.log(result);
      this.getAll();
    }, error => console.log(error));
  }

  getAll() {
    this.http.get<PowerConsumption[]>(this.baseUrl + 'powerconsumption').subscribe(result => {
      this.powerConsumptions = result;
      this.initChartValues();
    }, error => console.error(error));
  }

  onSubmit(powerConsumption: PowerConsumption) {
    this.http.post<PowerConsumption>(this.baseUrl + 'powerconsumption', powerConsumption).subscribe(result => {
      this.getAll();
      this.powerConsumptionForm = this.formBuilder.group({
        created: new Date(Date.now()).toISOString().substring(0, 10),
        powerLevelInKWh: ''
      });
    }, error => console.log(error));
    this.powerConsumptionForm.reset();
  }

  // NGX CHART
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  initChartValues(): void {
    if (this.powerConsumptions != null) {
      this.ngxChart = new NgxChart(this.powerConsumptions);
      this.ngxChart.yScaleMin = this.powerConsumptions[0].powerLevelInKWh;
    }
  }
}


export class PowerConsumption {
  Id: string;
  created: string;
  powerLevelInKWh: number;

  constructor() {
    this.created = new Date(Date.now()).toISOString().substring(0, 10);
  }
}
