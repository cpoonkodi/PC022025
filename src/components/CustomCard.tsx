import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { cardStyle } from "../styles/Styles"

interface CardProps {
  message: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const CustomCard = ({ message, actionLabel, onActionClick }:CardProps) => {
  return (
    <Card sx={ cardStyle }>
      <CardContent>
        <Typography variant="h5" component="div">
          {message}
        </Typography>
      </CardContent>
      
      {actionLabel && onActionClick && (
        <CardActions>
          <Button variant='contained' disableRipple onClick={onActionClick}>
            {actionLabel}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
