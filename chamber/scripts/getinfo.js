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
    const apiKey = '102faaa19bab5483c8fc8e35ce55dc1e';
    const city = document.getElementById('city').value;
    
    if (!city) {
        alert('Please enter a city');
        return;
    }

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

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

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

var numTimes = localStorage.getItem("visits-Hlfma");
if(numTimes == null) {
  numTimes = 0;
} else {
  numTimes = parseInt(numTimes, 10);
}
numTimes++;
localStorage.setItem("visits-Hlfma", (numTimes).toString(10))
document.getElementById("visit-times").textContent = numTimes.toString(10);



document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al elemento de entrada oculta
    const formLoadedInput = document.getElementById('form-loaded');

    // Obtener la fecha y hora actual en milisegundos
    const currentDateTime = Date.now();

    // Establecer el valor del campo oculto con la fecha y hora actual
    formLoadedInput.value = currentDateTime;
});

const baseURL = "https://leonardosalvatierra.github.io/wdd230/chamber/data";

async function getMembers() {
    const linksURL = baseURL + "/members.json";
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

getMembers();

function displayMembers(members) {
    const companyList = document.getElementById('company-list');

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = baseURL + member.image;
        img.alt = member.name;

        const h2 = document.createElement('h2');
        h2.textContent = member.name;

        const pAddress = document.createElement('p');
        pAddress.textContent = `Address: ${member.address}`;

        const pPhone = document.createElement('p');
        pPhone.textContent = `Phone: ${member.phone}`;

        const pWebsite = document.createElement('p');
        const aWebsite = document.createElement('a');
        aWebsite.href = member.website;
        aWebsite.textContent = 'Website';
        pWebsite.appendChild(aWebsite);

        const pMembership = document.createElement('p');
        pMembership.textContent = `Membership Level: ${member.membership_level}`;

        const pOtherInfo = document.createElement('p');
        pOtherInfo.textContent = member.other_information;

        card.appendChild(img);
        card.appendChild(h2);
        card.appendChild(pAddress);
        card.appendChild(pPhone);
        card.appendChild(pWebsite);
        card.appendChild(pMembership);
        card.appendChild(pOtherInfo);

        companyList.appendChild(card);
    });
}


