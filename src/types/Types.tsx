
export type RawDataSeries = {
	value: number; 
	date: string;
}

export type DataSeries = {
	value: number; 
	date: Date;
}

export type PDateRange = {
  minDate: Date,
  maxDate: Date
}

export type RawSensorData = {
	name: string;
	dataseries: RawDataSeries[];
}

export type SensorData = {
	name: string;
	dataseriesArray: DataSeries[];
}

  export type DialogStateProps = {
    name: string;
    isOpen: boolean;
    chart: ChartsProps
  }

export type ChartsProps = {
  id: string,
  chartname: string,
  xaxisname: string,
  yaxisname: string,
  description: string,
  chartTypename: string,
  colorname: string,
  sensorName: string,
  dataseriesArray: DataSeries[]
}

export function getNewChart() {
  let chart: ChartsProps = {
    id: crypto.randomUUID(),
    chartname: '',
    xaxisname: 'x-axis',
    yaxisname: 'y-axis',
    description: '',
    chartTypename: 'line',
    colorname: 'black',
    sensorName: '',
    dataseriesArray: []
  }
  return chart
} 

export function convertRawSensorData(rawSensorDataArray: RawSensorData[]): SensorData[] {
  return rawSensorDataArray.map(rawSensorData => ({
    name: rawSensorData.name,
    dataseriesArray: rawSensorData.dataseries.map(data => ({
      value: data.value,
      date: new Date(data.date) // Convert string to Date object
    }))
  }));
}

export function getPDateRange(dataSeries: DataSeries[]): PDateRange {
  if (dataSeries.length === 0) return { minDate: new Date(), maxDate: new Date() };

  let minDate = dataSeries[0].date;
  let maxDate = dataSeries[0].date;

  for (const data of dataSeries) {
    if (data.date < minDate) {
      minDate = data.date;
    }
    if (data.date > maxDate) {
      maxDate = data.date;
    }
  }

  return { minDate, maxDate };
}

function getDataseriesArrayForName(sensorDataArray: SensorData[], sensorName: string): DataSeries[] {
  const sensor = sensorDataArray.find(sensor => sensor.name === sensorName);
  if (!sensor) {
    return []; 
  }
  return sensor.dataseriesArray;
}  

export function newChartWithDataSeries(chart: ChartsProps, sensorDataArray: SensorData[]): ChartsProps {
    let newChart = chart
    let array = getDataseriesArrayForName(sensorDataArray, newChart.sensorName)
    newChart.dataseriesArray = array
    return newChart
}