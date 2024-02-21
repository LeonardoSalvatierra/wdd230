const newdate = new Date(document.lastModified);
const year = newdate.getFullYear();
const month = newdate.getMonth() + 1;
const day = newdate.getDate();
const hours = newdate.getHours();
const minutes = newdate.getMinutes();
const seconds = newdate.getSeconds();

let currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;


document.querySelector("#time").innerHTML = currentDate;
document.querySelector("#year").innerHTML = year;

function getWeather() {
    const apiKey = "102faaa19bab5483c8fc8e35ce55dc1e";
    const city = document.getElementById('city').value;
    
    if (!city) {
        alert('please enter a city first');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
    const forecarstUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. please try again.');
        });
        
    fetch(forecarstUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else {
        const cityName = date.name;
        const temperature = math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    }
}