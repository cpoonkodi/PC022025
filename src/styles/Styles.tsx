import { SxProps, Theme } from "@mui/material/styles";

export const cardStyle: SxProps<Theme> = {
	height: '93vh',
    width: '83%', 
	display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign: 'center', 
    marginLeft:28, 
    marginTop:3
  };

  export const logoButtonStyle: SxProps<Theme> = {
	width: "100%",
                color: "#000",
                textTransform: "none",
                justifyContent: "flex-start",
                margin: 0,
                padding: 0,
  };

  export const errorpageTitle: SxProps<Theme> = {
    position: "absolute",
    top: "40%",
    left: 0,
    width: "100%",
    height: "8px",
    background: "transparent",
    borderBottom: "4px solid blue",
    transform: "rotate(-10deg)",
  };

  export const errorpageSubTitle: SxProps<Theme> = {
    fontWeight: "bold",
    color: "blue",
    position: "relative",
   display: "inline-block",
  };

  export const errorpageButton: SxProps<Theme> = {
    mt: 3, 
    bgcolor: "blue", 
    color: "white", 
    px: 4
  };

  export const displayChartcardContent: SxProps<Theme> = {
    height: "80vh",
    width: "100%",
    overflowY: "auto",
    padding: 2,
    marginTop:8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    };


    export const DateRangePickerStyle: SxProps<Theme> = {
      "& .MuiOutlinedInput-root": {
        "&:hover > fieldset": { borderColor: "#C7C8CD" },
        paddingRight:'5px',
        width: "225px",
        height: "45px",
        alignSelf: 'flex-end',
        margin: 0,
      },
      };