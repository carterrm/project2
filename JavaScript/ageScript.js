document.getElementById("nameSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const inputName = document.getElementById("nameInput").value;
    if (inputName === "")
      return;
    console.log(inputName);
    const url = "https://api.agify.io?name=" + inputName + "&country_id=US";
    //Get Current Weather from CurrencyConverter
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      //start formatting the results from the JSON
      let results = "";
      results += "<p id=nameResults>We estimate that someone named " + json.name + " will be " + json.age + " years old. <br/> We estimate that there are " + json.count + " people by that name in the USA.</p>"
    let resultsElement = document.getElementById("api-results");
    resultsElement.innerHTML = results;
    });
    //Load whether it's safe to train

  });

