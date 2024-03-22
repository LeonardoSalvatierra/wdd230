





// ************* WEATHER SECTION *************

document.addEventListener("DOMContentLoaded", function() {
    // Weather Section

    function getWindChill() {
        const apiKey = '102faaa19bab5483c8fc8e35ce55dc1e';
        const city = 'rosario';
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                displayWindChill(data);
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });
    }
    
    function displayWindChill(data) {
        const windChillDiv = document.getElementById('wind-chill');
        const windSpeedDiv = document.getElementById('wind-speed');
        windSpeedDiv.innerHTML = '';
        windChillDiv.innerHTML = '';
    
        if (data.cod === '404') {
            windChillDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            const temperature = Math.round(data.main.temp - 273.15); 
            const windspeed = data.wind.speed;
                if (temperature <= 50 && windspeed > 3) {
                    const windchill = calculateWindChill(temperature, windspeed);
                    const windChillHtml = `
                        <p>Wind Chill: ${windchill.toFixed(2)}</p>
                    `;
                    windChillDiv.innerHTML = windChillHtml;
                } else {
                    const windChillHtml = `
                        <p> N/A </p>
                    `;
                    windChillDiv.innerHTML = windChillHtml;
                }
            const windSpeedHTML = `
                <p>Wind peed: ${windspeed}mph</p>
            `;
            windSpeedDiv.innerHTML = windSpeedHTML;
        }
    }
    
    function calculateWindChill(temperature, windspeed) {
        return 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windspeed, 0.16)) + (0.4275 * temperature * Math.pow(windspeed, 0.16));
    }

    function getWeather() {
        const apiKey = '102faaa19bab5483c8fc8e35ce55dc1e';
        const city = 'rosario';

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayHourlyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching hourly forecast data:', error);
                alert('Error fetching hourly forecast data. Please try again.');
            });
    }

    function displayWeather(data) {
        const weatherImage = document.getElementById('weather-image');
        const tempDivInfo = document.getElementById('temp-div');
        const weatherInfoDiv = document.getElementById('weather-info');
        const weatherIcon = document.getElementById('weather-icon');
        const hourlyForecastDiv = document.getElementById('hourly-forecast');

        weatherInfoDiv.innerHTML = '';
        hourlyForecastDiv.innerHTML = '';
        tempDivInfo.innerHTML = '';

        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            const cityName = data.name;
            const temperature = Math.round(data.main.temp - 273.15); 
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            const imageUrl = `https://source.unsplash.com/400x600/?${description} argentina`;

            const temperatureHTML = `
                <p>${temperature}°C</p>
            `;

            const weatherHtml = `
                <p>${cityName}</p>
                <p>${description}</p>
            `;

            weatherImage.src = imageUrl;
            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;

            showImage();
        }
    }

    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');

        const next24Hours = hourlyData.slice(0, 8); 

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000); 
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15); 
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}°C</span>
                </div>
            `;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }

    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block'; 
    }
    

    // Call functions
    getWeather();
    getWindChill();
});




