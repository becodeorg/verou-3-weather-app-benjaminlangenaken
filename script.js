const form = document.querySelector(".cityform");
const cityName = document.querySelector("#city");

// Add city for API call
const handleForm = (event) => {
    event.preventDefault();

    const newCity = event.target.city.value;
    console.log(newCity)
}

form.addEventListener("submit", handleForm);

// API call
const getData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.apiKey}`);
