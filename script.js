const apiKey = "9353841aef0ee7e77d8eba2709e98120";

const consoleBox = document.getElementById("consoleBox");
const historyBox = document.getElementById("history");

function log(message) {
    consoleBox.innerHTML += message + "<br>";
}

function getWeather() {
    const city = document.getElementById("cityInput").value;
    log("1 Sync Start");
    setTimeout(() => {
        log("setTimeout (Macrotask)");
    }, 0);
    Promise.resolve().then(() => {
        log("Promise.then (Microtask)");
    });

    log("2 Sync End");
    fetchWeather(city);
}

async function fetchWeather(city) {

    log("[ASYNC] Start fetching");
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod !== 200) {
            document.getElementById("weatherInfo").innerHTML = "<p style='color:red'>City not found</p>";
            return;
        }
        displayWeather(data);
        addHistory(city);

        log("[ASYNC] Data received");
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {

    const weatherHTML = `
<div class="weather-row">
<span>City</span>
<span>${data.name}, ${data.sys.country}</span>
</div>

<div class="weather-row">
<span>Temp</span>
<span>${data.main.temp} °C</span>
</div>

<div class="weather-row">
<span>Weather</span>
<span>${data.weather[0].main}</span>
</div>

<div class="weather-row">
<span>Humidity</span>
<span>${data.main.humidity}%</span>
</div>

<div class="weather-row">
<span>Wind</span>
<span>${data.wind.speed} m/s</span>
</div>
`;

    document.getElementById("weatherInfo").innerHTML = weatherHTML;
}

function addHistory(city) {

    const btn = document.createElement("button");
    btn.innerText = city;

    btn.onclick = function () {
        document.getElementById("cityInput").value = city;
        getWeather();
    }

    historyBox.appendChild(btn);
}