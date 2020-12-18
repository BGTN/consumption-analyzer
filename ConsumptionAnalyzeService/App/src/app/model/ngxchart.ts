import { PowerConsumption } from "../power-consumption/power-consumption.component";

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

  constructor(powerConsumptions: PowerConsumption[], chartDataName: string) {
    var seriesChartDataByDay: NgxChartValue[] = this.generateChartDataByDay(powerConsumptions);
    var seriesChartDataByMonthAvg: NgxChartValue[] = this.generateChartDataByMonthAvg(seriesChartDataByDay);
    this.chartDataByDate = [];
    this.chartDataByDate[0] = new NgxChartData(chartDataName, seriesChartDataByDay);
    this.chartDataByMonthAvg = [];
    this.chartDataByMonthAvg[0] = new NgxChartData(chartDataName + "PerMonat", seriesChartDataByMonthAvg);
  }

  generateChartDataByDay(powerConsumptions: PowerConsumption[]): NgxChartValue[] {
    var series: NgxChartValue[] = [];
    var indexDate = new Date(powerConsumptions[0].created);
    var endDate = new Date(powerConsumptions[powerConsumptions.length - 1].created);
    var amountOfDays = this.getAmountOfDatesBetweenTwoDates(endDate, indexDate);
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
        var daysBetweenTwoEntries = this.getAmountOfDatesBetweenTwoDates(nextPowerConsumptionDate, lastPowerConsumptionDate);
        var averagePerDayBetweenTwoEntries = (nextPowerConsumption.powerLevelInKWh - lastPowerConsumption.powerLevelInKWh) / daysBetweenTwoEntries;
        pc.powerLevelInKWh = series[j - 1].value + averagePerDayBetweenTwoEntries;
        series[j] = new NgxChartValue(pc);
        indexDate.setDate(indexDate.getDate() + 1);
      }
    }
    return series;
  }

  generateChartDataByMonthAvg(ngxChartValuesByDay: NgxChartValue[]): NgxChartValue[] {
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
        var powerConsumption: PowerConsumption = new PowerConsumption();
        powerConsumption.created = indexDate.getFullYear().toString() + "-" + (indexDate.getMonth() + 1).toString();
        powerConsumption.powerLevelInKWh = (powerLevelLastDayInMonth - powerLevelFirstDayInMonth) / countDaysByMonth;
        var ngxChartValueForMonth = new NgxChartValue(powerConsumption);
        result[resultIndex] = ngxChartValueForMonth;
        indexDate = date;
        powerLevelFirstDayInMonth = ngxChartValuesByDay[i].value;
        countDaysByMonth = 0;
        resultIndex++;
      }
    }
    var powerLevelLastDayInMonth = ngxChartValuesByDay[i - 1].value;
    var powerConsumption: PowerConsumption = new PowerConsumption();
    powerConsumption.created = indexDate.getFullYear().toString() + "-" + (indexDate.getMonth() + 1).toString();
    powerConsumption.powerLevelInKWh = (powerLevelLastDayInMonth - powerLevelFirstDayInMonth) / countDaysByMonth;
    var ngxChartValueForMonth = new NgxChartValue(powerConsumption);
    result[resultIndex] = ngxChartValueForMonth;

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

  constructor(powerConsumption: PowerConsumption) {
    this.name = powerConsumption.created;
    this.value = powerConsumption.powerLevelInKWh;
  }
}
