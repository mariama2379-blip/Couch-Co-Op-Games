const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max&hourly=temperature_2m,wind_speed_10m&timezone=America%2FNew_York";

fetch(apiUrl)

  .then(response => response.json())

  .then(data => {

    const dates = data.daily.time;

    const maxTemps = data.daily.temperature_2m_max;

    const minTemps = data.daily.temperature_2m_min;

    const maxWinds = data.daily.wind_speed_10m_max;

    for (let i = 0; i < 7; i++) {

      const card = document.createElement("div");

      card.classList.add("card");
      
      const date = document.createElement("h2");

       date.textContent = formatDate(dates[i]);

      const maxTemp = document.createElement("p");

      maxTemp.textContent = "High: " + maxTemps[i] + "°F";

      const minTemp = document.createElement("p");

      minTemp.textContent = "Low: " + minTemps[i] + "°F";

      const maxWind = document.createElement("p");

      maxWind.textContent = "Max wind for the day: " + maxWinds[i] + "mph";

      card.appendChild(date);

      card.appendChild(maxTemp);

      card.appendChild(minTemp);

      card.appendChild(maxWind);

      weatherContainer.appendChild(card);

    }

  })

  .catch(error => {

    weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";

    console.error("Error fetching weather data:", error);

  });

  function formatDate(dateString) {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


