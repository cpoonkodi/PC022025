import React, { useState } from "react";
import "../../src/style.css";
import SvgIcon from "@mui/material/SvgIcon";
import { logoButtonStyle } from "../styles/Styles";
import { NavLink } from "react-router-dom";
import { AddChart } from "./AddChart";
import { EditChart } from "./EditChart";
import { DisplayChart } from '../pages/DisplayChart'

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
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setSelectedChart, removeChartFromList, ChartProps } from "../slices/chartsSlice";

export const Sidebar = () => {
  const { chartsList } = useSelector((state: RootState) => state.charts);
  const { selectedChart } = useSelector((state: RootState) => state.charts);
  const dispatch = useDispatch<AppDispatch>();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [menuShow, setMenuShow] = useState<boolean>(false);
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [editShow, setEditShow] = useState<boolean>(false);
  const [showDisplayChart, setShowDisplayChart] = useState<boolean>(false); 
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dummyChart: ChartProps = {
    id: Math.random()*100,
    chartname: '',
    xaxisname: '',
    yaxisname: '',
    description: '',
    chartTypename: '',
    colorname: '',
    sensorName: ''
  }

  const [chartForEditDelete, setChartForEditDelete] = useState<ChartProps>(dummyChart)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenDialog = () => {
    setModalShow(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, chart: ChartProps) => {
    event.stopPropagation();
    setChartForEditDelete(chart);
    setAnchorEl(event.currentTarget);
    setMenuShow(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuShow(false);
  };

  const handleListItem = (chart: any) => {
    dispatch(setSelectedChart(chart));
  };

  const handleDeleteConfirm = () => {
    const index = chartsList.findIndex(chart => chart.id === chartForEditDelete.id);
    let newSelectedChart = null;
  
    if (index !== -1) {
      if (chartsList.length > 1) {
        if (index > 0) {
          newSelectedChart = chartsList[index - 1];
        } else {
          newSelectedChart = chartsList[index + 1];
        }
      }
    }
    dispatch(removeChartFromList(chartForEditDelete));
    setMenuShow(false);
    setDeleteShow(false);
    dispatch(setSelectedChart(newSelectedChart));
  };
  

  const deleteChart = () => {
    setDeleteShow(true)
    handleMenuClose();
  };

  const editChart = () => {
    setEditShow(true);
    handleMenuClose();
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
              }
            >
              <NavLink
                to="/"
                onClick={handleOpenDialog}
                style={{ textDecoration: "none", color: "black" }}
              >
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
                ),
              }}
            />
            <Button
              sx={{ marginTop: 2, width: "100%" }}
              variant="contained"
              disableRipple
              onClick={() => setModalShow(true)}
            >
              + Add Chart
            </Button>
          </Stack>
        </Stack>

        <AddChart show={modalShow} onHide={() => setModalShow(false)} />
        {showDisplayChart && <DisplayChart />}

        {chartsList.length > 0 ? (
          <List>
            {chartsList
              .filter((chart) =>
                chart.chartname.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((chart, index) => (
                <ListItem
                  key={chart.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor:selectedChart?.id === chart.id ? "#D7DDFF" : "transparent",
                  }}
                  onClick={() => handleListItem(chart)}
                >
                  <ListItemText primary={chart.chartname} />
                  <IconButton
                    edge="end"
                    onClick={(event) => handleMenuOpen(event, chart)}
                    sx={{
                      paddingRight: 2,
                      backgroundColor:menuShow && anchorEl && chartForEditDelete?.id === chart.id ? "#D7DDFF" : "transparent",
                      "&:hover": {
                        backgroundColor: "#D7DDFF",
                      },
                    }}
                  >
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
                    }}
                  >
                    <MenuItem
                      sx={{
                        margin: "5px",
                        "&:hover": { backgroundColor: "#D7DDFF" },
                      }}
                      onClick={() => editChart()}
                    >
                      <EditIcon sx={{ mr: 1 }} />
                      Edit
                    </MenuItem>
                    <MenuItem
                      sx={{
                        margin: "5px",
                        "&:hover": { backgroundColor: "#D7DDFF" },
                      }}
                      onClick={() => deleteChart()}
                    >
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

        <EditChart show={editShow} onHide={() => setEditShow(false)} chartForEdit={chartForEditDelete}/>

        <Dialog
          open={deleteShow}
          onClose={(_, reason) => {
            if (reason !== "backdropClick") {
              setDeleteShow(false);
            }
          }}
          aria-labelledby="Delete Chart"
          aria-describedby="Delete the Chart details"
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {chartForEditDelete.chartname} chart?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteShow(false)} color="primary">
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
};
