// Add city for API call
const handleForm = (event) => {
    event.preventDefault();

    const newCity = event.target.city.value;

    // API call
    const getData = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${config.apiKey}&units=metric&cnt=5`)
        .then(response => response.json())
        .then(data => {

            const lat = data.city.coord.lat
            const lon = data.city.coord.lon
            const name = data.city.name

            const h1Name = document.querySelector(".name");
            h1Name.innerHTML = name;

            const getData = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${config.apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {

                    // Current weather:
                    const weatherNow = {
                        Descr: data.current.weather[0].description,
                        Icon: data.current.weather[0].icon,
                        Temp: `${Math.floor(data.current.temp)}°C`,
                    }

                    const h2Temp = document.querySelector(".temp");
                    h2Temp.innerHTML = weatherNow.Temp;

                    const pDescr = document.querySelector(".descr");
                    pDescr.innerHTML = weatherNow.Descr;

                    //Add weather icon:
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
                    image.src = icons[weatherNow.Icon];

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
                        12: "Friday",
                    }

                    const weatherFive = {
                        dayOne: "Today",
                        dayTwo: weekDays[today + 1],
                        dayThree: weekDays[today + 2],
                        dayFour: weekDays[today + 3],
                        dayFive: weekDays[today + 4],
                    }

                    fiveDays.style.visibility = "visible";

                    const h1DayOne = document.querySelector("h1.day0");
                    h1DayOne.innerHTML = weatherFive.dayOne;
                    const dayOneTemp = document.querySelector("h2.day0temp");
                    dayOneTemp.innerHTML = `${Math.floor(data.daily[0].temp.day)}°C`;
                    const dayOneDescr = document.querySelector("p.day0descr");
                    dayOneDescr.innerHTML = data.daily[0].weather[0].description;

                    const h1DayTwo = document.querySelector("h1.day1");
                    h1DayTwo.innerHTML = weatherFive.dayTwo;
                    const dayTwoTemp = document.querySelector("h2.day1temp");
                    dayTwoTemp.innerHTML = `${Math.floor(data.daily[1].temp.day)}°C`;
                    const dayTwoDescr = document.querySelector("p.day1descr");
                    dayTwoDescr.innerHTML = data.daily[1].weather[0].description;

                    const h1DayThree = document.querySelector("h1.day2");
                    h1DayThree.innerHTML = weatherFive.dayThree;
                    const dayThreeTemp = document.querySelector("h2.day2temp");
                    dayThreeTemp.innerHTML = `${Math.floor(data.daily[2].temp.day)}°C`;
                    const dayThreeDescr = document.querySelector("p.day2descr");
                    dayThreeDescr.innerHTML = data.daily[2].weather[0].description;

                    const h1DayFour = document.querySelector("h1.day3");
                    h1DayFour.innerHTML = weatherFive.dayFour;
                    const dayFourTemp = document.querySelector("h2.day3temp");
                    dayFourTemp.innerHTML = `${Math.floor(data.daily[3].temp.day)}°C`;
                    const dayFourDescr = document.querySelector("p.day3descr");
                    dayFourDescr.innerHTML = data.daily[3].weather[0].description;

                    const h1DayFive = document.querySelector("h1.day4");
                    h1DayFive.innerHTML = weatherFive.dayFive;
                    const dayFiveTemp = document.querySelector("h2.day4temp");
                    dayFiveTemp.innerHTML = `${Math.floor(data.daily[4].temp.day)}°C`;
                    const dayFiveDescr = document.querySelector("p.day4descr");
                    dayFiveDescr.innerHTML = data.daily[4].weather[0].description;

                    // Add weather icons future days
                    const imageOne = document.querySelector("img.day0");
                    imageOne.src = icons[data.daily[0].weather[0].icon];

                    const imageTwo = document.querySelector("img.day1");
                    imageTwo.src = icons[data.daily[1].weather[0].icon];

                    const imageThree = document.querySelector("img.day2");
                    imageThree.src = icons[data.daily[2].weather[0].icon];

                    const imageFour = document.querySelector("img.day3");
                    imageFour.src = icons[data.daily[3].weather[0].icon];

                    const imageFive = document.querySelector("img.day4");
                    imageFive.src = icons[data.daily[4].weather[0].icon];

                    // Calculate sunrise & sunset time
                    let timeCalc = (time) => {
                        let timeStamp = time;
                        const date = new Date(timeStamp * 1000);
                        const hours = date.getHours();
                        const mins = "0" + date.getMinutes();

                        const formattedTime = `${hours}:${(mins.substr(-2))}`
                        return formattedTime
                    }

                    // Add data on card hover
                    for (let i = 0; i <= 4; i++) {

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
                })
        })
}

// Add eventlistener when entering city name
addEventListener("submit", handleForm);
