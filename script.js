const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");

const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    61: "Rain",
    71: "Snow",
    95: "Thunderstorm"
};

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            throw new Error("City not found.");
        }

        const location = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        cityName.textContent = location.name;

        temperature.textContent =
            `Temperature: ${weatherData.current.temperature_2m} °C`;

        description.textContent =
            `Weather: ${weatherCodes[weatherData.current.weather_code] || "Unknown"}`;

    } catch (error) {
        cityName.textContent = "Error";
        temperature.textContent = "--";
        description.textContent = "City not found.";
    }
}

searchButton.addEventListener("click", getWeather);