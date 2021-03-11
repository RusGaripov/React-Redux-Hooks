import * as actions from "./index";
import axios from "axios";

var testObject = [];
localStorage.setItem("testObject", JSON.stringify(testObject));

const fetchWeatherRequest = () => {
  return {
    type: actions.FETCH_WEATHER_REQUEST,
  };
};

const fetchWeatherSuccess = (weather) => {
  return {
    type: actions.FETCH_WEATHER_SUCCESS,
    payload: weather,
  };
};

const fetchWeatherFailure = (error) => {
  return {
    type: actions.FETCH_WEATHER_FAILURE,
    payload: error,
  };
};

export const fetchWeather = (city) => {
  return function (dispatch) {
    dispatch(fetchWeatherRequest());

    if (testObject.length > 0) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&daily=daily.dt&appid={API_KEY}` //
        )
        .then((response) => {
          const weather = response.data;
          let warning = "";
          for (var i = 0; i < testObject.length; i++) {
            if (testObject[i].city.name === city) {
              warning = "There is a duplication";
              alert("This city is on the list");
            }
          }
          if (warning !== "There is a duplication") testObject.push(weather);
          dispatch(fetchWeatherSuccess(testObject));
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 404") {
            alert("No such a city has been found");
          }
          dispatch(fetchWeatherFailure(error.message));
          dispatch(fetchWeatherSuccess(testObject));
        });
    } else {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=55.7887400&lon=49.1221400&units=metric&aily=daily.dt&appid={API_KEY}`
        )
        .then((response) => {
          const weather = response.data;
          testObject.push(weather);
          dispatch(fetchWeatherSuccess(testObject));
        })
        .catch((error) => {
          dispatch(fetchWeatherFailure(error.message));
        });
    }
  };
};

export const deleteCity = (id) => async (dispatch) => {
  testObject.splice(id, 1);
  localStorage.setItem("testObject", JSON.stringify(testObject));
  dispatch({
    type: actions.DELETE_NEWS,
    one: null,
  });
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;

  console.log("Ваше текущее метоположение:");
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
  var coordinates = crd;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options); // либо лучше watchPosition , если компьютер не стационарный
