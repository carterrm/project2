document.getElementById("countryNameSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const inputName = document.getElementById("countryNameInput").value;
    if (inputName === "")
      return;
    console.log(inputName);
    const url = "https://covid-api.mmediagroup.fr/v1/cases?country=" + inputName;
    //Get Current Weather from CurrencyConverter
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      //start formatting the results from the JSON
      let results = "";
      results += "<p class='bodyHeader'><br/>In " + json.All.country + ", there have been:</p>"
      results += "<p class='bodyText'>" + json.All.confirmed + " Total Cases, </p>"
      results += "<p class='bodyText'>representing " + ((json.All.confirmed / json.All.population) * 100).toFixed(2) + " % of the population,</p>"
      results += "<p class='bodyText'>and " + json.All.deaths + " Total Deaths, </p>"
      results += "<p class='bodyText'>representing " + ((json.All.deaths / json.All.population) * 100).toFixed(2) + " % of the population.</p>"
    let resultsElement = document.getElementById("api-results");
    resultsElement.innerHTML = results;
    });
    //Load whether it's safe to train

  });

