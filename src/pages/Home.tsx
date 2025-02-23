import { CustomCard } from '../components/CustomCard'
import { AddChart } from '../components/AddChart'
import { EditChart } from '../components/EditChart'
import { SensorData, ChartsProps, DialogStateProps, getNewChart, PDateRange } from '../types/Types'
import { DisplayChart } from './DisplayChart'


type HomeProps = {
	sensorDataArray: SensorData[],
	charts : ChartsProps[],
	setCharts: React.Dispatch<React.SetStateAction<ChartsProps[]>>
	dialogState: DialogStateProps,
  	setDialogState :  React.Dispatch<React.SetStateAction<DialogStateProps>>
	chartToBeDrawn : ChartsProps | null;
	setChartToBeDrawn : React.Dispatch<React.SetStateAction<ChartsProps|null>>
	selectedDateRange: PDateRange,
	setSelectedDateRange : React.Dispatch<React.SetStateAction<PDateRange>>
  }

export const Home  = ({sensorDataArray, charts, setCharts, dialogState, setDialogState, chartToBeDrawn, setChartToBeDrawn, selectedDateRange, setSelectedDateRange }: HomeProps) => {

  return (
	<div>
		{charts.length === 0 && (
		<CustomCard 
			message="No charts created yet."
			actionLabel="+ Add Chart"
			onActionClick={()=>setDialogState({ name: "add", isOpen: true, chart: getNewChart() })}
		/>)}
		{charts.length > 0 && chartToBeDrawn && (
		<DisplayChart chartToBeDrawn={chartToBeDrawn} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange}/>
		)}
	{dialogState.isOpen && dialogState.name === "add" && (<AddChart sensorDataArray={sensorDataArray} charts={charts} setCharts={setCharts} dialogState={dialogState} setDialogState={setDialogState} setChartToBeDrawn={setChartToBeDrawn} setSelectedDateRange={setSelectedDateRange}/>)}
	{dialogState.isOpen && dialogState.name === "edit" && (<EditChart sensorDataArray={sensorDataArray} charts={charts} setCharts={setCharts} dialogState={dialogState} setDialogState={setDialogState} setChartToBeDrawn={setChartToBeDrawn} setSelectedDateRange={setSelectedDateRange}/>)}
	</div>
  )
}
