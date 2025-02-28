function naytaLiikennekameraData(data) {
  //Etsitää data JSON-tiedostosta
  let liikennekamerakuvat = "<h2>Autolla Tampereelle</h2>";

  // Päivämäärä oikeaan formaattiin
  liikennekamerakuvat += `<h3>Millainen keli siellä on ${dayjs(data.dataUpdatedTime).format("DD.M.YYYY")}?</h3>`;

  for (i = 0; i < data.presets.length; i++) {
    let imgURL = `https://weathercam.digitraffic.fi/${data.presets[i].id}.jpg`;
    // Aika oikeaan formaattiin
    liikennekamerakuvat += `<h4>${dayjs(data.presets[i].measuredTime).format("HH.mm")}</h4>`;
    liikennekamerakuvat += `<img src=${imgURL} class="d-block w-100" style="margin-bottom: 25px;">`;
  }
  // Esitetään data ja kuvat oikeassa kohtaa sivua
  document.getElementById("liikennekamerat").innerHTML = liikennekamerakuvat;
}

function haeLiikennekameraData(stationID) {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  const URL = `https://tie.digitraffic.fi/api/weathercam/v1/stations/${stationID}/data`;

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
      document.getElementById("liikennekameraVirhe").innerHTML =
        "<h1 class='text-center'>Tietoa ei pystytä hakemaan</h1>";
    });
}
