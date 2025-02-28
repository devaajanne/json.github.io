function naytaTapahtumaData(data) {
  var teksti = "<h1>Tampereella tapahtuu</h1>";
  for (var i = 0; i < data.length; i++) {
    teksti += `<h3>${data[i].title}</h3>`;
    teksti += `<p>${data[i].description}</p>`;
    teksti += `<p><a href=${data[i].url}>${data[i].url}</a></p>`;
  }
  document.getElementById("tapahtumat").innerHTML = teksti;
}

function haeTapahtumaData() {
  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch("https://api.visittampere.com/api/v1/visittampere/event/published/all/?for mat=json&lang=fi")
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään naytaData-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      naytaTapahtumaData(responseJSON);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      document.getElementById("virhe").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
}
