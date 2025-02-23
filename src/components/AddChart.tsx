import { useState } from 'react'
import { SensorData, ChartsProps, DialogStateProps, PDateRange, getPDateRange, newChartWithDataSeries } from '../types/Types'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { 
  MenuItem, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Button, 
  Stack } from '@mui/material'

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
});

type AddChartProps = {
	sensorDataArray: SensorData[],
	charts : ChartsProps[],
	setCharts: React.Dispatch<React.SetStateAction<ChartsProps[]>>
	dialogState: DialogStateProps,
  setDialogState :  React.Dispatch<React.SetStateAction<DialogStateProps>>,
  setChartToBeDrawn : React.Dispatch<React.SetStateAction<ChartsProps|null>>,
  setSelectedDateRange : React.Dispatch<React.SetStateAction<PDateRange>>
  }

export const AddChart = ({sensorDataArray, charts, setCharts,  dialogState, setDialogState, setChartToBeDrawn, setSelectedDateRange }: AddChartProps) => {
  const [error, setError]=useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const { name, value } = event.target;
    setDialogState((prevState) => ({
      ...prevState,
      chart: {
        ...prevState.chart,
        [name]: value,
      },
    }));
  };

  const handleAddSubmit = () => {  
    if (dialogState.chart.chartname.trim() === '') {
      setError(true);
      return;
    } else {
      setError(false);
    }
	  if (dialogState.chart.chartname && dialogState.chart.chartTypename && dialogState.chart.colorname && dialogState.chart.sensorName.length >= 1) {
      if (charts.filter(ch=>ch.chartname === dialogState.chart.chartname).length >= 1)
        return;
      console.log("Adding chart sensorName: ", dialogState.chart.sensorName)
      let newChart = newChartWithDataSeries(dialogState.chart, sensorDataArray)
		setCharts(prevCharts => [...prevCharts, newChart])
    setDialogState(prevState => ({
      ...prevState,
      isOpen: false 
    }));
    let range = getPDateRange(newChart.dataseriesArray)
    setSelectedDateRange(range)
    setChartToBeDrawn(newChart)
	  }
  };

  const handleCloseButton = () => {  
		setDialogState(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };
  
  return (
	  <ThemeProvider theme={theme}>
      <Dialog open={dialogState.isOpen}  

	      onClose={(_, reason) => { 
         if (reason !== 'backdropClick') {
          setDialogState(prevState => ({
            ...prevState, 
            isOpen: false 
          }));
         }
       }}  

	      aria-labelledby="Add Chart" aria-describedby="Add the Chart details">
        <DialogTitle id="add-chart">Add Chart</DialogTitle>
        <DialogContent>
         <Stack padding={1}>
           <TextField
              label="Name"
			        name="chartname"
              required
              error={error}
              helperText={error ? "Required field" : ""} 
              value={dialogState.chart.chartname}
              onChange={handleChange}
            />
          </Stack>

		      <Stack padding={1}>
		        <TextField
              label='Type'
		          name="chartTypename"
              select
              size='small'
		          required
              value={dialogState.chart.chartTypename}
              onChange={handleChange}>
              <MenuItem value='line'>Line</MenuItem>
              <MenuItem value='bar'>Bar</MenuItem>
              <MenuItem value='column'>Column</MenuItem>
     	      </TextField>
    	    </Stack>

		      <Stack padding={1}>
		        <TextField
              label='Color'
		          name="colorname"
              select
              size='small'
		          required
              value={dialogState.chart.colorname}
              onChange={handleChange}>
              <MenuItem value='black'>Black</MenuItem>
              <MenuItem value='blue'>Blue</MenuItem>
              <MenuItem value='green'>Green</MenuItem>
     	      </TextField>
    	    </Stack>

		      <Stack padding={1}>
            <TextField
              label="Dataseries"
	            name="sensorName"
              select
              size="small"
              required
              value={dialogState.chart.sensorName}
              onChange={handleChange}>
                {sensorDataArray.map((sensor, index) => (
                  <MenuItem key={index} value={sensor.name}>
                    {sensor.name}
                  </MenuItem>
                ))}
            </TextField>
          </Stack>

		      <Stack spacing={2} direction="row" padding={1}>
            <TextField
              label="X-axis name"
			        name="xaxisname"
              value={dialogState.chart.xaxisname}
              onChange={handleChange}
            />
		        <TextField
              label="Y-axis name"
			        name='yaxisname'
              value={dialogState.chart.yaxisname}
              onChange={handleChange}
            />
          </Stack>

		      <Stack padding={1}>
            <TextField
              label="Text Description"
			        name='description'
              multiline
              minRows={5}
              maxRows={10}
              fullWidth
              inputProps={{ maxLength: 300 }}
              value={dialogState.chart.description}
              onChange={handleChange}
            />
          </Stack>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseButton}>Cancel</Button>
            <Button onClick={handleAddSubmit} autoFocus>
              Add Chart
            </Button>
          </DialogActions>
      </Dialog>
	  </ThemeProvider>
  )
} 