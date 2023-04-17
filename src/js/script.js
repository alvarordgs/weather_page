async function searchWeather(city="London") {
    try {
        const getWeather = await fetch(`http://api.weatherapi.com/v1/current.json?key=c0bb6d739fcf4c76880232004231304&q=${city}&aqi=no`)
        const getWeatherData = await getWeather.json();

        if(getWeatherData.erro)
            throw Error('Não foi possível buscar o clima da cidade selecionada!');

        fillWeather(getWeatherData);
        return getWeatherData;

    }catch(erro) {
        console.log(erro);
    }
}


function fillWeather(data) {
    console.log(data)
    const dateElement = document.querySelector('[data-weather="date"]');
    const imgElement = document.querySelector('[data-weather="img"]');
    const tempElement = document.querySelector('[data-weather="temperature"]')
    const descElement = document.querySelector('[data-weather="description"]')
    const humidityElement = document.querySelector('[data-weather="humidity"]')
    const windElement = document.querySelector('[data-weather="wind"]')

    dateElement.innerText = data.location.localtime;
    tempElement.innerText = Number.parseInt(+data.current.temp_c);
    descElement.innerText = data.current.condition.text;
    humidityElement.innerText = data.current.humidity + "%";
    windElement.innerText = data.current.wind_kph + " km/h";

    const iconFullPath = data.current.condition.icon;
    const iconPath = iconFullPath.slice(35)
    imgElement.setAttribute('src', './assets/weather_icons/64x64/' + iconPath)
}


searchWeather();
const inputCity = document.querySelector('[data-city]');
inputCity.addEventListener('change', () => searchWeather(inputCity.value))