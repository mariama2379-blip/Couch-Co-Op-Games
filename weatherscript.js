const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max,wind_direction_10m_dominant&hourly=temperature_2m&timezone=America%2FNew_York&past_days=0&forecast_days=7";


fetch(apiUrl)

  .then(response => response.json())

  .then(data => {

    const locationTitle = document.getElementById("location-title");
    locationTitle.textContent = "New York, NYC";

    const dates = data.daily.time;

    const maxTemps = data.daily.temperature_2m_max;

    const minTemps = data.daily.temperature_2m_min;

    const maxWinds = data.daily.wind_speed_10m_max;

    const weatherCodes = data.daily.weather_code;

    const windDirections = data.daily.wind_direction_10m_dominant;

    const uvCodes = data.daily.uv_index_max;

    


    for (let i = 0; i < 7; i++) {

      const card = document.createElement("div");

      card.classList.add("card");
      
      const date = document.createElement("h2");

      date.textContent = formatDate(dates[i]);

      const maxTemp = document.createElement("p");

      const uvIndex = document.createElement("p");
      uvIndex.textContent = "UV code: " + uvCodes[i];

      maxTemp.textContent = "Temp High: " + maxTemps[i] + "°C";

      const minTemp = document.createElement("p");

      minTemp.textContent = "Temp Low: " + minTemps[i] + "°C";

      const maxWind = document.createElement("p");

      maxWind.textContent = "Max wind for the day: " + maxWinds[i] + "mph";

      const inner = document.createElement("div");

     const windDirection = document.createElement("p");
     const direction = getWindDirection(windDirections[i]);

     const location = document.createElement("p");

     

     windDirection.textContent =
     "Wind from the " + direction + " at " + maxWinds[i] + " mph";

/*condtions logic*/
let imageFile = "/assets/sunny.jpg";

if (weatherCodes[i] >= 0 && weatherCodes[i] <= 1) {
    imageFile = "/assets/sunny.jpg";
} else if (weatherCodes[i] >= 50 && weatherCodes[i] <= 69) {
    imageFile = "/assets/rain.jpg";
} else if (weatherCodes[i] === 71 || weatherCodes[i] === 73 || weatherCodes[i] === 75) {
    imageFile = "/assets/snowy.jpg";
}

/*wind speed logic*/
let windImageFile = "assets/light.jpg";

if (maxWinds[i] < 10) {
    windImageFile = "assets/light.jpg";

} else if (maxWinds[i] < 20) {
    windImageFile = "assets/moderate.jpg";

} else if (maxWinds[i] < 40) {
    windImageFile = "assets/verystrong.jpg";
}

else {
    windImageFile = "assets/light.jpg";
}


const weatherImage = document.createElement("img");
weatherImage.src = imageFile;
weatherImage.alt = "Weather icon";
weatherImage.classList.add("weather-image");

const windIcon = document.createElement("img");
windIcon.src = windImageFile;
windIcon.alt = "Wind strength icon";
windIcon.classList.add("wind-icon");

      
      inner.appendChild(location);
      inner.appendChild(date);
      inner.appendChild(weatherImage);
      inner.appendChild(maxTemp);
      inner.appendChild(minTemp);
      inner.appendChild(uvIndex);
      inner.appendChild(maxWind);
      inner.appendChild(windDirection);
      inner.appendChild(windIcon);
      card.appendChild(inner);

      weatherContainer.appendChild(card);

 }

  })


  .catch(error => {

    weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";

    console.error("Error fetching weather data:", error);

  });

  function getWindDirection(degree) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
  }

  function formatDate(dateString) {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
}



