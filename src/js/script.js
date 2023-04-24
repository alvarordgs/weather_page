async function searchWeather(city="London") {
    try {
        const getWeather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c0bb6d739fcf4c76880232004231304&q=${city}&days=4&aqi=no&alerts=no`)
        const getWeatherData = await getWeather.json();

        if(getWeatherData.erro)
            throw Error('Não foi possível buscar o clima da cidade selecionada!');

        fillWeather(getWeatherData);
        fillSecondWeather(getWeatherData);
        return getWeatherData;

    }catch(erro) {
        console.log(erro);
    }
}


function fillWeather(data) {
    const dateElement = document.querySelector('[data-weather="date"]');
    const imgElement = document.querySelector('[data-weather="img"]');
    const tempElement = document.querySelector('[data-weather="temperature"]')
    const descElement = document.querySelector('[data-weather="description"]')
    const humidityElement = document.querySelector('[data-weather="humidity"]')
    const windElement = document.querySelector('[data-weather="wind"]')

    dateElement.innerText = "Today" + data.location.localtime.slice(10);
    tempElement.innerText = Number.parseInt(+data.current.temp_c);
    descElement.innerText = data.current.condition.text;
    humidityElement.innerText = data.current.humidity + "%";
    windElement.innerText = data.current.wind_kph + " km/h";

    const iconFullPath = data.current.condition.icon;
    const iconPath = iconFullPath.slice(35)
    imgElement.setAttribute('src', './assets/weather_icons/64x64/' + iconPath)
}

function fillSecondWeather(data) {
    const foreCard = document.querySelectorAll('[data-forecast="card"]');
    
    foreCard.forEach( (card, index) => {
        const date = card.querySelector('[data-forecast="date"]');
        const img = card.querySelector('[data-forecast="img"]');
        const tempMin = card.querySelector('[data-forecast="temp-min"]');
        const tempMax = card.querySelector('[data-forecast="temp-max"]');
        const condition = card.querySelector('[data-forecast="condition"]');
        const humidity = card.querySelector('[data-forecast="humidity"]');
        
        const forecastDay = data.forecast.forecastday;

        index++; //pega a partir do proximo dia

        console.log(forecastDay[index])
        date.innerText = getWeekDay(forecastDay[index].date);

        const iconFullPath = forecastDay[index].day.condition.icon;
        const iconPath = iconFullPath.slice(35)
        img.setAttribute('src', './assets/weather_icons/64x64/' + iconPath)

        tempMin.innerText = Number.parseInt(forecastDay[index].day.mintemp_c) + " ℃"

        tempMax.innerText = Number.parseInt(forecastDay[index].day.maxtemp_c) + " ℃"
        
        condition.innerText = forecastDay[index].day.condition.text;

        humidity.innerText = forecastDay[index].day.avghumidity + "%";
    })  

    
}

searchWeather();
const inputCity = document.querySelector('[data-city]');
inputCity.addEventListener('change', () => searchWeather(inputCity.value))

function getWeekDay(date) {
    const dayNumber = +new Date(date).getUTCDay();

    switch(dayNumber) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
    }
}