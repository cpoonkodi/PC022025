import { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { PDateRange } from '../types/Types';
import { PDateRangePicker } from './PDateRangePicker'
import type { RootState, AppDispatch } from '../store'
import { useSelector, useDispatch } from 'react-redux'

export const ChartComponent = () => {
  const {sensorData} = useSelector((state: RootState) => state.charts)
	const { selectedChart } = useSelector((state:RootState) => state.charts);
  const dispatch = useDispatch<AppDispatch>();

  const sensorName: string = selectedChart?.sensorName ?? ""

  // Filter data based on the selected range
  var dataseries: { value: number; date: string }[] = []
  const x = sensorData.find(sensor => sensor.name === sensorName)
  if (x) {
    dataseries = x.dataseries
  }

  const getDateRange = (dataseries: { value: number; date: string }[]): PDateRange => {
    if (dataseries.length === 0) {
      return { minDate: new Date(), maxDate: new Date() }; 
    }
    return dataseries.reduce(
      (acc, data) => {
        const dataDate = new Date(data.date);
        return {
          minDate: dataDate < acc.minDate ? dataDate : acc.minDate,
          maxDate: dataDate > acc.maxDate ? dataDate : acc.maxDate,
        };
      },
      { minDate: new Date(dataseries[0].date), maxDate: new Date(dataseries[0].date) }
    );
  };
  
  const [selectedDateRange, setSelectedDateRange] = useState<PDateRange>(getDateRange(dataseries));

  useEffect(() => {
    setSelectedDateRange(getDateRange(dataseries));
  }, [selectedChart]);

  const getDataForFilter = (dataseries: { value: number; date: string }[], dateRange: PDateRange): { value: number; date: string }[] => {
    return dataseries.filter((data) => {
      const dataDate = new Date(data.date);
      return dataDate >= dateRange.minDate && dataDate <= dateRange.maxDate;
    });
  }

  const filteredData = getDataForFilter(dataseries, selectedDateRange);

  const options = {
    chart: {
      type: selectedChart?.chartTypename,
    },
    title: {
      text: selectedChart?.chartname, 
      align: 'left'
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: '{value:%m/%d/%Y}',
      },
      title: {
        text: selectedChart?.xaxisname,
      },
      min: selectedDateRange.minDate.getTime(),
      max: selectedDateRange.maxDate.getTime(),
    },
    yAxis: {
      type: "value",
      align: 'left',
      title: {
        text: selectedChart?.yaxisname,
      },
    },
    series: [
      {
        data: filteredData.map((point) => [
          (new Date(point.date)).getTime(),
          point.value,
        ]), 
        color: selectedChart?.colorname, 
      },
    ],
    navigator: {
      enabled:false,
    },
    scrollbar: {
      enabled:false,
    },
    rangeSelector: {
      inputDateFormat: '%b %e, %Y %H:%M',
      inputPosition: {
          align: 'left',
          x: 0,
          y: 0
      },
      buttonPosition: {
          align: 'right',
          x: 0,
          y: 0
      },
  },
    exporting: {
      enabled: true, 
    },
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Render PDateRangePicker */}
        <div style={{width:'100%', display: 'flex', justifyContent: 'flex-end'}}>
          <PDateRangePicker selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange}
         />
         </div>
        <HighchartsReact highcharts={Highcharts} options={options} />      
      <p style={{ textAlign: 'center', margin: '10px', maxWidth: '600px', padding:'10px' }}>
        {selectedChart?.description}
      </p>
    </div>
  )
};

export default ChartComponent;