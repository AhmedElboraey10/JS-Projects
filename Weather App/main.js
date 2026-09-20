// climo reset button

const logo = document.getElementById('app-logo');

logo.addEventListener( 'click' , () => {

    storageRemove( localStorage , STORAGE_KEYS.lastLocation );
    storageRemove( sessionStorage , STORAGE_KEYS.weatherCache );

    window.location.reload();

})

// climo reset button

//****************************************************************************

// clear input

function clearInput( input ) {
    if ( Number.isNaN( Number( input ) ) && input.length > 0 ) {
        return input.toLowerCase().trim()
    }
}

// clear input

//****************************************************************************

// toggle tempreture unit

function celsiusToFahrenheit(c) {
    return ( c * 9 / 5 ) + 32;
}

const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
let activeUnit = 'celsius';

function setTempUnit(newUnit) {
    activeUnit = newUnit;

    celsius.classList.toggle('font-bold');
    celsius.classList.toggle('font-normal');
    fahrenheit.classList.toggle('font-bold');
    fahrenheit.classList.toggle('font-normal');

    storageSet(localStorage, STORAGE_KEYS.unit, activeUnit);

    if (weatherData) {
        displayCurrentWeather();
        displayHourlyWeather();
        refreshDailyForecast();
    }
}

const tempUnit = document.getElementById('temp-unit-toggle');

tempUnit.addEventListener( 'click' , e => {

    if (e.target !== celsius && e.target !== fahrenheit) {
        return;
    }

    const clickedUnit = e.target === celsius ? 'celsius' : 'fahrenheit';

    if (clickedUnit === activeUnit) {
        return;
    }

    setTempUnit(clickedUnit);

})

// toggle tempreture unit

//****************************************************************************

// menu

const openMenu = document.getElementById('open-menu');
const navMenu = document.getElementById('menu-toggle');

navMenu.addEventListener( 'click' , _ => {
    openMenu.classList.toggle('is-open');
})

// menu

//****************************************************************************

// continents

const continent = document.getElementById('continent');
const lis = continent.querySelectorAll('li');
let chosenContinent;

continent.addEventListener( 'click' , e => {
    if ( e.target.tagName !== 'LI' ) {
        return;
    }

    lis.forEach( li => {
            if ( li.classList.contains('active-li') ) {
                li.classList.remove('active-li')
            }
        } 
    );
    e.target.classList.add('active-li');

    searchCountryInput.value = '';
    citySearchInput.value = '';
    regionNameSpan.textContent = '';
    cityNameSpan.textContent = '';

    displayCities([]);
    closeCityResults();

    chosenContinent = e.target.textContent.trim();
    filterCountries(chosenContinent);

    displayCountries(filterdCountries); 
})

// continents

//****************************************************************************

// countries

import { countriesData } from "./countries-data.js";

// filter countries by continents
let filterdCountries;
function filterCountries(chosenContinent) {
    const entry = countriesData.find (
        ele => {
            return ( ele.continent.trim() === chosenContinent );
        } 
    );
    filterdCountries = entry ? entry.countries : undefined;
}

// display countries
const resultsList = document.getElementById('resultsList');
function displayCountries(filterdCountries) {
    if (!filterdCountries) {
        return;
    }
    resultsList.innerHTML = '';
    filterdCountries.forEach( c => {
        let country = document.createElement('li');
        country.classList.add('cursor-pointer');
        country.textContent = c.name;
        country.dataset.countryName = c.name;
        resultsList.appendChild(country);
        let hr = document.createElement('hr');
        hr.classList.add('h-2px', 'text-[#fdd448]');
        resultsList.appendChild(hr);
    })
}

// display a message inside the country results (no continent selected)
function displayCountriesMessage(message) {
    resultsList.innerHTML = '';
    const li = document.createElement('li');
    li.classList.add('py-2', 'text-[12px]', 'sm:text-[13px]', 'text-white/60');
    li.textContent = message;
    resultsList.appendChild(li);
}

// search countries
const searchCountry = document.getElementById('search-country');
const searchCountryInput = searchCountry.querySelector('input');
searchCountry.addEventListener( 'input' , _ => {
    if (!chosenContinent) {
        displayCountriesMessage('Select a continent first.');
        return;
    }
    if ( clearInput( searchCountryInput.value ) ) {
        filterSearchCountries( searchCountryInput.value )
    } else {
        displayCountries(filterdCountries)
    }
})

