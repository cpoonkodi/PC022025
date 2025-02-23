import React from 'react'
import "../../src/style.css";
import { useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { logoButtonStyle } from "../styles/Styles";
import { SensorData, ChartsProps, DialogStateProps, getNewChart, PDateRange, getPDateRange } from '../types/Types'
import { NavLink } from 'react-router-dom'
import {
    IconButton,
    Menu,
    List,
    ListItem,
    MenuItem,
    ListItemText,
    Stack,
    TextField,
    Button,
    InputAdornment,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type SidebarProps = {
  sensorDataArray: SensorData[],
  charts : ChartsProps[],
  setCharts: React.Dispatch<React.SetStateAction<ChartsProps[]>>,
  dialogState: DialogStateProps,
  setDialogState :  React.Dispatch<React.SetStateAction<DialogStateProps>>,
  setChartToBeDrawn : React.Dispatch<React.SetStateAction<ChartsProps|null>>,
  setSelectedDateRange : React.Dispatch<React.SetStateAction<PDateRange>>
}

export const Sidebar = ({sensorDataArray, charts, setCharts, dialogState, setDialogState, setChartToBeDrawn, setSelectedDateRange }: SidebarProps) => {
  const [showIconAvatar, setShowIconAvatar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chartForEditDelete, setChartForEditDelete] = useState<ChartsProps|null>(null);
  const [indexToEditDelete, setIndexToEditDelete] = useState<number>(-1)
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(null);
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredCharts = charts.filter(chart =>
    chart.chartname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = () => {
    console.log("Handle Edit : ", chartForEditDelete)
    if (chartForEditDelete === null) {
      return
    }
    setDialogState({ name: "edit", isOpen: true, chart: chartForEditDelete });
    handleMenuClose();
    setSelectedIconIndex(null);
  }

  const handleOpenDialog = () => {
    setShowIconAvatar(false);
  }

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    chart: ChartsProps,
    index: number,
  ) => {
    console.log("handleMenuOpen: ", chart.chartname);
    event.stopPropagation();
    setSelectedIconIndex(index); // Track selected item
    setAnchorEl(event.currentTarget);
    setShowIconAvatar(true);
    setIndexToEditDelete(index)
    setChartForEditDelete(chart)
  };

  const handleMenuClose = () => {
    console.log("Handle Menu Close", chartForEditDelete)
    setAnchorEl(null);
    setShowIconAvatar(false);
    setChartForEditDelete(null);
  };

    const handleDelete = () => {
    if (chartForEditDelete === null) {
      return
    }
    console.log("handleDelete: Deleting: ", chartForEditDelete.chartname)
    setAnchorEl(null); 
    setSelectedIconIndex(null);
    const chartToBeDeleted = charts.find((c => c.chartname === chartForEditDelete.chartname))
    chartToBeDeleted && setDialogState({ name: "delete", isOpen: true, chart: chartForEditDelete });
  };

  const handleListItem = (chart: ChartsProps, index: number) => {
    setSelectedListIndex(index); // Track selected item
    let range = getPDateRange(chart.dataseriesArray)
    setSelectedDateRange(range)
    setChartToBeDrawn(chart);
  };

  const handleDeleteConfirm = () => {
    console.log("handleDeleteConfirm: Deleting: ", chartForEditDelete?.chartname);
    setCharts(
      charts.filter((chart) => chart.chartname !== chartForEditDelete?.chartname)
    );
    setDialogState(prevState => ({
      ...prevState, 
      isOpen: false 
    }));
    console.log("handleDeleteConfirm: After Deleting:", { charts });
    setChartForEditDelete(null)
  };

  const handleDeleteCancel = () => {
    setDialogState(prevState => ({
      ...prevState,
      isOpen: false 
    }));
    setChartForEditDelete(null)
  };

  return (
    <div className="sideNav-wrapper">
      <div className="sidebar">
      <Stack padding={2} direction="column">
          <Stack>
            <Button
              sx={logoButtonStyle}
              variant="text"
              disableRipple
              startIcon={
                <SvgIcon sx={{ color: "#000" }}>
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              }>
              <NavLink to="/" onClick={handleOpenDialog} style={{ textDecoration: "none", color: "black" }}>
              BeBee
            </NavLink>
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="column" padding={2}>
          <Stack>
            <TextField
              sx={{ width: "100%" }}
              variant="filled"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ), }}/>
            <Button
              sx={{ marginTop: 2, width: "100%" }}
              variant="contained"
              disableRipple
              onClick={()=>setDialogState({ name: "add", isOpen: true, chart: getNewChart() })} >
              + Add Chart
            </Button>
          </Stack>
        </Stack>

        {filteredCharts.length > 0 ? (
          <List>
            {filteredCharts.map((chart, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: selectedListIndex === index ? "#D7DDFF" : "transparent",
                }}
                onClick={()=>handleListItem(chart,index)}
              >
                <ListItemText primary={chart.chartname} />
                <IconButton
                  edge="end"
                  onClick={(event) => handleMenuOpen(event, chart, index)}
                  sx={{
                    paddingRight: 2,
                    backgroundColor: selectedIconIndex === index ? "#D7DDFF" : "transparent",
                    "&:hover": {
                      backgroundColor: "#D7DDFF",
                    }, }} >
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    style={{ fontSize: "medium" }}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}>
                  <MenuItem
                    sx={{
                      margin: "5px",
                      "&:hover": { backgroundColor: "#D7DDFF" },
                    }}
                    onClick={()=>handleEdit()}
                  >
                    <EditIcon sx={{ mr: 1 }} />
                    Edit
                  </MenuItem>
                  <MenuItem
                    id={chart.chartname}
                    sx={{
                      margin: "5px",
                      "&:hover": { backgroundColor: "#D7DDFF" },
                    }}
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      handleDelete()
                    } >
                    <DeleteIcon sx={{ mr: 1 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", padding: 2 }}>
            No charts
          </Typography>
        )}

        <Dialog open={dialogState.isOpen && dialogState.name === "delete"} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {dialogState.chart.chartname} chart?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
