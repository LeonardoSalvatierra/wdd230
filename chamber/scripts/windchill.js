

function getWindChill() {
    const apiKey = '102faaa19bab5483c8fc8e35ce55dc1e';
    const city = document.getElementById('city').value;
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



