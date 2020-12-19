import { ConsumptionMeasurement } from "../power-consumption/power-consumption.component";

export class NgxChart {
  chartDataByDate: NgxChartData[]
  chartDataByMonthAvg: NgxChartData[]
  view: any[] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  gradient: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string;
  yAxisLabel: string;
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  yScaleMin: number;

  constructor() {
  }

  generateChartDataByDay(consumptionMeasurements: ConsumptionMeasurement[], chartDataName: string): NgxChartValue[] {
    var series: NgxChartValue[] = [];
    var indexDate = new Date(consumptionMeasurements[0].date);
    var endDate = new Date(consumptionMeasurements[consumptionMeasurements.length - 1].date);
    var amountOfDays = this.getAmountOfDatesBetweenTwoDates(endDate, indexDate);
    var i = 0;
    for (let j = 0; j <= amountOfDays; j++) {
      var consumptionMeasurementDate = new Date(consumptionMeasurements[i].date);
      if (indexDate.getFullYear() == consumptionMeasurementDate.getFullYear() && indexDate.getMonth() == consumptionMeasurementDate.getMonth() && indexDate.getDate() == consumptionMeasurementDate.getDate()) {
        series[j] = new NgxChartValue(consumptionMeasurements[i]);
        indexDate.setDate(indexDate.getDate() + 1);
        i++;
      } else {
        var pc = new ConsumptionMeasurement();
        pc.date = indexDate.toISOString();
        var nextConsumptionMeasurement = consumptionMeasurements[i]
        var nextConsumptionMeasurementDate = new Date(nextConsumptionMeasurement.date)
        var lastConsumptionMeasurement = consumptionMeasurements[i - 1]
        var lastConsumptionMeasurementDate = new Date(lastConsumptionMeasurement.date)
        var daysBetweenTwoEntries = this.getAmountOfDatesBetweenTwoDates(nextConsumptionMeasurementDate, lastConsumptionMeasurementDate);
        var averagePerDayBetweenTwoEntries = (nextConsumptionMeasurement.level - lastConsumptionMeasurement.level) / daysBetweenTwoEntries;
        pc.level = series[j - 1].value + averagePerDayBetweenTwoEntries;
        series[j] = new NgxChartValue(pc);
        indexDate.setDate(indexDate.getDate() + 1);
      }
    }
    this.chartDataByDate = [];
    this.chartDataByDate[0] = new NgxChartData(chartDataName, series);
    return series;
  }

  generateChartDataByMonthAvg(ngxChartValuesByDay: NgxChartValue[], chartDataName: string): NgxChartValue[] {
    var result: NgxChartValue[] = [];
    var resultIndex = 0;
    var indexDate = new Date(ngxChartValuesByDay[0].name); // Requires ordering of entries by date
    var powerLevelFirstDayInMonth = ngxChartValuesByDay[0].value;
    var countDaysByMonth = 0;
    for (var i = 0; i < ngxChartValuesByDay.length; i++) {
      var date = new Date(ngxChartValuesByDay[i].name);
      if (indexDate.getFullYear() == date.getFullYear() && indexDate.getMonth() == date.getMonth()) {
        countDaysByMonth++;
      } else {
        var powerLevelLastDayInMonth = ngxChartValuesByDay[i - 1].value;
        var consumptionMeasurement: ConsumptionMeasurement = new ConsumptionMeasurement();
        consumptionMeasurement.date = indexDate.getFullYear().toString() + "-" + (indexDate.getMonth() + 1).toString();
        consumptionMeasurement.level = (powerLevelLastDayInMonth - powerLevelFirstDayInMonth) / countDaysByMonth;
        var ngxChartValueForMonth = new NgxChartValue(consumptionMeasurement);
        result[resultIndex] = ngxChartValueForMonth;
        indexDate = date;
        powerLevelFirstDayInMonth = ngxChartValuesByDay[i].value;
        countDaysByMonth = 0;
        resultIndex++;
      }
    }
    var powerLevelLastDayInMonth = ngxChartValuesByDay[i - 1].value;
    var consumptionMeasurement: ConsumptionMeasurement = new ConsumptionMeasurement();
    consumptionMeasurement.date = indexDate.getFullYear().toString() + "-" + (indexDate.getMonth() + 1).toString();
    consumptionMeasurement.level = (powerLevelLastDayInMonth - powerLevelFirstDayInMonth) / countDaysByMonth;
    var ngxChartValueForMonth = new NgxChartValue(consumptionMeasurement);
    result[resultIndex] = ngxChartValueForMonth;

    this.chartDataByMonthAvg = [];
    this.chartDataByMonthAvg[0] = new NgxChartData(chartDataName + "PerMonat", result);

    return result;
  }

  getAmountOfDatesBetweenTwoDates(endDate: Date, startDate: Date): number {
    return Math.ceil((Math.abs(endDate.getTime() - startDate.getTime())) / (1000 * 3600 * 24));
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

  constructor(consumptionMeasurement: ConsumptionMeasurement) {
    this.name = consumptionMeasurement.date;
    this.value = consumptionMeasurement.level;
  }
}
