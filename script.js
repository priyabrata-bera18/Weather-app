// // const api='d10a0fbefe4e5b2acb7bab3d938dd552';

// const url='https://api.openweathermap.org/data/3.0/lat=33.44&lon=-94.04&exclude=hourly,daily&appid=d10a0fbefe4e5b2acb7bab3d938dd552'

// const weathereffect=(condition)=>{

// }

// const result = document.getElementById("result");
// const loader = document.getElementById("loader");

// function showLoader() {
//   loader.style.display = "block";
//   result.innerHTML = "";
// }

// function hideLoader() {
//   loader.style.display = "none";
// }

// async function getWeather() {
//   const city = document.getElementById("cityInput").value;
//   if (!city) return result.innerHTML = "Enter city name!";

//   showLoader();

//   try {
//     // Get Coordinates
//     const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
//     const geoData = await geoRes.json();

//     if (!geoData.results) {
//       hideLoader();
//       return result.innerHTML = "City not found!";
//     }

//     const { latitude, longitude, name, country } = geoData.results[0];

//     // Weather + Daily data
//     const weatherRes = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
//     );

//     const data = await weatherRes.json();
//     const cw = data.current_weather;
//     const hour = new Date().getHours();
//     const humidity = data.hourly.relativehumidity_2m[hour];

//     const icon = getIcon(cw.weathercode, hour);
//     changeBackground(cw.weathercode, hour);
//     hideLoader();

//     const sunrise = data.daily.sunrise[0].split("T")[1];
//     const sunset = data.daily.sunset[0].split("T")[1];

//     result.innerHTML = `
//       <h3>${name}, ${country}</h3>
//       <div class="icon"><img src="icons/${icon}"></div>
//       <p>Temperature: ${cw.temperature} °C</p>
//       <p>Humidity: ${humidity} %</p>
//       <p>Wind: ${cw.windspeed} km/h</p>
//       <p>Sunrise: ${sunrise}</p>
//       <p>Sunset: ${sunset}</p>
//       <div class="forecast"></div>
//     `;

//     showForecast(data.daily);

//   } catch (e) {
//     hideLoader();
//     result.innerHTML = "Something went wrong.";
//   }
// }

// function getIcon(code, hour) {
//     const night = hour < 6 || hour > 18;

//     if (code === 0) {
//         return night ? "moon-and-stars.png" : "sunny.png";
//     }
//     if (code <= 3) {
//         return "cloudy-day.png";
//     }
//     if (code <= 55) {
//         return "heavy-rain.png";
//     }
//     if (code <= 65) {
//         return "heavy-rain.png";
//     }
//     if (code <= 75) {
//         return "snowflake.png";
//     }
//     if (code <= 95) {
//         return "storm.png";
//     }

//     return "cloudy-day.png";
// }

// function showForecast(daily) {
//   const container = document.querySelector(".forecast");
//   container.innerHTML = "";

//   for (let i = 0; i < 7; i++) {
//     const max = daily.temperature_2m_max[i];
//     const min = daily.temperature_2m_min[i];

//     const card = document.createElement("div");
//     card.className = "card";
//     card.innerHTML = `
//       <p>${max}°</p>
//       <p>${min}°</p>
//     `;
//     container.appendChild(card);
//   }
// }

// function changeBackground(code, hour) {
//   const night = hour < 6 || hour > 18;

//   if (night) {
//     document.body.style.background = "linear-gradient(#0D1A4D, #203A8F)";
//     return;
//   }

//   if (code === 0) {
//     document.body.style.background = "linear-gradient(#4DA7FF, #74D8FF)";
//   } else if (code <= 3) {
//     document.body.style.background = "linear-gradient(#6E88B1, #9FB8DE)";
//   } else if (code <= 55) {
//     document.body.style.background = "linear-gradient(#46627A, #7A9AB8)";
//   } else {
//     document.body.style.background = "linear-gradient(#1D1E22, #394049)";
//   }
// }

function UpdateDateTime() {
  const date = new Date();

  let mint = date.getMinutes();
  let hrs = date.getHours();
  let ampm = hrs >= 12 ? "PM" : "AM";

  let formattedHrs = hrs % 12 || 12;
  mint = mint < 10 ? "0" + mint : mint;

  document.getElementById(
    "cur_time"
  ).innerText = `${formattedHrs}:${mint} ${ampm}`;

  const options = { day: "numeric", month: "long", year: "numeric" };
  document.getElementById("cur_date").innerText = date.toLocaleDateString(
    "en-IN",
    options
  );

  let realHour = hrs; // 24-hour format

  let greet = "";
  if (realHour >= 5 && realHour < 12) {
    greet = "It's Morning Now";
  } else if (realHour >= 12 && realHour < 17) {
    greet = "It's Afternoon Now";
  } else if (realHour >= 17 && realHour < 20) {
    greet = "It's Evening Now";
  } else {
    greet = "It's Night Now";
  }

  document.getElementById("greet").innerText = greet;
}

