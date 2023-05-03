import moment from "moment";
import { weatherActions } from "../reducers/weather-reducer";
import { BASE_URL } from "../../constants/location";

export const fetchWeekyWeatherData = (coordinates) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const today = new Date();

      const startDate = moment(
        new Date(today.setDate(today.getDate() - today.getDay()))
      ).format("YYYY-MM-DD");
      const endDate = moment(
        new Date(today.setDate(today.getDate() - today.getDay() + 6))
      ).format("YYYY-MM-DD");

      const response = await fetch(
        `${BASE_URL}?latitude=${coordinates?.lat}&longitude=${coordinates?.lng}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FNew_York`
      );

      if (!response.ok) {
        throw new Error("Could not fetch weather data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const weatherData = await fetchData();
      let data = [];
      weatherData?.daily?.time.map((item, index) => {
        data.push({
          date: item,
          lat: coordinates?.lat,
          lng: coordinates.lng,
          maxTemp: weatherData?.daily?.temperature_2m_max[index],
          minTemp: weatherData?.daily?.temperature_2m_min[index],
          sunriseTime: weatherData?.daily?.sunrise[index],
          sunsetTime: weatherData?.daily?.sunset[index],
        });
      });

      dispatch(
        weatherActions.replaceWeeklyData({
          data: data || [],
        })
      );
    } catch (error) {
      console.log('fetchWeekyWeatherData error...',error?.message);
    }
  };
};

export const fetchDailyWeatherData = (params) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${BASE_URL}?latitude=${params?.lat}&longitude=${params?.lng}&start_date=${params?.date}&end_date=${params?.date}&hourly=temperature_2m,relativehumidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max,windgusts_10m_max,precipitation_sum&timezone=America%2FNew_York`
      );

      if (!response.ok) {
        throw new Error("Could not fetch weather data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const weatherData = await fetchData();

      const data = {
        date: weatherData?.daily?.time[0],
        time: weatherData?.hourly?.time,
        hourlyTemp: weatherData?.hourly?.temperature_2m,
        humidity: weatherData?.hourly?.relativehumidity_2m,
        precipitation: weatherData?.hourly?.precipitation,
        maxTemp: weatherData?.daily?.temperature_2m_max[0],
        minTemp: weatherData?.daily?.temperature_2m_min[0],
        sunriseTime: weatherData?.daily?.sunrise[0],
        sunsetTime: weatherData?.daily?.sunset[0],
        uvIndex: weatherData?.daily?.uv_index_max[0],
        windSpeed: weatherData?.daily?.windspeed_10m_max[0],
        windGust: weatherData?.daily?.windgusts_10m_max[0],
        precipitationSum: weatherData?.daily?.precipitation_sum[0],
      };
      dispatch(
        weatherActions.replaceDailyData({
          data: data || {},
        })
      );
    } catch (error) {
      console.log('fetchDailyWeatherData error...',error?.message);
    }
  };
};
