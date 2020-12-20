import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxChart, NgxChartValue } from '../model/ngxchart';

@Component({
  selector: 'app-power-consumption',
  templateUrl: './power-consumption.component.html',
  styleUrls: ['./power-consumption.component.css']
})

export class ConsumptionMeasurementComponent {
  public consumptionMeasurements: ConsumptionMeasurement[];
  private http: HttpClient;
  private baseUrl: string;
  public consumptionMeasurementForm: FormGroup;
  public levelType: string = 'KWh';
  public consumptionType: string = 'PowerLevel';
  public location: string = 'Landing';
  public ngxChart: NgxChart;
  public ngxChartMonthAvg: NgxChart;
  fixCostPerMonth: number = 9.95;
  variableCostPerMonth: number = 0.292;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.http = http;
    this.baseUrl = baseUrl;
     this.getAllBy(this.consumptionType, this.location);
    this.consumptionMeasurementForm = this.formBuilder.group({
      date: new Date(Date.now()).toISOString().substring(0, 10),
      level: '',
      levelType: this.levelType,
      consumptionType: this.consumptionType,
      location: this.location
    });
  }

  delete(item: ConsumptionMeasurement) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item,
    };
    this.http.delete<ConsumptionMeasurement>(this.baseUrl + 'consumptionmeasurement', options).subscribe(result => {
      console.log(result);
      this.getAllBy(this.consumptionType, this.location);
    }, error => console.log(error));
  }

  getAllBy(consumptionType: string, location: string) {
    var httpParams: HttpParams = new HttpParams().append("consumptionType", consumptionType).append("location", location);
    const options = {
      params: httpParams
    };
    this.http.get<ConsumptionMeasurement[]>(this.baseUrl + 'consumptionmeasurement', options).subscribe(result => {
      this.consumptionMeasurements = result;
      this.initChartValues();
    }, error => console.error(error));
  }

  onSubmit(consumptionMeasurement: ConsumptionMeasurement) {
    this.http.post<ConsumptionMeasurement>(this.baseUrl + 'consumptionmeasurement', consumptionMeasurement).subscribe(result => {
      this.getAllBy(this.consumptionType, this.location);
      this.consumptionMeasurementForm = this.formBuilder.group({
        date: new Date(Date.now()).toISOString().substring(0, 10),
        level: '',
        levelType: this.levelType,
        consumptionType: this.consumptionType,
        location: this.location
      });
    }, error => console.log(error));
    this.consumptionMeasurementForm.reset();
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
    if (this.consumptionMeasurements != null) {
      this.ngxChart = new NgxChart();
      var chartDataByDay: NgxChartValue[] = this.ngxChart.generateChartDataByDay(this.consumptionMeasurements, "Stromzähler");
      this.ngxChart.yScaleMin = this.consumptionMeasurements[0].level;
      this.ngxChart.xAxisLabel = 'Datum';
      this.ngxChart.yAxisLabel = 'Zählerstand in kWh';

      this.ngxChartMonthAvg = new NgxChart();
      this.ngxChartMonthAvg.generateChartDataByMonthAvg(chartDataByDay, "Stromzähler", this.fixCostPerMonth, this.variableCostPerMonth)
      this.ngxChartMonthAvg.xAxisLabel = "Monat";
      this.ngxChartMonthAvg.yAxisLabel = "kWh pro Monat";

    }
  }
}


export class ConsumptionMeasurement {
  Id: string;
  date: string;
  level: number;
  levelType: string;
  consumptionType: string;
  location: string;

  constructor() {
    this.date = new Date(Date.now()).toISOString().substring(0, 10);
  }
}