setInterval(UpdateDateTime, 1000);
UpdateDateTime();

const getWeather = async () => {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Enter city name!");
        return;
    }

    try {
        const geoData = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const geoRes = await geoData.json();

        if (!geoRes.results || geoRes.results.length === 0) {
            alert("City not found!");
            return;
        }

        const { latitude, longitude, name, country } = geoRes.results[0];

        // Get weather data
     const weatherDataRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
);



        const weatherData = await weatherDataRes.json();
        const cw = weatherData.current_weather;
        const hour = new Date().getHours();
        const humidity = weatherData.hourly.relativehumidity_2m[hour];

        // Update UI
        document.getElementById("location").innerText = `${name}, ${country}`;
        document.getElementById("temperature").innerText = `${cw.temperature}°C`;
        document.getElementById("details").innerText = `Humidity: ${humidity}% | Wind: ${cw.windspeed} km/h`;

        const icon = getIcon(cw.weathercode, hour);
        document.getElementById("weatherIcon").src = `icons/${icon}`;

        updateHourlyForecast(weatherData.hourly);
        updateWeeklyForecast(weatherData.daily);
        changeBackground(cw.weathercode, hour);
    } catch (err) {
        alert("Something went wrong! Check console.");
        console.log(err);
    }

    
};

const getIcon = (code, hour) => {
    const night = hour < 6 || hour > 18;

    if (code === 0) {
        return night ? "moon-and-stars.png" : "sunny.png";
    }
    if (code <= 3) {
        return "cloudy-day.png";
    }
    if (code <= 55) {
        return "heavy-rain.png";
    }
    if (code <= 65) {
        return "heavy-rain.png";
    }
    if (code <= 75) {
        return "snowflake.png";
    }
    if (code <= 95) {
        return "storm.png";
    }
    return "cloudy-day.png";

}

function updateHourlyForecast(hourly) {
    const container = document.getElementById("hourly");
    container.innerHTML = "";

    const now = new Date();
    const currentHour = now.getHours();

    for (let i = 1; i <= 6; i++) {
        const index = currentHour + i;

        const temp = hourly.temperature_2m[index];
        const code = hourly.weathercode[index];
        const hour = (currentHour + i) % 24;
        const icon = getIcon(code, hour);

        const timeText = hour === 0 ? "12 AM" :
                         hour < 12 ? `${hour} AM` :
                         hour === 12 ? `12 PM` :
                         `${hour - 12} PM`;

        const div = document.createElement("div");
        div.className = "hour-box";
        div.innerHTML = `
            <p>${timeText}</p>
            <img src="icons/${icon}" width="35">
            <p>${temp}°C</p>
        `;
        container.appendChild(div);
    }
}

function updateWeeklyForecast(daily) {
    const container = document.getElementById("weekly");
    container.innerHTML = "";

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(daily.time[i]);
        const dayName = days[date.getDay()];

        const max = Math.round(daily.temperature_2m_max[i]);
        const min = Math.round(daily.temperature_2m_min[i]);

        const code = daily.weathercode[i];
        const icon = getIcon(code, 12); // Use daytime icon

        const div = document.createElement("div");
        div.className = "week-box";
        div.innerHTML = `
            <p>${dayName}</p>
            <img src="icons/${icon}" width="40">
            <p>${max}°/${min}°</p>
        `;
        container.appendChild(div);
    }
}

function changeBackground(code, hour) {
    const night = hour < 6 || hour > 18;

    if (night) {
        document.body.style.background = "linear-gradient(#00162E, #00346B)";
        return;
    }

    if (code === 0) {
        // Clear Sky
        document.body.style.background = "linear-gradient(#61B5FF, #A6E0FF)";
    }
    else if (code <= 3) {
        // Clouds
        document.body.style.background = "linear-gradient(#6A7FA6, #9DB8D9)";
    }
    else if (code <= 55) {
        // Rain / drizzle
        document.body.style.background = "linear-gradient(#374A5A, #708B9E)";
    }
    else if (code <= 75) {
        // Snow
        document.body.style.background = "linear-gradient(#B8DAF2, #E8F8FF)";
    }
    else if (code <= 95) {
        // Storm
        document.body.style.background = "linear-gradient(#3A3D40, #60656B)";
    }
    else {
        // Default fallback
        document.body.style.background = "linear-gradient(#4D79FF, #71C9F8)";
    }
}
