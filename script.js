// Calculate sunrise & sunset time
let timeCalc = (time) => {
    let timeStamp = time;
    const date = new Date(timeStamp * 1000);
    const hours = date.getHours();
    const mins = "0" + date.getMinutes();

    const formattedTime = `${hours}:${(mins.substr(-2))}`
    return formattedTime
}

const weatherIcons = (data) => {

    const icons = {
        "01d": "./images/sun_clear.svg",
        "02d": "./images/sun_cloud.svg",
        "03d": "./images/cloud_clouds.svg",
        "04d": "./images/cloud_clouds.svg",
        "09d": "./images/cloud_rain_large.svg",
        "10d": "./images/sun_cloud_rain.svg",
        "11d": "./images/cloud_storm.svg",
        "13d": "./images/cloud_snow.svg",
        "50d": "./images/cloud_fog.svg",
        "01n": "./images/moon_clear.svg",
        "02n": "./images/moon_cloud.svg",
        "03n": "./images/cloud_clouds.svg",
        "04n": "./images/cloud_clouds.svg",
        "09n": "./images/cloud_rain_large.svg",
        "10n": "./images/moon_cloud_rain.svg",
        "11n": "./images/moon_cloud_storm.svg",
        "13n": "./images/moon_cloud_snow.svg",
        "50n": "./images/moon_cloud_fog.svg",
    }

    const image = document.querySelector("img");
    const iconCurrent = data.current.weather[0].icon;
    image.src = icons[iconCurrent];

    for (let i = 0; i <= 4; i++) {
        const image = document.querySelector(`img.day${i}`);
        image.src = icons[data.daily[i].weather[0].icon]
    }
}

const weatherData = (data) => {

    // Current weather:
    const weatherNow = {
        Descr: data.current.weather[0].description,
        Temp: `${Math.floor(data.current.temp)}°C`,
    }

    const h2Temp = document.querySelector(".temp");
    h2Temp.innerHTML = weatherNow.Temp;

    const pDescr = document.querySelector(".descr");
    pDescr.innerHTML = weatherNow.Descr;

    // Next five days:
    const fiveDays = document.querySelector(".weatherfivedays");
    const date = new Date();
    const today = date.getDay();
    const weekDays = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday",
        8: "Monday",
        9: "Tuesday",
        10: "Wednesday",
        11: "Thursday",
    }

    const weatherFive = [
        "Today",
        weekDays[today + 1],
        weekDays[today + 2],
        weekDays[today + 3],
        weekDays[today + 4]
    ]

    fiveDays.style.visibility = "visible";

    for (let i = 0; i <= 4; i++) {
        // Add card data
        const h1Day = document.querySelector(`h1.day${i}`);
        h1Day.innerHTML = weatherFive[i];
        const dayTemp = document.querySelector(`h2.day${i}temp`);
        dayTemp.innerHTML = `${Math.floor(data.daily[i].temp.day)}°C`;
        const dayDescr = document.querySelector(`p.day${i}descr`);
        dayDescr.innerHTML = data.daily[i].weather[0].description;

        // Add data on card hover
        const spanRaindrop = document.querySelector(`span.raindrop.day${i}`);

        if (data.daily[i].rain === undefined && data.daily[i].snow === undefined) {
            spanRaindrop.innerHTML = "0.00mm"
        } else if (data.daily[i].snow === undefined) {
            spanRaindrop.innerHTML = `${data.daily[i].rain}mm`
        } else { spanRaindrop.innerHTML = `${data.daily[i].snow}mm` }

        const spanRainpercent = document.querySelector(`span.rainchance.day${i}`);
        spanRainpercent.innerHTML = `(${data.daily[i].pop}%)`;

        const spanHumidity = document.querySelector(`span.humidity.day${i}`);
        spanHumidity.innerHTML = `${data.daily[i].humidity}%`;

        const spanMin = document.querySelector(`span.min.day${i}`);
        spanMin.innerHTML = `${Math.floor(data.daily[i].temp.min)}°C`;

        const spanMax = document.querySelector(`span.max.day${i}`);
        spanMax.innerHTML = `${Math.floor(data.daily[0].temp.max)}°C`;

        const spanSunrise = document.querySelector(`span.sunrise.day${i}`);
        const sunriseTime = timeCalc(data.daily[i].sunrise + data.timezone_offset - 3600);
        spanSunrise.innerHTML = sunriseTime;

        const spanSunset = document.querySelector(`span.sunset.day${i}`);
        const sunsetTime = timeCalc(data.daily[i].sunset + data.timezone_offset - 3600);
        spanSunset.innerHTML = sunsetTime;
    }
}

const secondApi = (data) => {

    const lat = data.city.coord.lat
    const lon = data.city.coord.lon
    const name = data.city.name

    const h1Name = document.querySelector(".name");
    h1Name.innerHTML = name;

    const getData = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${config.apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            weatherIcons(data);
            weatherData(data);
        })
}

const firstApi = (event) => {

    const newCity = event.target.city.value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${config.apiKey}&units=metric&cnt=5`)
        .then(response => response.json())
        .then(data => {
            secondApi(data);
        })
}

// Add city for API call
const handleForm = (event) => {

    event.preventDefault();
    firstApi(event);
}

// Add eventlistener when entering city name
addEventListener("submit", handleForm);
