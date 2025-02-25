import {NavLink } from "react-router-dom"
import { cardStyle, errorpageTitle, errorpageSubTitle, errorpageButton } from "../styles/Styles"
import { Box, Card, CardContent, CardActions, Typography, Button } from '@mui/material'

export const ErrorPage = () => {

  return (
	<Card sx={cardStyle}>
		<CardContent>
     		<Typography variant="h1" sx={errorpageSubTitle}>
       			404
        		<Box component="span" sx={errorpageTitle} />
     		</Typography>
	   		<Typography variant="h6" sx={{ mt: 2, color: "black" }}>
       			Page not found. Please try again later.
      		</Typography>
		</CardContent>
		<CardActions>
			<Button variant="contained" sx={errorpageButton} >
			<NavLink to="/"  style={{ color: "white", textDecoration:"none" }}>
			GO HOME
            </NavLink>
        	</Button>
		</CardActions>
  </Card>
  )
}