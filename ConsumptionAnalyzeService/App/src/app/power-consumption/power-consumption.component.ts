import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';

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
  private ngxChart: NgxChart;
  public chartValues: any[];
  view: any[] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Datum';
  yAxisLabel: string = 'Zählerstand in kWh';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.fetchPowerConsumptions();
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
      this.fetchPowerConsumptions();
    }, error => console.log(error));
  }

  fetchPowerConsumptions() {
    this.http.get<PowerConsumption[]>(this.baseUrl + 'powerconsumption').subscribe(result => {
      this.powerConsumptions = result;
      this.initChartValues();
    }, error => console.error(error));
  }

  onSubmit(powerConsumption: PowerConsumption) {
    this.http.post<PowerConsumption>(this.baseUrl + 'powerconsumption', powerConsumption).subscribe(result => {
      this.fetchPowerConsumptions();
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
    console.log("Initiating values");

    if (this.powerConsumptions != null) {
      this.ngxChart = new NgxChart(this.powerConsumptions);
      this.chartValues = this.ngxChart.ngxCharts;
    }
  }
}


class PowerConsumption {
  Id: string;
  created: string;
  powerLevelInKWh: number;

  constructor() {
    this.created = new Date(Date.now()).toISOString().substring(0, 10);
  }
}

class NgxChart {
  ngxCharts: NgxChartData[]

  constructor(powerConsumptions: PowerConsumption[]) {
    var series: NgxChartValue[] = [];
    for (let i = 0; i < powerConsumptions.length; i++) {
      series[i] = new NgxChartValue(powerConsumptions[i]);
    }
    var powerConsumptionNgxChartData = new NgxChartData("Stromzähler", series);
    this.ngxCharts = [];
    this.ngxCharts[0] = powerConsumptionNgxChartData;
  }
}

class NgxChartData {
  name: string;
  series: NgxChartValue[]

  constructor(name: string, series: NgxChartValue[]) {
    this.name = name;
    this.series = series;
  }
}

class NgxChartValue {
  name: string;
  value: number;

  constructor(powerConsumption: PowerConsumption) {
    this.name = powerConsumption.created;
    this.value = powerConsumption.powerLevelInKWh;
  }
}
