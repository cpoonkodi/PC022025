import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ErrorPage } from './pages/ErrorPage'
import { DisplayChart } from './pages/DisplayChart'
import { Sidebar } from './components/Sidebar'
import { useState, useEffect } from 'react';
import { SensorData, ChartsProps, DialogStateProps, getNewChart, convertRawSensorData, PDateRange } from './types/Types'


function App() {
  const [sensorDataArray, setJsonData]=useState<SensorData[]>([])
  const [charts, setCharts]=useState<ChartsProps[]>([])
  const [chartToBeDrawn, setChartToBeDrawn] = useState<ChartsProps | null>(null);
  const [dialogState, setDialogState] = useState<DialogStateProps>({
    name: "add",
    isOpen: false,
    chart: getNewChart()
  });
  const [selectedDateRange, setSelectedDateRange] = useState<PDateRange>( { minDate: new Date(), maxDate: new Date() } )
  
    // Fetch the data from json file
    useEffect(() => {
      fetch("/dataseries.json")
        .then((response) => response.json())
        .then((rawSensorDataArray) => convertRawSensorData(rawSensorDataArray))
        .then((data) => {
        setJsonData(data);
      })
      .catch((error) => console.error("Error fetching dataseries:", error))
    }, []);

  return (
    <div>
      <Sidebar sensorDataArray={sensorDataArray} charts={charts} setCharts={setCharts} dialogState={dialogState} setDialogState={setDialogState} setChartToBeDrawn={setChartToBeDrawn} setSelectedDateRange={setSelectedDateRange}/>
      <Routes>
        <Route path="/" element={<Home sensorDataArray={sensorDataArray} charts={charts} setCharts={setCharts} dialogState={dialogState} setDialogState={setDialogState} chartToBeDrawn={chartToBeDrawn} setChartToBeDrawn={setChartToBeDrawn} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange}/>} />
        <Route path="/displaychart" element={<DisplayChart chartToBeDrawn={chartToBeDrawn} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange}/>} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div> 
  );
}

export default App;
