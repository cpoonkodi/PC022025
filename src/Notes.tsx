export {}
// import React from 'react'
// import { SensorData, ChartProps } from './types/Types'
// import { 
//   MenuItem, 
//   Dialog, 
//   DialogActions, 
//   DialogContent, 
//   DialogTitle, 
//   TextField, 
//   Button, 
//   Stack } from '@mui/material'
// import { chart } from 'highcharts'

// type SidebarProps = {
//   sensorDataArray: SensorData[],
//   charts : ChartProps[],
//   setCharts: React.Dispatch<React.SetStateAction<ChartProps[]>>
// }

// export const Sidebar = ({sensorDataArray, charts, setCharts}: SidebarProps) => {

//   const getDataSeriesByName = (data: SensorData[], name: string) => {
//     return data.find(item => item.name === name)?.dataseriesArray || [];
//   };

//   function addDummyChart1() {
//     const chartProps: ChartProps = {
//       id: crypto.randomUUID(),
//       chartname: "A",
//       xaxisname: "X",
//       yaxisname: "B",
//       description: "Dummy",
//       colorname: 'black',
//       chartTypename: 'line',
//       sensorName: 'Sensor_A',
//       dataseriesArray: []
//     };
//     // Instead of modifying charts directly, we use setCharts to update state
//     setCharts(prevCharts => [...prevCharts, chartProps])
//     console.log("Added one Dummy chart. Charts: ", charts)

//     const x = getDataSeriesByName(sensorDataArray, chartProps.sensorName)
//     console.log("dataseries for A:", {x})

//   }

//   function addDummyChart2() {
//     const chartProps: ChartProps = {
//       id: crypto.randomUUID(),
//       chartname: "B",
//       xaxisname: "X",
//       yaxisname: "B",
//       description: "Dummy",
//       colorname: 'black',
//       chartTypename: 'line',
//       sensorName: 'Sensor_A',
//       dataseriesArray: []
//     };
//     // Instead of modifying charts directly, we use setCharts to update state
//     setCharts(prevCharts => [...prevCharts, chartProps])
//     console.log("Added one Dummy chart. Charts: ", charts)
//   }

//   function addDummyChart3() {
//     const chartProps: ChartProps = {
//       id: crypto.randomUUID(),
//       chartname: "C",
//       xaxisname: "X",
//       yaxisname: "B",
//       description: "Dummy",
//       colorname: 'black',
//       chartTypename: 'line',
//       sensorName: 'Sensor_A',
//       dataseriesArray: []
//     };
//     // Instead of modifying charts directly, we use setCharts to update state
//     setCharts(prevCharts => [...prevCharts, chartProps])
//     console.log("Added one Dummy chart. Charts: ", charts)

//   }

//   function addDummyCharts() {
//     addDummyChart1()
//     addDummyChart2()
//     addDummyChart3()
//   }
//   function deleteChart(chartname: string) {
//     setCharts(prevCharts => prevCharts.filter(chart => chart.chartname !== chartname))
//   }
//   function deleteDummyChart1() {
//     deleteChart("B")
//     console.log("Removed one Dummy chart. Charts: ", charts)
//   }
  
//   function printCharts() {
//     console.log("Charts: ", charts)
//   }

//   return (
// 	<div>
//         <button onClick={addDummyCharts}>click</button>
//         <button onClick={printCharts}>print</button>
//     <ul>
//         {charts.map((chart, index) => (
//           <li key={index}>
//             {chart.chartname}
//             {chart.sensorName}
//             <button onClick={() => deleteChart(chart.chartname)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//   </div>
//   )
// }
