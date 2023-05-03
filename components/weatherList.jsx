import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import moment from "moment";

export default function WeatherList(props) {
  const LisItem = ({ item, index }) => {
    return (
      <ListItem sx={{justifyContent:'center'}} onClick={() => props?.onClick(item)}>
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                  {moment(item?.date).format("dddd")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" gutterBottom align="right">
                  {item?.date}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" component="div">
              {item?.maxTemp}° / {item?.minTemp}°
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Sunrise
                  <br />
                  {moment(item?.sunriseTime).format("hh:mm a")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  Sunset
                  <br />
                  {moment(item?.sunsetTime).format("hh:mm a")}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ListItem>
    );
  };
  return (
    <List >
      {props?.data &&
        props?.data?.map((item, index) => {
          return <LisItem item={item} key={index} />;
        })}
    </List>
  );
}
