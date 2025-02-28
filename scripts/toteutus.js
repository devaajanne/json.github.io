function naytaToteutusData(data) {

  // Tuodaan dataa JSON-tiedostosta
  document.getElementById("kuva").src = data.kuva;
  document.getElementById("nimi").textContent = data.nimi;

  let kestoJaAika = `Ajankohta: ${data.toteutus_alkaa}-${data.toteutus_loppuu} (${data.kesto_viikkoina} viikkoa)`;
  document.getElementById("kesto").textContent = kestoJaAika;

  document.getElementById("osallistujia").textContent = `Osallistujia: ${data.osallistuja_lkm}`;

  // Käydään läpi osallistuja lista ja muutetaan HTML-listaksi
  let osallistujat = "<ul>";
  for (let i = 0; i < Object.keys(data.osallistujat).length; i++) {
    osallistujat += `<li>${data.osallistujat[i].etunimi} ${data.osallistujat[i].sukunimi}</li>`;
  }
  osallistujat += "</ul>";

  // Esitetään data oikeassa kohtaa sivua
  document.getElementById("osallistujat").innerHTML = osallistujat;
}

function haeToteutusData() {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  const URL = "https://devaajanne.github.io/json.github.io/json/toteutus.json";

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään naytaData-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      naytaToteutusData(responseJSON);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      document.getElementById("toteutusVirhe").innerHTML = "<h1 class='text-center'>Tietoa ei pystytä hakemaan</h1>";
    });
}
