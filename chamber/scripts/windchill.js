





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
        const dailyForecastUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=-32.947812&lon=-60.629001&appid=${apiKey}`

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

        fetch(dailyForecastUrl)
            .then(response => response.json())
            .then(data => {
                displayDailyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching daily forecast data:', error);
                alert('Error fetching daily forecast data. Please try again.');
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

        const next24Hours = hourlyData.slice(0, 40); 

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

    function displayDailyForecast(dailyData) {
        const dailyForecastDiv = document.getElementById('daily-forecast');

        const nextDays = dailyData.slice(0,3); 
        var count = 0;
        nextDays.forEach(day => {
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            var afterTomorrow = new Date(today);
            afterTomorrow.setDate(today.getDate() + 2);
            var options = { day: '2-digit', weekday: 'long' };
            var formatter = new Intl.DateTimeFormat('en-US', options);
            count = count + 1;
            if (count === 1){
                var dayDate = formatter.format(today);
            }else if (count === 2){
                var dayDate = formatter.format(tomorrow);
            }else if (count === 3){
                var dayDate = formatter.format(afterTomorrow);
            }
            
            const maxTemp = Math.round(day.main.temp_max - 273.15); 
            const minTemp = Math.round(day.main.temp_min - 273.15);
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const dailyItemHtml = `
                <div class="weather-daily">
                    <span id="day-date">${dayDate}</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span id="max-weather">max: ${maxTemp}°C</span>
                    <span>min: ${minTemp}°C</span>
                </div>
            `;

            dailyForecastDiv.innerHTML += dailyItemHtml;
        });
    }

    // <----  aca hay q poner la funcion de displayDailyForecast copiando la funcionalidad del displayHourlyForecast. 

    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block'; 
    }
    

    // Call functions
    getWeather();
    getWindChill();
});






