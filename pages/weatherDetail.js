import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import WeatherDetail from "../components/weatherDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchDailyWeatherData } from "../src/store/actions/weather-action";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const dailyData = useSelector((state) => state.weather.dailyData);

  const [isToday, setIsToday] = useState(false);
  const query = router.query;

  useEffect(() => {
    const today = new Date();
    if (today.getDay() == moment(query?.date).day()) {
      setIsToday(true);
    }
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  const getData = async () => {
    await dispatch(
      fetchDailyWeatherData({
        date: query?.date,
        lat: query?.lat,
        lng: query?.lng,
      })
    );
  };

  return (
    <Container>
      {dailyData && <WeatherDetail isToday={isToday} data={dailyData} />}
    </Container>
  );
}
