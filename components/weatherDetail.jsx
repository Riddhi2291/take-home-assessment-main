import { Card, CardContent, Grid, Typography, Divider } from "@mui/material";
import moment from "moment";

export default function WeatherDetail(props) {
  const HourlyItem = (data) => {
    return (
      <div>
        <br />
        <Divider />
        <br />
        <Typography variant="h5" component="div">
          {data?.title}
        </Typography>
        <br />
        <Grid container spacing={2}>
          {props?.data?.time?.map((item, index) => {
            return (
              <Grid item xs={1} key={index}>
                <Typography
                  variant="body1"
                  textAlign={"center"}
                  sx={{
                    fontWeight: props?.isToday
                      ? moment(item).format("hha") == moment().format("hha")
                        ? "bold"
                        : ""
                      : "",
                    color: props?.isToday
                      ? moment(item).format("hha") == moment().format("hha")
                        ? "blue"
                        : ""
                      : "",
                  }}
                >
                  {moment(item).format("hha")}
                </Typography>
                <Typography
                  variant="body1"
                  textAlign={"center"}
                  sx={{
                    fontWeight: props?.isToday
                      ? moment(item).format("hha") == moment().format("hha")
                        ? "bold"
                        : ""
                      : "",
                    color: props?.isToday
                      ? moment(item).format("hha") == moment().format("hha")
                        ? "blue"
                        : ""
                      : "",
                  }}
                >
                  {data?.value && data?.value[index]}
                  {data?.unit}
                </Typography>
                <br />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  return (
    <Card sx={{ width: "100%", marginTop: "2%", marginBottom: "2%" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              {props?.data?.date && moment(props?.data?.date).format("dddd")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {props?.isToday && (
              <Typography
                variant="h4"
                gutterBottom
                textAlign={"center"}
                sx={{ fontWeight: "bold", color: "blue" }}
              >
                {props?.data?.hourlyTemp &&
                  props?.data?.hourlyTemp[moment().hours()]}
                °C
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom align="right">
              {props?.data?.date}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography variant="h6" component="div">
              H: {props?.data?.maxTemp}°
              <br />
              L: {props?.data?.minTemp}°
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" align="center">
              UV
              <br />
              {props?.data?.uvIndex}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" align="center">
              Wind
              <br />
              {props?.data?.windSpeed} km/h
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" align="center">
              Wind Gust
              <br />
              {props?.data?.windGust} km/h
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" align="center">
              Precipitation
              <br />
              {props?.data?.precipitationSum}mm
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" align="center">
              Sunrise
              <br />
              {props?.data?.sunriseTime &&
                moment(props?.data?.sunriseTime).format("hh:mm a")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" align="center">
              Sunset
              <br />
              {props?.data?.sunsetTime &&
                moment(props?.data?.sunsetTime).format("hh:mm a")}
            </Typography>
          </Grid>
        </Grid>
        <HourlyItem
          title={"Hourly Forecast"}
          value={props?.data?.hourlyTemp}
          unit={"°"}
        />
        <HourlyItem
          title={"Hourly Humidity"}
          value={props?.data?.humidity}
          unit={"%"}
        />
        <HourlyItem
          title={"Hourly Precipitation"}
          value={props?.data?.precipitation}
          unit={"mm"}
        />
      </CardContent>
    </Card>
  );
}
