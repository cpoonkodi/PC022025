import ChartComponent from "../components/ChartComponent"
import { Card, CardContent, Typography } from "@mui/material"
import { cardStyle, displayChartcardContent } from "../styles/Styles";
import { Home } from './Home'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
  
export const DisplayChart = () => {
  const sensorData = useSelector((state: RootState) => state.charts.sensorData)
	const { selectedChart } = useSelector((state:RootState) => state.charts);

	if (!selectedChart) {
		return <Typography variant="h6">No chart selected.</Typography>;
	}
  
  return (
    <Card sx={{ ...cardStyle, overflow: "hidden" }}>
      <CardContent
        sx={ displayChartcardContent }>
        {/* Render Chart */}
        {selectedChart ? (
          <ChartComponent />
        ) :(
          <p>No chart data available jdhfkhdkhgdkfhgfdhfg</p>
		)}
      </CardContent>
    </Card>
  )
}