// filter countries by search
function filterSearchCountries() {
    if (!filterdCountries) {
        return;
    }
    const query = searchCountryInput.value.toLowerCase().trim();
    const countryList = filterdCountries.filter( ele => ele.name.toLowerCase().startsWith(query) );
    displayCountries(countryList)
}

// country selection
let chosenCountry;
resultsList.addEventListener( 'click' , e => {
    if ( e.target.tagName !== 'LI' || !e.target.dataset.countryName ) {
        return;
    }

    chosenCountry = filterdCountries.find (
        country => {
            return ( country.name === e.target.textContent.trim() );
        }  
    );

    searchCountryInput.value = chosenCountry.name.toLowerCase();
    regionNameSpan.textContent = chosenCountry.name;
    citySearchInput.value = '';
    cityNameSpan.textContent = '';

    displayCities([]);
    closeCityResults();

    resultsList.innerHTML = '';

    openMenu.classList.remove('is-open');
})

// countries

//****************************************************************************

// search city

// open and close city results
const cityResults = document.getElementById('city-results');
const cityResultsList = cityResults.querySelector('ul');
function openCityResults() {
    cityResults.style.maxHeight = cityResultsList.offsetHeight + 'px';
}
function closeCityResults() {
    cityResults.style.maxHeight = '0px';
}

// search cities by input
const searchCity = document.getElementById('search-city');
const citySearchInput = searchCity.querySelector('input');
citySearchInput.addEventListener( 'input' , _ => {
    if (!chosenCountry) {
        displayCitiesMessage('Select a country first.');
        openCityResults();
        return;
    }
    const query = clearInput( citySearchInput.value );
    if ( query ) {
        searchCities( query )
    } else {
        displayCities([])
        closeCityResults()
    }
})

// keep the input focused
cityResultsList.addEventListener( 'mousedown' , e => {
    e.preventDefault()
})

// focus and blur
citySearchInput.addEventListener( 'focus' , _ => {
    openCityResults()
})
citySearchInput.addEventListener( 'blur' , _ => {
    closeCityResults()
})

