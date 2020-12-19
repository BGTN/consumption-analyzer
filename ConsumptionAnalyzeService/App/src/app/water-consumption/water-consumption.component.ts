import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxChart, NgxChartValue } from '../model/ngxchart';

@Component({
  selector: 'app-water-consumption',
  templateUrl: './water-consumption.component.html',
  styleUrls: ['./water-consumption.component.css']
})

export class WaterConsumptionComponent {
  public consumptionMeasurements: ConsumptionMeasurement[];
  private http: HttpClient;
  private baseUrl: string;
  public consumptionMeasurementForm: FormGroup;
  public levelType: string = 'Cbm';
  public consumptionType: string = 'WaterLevel';
  public location: string = 'Bathroom';
  public ngxChart: NgxChart;
  public ngxChartMonthAvg: NgxChart;

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
      var chartDataByDay: NgxChartValue[] = this.ngxChart.generateChartDataByDay(this.consumptionMeasurements, "Warmwasser");
      this.ngxChart.yScaleMin = this.consumptionMeasurements[0].level;
      this.ngxChart.xAxisLabel = 'Datum';
      this.ngxChart.yAxisLabel = 'Wasserstand in m^3';

      this.ngxChartMonthAvg = new NgxChart();
      this.ngxChartMonthAvg.generateChartDataByMonthAvg(chartDataByDay, "Warmwasser")
      this.ngxChartMonthAvg.xAxisLabel = "Monat";
      this.ngxChartMonthAvg.yAxisLabel = "Durchschn. m^3 pro Tag";

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
