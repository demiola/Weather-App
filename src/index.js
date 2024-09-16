function updateWeather(response) {
  let tempElement = document.querySelector("#temp-value");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let windElement = document.querySelector("#weather-windspeed");
  windElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#weather-humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.condition.description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
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

let formElement = document.querySelector("#enter-city");
formElement.addEventListener("submit", submitCityValue);
