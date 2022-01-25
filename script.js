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
                        12: "Friday",
                    }

                    const weatherFive = {
                        today: "Today",
                        todayAddOne: weekDays[today + 1],
                        todayAddTwo: weekDays[today + 2],
                        todayAddThree: weekDays[today + 3],
                        todayAddFour: weekDays[today + 4],
                    }

                    const h1Today = document.querySelector("h1.today");
                    h1Today.innerHTML = weatherFive.today;
                    const todayTemp = document.querySelector("h2.todaytemp");
                    todayTemp.innerHTML = `${Math.floor(data.daily[0].temp.day)}°C`;

                    const h1TodayAddOne = document.querySelector("h1.todayaddone");
                    h1TodayAddOne.innerHTML = weatherFive.todayAddOne;
                    const todayAddOneTemp = document.querySelector("h2.todayaddonetemp");
                    todayAddOneTemp.innerHTML = `${Math.floor(data.daily[1].temp.day)}°C`;

                    const h1TodayAddTwo = document.querySelector("h1.todayaddtwo");
                    h1TodayAddTwo.innerHTML = weatherFive.todayAddTwo;
                    const todayAddTwoTemp = document.querySelector("h2.todayaddtwotemp");
                    todayAddTwoTemp.innerHTML = `${Math.floor(data.daily[2].temp.day)}°C`;

                    const h1TodayAddThree = document.querySelector("h1.todayaddthree");
                    h1TodayAddThree.innerHTML = weatherFive.todayAddThree;
                    const todayAddThreeTemp = document.querySelector("h2.todayaddthreetemp");
                    todayAddThreeTemp.innerHTML = `${Math.floor(data.daily[3].temp.day)}°C`;

                    const h1TodayAddFour = document.querySelector("h1.todayaddfour");
                    h1TodayAddFour.innerHTML = weatherFive.todayAddFour;
                    const todayAddFourTemp = document.querySelector("h2.todayaddfourtemp");
                    todayAddFourTemp.innerHTML = `${Math.floor(data.daily[4].temp.day)}°C`;

                    console.log(data);
                })
        })
}

form.addEventListener("submit", handleForm)
