// Get the button element from the DOM
const fetchDataButton = document.getElementById("button");

const openWeatherKeyName = "509f664697a905dd6c4cf632844aeee0";

let latArr = document.querySelectorAll('.lati');
let longArr = document.querySelectorAll('.long');
let mapDiv = document.querySelector(".map .visuals");

const currPosition = {};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  currPosition.lati = position.coords.latitude;
  currPosition.long = position.coords.longitude;
  latArr.forEach((ele) => {
    ele.innerHTML = "Lati: " + position.coords.latitude;
  });
  longArr.forEach((ele) => {
    ele.innerHTML = "Long: " + position.coords.longitude;
  });

  displayMap(currPosition.lati, currPosition.long);
  fetchWeatherData(currPosition.lati, currPosition.long);
}

function displayMap(latitude, longitude) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', mapUrl);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('style', 'border:0');

  mapDiv.appendChild(iframe);
}

function fetchWeatherData(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKeyName}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle weather data here
      const locationElement = document.querySelector(".location");
      const timezoneElement = document.querySelector(".timezone");
      const windspeedElement = document.querySelector(".windspeed");
      const pressureElement = document.querySelector(".pressure");
      const humidityElement=document.querySelector(".humidity");
      const windDirectionElement = document.querySelector(".windDirection");
      const uvIndexElement = document.querySelector(".uvindex");
      const feelsLikeElement = document.querySelector(".feelslike");

      locationElement.innerText = `Location: ${data.name} ${data.sys.country}`;
      timezoneElement.innerText = `TimeZone: ${new Date(data.dt * 1000).toLocaleTimeString()}`;
      windspeedElement.innerText = `Wind Speed: ${data.wind.speed} m/s`;
      pressureElement.innerText = `Pressure: ${data.main.pressure} hPa`;
      humidityElement.innerText=`Humidity: ${data.main.humidity}%`;
      windDirectionElement.innerText = `Wind Direction: ${data.wind.deg}°`;
      uvIndexElement.innerText = `UV Index: ${data.weather[0].description}`;
      feelsLikeElement.innerText = `Feels Like: ${data.main.feels_like}`;
     
    })
    .catch(error => {
      console.log(error);
      // Handle error here
      alert("Error fetching weather data");
    });
}


// Add a click event listener to the button
fetchDataButton.addEventListener("click", event => {
  // Hide the fetch data button and show the data container
  event.preventDefault();
  document.querySelector(".weather-fetch").style.display = "none";
  document.querySelector(".data").style.display = "block";
  getLocation();
});
