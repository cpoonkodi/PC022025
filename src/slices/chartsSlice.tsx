import { createSlice } from "@reduxjs/toolkit";

interface SensorDataProps {
	name: string;
	dataseries: { value: number; date: string }[];
  }

interface DataSeries {
	value: number; 
	date: Date;
}

export interface ChartProps {
	id: number;
	chartname: string,
	chartTypename: string,
	colorname: string,
	sensorName: string,
  	xaxisname: string,
  	yaxisname: string,
  	description: string,
  }

  interface PDateRange {
	minDate: Date,
	maxDate: Date
  }

  interface ChartsState {
	sensorData: SensorDataProps[];
	chartsList: ChartProps[];
	selectedChart: ChartProps | null;
	selectedDateRange:PDateRange;
  }

const initialState:ChartsState = {
	sensorData:[],
	chartsList:[],
	selectedChart:null,
	selectedDateRange: { minDate: new Date(), maxDate: new Date() }
}

const chartsSlice=createSlice({
	name:'chartSlice',
	initialState: initialState,
	reducers:{
		addSensorData:(state,action)=>{
			state.sensorData = action.payload
		},
		addChartToList:(state, action)=>{
			const id=Math.random()*100
			let chart={...action.payload, id}
			state.chartsList.push(chart)
			state.selectedChart = chart
		},
		removeChartFromList:(state, action)=>{
			state.chartsList = state.chartsList.filter((chart)=>chart.id !== action.payload.id)
		},
		updateChartInList:(state, action)=>{
			state.chartsList = state.chartsList.map((chart)=>chart.id === action.payload.id ? action.payload : chart)
			state.selectedChart = action.payload
		},
		setSelectedChart:(state, action)=>{
			state.selectedChart = action.payload
		},
		setSelectedDateRange: (state, action)=>{
			state.selectedDateRange=action.payload
		}
	}
})

export const { setSelectedDateRange, addSensorData, addChartToList, removeChartFromList, updateChartInList, setSelectedChart } = chartsSlice.actions

export default chartsSlice.reducer