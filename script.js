document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '9920008360e6212a01a59fd9eb579f46'; // Replace with your actual API key
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city !== '') {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    displayWeatherInfo(response);
                } else {
                    weatherInfo.innerHTML = 'City not found';
                }
            };

            xhr.onerror = function () {
                weatherInfo.innerHTML = 'Error fetching data';
            };

            xhr.send();
        } else {
            weatherInfo.innerHTML = 'Please enter a city name';
        }
    });

    function displayWeatherInfo(data) {
        const { name, main, weather } = data;
        const weatherDescription = weather[0].description;
        const temperature = main.temp;
        const humidity = main.humidity;

        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        `;
    }
});
    