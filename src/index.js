function submitCityValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("input-search-value");
  console.log(searchInput.value);
}

let formElement = document.querySelector("#input-search-value");
formElement.addEventListener("submit", submitCityValue);
