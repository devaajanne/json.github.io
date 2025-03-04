function naytaTapahtumaData(data) {
  // Etsitään data JSON-tiedostosta
  let teksti = "<h1 class='text-center'>Tampereella tapahtuu</h1>";
  for (let i = 0; i < data.length; i++) {
    teksti += `<h3>${data[i].title}</h3>`;
    teksti += `<p>${data[i].description}</p>`;
    teksti += `<p><a href=${data[i].url}>${data[i].url}</a></p>`;
  }
  // Esitetään data oikeassa kohtaa sivua
  document.getElementById("tapahtumat").innerHTML = teksti;
}

function haeTapahtumaData() {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  const URL = "https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi";

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
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
      document.getElementById("tapahtumatVirhe").innerHTML = "<h1 class='text-center'>Tietoa ei pystytä hakemaan</h1>";
    });
}
