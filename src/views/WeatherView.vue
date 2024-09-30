<template>
    <div class="container">
        <div class="header">
            <h1>WEAThER APP</h1>
            <div class="search-bar">
                <input
                    type="text"
                    v-model="city"
                    palceholder="Enter city name"
                    class="serach-input"
                />
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>
    </div>
    <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->  
      <main>
        <!--If there are no data returned, then skip rendering the information-->  
        <div v-if="weatherData">
          <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->  
          <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->  
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
</template>

<script setup>
    import axios from "axios";
    import { ref, onMounted, computed } from 'vue';
    const apikey = "68f0bf78fc8d6c07f6fe1578c481765c";
    const city = ref('');
    const weatherData = ref(null);
    const locationData = ref(null);
    const hourlyForecast = ref([]);
    const dailyForecast = ref([]);
    onMounted( () => {
        // FetchCurrentLocationWeather();
    });

    const temperature = computed(() => {
        return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null;
    });

    const iconUrl = computed(() => {
        return weatherData.value ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`: null;
    })
    
    const FetchCurrentLocationWeather = async () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords;
                const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                await fetchWeatherData(url);
            })
        }
    }
    const fetchWeatherData = async (url) => {
        try {
            const response = await axios.get(url);
            weatherData.value = response.data;
            console.log(weatherData.value)
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    }

    const searchByCity = async () => {
        const geocodingURl = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apikey}`
        await fetchLocationData(geocodingURl);
        if (locationData.value.length > 0)
        {
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.value[0].lat}&lon=${locationData.value[0].lon}&appid=${apikey}`;
            await fetchWeatherData(url);
        }else{
            console.log("No location found")
        }
    }

    const fetchLocationData = async (url) => {
        try {
            const response = await axios.get(url);
            locationData.value = response.data;
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    }
</script>