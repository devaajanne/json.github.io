function naytaLiikennekameraData(data) {
  let liikennekamerakuvat = "";

  for (i = 0; i < data.presets.length; i++) {
    liikennekamerakuvat += "<h4>" + data.presets[i].measuredTime + "</h4>";
    liikennekamerakuvat += "<img src='https://weathercam.digitraffic.fi/" + data.presets[i].id + ".jpg'>";
  }

  document.getElementById("liikennekamerat").innerHTML = liikennekamerakuvat;
}

function haeLiikennekameraData(stationID) {
  const URL = "https://tie.digitraffic.fi/api/weathercam/v1/stations/" + stationID + "/data";
  console.log(URL);

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään naytaData-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      naytaLiikennekameraData(responseJSON);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      document.getElementById("virhe").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
}
