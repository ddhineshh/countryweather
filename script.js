//////Initialization
let data = []
let content = document.querySelector("#content")


///ASYNC function for multiple use
const getData = async (link) => {
    let response = await fetch(link)
    let resData = response.json()
    return resData
}


//Getting Country Details
getData("https://restcountries.com/v3.1/all")
    .then((e) => {
        data = e
        if (data.length == 0) {
            content.innerHTML = `<div class="alert alert-danger" role = "alert">No Data</div>`
        }
        else {
            putData(data.slice(0, 20))
        }
    })
    .catch((err) => {
        console.log(err.message)
    })


//Fetching Country details to innerHTML
let putData = (resultData) => {
    content.innerHTML = ""
    resultData.map((country) => content.innerHTML +=
        `
        <div class="card mx-3 my-3" style="width: 18rem;">
        <div class="card-header text-center text-white bg-dark">
        ${country.name.common}
        </div>
        <img src="${country.flags.svg}" class="card-img-top border border-secondary">
        <div class="card-body bg-secondary text-white">
            <p class="card-title text-center">Capital : <span id="capital">${country.capital}</span></p>
            <p class="card-title text-center">Region : ${country.region}</p>
            <p class="card-title text-center" >Country Code: ${country.altSpellings[0]}</p>
            <p class="card-title text-center">Lati,Longi: ${country.latlng}</p>
            <br>
            <p class="card-title text-center"><button class="btn btn-primary p-1" onclick="getWeatherData('${country.capital}')">Click for weather</button></p>
            <div id="`+ `${country.capital}` + `"></div>
            
        </div>
        
        </div>`)
}

//Print Country details as default and filtering country while typing
document.querySelector("#input").addEventListener("input", (event) => {
    let resultData = data.filter((country) => country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase()))


    if (resultData.length == 0) {
        content.innerHTML = `<div class="alert alert-danger" role="alert">
            Country Not Found / Wrong User Input
            </div>`
    }
    else {
        putData(resultData)
    }
})

//Fetching weather data
const getWeatherData = async (capital) => {
    console.log(capital)
    let weatherReport = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=536d3fcba3222d9dca4c2e1d06ca2ae6`)
    let res = await weatherReport.json()
    var weatherCard = document.getElementById(capital);
    weatherCard.innerHTML = `<div class="card">
        <div class="card-body bg-danger ">
          <p class="card-text">Temperature : ${res.main.temp}</p>
          <p class="card-text">Windspeed: ${res.wind.speed}</p>
          <p class="card-text">Humidity : ${res.main.humidity}</p>
        </div>
      </div>`

}





