const form = document.querySelector(".cityform");

// Add city for API call
const handleForm = (event) => {
    event.preventDefault();

    const newCity = event.target.city.value;

    // API call
    const getData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${config.apiKey}`)
        .then(response => response.json())
        .then(data => console.log(data))
}

form.addEventListener("submit", handleForm);
