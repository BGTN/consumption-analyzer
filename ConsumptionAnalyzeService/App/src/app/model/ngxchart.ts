import { PowerConsumption } from "../power-consumption/power-consumption.component";

export class NgxChart {
  ngxCharts: NgxChartData[]
  public view: any[] = [700, 300];
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
  yScaleMin: number;

  constructor(powerConsumptions: PowerConsumption[]) {
    var series: NgxChartValue[] = this.generateChartDataByDay(powerConsumptions);
    this.ngxCharts = [];
    this.ngxCharts[0] = new NgxChartData("Stromzähler", series);
  }

  generateChartDataByDay(powerConsumptions: PowerConsumption[]): NgxChartValue[] {
    var series: NgxChartValue[] = [];
    var indexDate = new Date(powerConsumptions[0].created);
    var endDate = new Date(powerConsumptions[powerConsumptions.length - 1].created);
    var amountOfDays = Math.ceil((Math.abs(endDate.getTime() - indexDate.getTime())) / (1000 * 3600 * 24));
    var i = 0;
    for (let j = 0; j <= amountOfDays; j++) {
      var powerConsumptionDate = new Date(powerConsumptions[i].created);
      if (indexDate.getFullYear() == powerConsumptionDate.getFullYear() && indexDate.getMonth() == powerConsumptionDate.getMonth() && indexDate.getDate() == powerConsumptionDate.getDate()) {
        series[j] = new NgxChartValue(powerConsumptions[i]);
        indexDate.setDate(indexDate.getDate() + 1);
        i++;
      } else {
        var pc = new PowerConsumption();
        pc.created = indexDate.toISOString();
        var nextPowerConsumption = powerConsumptions[i]
        var nextPowerConsumptionDate = new Date(nextPowerConsumption.created)
        var lastPowerConsumption = powerConsumptions[i - 1]
        var lastPowerConsumptionDate = new Date(lastPowerConsumption.created)
        var daysBetweenTwoEntries = Math.ceil((Math.abs(nextPowerConsumptionDate.getTime() - lastPowerConsumptionDate.getTime())) / (1000 * 3600 * 24));
        var averagePerDayBetweenTwoEntries = (nextPowerConsumption.powerLevelInKWh - lastPowerConsumption.powerLevelInKWh) / daysBetweenTwoEntries;
        pc.powerLevelInKWh = series[j - 1].value + averagePerDayBetweenTwoEntries;
        series[j] = new NgxChartValue(pc);
        indexDate.setDate(indexDate.getDate() + 1);
      }
    }
    return series;
  }
}

export class NgxChartData {
  name: string;
  series: NgxChartValue[]

  constructor(name: string, series: NgxChartValue[]) {
    this.name = name;
    this.series = series;
  }
}

export class NgxChartValue {
  name: string;
  value: number;

  constructor(powerConsumption: PowerConsumption) {
    this.name = powerConsumption.created;
    this.value = powerConsumption.powerLevelInKWh;
  }
}
