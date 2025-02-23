import ChartComponent from "../components/ChartComponent"
import { Card, CardContent, Typography } from "@mui/material"
import { cardStyle, displayChartcardContent } from "../styles/Styles";
import { ChartsProps, PDateRange } from '../types/Types';

type DisplayChartProps = {
	chartToBeDrawn: ChartsProps | null,
  selectedDateRange: PDateRange,
  setSelectedDateRange : React.Dispatch<React.SetStateAction<PDateRange>>
  };
  
  export const DisplayChart = ({ chartToBeDrawn, selectedDateRange, setSelectedDateRange }: DisplayChartProps) => {

	if (!chartToBeDrawn) {
		return <Typography variant="h6">No chart selected.</Typography>;
	}

  console.log("Dataseries name:", chartToBeDrawn.sensorName)
  
  return (
    <Card sx={{ ...cardStyle, overflow: "hidden" }}>
      <CardContent
        sx={ displayChartcardContent }>

        {/* Render Chart */}
        {chartToBeDrawn ? (
          <ChartComponent chart={chartToBeDrawn} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange}/>
        ) : (
          <p>No chart data available</p>
		)}
      </CardContent>
    </Card>
  )
}
