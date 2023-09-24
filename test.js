// Main
const backgrounds = [
    "https://cdna.artstation.com/p/assets/images/images/065/297/714/large/iyenss-ac.jpg?1690009374",
    "https://cdnb.artstation.com/p/assets/images/images/066/143/677/large/redeyelobine-highresscreenshot00273-0-00-00-00-2.jpg?1692152346",
    "https://cdna.artstation.com/p/assets/images/images/049/904/706/4k/jose-vega-final-painting.jpg?1653583370",
    "https://images7.alphacoders.com/132/1324688.jpg",
    "https://images5.alphacoders.com/132/1325106.png",
    "https://i.postimg.cc/3rthYnMN/image.png",
]
var idx = randomNumber(0, backgrounds.length)
document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgrounds[idx]})`;

const avatar = [
    "https://i.postimg.cc/cH4tVvSz/image.png",
    "https://media.tenor.com/c9wWA4hrJowAAAAd/armoredcore6.gif",
    "https://media.tenor.com/67ZnooZ3PU0AAAAd/armored-core-armored-core-vi.gif"
]
var idx2 = randomNumber(0, avatar.length)
document.getElementById("avatar").src = `${avatar[idx2]}`;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}
else {
    document.getElementById("Forecast").innerHTML = "Geolocation is not supported by this browser.";
}

// Functions
function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${long}?unitGroup=metric&key=CBSQGUETD89DVU5Q8RX5KG5M2&contentType=json`;
    
    // Calling that async function
    x = getapi(api_url);
    // console.log(x)
    ShowIntel(x)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("Forecast").innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("Forecast").innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            document.getElementById("Forecast").innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("Forecast").innerHTML = "An unknown error occurred."
            break;
    }
}

async function getapi(url) {
    const response = await fetch(url)
    return await response.json()
}

function ShowIntel(promise)
{
    promise.then((user) => 
    {
        document.getElementById("Date").innerHTML = Date().slice(0, 15);
        document.getElementById("Forecast").innerHTML = user.currentConditions.conditions;
        document.getElementById("Temp").innerHTML = "Temp: " + user.currentConditions.temp + "°C";
        document.getElementById("Humidity").innerHTML = "Humidity: " + user.currentConditions.humidity + "%";
    });
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

