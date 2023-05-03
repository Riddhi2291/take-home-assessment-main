import { Container } from "@mui/material";
import LocationSelect from "../components/locationSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeekyWeatherData } from "../src/store/actions/weather-action";
import WeatherList from "../components/weatherList";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const weatherData = useSelector((state) => state.weather.weeklyData);

  const onLocationChange = async (data) => {
    await dispatch(fetchWeekyWeatherData({ lat: data?.lat, lng: data?.lng }));
  };

  const onItemClick = async(data) => {
    router.push({
      pathname: "weatherDetail",
      query: { date: data?.date, lat: data?.lat, lng: data?.lng },
    });
  };

  return (
    <Container>
      <LocationSelect onChange={onLocationChange} />
      <WeatherList data={weatherData} onClick={onItemClick} />
    </Container>
  );
}