// fetch cities from geonames api
async function searchCities(cityName) {
    try {

        const response = await fetch(`https://secure.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(cityName)}&country=${chosenCountry.code}&featureClass=P&maxRows=100&username=ahmed_elboraey`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        if (data.geonames && data.geonames.length) {
            displayCities(data.geonames)
        } else {
            displayCitiesMessage('No matching cities.')
        }

        openCityResults()

    } catch (error) {

        console.error('Error fetching cities:', error);

        displayCitiesMessage( 'Unable to find cities.' );
        openCityResults();

    }
}

// display cities
function displayCities( cities ) {

    cityResultsList.innerHTML = '';

    cities.forEach( c => {

        let city = document.createElement('li');
        city.classList.add( 'cursor-pointer', 'px-4' , 'py-2.5', 'text-black' , 'text-[12px]' , 'sm:text-[13px]' , 'border-b-2' , 'border-[#fdd448]' , 'hover:bg-white/30' , 'transition-colors' , 'duration-200' );

        city.textContent = `${c.name}, ${c.countryName}`;
        city.dataset.cityName = c.name;
        city.dataset.latitude = c.lat;
        city.dataset.longitude = c.lng;
        city.dataset.adminRegion = c.adminName1 || '';

        cityResultsList.appendChild(city);

    })
}

// display a message inside the city dropdown
function displayCitiesMessage( message ) {

    cityResultsList.innerHTML = '';
    const li = document.createElement('li');
    li.classList.add('px-4', 'py-2.5', 'leading-[20px]', 'text-black', 'text-[12px]', 'sm:text-[13px]' , 'message');
    li.textContent = message;

    cityResultsList.appendChild(li);
}

// city selection
const cityNameSpan = document.getElementById('city-name');
const regionNameSpan = document.getElementById('region-name');
let chosenCity;
let fullAddress;
cityResultsList.addEventListener( 'click' , e => {

    if ( e.target.tagName !== 'LI' || e.target.classList.contains('message') ) {
        return;
    }

    chosenCity = e.target.dataset.cityName;
    fullAddress = {
        continent: chosenContinent,
        country: chosenCountry.name,
        city: chosenCity,
        latitude: parseFloat(e.target.dataset.latitude),
        longitude: parseFloat(e.target.dataset.longitude)
    };

    citySearchInput.value = chosenCity.toLowerCase();
    cityNameSpan.textContent = chosenCity;
    regionNameSpan.textContent = e.target.dataset.adminRegion || chosenCountry.name;

    saveLastLocation();
    displayCities([]);
    closeCityResults();
    getWeather();
})

// search city

//****************************************************************************

// weather api

let weatherData;
async function getWeather() {
    setLoadingState();
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${fullAddress.latitude}&longitude=${fullAddress.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,is_day&hourly=temperature_2m,weather_code,precipitation_probability,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&temperature_unit=celsius&wind_speed_unit=ms&timezone=auto&forecast_days=16`
        );
        if ( !response.ok ) {
            throw new Error(`Weather response was not ok: ${response.status}`);
        }

        weatherData = await response.json();

        saveWeatherCache();
        displayCurrentWeather();
        displayHourlyWeather();
        displayDailyForecast();
    } catch ( error ) {
        console.error( 'Error fetching weather:', error );
        showErrorState( 'Unable to load weather data.' );
    }
}

// weather api

//****************************************************************************

// weather rendering helpers

// Weather Code => Description
const weatherDescriptions = [
    [0, 0, 'Clear sky'],
    [1, 1, 'Mainly clear'],
    [2, 2, 'Partly cloudy'],
    [3, 3, 'Overcast'],
    [45, 48, 'Fog'],
    [51, 55, 'Drizzle'],
    [56, 57, 'Freezing drizzle'],
    [61, 65, 'Rain'],
    [66, 67, 'Freezing rain'],
    [71, 75, 'Snow fall'],
    [77, 77, 'Snow grains'],
    [80, 82, 'Rain showers'],
    [85, 86, 'Snow showers'],
    [95, 95, 'Thunderstorm'],
    [96, 99, 'Thunderstorm with hail'],
];
function getWeatherDescription( code ) {
    const row = weatherDescriptions.find (
        ( [ min , max ] ) => {
            return ( code >= min && code <= max );
        }
    );
    return row[2];
}

// Weather Code => Icon (PNG)
const mainIcons = [
    [0, 0, 'sunny.png', 'clear_night.png'],
    [1, 1, 'mostly_sunny.png', 'mostly_clear_night.png'],
    [2, 2, 'partly_cloudy.png', 'partly_cloudy_night.png'],
    [3, 3, 'cloudy.png'],
    [45, 48, 'haze_fog_dust_smoke.png'],
    [51, 57, 'drizzle.png'],
    [61, 63, 'showers_rain.png'],
    [65, 65, 'heavy_rain.png'],
    [66, 67, 'wintry_mix_rain_snow.png'],
    [71, 73, 'snow_showers_snow.png'],
    [75, 75, 'heavy_snow.png'],
    [77, 77, 'flurries.png'],
    [80, 81, 'scattered_showers_day.png', 'scattered_showers_night.png'],
    [82, 82, 'heavy_rain.png'],
    [85, 85, 'snow_showers_snow.png'],
    [86, 86, 'blizzard.png'],
    [95, 95, 'isolated_scattered_tstorms_day.png', 'isolated_scattered_tstorms_night.png'],
    [96, 99, 'strong_tstorms.png'],
];
function getCurrentIcon( code , isDay ) {

    const row = mainIcons.find (
        ( [ min , max ] ) => {
            return ( code >= min && code <= max );
        }
    );

    const dayFile = row[2];
    const nightFile = row[3] || dayFile;

    return isDay === 1 ? dayFile : nightFile;
}

// Weather Code => Icon (SVG)
const outlineIcons = [
    [0, 0, 'Sun.svg', 'Moon.svg'],
    [1, 2, 'Cloud-Sun.svg', 'Cloud-Moon.svg'],
    [3, 3, 'Cloud.svg'],
    [45, 48, 'Cloud-Fog-Sun.svg', 'Cloud-Fog-Moon.svg'],
    [51, 57, 'Cloud-Drizzle-Sun.svg', 'Cloud-Drizzle-Moon.svg'],
    [61, 65, 'Cloud-Rain-Sun.svg', 'Cloud-Rain-Moon.svg'],
    [66, 67, 'Cloud-Hail-Sun.svg', 'Cloud-Hail-Moon.svg'],
    [71, 77, 'Cloud-Snow-Sun.svg', 'Cloud-Snow-Moon.svg'],
    [80, 82, 'Cloud-Rain-Sun-Alt.svg', 'Cloud-Rain-Moon-Alt.svg'],
    [85, 86, 'Cloud-Snow-Sun-Alt.svg', 'Cloud-Snow-Moon-Alt.svg'],
    [95, 99, 'Cloud-Lightning-Sun.svg', 'Cloud-Lightning-Moon.svg'],
];
function getOutlineIcon( code , isDay ) {

    const row = outlineIcons.find(
        ( [ min , max ] ) => {
            return ( code >= min && code <= max );
        }
    );

    const dayFile = row[2];
    const nightFile = row[3] || dayFile;

    return isDay === 1 ? dayFile : nightFile;
}

// Date & Time Formatting
const dateFmt = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
});
function parseDateTime( isoString ) {
    const date = new Date( isoString.replace('T', ' ') + ' GMT' );
    const parts = dateFmt.formatToParts(date);

    function get(type) {
        const part = parts.find( p => p.type === type );
        return part.value;
    }

    const weekday = get('weekday');
    const day     = get('day');
    const month   = get('month');
    const hour    = get('hour');
    const minute  = get('minute');

    return { weekday, day, month, hour, minute };
}

// Temperature Formatting
function formatTemp( tempCelsius ) {

    const value = activeUnit === 'fahrenheit' ? celsiusToFahrenheit(tempCelsius) : tempCelsius;

    const sign = value >= 0 ? '+' : '-';

    return `${sign}${ Math.round( Math.abs( value ) ) }`;
}
function tempUnitSuffix() {
    return activeUnit === 'fahrenheit' ? '°F' : '°C';
}

// weather rendering helpers

//****************************************************************************

// display current weather on UI

function displayCurrentWeather() {

    const current = weatherData.current;
    const daily = weatherData.daily;

    const { weekday, day, month, hour, minute } = parseDateTime(current.time);
    document.getElementById('current-date-time').textContent = `${weekday} ${day} ${month} ${hour}:${minute}`;

    document.getElementById('current-temp').textContent = `${formatTemp(current.temperature_2m)}${tempUnitSuffix()}`;

    document.getElementById('feels-like-temp').textContent = `${formatTemp(current.apparent_temperature)}°`;

    document.getElementById('weather-description').textContent = getWeatherDescription(current.weather_code);

    document.getElementById('current-weather-icon').src = `./assets/weather-icons/${getCurrentIcon(current.weather_code, current.is_day)}`;

    const sunrise = parseDateTime(daily.sunrise[0]);
    document.getElementById('sunrise-time').textContent = `${sunrise.hour}:${sunrise.minute}`;

    const sunset = parseDateTime(daily.sunset[0]);
    document.getElementById('sunset-time').textContent = `${sunset.hour}:${sunset.minute}`;

    document.getElementById('wind-speed').textContent = `${current.wind_speed_10m.toFixed(1)} m/s`;

    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;

    document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl * 0.75006)} mm`;

    document.getElementById('precipitation-prob').textContent = `${daily.precipitation_probability_max[0]}%`;
}

// display current weather on UI

//****************************************************************************

// display hourly weather on UI

function displayHourlyWeather() {

    const hourly = weatherData.hourly;
    const wantedHours = [ 0 , 3 , 6 , 9 , 12 , 15 , 18 , 21 ];
    const slotImgs  = document.querySelectorAll('#hourly-forecast-body img');
    const slotDegs  = document.querySelectorAll('#hourly-forecast-body .deg');
    const slotTimes = document.querySelectorAll('#hourly-forecast-body .time');

    wantedHours.forEach( ( hour , slot ) => {
        const index = hourly.time.findIndex( t => t.endsWith(`T${String(hour).padStart(2, '0')}:00`));

        const code  = hourly.weather_code[index];
        const isDay = hourly.is_day[index];

        slotImgs[slot].src = `./assets/climacons/${getOutlineIcon(code, isDay)}`;

        slotImgs[slot].alt = getWeatherDescription(code);

        slotDegs[slot].textContent = `${formatTemp(hourly.temperature_2m[index])}°`;

        slotTimes[slot].textContent = `${hour}:00`;
    });
}

// display hourly weather on UI

//****************************************************************************

// display daily forecast on UI

function getDayData(i) {
    const daily = weatherData.daily;
    const { weekday, day, month } = parseDateTime(daily.time[i]);
    const code = daily.weather_code[i];
    return {
        weekday,
        dateText: `${day} ${month}`,
        min: formatTemp(daily.temperature_2m_min[i]),
        max: formatTemp(daily.temperature_2m_max[i]),
        icon: getOutlineIcon(code, 1),
        desc: getWeatherDescription(code),
    };
}

function fillDayCard( card , i ) {
    const d = getDayData(i);
    card.querySelector('.day').textContent = d.weekday.toUpperCase();
    card.querySelector('.date').textContent = d.dateText;
    card.querySelector('.min span').textContent = `${d.min}°`;
    card.querySelector('.max span').textContent = `${d.max}°`;
    const img = card.querySelector('img');
    img.src = `./assets/climacons/${d.icon}`;
    img.alt = d.desc;
    card.querySelector('.state').textContent = d.desc;
}

function buildDayCard(i) {
    const template = document.querySelector('#weekly-forecast-body td');
    const td = template.cloneNode(true);
    td.classList.add('generated-day');
    fillDayCard(td, i);
    return td;
}

function removeGeneratedDays() {
    document.querySelectorAll('#weekly-forecast-body .generated-day').forEach( td => td.remove() );
}

function refreshDailyForecast() {
    const hardcoded = document.querySelectorAll('#weekly-forecast-body td:not(.generated-day)');

    for ( let i = 0 ; i < hardcoded.length && i < 7 ; i++ ) {
        fillDayCard( hardcoded[i] , i );
    }

    const generated = document.querySelectorAll('#weekly-forecast-body .generated-day');

    generated.forEach( ( card , idx ) => fillDayCard( card , 7 + idx ) );
}

let dailyExpanded = false;

function updateShowDaysLink() {
    const link = document.querySelector('.weekly-forecast-section nav a');
    const total = weatherData.daily.time.length;

    link.textContent = dailyExpanded ? 'SHOW FOR 7 DAYS' : `SHOW FOR ${total} DAYS`;
}

function displayDailyForecast() {
    removeGeneratedDays();
    dailyExpanded = false;
    refreshDailyForecast();
    updateShowDaysLink();
}

function toggleDailyForecast() {

    dailyExpanded = !dailyExpanded;
    const row = document.querySelector('#weekly-forecast-body tr');

    if ( dailyExpanded ) {
        const total = weatherData.daily.time.length;
        for ( let i = 7 ; i < total ; i++ ) {
            row.appendChild(buildDayCard(i));
        }
    } else {
        removeGeneratedDays();
    }

    updateShowDaysLink();

}

// display daily forecast on UI

//****************************************************************************

// show more days link

const showDaysLink = document.querySelector('.weekly-forecast-section nav a');
showDaysLink.addEventListener('click', e => {
    e.preventDefault();
    toggleDailyForecast();
});

// show more days link

//****************************************************************************

// loading & error states

const weatherStatusIds = [
    'current-date-time', 'current-temp', 'feels-like-temp', 'weather-description',
    'sunrise-time', 'sunset-time', 'wind-speed', 'humidity', 'pressure', 'precipitation-prob'
];

function clearWeatherUI() {

    weatherStatusIds.forEach( id => {
        document.getElementById(id).textContent = '';
    });

    document.querySelectorAll('#hourly-forecast-body .deg, #hourly-forecast-body .time').forEach( el => {
        el.textContent = '';
    });

    document.querySelectorAll('#hourly-forecast-body img').forEach( img => {
        img.removeAttribute('src');
        img.alt = '';
    });

    document.querySelectorAll('#weekly-forecast-body td').forEach( td => {

        td.querySelector('.day').textContent = '';
        td.querySelector('.date').textContent = '';
        td.querySelector('.min span').textContent = '';
        td.querySelector('.max span').textContent = '';
        td.querySelector('.state').textContent = '';

        const img = td.querySelector('img');
        img.removeAttribute('src');
        img.alt = '';

    });

}

function setLoadingState() {
    clearWeatherUI();
    document.getElementById('weather-description').textContent = 'Loading...';
}

function showErrorState(message) {
    document.getElementById('weather-description').textContent = message;
}

// loading & error states

//****************************************************************************

// storage (localStorage & sessionStorage)

const STORAGE_KEYS = {
    unit: 'climo:unit',
    lastLocation: 'climo:lastLocation',
    weatherCache: 'climo:weatherCache'
};
const WEATHER_CACHE_TTL = 15 * 60 * 1000;   // 15 minutes

function storageGet( store , key ) {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : null;
}
function storageSet( store , key , value ) {
    store.setItem( key, JSON.stringify(value) );
}
function storageRemove( store , key ) {
    store.removeItem(key);
}

// unit (localStorage)
function restoreUnit() {
    const savedUnit = storageGet( localStorage , STORAGE_KEYS.unit );
    if (savedUnit === 'fahrenheit') {
        setTempUnit('fahrenheit');
    }
}

// last location (localStorage)
function saveLastLocation() {
    storageSet( localStorage , STORAGE_KEYS.lastLocation , {
        continent: chosenContinent,
        country: chosenCountry,
        city: chosenCity,
        region: regionNameSpan.textContent,
        latitude: fullAddress.latitude,
        longitude: fullAddress.longitude
    });
}
function restoreLastLocation() {

    const saved = storageGet(localStorage, STORAGE_KEYS.lastLocation);
    if (!saved || !saved.latitude || !saved.longitude) {
        return false;
    }

    chosenContinent = saved.continent;
    chosenCountry = saved.country;
    chosenCity = saved.city;

    fullAddress = {
        continent: saved.continent,
        country: saved.country.name,
        city: saved.city,
        latitude: saved.latitude,
        longitude: saved.longitude
    };

    lis.forEach( li => {
        li.classList.toggle('active-li', li.textContent.trim() === chosenContinent);
    });

    searchCountryInput.value = chosenCountry.name.toLowerCase();
    citySearchInput.value = chosenCity.toLowerCase();
    cityNameSpan.textContent = chosenCity;
    regionNameSpan.textContent = saved.region || chosenCountry.name;

    filterCountries(chosenContinent);
    displayCountries(filterdCountries);

    return true;
}

// weather cache (sessionStorage, TTL 15 min)
function saveWeatherCache() {
    storageSet(sessionStorage, STORAGE_KEYS.weatherCache, {
        latitude: fullAddress.latitude,
        longitude: fullAddress.longitude,
        fetchedAt: Date.now(),
        data: weatherData
    });
}
function restoreWeatherCache() {

    const cache = storageGet(sessionStorage, STORAGE_KEYS.weatherCache);

    if (!cache || !cache.data) {
        return false;
    }

    if (cache.latitude !== fullAddress.latitude || cache.longitude !== fullAddress.longitude) {
        return false;
    }

    if (Date.now() - cache.fetchedAt > WEATHER_CACHE_TTL) {
        return false;
    }

    weatherData = cache.data;
    return true;
}

// storage

//****************************************************************************

// app init (hydration on load)

function initApp() {

    restoreUnit();
    const hasLocation = restoreLastLocation();

    if (!hasLocation) {
        detectMyLocation();
        return;
    }

    if (restoreWeatherCache()) {
        displayCurrentWeather();
        displayHourlyWeather();
        displayDailyForecast();
    } else {
        getWeather();
    }

}

initApp();

// app init

//****************************************************************************

// detect user location on first open

async function reverseGeocode( lat , lng ) {
    const response = await fetch(`https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=ahmed_elboraey`);
    if (!response.ok) {
        throw new Error(`Reverse geocode response was not ok: ${response.status}`);
    }

    const data = await response.json();
    if (!data.geonames || !data.geonames.length) {
        return null;
    }
    return data.geonames[0];
}

function applyDetectedLocation( place , latitude , longitude ) {

    const countryCode = place.countryCode.trim();
    const continentEntry = countriesData.find( entry =>
        entry.countries.some( c => c.code.trim() === countryCode )
    );
    if (!continentEntry) {
        console.warn('Country not in countries-data:', countryCode);
        return false;
    }
    const country = continentEntry.countries.find( c => c.code.trim() === countryCode );

    chosenContinent = continentEntry.continent.trim();
    chosenCountry = country;
    chosenCity = place.name || place.toponymName || '';
    fullAddress = {
        continent: chosenContinent,
        country: country.name,
        city: chosenCity,
        latitude: latitude,
        longitude: longitude
    };

    lis.forEach( li => {
        li.classList.toggle('active-li', li.textContent.trim() === chosenContinent);
    });

    searchCountryInput.value = country.name.toLowerCase();
    citySearchInput.value = chosenCity.toLowerCase();
    cityNameSpan.textContent = chosenCity;
    regionNameSpan.textContent = place.adminName1 || country.name;

    filterCountries(chosenContinent);
    displayCountries(filterdCountries);

    return true;
}

function detectMyLocation() {

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const place = await reverseGeocode(latitude, longitude);
                if (!place) {
                    return;
                }

                const applied = applyDetectedLocation( place , latitude , longitude );
                if (!applied) {
                    return;
                }

                saveLastLocation();
                getWeather();

            } catch (error) {
                console.error('Error detecting location:', error);
            }
        },
        (error) => {
            console.warn('Geolocation denied or unavailable:', error.message);
        },
        { timeout: 8000, maximumAge: 600000 }
    );
}

// detect user location

//****************************************************************************