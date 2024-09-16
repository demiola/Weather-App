function updateWeather(response) {
  let tempElement = document.querySelector("#temp-value");
  let windElement = document.querySelector("#weather-windspeed");
  let humidityElement = document.querySelector("#weather-humidity");
  let descriptionElement = document.querySelector("#weather-description");
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temp-icon");

  tempElement.innerHTML = Math.round(response.data.temperature.current);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = timeNow(date);
  iconElement.src = response.data.condition.icon_url;
  fetchForecast(response.data.city);
}

function timeNow(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function fetchCityDetails(city) {
  let apiKey = "52b8211ebf3ae3d722a0780tdeof04f0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function submitCityValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-value");
  fetchCityDetails(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function updateForecast(response) {
  let forecast = document.querySelector("#weather-forecast");
  forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temps">
              <div class="weather-forecast-temp" id="maximum">${Math.round(
                day.temperature.maximum
              )}°</div>
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

function fetchForecast(city) {
  let apiKey = "52b8211ebf3ae3d722a0780tdeof04f0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateForecast);
}

let defaultApiUrl = `https://api.shecodes.io/weather/v1/current?query=Lagos&key=52b8211ebf3ae3d722a0780tdeof04f0&units=metric`;
axios.get(defaultApiUrl).then(updateWeather);
let defaultApiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=Lagos&key=52b8211ebf3ae3d722a0780tdeof04f0&units=metric`;
axios.get(defaultApiForecastUrl).then(updateForecast);
let formElement = document.querySelector("#enter-city");
formElement.addEventListener("submit", submitCityValue);
console.log(axios.get(defaultApiForecastUrl));
