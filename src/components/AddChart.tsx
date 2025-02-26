import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { addChartToList } from '../slices/chartsSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

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

interface AddChartProps {
	show: boolean;
	onHide: () => void;
  }
  
export const AddChart = ({ show, onHide }: AddChartProps) => {
  const { chartsList } = useSelector((state: RootState) => state.charts);
	const sensorData = useSelector((state: RootState) => state.charts.sensorData)
	const dispatch = useDispatch<AppDispatch>();
 	const [error, setError]=useState(false);
	const [error1, setError1]=useState(false);

   useEffect(() => {
    if (show) {
      setFormData({
        chartname: '',
        xaxisname: '',
        yaxisname: '',
        description: '',
        chartTypename: 'line',
        colorname: 'black',
        sensorName: ''
      });
    }
  }, [show]);

  // Combine all form states into one object 
  const [formData, setFormData] = useState({
    chartname: '',
    xaxisname: '',
    yaxisname: '',
    description: '',
    chartTypename: 'line',
    colorname: 'black',
    sensorName: 'dataseries',
  })

  // Handle input changes and update form data 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const { name, value } = event.target;
	  setFormData((prev) => ({...prev,[name]: value,}));
  };

  const handleAddSubmit = () => {  
	if (formData.chartname.trim() === '') {
		setError(true);
		return;
	  } else {
		setError(false);
	  }	
    if (formData.sensorName.trim() === '') {
      setError1(true);
      return;
      } else {
      setError1(false);
      }	
  const x = chartsList.find((chart)=>chart.chartname.toLowerCase() === formData.chartname.toLowerCase())
  if (x !== undefined){
    alert("Chartname already exists!" )
    return;
  }
	dispatch(addChartToList(formData))
	  onHide();
  };
  
  return (
	  <ThemeProvider theme={theme}>
      <Dialog open={show}  
	      onClose={(_, reason) => { 
         if (reason !== 'backdropClick') {
			onHide();
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
              value={formData.chartname}
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
              value={formData.chartTypename}
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
              value={formData.colorname}
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
	      error={error1}
              helperText={error1 ? "Required field" : ""}
              value={formData.sensorName}
              onChange={handleChange}>
                {sensorData.map((sensor, index) => (
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
              value={formData.xaxisname}
              onChange={handleChange}
            />
		        <TextField
              label="Y-axis name"
			        name='yaxisname'
              value={formData.yaxisname}
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
              value={formData.description}
              onChange={handleChange}
            />
          </Stack>

          </DialogContent>
          <DialogActions>
            <Button onClick={onHide}>Cancel</Button>
            <Button onClick={handleAddSubmit} autoFocus>
              Add Chart
            </Button>
          </DialogActions>
      </Dialog>
	  </ThemeProvider>
  )
} 
