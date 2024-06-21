const inputbox = document.querySelector(".input");
const searchbtn = document.querySelector("#searchbtn");
const weatherimg = document.querySelector(".weatherimg");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".desc");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");
const body = document.querySelector(".weatherbody"); // Corrected selector

async function checkweather(city) {
  const api = "2b0a4a668a08811569707ab296e7c347";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Location Not Found');
    }
    const weatherdata = await response.json();
    
    temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherdata.weather[0].description}`;
    humidity.innerHTML = `${weatherdata.main.humidity}%`;
    windspeed.innerHTML = `${weatherdata.wind.speed} Km/H`;

    if (weatherdata && weatherdata.weather && weatherdata.weather[0]) {
      switch (weatherdata.weather[0].main) {
        case 'Clouds':
          weatherimg.src = "cloud.png";
          break;
        case 'Clear':
          weatherimg.src = "clear.png";
          break;
        case 'Rain':
          weatherimg.src = "rain.png";
          break;
        case 'Mist':
          weatherimg.src = "mist.png";
          break;
        case 'Snow':
          weatherimg.src = "snow.png";
          break;
        default:
          weatherimg.src = "default.png"; // Fallback image
          break;
      }
    } else {
      body.innerHTML = "Weather data is not properly defined.";
    }
  } catch (error) {
    body.innerHTML = `Error fetching weather data: ${error.message}`;
    humidity.innerHTML="NOT FOUND ❌";
    windspeed.innerHTML="NOT FOUND ❌";

  }
}

searchbtn.addEventListener('click', () => {
  checkweather(inputbox.value);
});
