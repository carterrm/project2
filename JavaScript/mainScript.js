document.getElementById("currencyConversionSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const dollarAmount = document.getElementById("dollarAmountInput").value;
    if (dollarAmount === "")
      return;
    console.log(dollarAmount);
    const url = "https://v6.exchangerate-api.com/v6/7423e9c0e9e6ca76650f4ac3/latest/USD";
    //Get Current Weather from CurrencyConverter
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      //start formatting the results from the JSON
      let results = "";
      results += "<div><h3 class='results-header'>" + dollarAmount +  " USD is equal to: \n </h3>"
      results += "<p class = api-results>" + json.conversion_rates.EUR * dollarAmount  + " Euros,<br/>" + json.conversion_rates.DKK * dollarAmount + " Dutch Kroner,\n<br/>"
       + json.conversion_rates.ISK * dollarAmount  + " Icelandic Krona,<br/>& " + json.conversion_rates.JPY * dollarAmount + " Japanese Yen.\n</p></div>"
    let resultsElement = document.getElementById("api-results");
    resultsElement.innerHTML = results;
    });
    //Load whether it's safe to train

    
  });

