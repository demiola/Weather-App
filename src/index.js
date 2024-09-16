function submitCityValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-value");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let formElement = document.querySelector("#enter-city");
formElement.addEventListener("submit", submitCityValue);
