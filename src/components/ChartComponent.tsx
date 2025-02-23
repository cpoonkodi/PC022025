import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ChartsProps, PDateRange } from '../types/Types';
import { PDateRangePicker } from './PDateRangePicker'

  type ChartComponentProps = {
    chart: ChartsProps,
    selectedDateRange: PDateRange,
    setSelectedDateRange : React.Dispatch<React.SetStateAction<PDateRange>>
  }
  export const ChartComponent = ({chart, selectedDateRange, setSelectedDateRange}: ChartComponentProps) => {
  
  // Filter data based on the selected range
  const filteredData = chart.dataseriesArray.filter(
    (point) => {
      return new Date(point.date) >= selectedDateRange.minDate &&
      new Date(point.date) <= selectedDateRange.maxDate
    }
  );

  const options = {
    chart: {
      type: chart.chartTypename,
    },
    title: {
      text: chart.chartname, 
      align: 'left'
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: '{value:%m/%d/%Y}',
      },
      title: {
        text: chart.xaxisname,
      },
      min: selectedDateRange.minDate.getTime(),
      max: selectedDateRange.maxDate.getTime(),
    },
    yAxis: {
      type: "value",
      align: 'left',
      title: {
        text: chart.yaxisname,
      },
    },
    series: [
      {
        data: filteredData.map((point) => [
          point.date.getTime(),
          point.value,
        ]), 
        color: chart.colorname, 
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
        {chart.description}
      </p>
    </div>
  )
};

export default ChartComponent;