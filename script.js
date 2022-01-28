const form = document.querySelector(".cityform");

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

                    const h1DayOne = document.querySelector("h1.dayone");
                    h1DayOne.innerHTML = weatherFive.dayOne;
                    const dayOneTemp = document.querySelector("h2.dayonetemp");
                    dayOneTemp.innerHTML = `${Math.floor(data.daily[0].temp.day)}°C`;
                    const dayOneDescr = document.querySelector("p.dayonedescr");
                    dayOneDescr.innerHTML = data.daily[0].weather[0].description;

                    const h1DayTwo = document.querySelector("h1.daytwo");
                    h1DayTwo.innerHTML = weatherFive.dayTwo;
                    const dayTwoTemp = document.querySelector("h2.daytwotemp");
                    dayTwoTemp.innerHTML = `${Math.floor(data.daily[1].temp.day)}°C`;
                    const dayTwoDescr = document.querySelector("p.daytwodescr");
                    dayTwoDescr.innerHTML = data.daily[1].weather[0].description;

                    const h1DayThree = document.querySelector("h1.daythree");
                    h1DayThree.innerHTML = weatherFive.dayThree;
                    const dayThreeTemp = document.querySelector("h2.daythreetemp");
                    dayThreeTemp.innerHTML = `${Math.floor(data.daily[2].temp.day)}°C`;
                    const dayThreeDescr = document.querySelector("p.daythreedescr");
                    dayThreeDescr.innerHTML = data.daily[2].weather[0].description;

                    const h1DayFour = document.querySelector("h1.dayfour");
                    h1DayFour.innerHTML = weatherFive.dayFour;
                    const dayFourTemp = document.querySelector("h2.dayfourtemp");
                    dayFourTemp.innerHTML = `${Math.floor(data.daily[3].temp.day)}°C`;
                    const dayFourDescr = document.querySelector("p.dayfourdescr");
                    dayFourDescr.innerHTML = data.daily[3].weather[0].description;

                    const h1DayFive = document.querySelector("h1.dayfive");
                    h1DayFive.innerHTML = weatherFive.dayFive;
                    const dayFiveTemp = document.querySelector("h2.dayfivetemp");
                    dayFiveTemp.innerHTML = `${Math.floor(data.daily[4].temp.day)}°C`;
                    const dayFiveDescr = document.querySelector("p.dayfivedescr");
                    dayFiveDescr.innerHTML = data.daily[4].weather[0].description;

                    // Add weather icons future days
                    const imageOne = document.querySelector("img.dayone");
                    imageOne.src = icons[data.daily[0].weather[0].icon];

                    const imageTwo = document.querySelector("img.daytwo");
                    imageTwo.src = icons[data.daily[1].weather[0].icon];

                    const imageThree = document.querySelector("img.daythree");
                    imageThree.src = icons[data.daily[2].weather[0].icon];

                    const imageFour = document.querySelector("img.dayfour");
                    imageFour.src = icons[data.daily[3].weather[0].icon];

                    const imageFive = document.querySelector("img.dayfive");
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


                    // Add data on card hover (card one)
                    const spanRaindropOne = document.querySelector("span.raindrop.one");

                    if (data.daily[0].rain === undefined && data.daily[0].snow === undefined) {
                        spanRaindropOne.innerHTML = "0.00mm"
                    } else if (data.daily[0].snow === undefined) {
                        spanRaindropOne.innerHTML = `${data.daily[0].rain}mm`
                    } else { spanRaindropOne.innerHTML = `${data.daily[0].snow}mm` }

                    const spanRainpercentOne = document.querySelector("span.rainchance.one");
                    spanRainpercentOne.innerHTML = `(${data.daily[0].pop}%)`;

                    const spanHumidityOne = document.querySelector("span.humidity.one");
                    spanHumidityOne.innerHTML = `${data.daily[0].humidity}%`;

                    const spanMinOne = document.querySelector("span.min.one");
                    spanMinOne.innerHTML = `${Math.floor(data.daily[0].temp.min)}°C`;

                    const spanMaxOne = document.querySelector("span.max.one");
                    spanMaxOne.innerHTML = `${Math.floor(data.daily[0].temp.max)}°C`;

                    const spanSunriseOne = document.querySelector("span.sunrise.one");
                    const sunriseTimeOne = timeCalc(data.daily[0].sunrise + data.timezone_offset - 3600);
                    spanSunriseOne.innerHTML = sunriseTimeOne;

                    const spanSunsetOne = document.querySelector("span.sunset.one");
                    const sunsetTimeOne = timeCalc(data.daily[0].sunset + data.timezone_offset - 3600);
                    spanSunsetOne.innerHTML = sunsetTimeOne;

                    // Add data on card hover (card two)
                    const spanRaindropTwo = document.querySelector("span.raindrop.two");

                    if (data.daily[1].rain === undefined && data.daily[1].snow === undefined) {
                        spanRaindropTwo.innerHTML = "0,00mm"
                    } else if (data.daily[1].snow === undefined) {
                        spanRaindropTwo.innerHTML = `${data.daily[1].rain}mm`
                    } else { spanRaindropTwo.innerHTML = `${data.daily[1].snow}mm` }

                    const spanRainpercentTwo = document.querySelector("span.rainchance.two");
                    spanRainpercentTwo.innerHTML = `(${data.daily[1].pop}%)`;

                    const spanHumidityTwo = document.querySelector("span.humidity.two");
                    spanHumidityTwo.innerHTML = `${data.daily[1].humidity}%`;

                    const spanMinTwo = document.querySelector("span.min.two");
                    spanMinTwo.innerHTML = `${Math.floor(data.daily[1].temp.min)}°C`;

                    const spanMaxTwo = document.querySelector("span.max.two");
                    spanMaxTwo.innerHTML = `${Math.floor(data.daily[1].temp.max)}°C`;

                    const spanSunriseTwo = document.querySelector("span.sunrise.two");
                    const sunriseTimeTwo = timeCalc(data.daily[1].sunrise + data.timezone_offset - 3600);
                    spanSunriseTwo.innerHTML = sunriseTimeTwo;

                    const spanSunsetTwo = document.querySelector("span.sunset.two");
                    const sunsetTimeTwo = timeCalc(data.daily[1].sunset + data.timezone_offset - 3600);
                    spanSunsetTwo.innerHTML = sunsetTimeTwo;

                    // Add data on card hover (card three)
                    const spanRaindropThree = document.querySelector("span.raindrop.three");

                    if (data.daily[2].rain === undefined && data.daily[2].snow === undefined) {
                        spanRaindropThree.innerHTML = "0,00mm"
                    } else if (data.daily[2].snow === undefined) {
                        spanRaindropThree.innerHTML = `${data.daily[2].rain}mm`
                    } else { spanRaindropThree.innerHTML = `${data.daily[2].snow}mm` }

                    const spanRainpercentThree = document.querySelector("span.rainchance.three");
                    spanRainpercentThree.innerHTML = `(${data.daily[2].pop}%)`;

                    const spanHumidityThree = document.querySelector("span.humidity.three");
                    spanHumidityThree.innerHTML = `${data.daily[2].humidity}%`;

                    const spanMinThree = document.querySelector("span.min.three");
                    spanMinThree.innerHTML = `${Math.floor(data.daily[2].temp.min)}°C`;

                    const spanMaxThree = document.querySelector("span.max.three");
                    spanMaxThree.innerHTML = `${Math.floor(data.daily[2].temp.max)}°C`;

                    const spanSunriseThree = document.querySelector("span.sunrise.three");
                    const sunriseTimeThree = timeCalc(data.daily[2].sunrise + data.timezone_offset - 3600);
                    spanSunriseThree.innerHTML = sunriseTimeThree;

                    const spanSunsetThree = document.querySelector("span.sunset.three");
                    const sunsetTimeThree = timeCalc(data.daily[2].sunset + data.timezone_offset - 3600);
                    spanSunsetThree.innerHTML = sunsetTimeThree;

                    // Add data on card hover (card four)
                    const spanRaindropFour = document.querySelector("span.raindrop.four");

                    if (data.daily[3].rain === undefined && data.daily[3].snow === undefined) {
                        spanRaindropFour.innerHTML = "0,00mm"
                    } else if (data.daily[3].snow === undefined) {
                        spanRaindropFour.innerHTML = `${data.daily[3].rain}mm`
                    } else { spanRaindropFour.innerHTML = `${data.daily[3].snow}mm` }

                    const spanRainpercentFour = document.querySelector("span.rainchance.four");
                    spanRainpercentFour.innerHTML = `(${data.daily[3].pop}%)`;

                    const spanHumidityFour = document.querySelector("span.humidity.four");
                    spanHumidityFour.innerHTML = `${data.daily[3].humidity}%`;

                    const spanMinFour = document.querySelector("span.min.four");
                    spanMinFour.innerHTML = `${Math.floor(data.daily[3].temp.min)}°C`;

                    const spanMaxFour = document.querySelector("span.max.four");
                    spanMaxFour.innerHTML = `${Math.floor(data.daily[3].temp.max)}°C`;

                    const spanSunriseFour = document.querySelector("span.sunrise.four");
                    const sunriseTimeFour = timeCalc(data.daily[3].sunrise + data.timezone_offset - 3600);
                    spanSunriseFour.innerHTML = sunriseTimeFour;

                    const spanSunsetFour = document.querySelector("span.sunset.four");
                    const sunsetTimeFour = timeCalc(data.daily[3].sunset + data.timezone_offset - 3600);
                    spanSunsetFour.innerHTML = sunsetTimeFour;

                    // Add data on card hover (card five)
                    const spanRaindropFive = document.querySelector("span.raindrop.five");

                    if (data.daily[4].rain === undefined && data.daily[4].snow === undefined) {
                        spanRaindropFive.innerHTML = "0,00mm"
                    } else if (data.daily[4].snow === undefined) {
                        spanRaindropFive.innerHTML = `${data.daily[4].rain}mm`
                    } else { spanRaindropFive.innerHTML = `${data.daily[4].snow}mm` }

                    const spanRainpercentFive = document.querySelector("span.rainchance.five");
                    spanRainpercentFive.innerHTML = `(${data.daily[4].pop}%)`;

                    const spanHumidityFive = document.querySelector("span.humidity.five");
                    spanHumidityFive.innerHTML = `${data.daily[4].humidity}%`;

                    const spanMinFive = document.querySelector("span.min.five");
                    spanMinFive.innerHTML = `${Math.floor(data.daily[4].temp.min)}°C`;

                    const spanMaxFive = document.querySelector("span.max.five");
                    spanMaxFive.innerHTML = `${Math.floor(data.daily[4].temp.max)}°C`;

                    const spanSunriseFive = document.querySelector("span.sunrise.five");
                    const sunriseTimeFive = timeCalc(data.daily[4].sunrise + data.timezone_offset - 3600);
                    spanSunriseFive.innerHTML = sunriseTimeFive;

                    const spanSunsetFive = document.querySelector("span.sunset.five");
                    const sunsetTimeFive = timeCalc(data.daily[4].sunset + data.timezone_offset - 3600);
                    spanSunsetFive.innerHTML = sunsetTimeFive;
                })
        })
}

form.addEventListener("submit", handleForm)
