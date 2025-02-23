import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { DateRangePickerStyle } from '../styles/Styles'
import { PDateRange } from '../types/Types';
import { FormControl } from '@mui/material';
import { DateRange } from "@mui/x-date-pickers-pro"; 

type MuiDateRangeProps = {
  selectedDateRange: PDateRange
  setSelectedDateRange : React.Dispatch<React.SetStateAction<PDateRange>>
}
export const PDateRangePicker = ({ selectedDateRange, setSelectedDateRange }: MuiDateRangeProps) => {
  
  function getDayjsArray(range: PDateRange): [dayjs.Dayjs, dayjs.Dayjs] {
    return [dayjs(range.minDate), dayjs(range.maxDate)]
  }

  function getPDateRange(dayjsRange: DateRange<dayjs.Dayjs>): PDateRange {
    let x =  dayjsRange[0]?.toDate()
    let y =  dayjsRange[1]?.toDate()
    if (x && y) {
      return { minDate: x, maxDate: y } 
    }
    return {
        minDate: new Date(),
        maxDate: new Date()
    };
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']}>
      <FormControl fullWidth>
        <DateRangePicker sx={DateRangePickerStyle}
          value={getDayjsArray(selectedDateRange)}
          onChange={(newValue) => setSelectedDateRange(getPDateRange(newValue))}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{ textField: { size: 'small', label: "Period",
           InputProps: { endAdornment: <Calendar />},
         } }}
        />
         </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  )
}