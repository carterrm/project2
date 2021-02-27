document.getElementById("currencyConversionSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("dollarAmountInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=6c39395eabf536bc7712bce6958bc822";
    //Get Current Weather from OpenWeatherMap
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let windConditions = ""
      //start formatting the results from the JSON
      let results = "";
      results += '<div id="current-weather"><h2 id="stuff">Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
      json.wind.speed = (json.wind.speed * 0.868976).toFixed(2);
      if(json.wind.speed < 15) {
          windConditions = "Winds calm- safe to fly";
      }
      else if(json.wind.speed < 30) {
        windConditions = "Strong winds- exercise caution";
      }
      else {
          windConditions = "Strong winds- takeoff & landing dangerous. Flying not recommended.";
      }
        results += json.weather[i].description
      for (let i=0; i < json.weather.length; i++) {
	      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" class = "icon"/>';
      }
      results += '<p>' + json.main.temp + " &deg;F</p>"
      results += "Wind " + json.wind.speed + " kts @ " + json.wind.deg + "&deg;<br/><br/>";
      results += windConditions +"<br/><br/>";
      if(json.main.pressure < 1000) {
          results += "Low pressure- expect longer takeoff roll";
      }
      else if (json.main.pressure < 1027.5) {
          results += "Pressure is normal"
      }
      else {
          results += "High pressure present- expect more responsive controls"
      }
      results += "<p>"
	    if (i !== json.weather.length - 1)
	    results += ", "
      }
      results += "</p></div>";

    let resultsElement = document.getElementById("weatherResults");
    resultsElement.innerHTML = results;
    });
    //Load whether it's safe to train

    //Get Forecast from OpenWeatherMap
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=6c39395eabf536bc7712bce6958bc822";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      //Start formatting all the forecasts
      let forecast = "<div id=all-forecasts><h3 id=five-day-forecast>Five-Day Forecast</h3>";
      for (let i=0; i < json.list.length; i++) {
	forecast += "<div class='forecast-block'><h2 class='forecast-date'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
	forecast += "<p>Temperature: " + json.list[i].main.temp + "<br/>Conditions: " + json.list[i].weather[0].description + "<br/>";
    forecast += "Wind " + json.list[i].wind.speed + " kts @ " + json.list[i].wind.deg + "&deg;<br/>";
	json.list[i].wind.speed = (json.list[i].wind.speed * 0.868976).toFixed(2);
    windConditions = "";
    if(json.list[i].wind.speed < 15) {
        windConditions = "Winds calm- safe to fly";
    }
    else if(json.list[i].wind.speed < 30) {
      windConditions = "Strong winds- exercise caution";
    }
    else {
        windConditions = "Strong winds- takeoff & landing dangerous. Flying not recommended.";
    }
    forecast += windConditions + "<br/>"
    if(json.list[i].main.pressure < 1000) {
        forecast += "Low pressure- expect longer takeoff roll";
    }
    else if (json.list[i].main.pressure < 1027.5) {
        forecast += "Pressure is normal"
    }
    else {
        forecast += "High pressure present- expect more responsive controls"
    }
    forecast += " </p></div>"
      }
      forecast += "</div>"
      document.getElementById("forecastResults").innerHTML = forecast;
    });
  });

