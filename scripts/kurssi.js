function naytaKurssiData(data) {
  document.getElementById("otsikko").textContent = data.otsikko;
  document.getElementById("kuvaus").textContent = data.kuvaus;
  document.getElementById("kuva").src = data.kuva;

  let opintojaksonTiedot = "<h2>Opintojakson tiedot:</h2>";
  opintojaksonTiedot += "<ul>";
  opintojaksonTiedot += `<li>Nimi: ${data.opintojakso.nimi}</li>`;
  opintojaksonTiedot += `<li>Tunnus: ${data.opintojakso.tunnus}</li>`;
  opintojaksonTiedot += `<li>Tunnus: ${data.opintojakso.opintopisteet}</li>`;
  opintojaksonTiedot += "</ul>";
  opintojaksonTiedot += document.getElementById("opintojakso").innerHTML = opintojaksonTiedot;

  // Alustetaan taulukko ja iteroidaan data siihen JSON-tiedostosta
  let sisaltoJaTekniikatHTML = "<h2>Tekniikat</h2>";
  sisaltoJaTekniikatHTML += "<table class='table table-hover'>";
  sisaltoJaTekniikatHTML += "<tr>";
  sisaltoJaTekniikatHTML += "<th>Viikko</th>";
  sisaltoJaTekniikatHTML += "<th>Aihe</th>";
  sisaltoJaTekniikatHTML += "<th>Tekniikka</th>";
  sisaltoJaTekniikatHTML += "<th>Linkki</th>";
  sisaltoJaTekniikatHTML += "</tr>";

  for (let i = 0; i < Object.keys(data.opintojakso.tekniikat).length; i++) {
    sisaltoJaTekniikatHTML += "<tr>";
    sisaltoJaTekniikatHTML += `<td>${i}</td>`;
    sisaltoJaTekniikatHTML += `<td>${data.opintojakso.sisalto[i]}</td>`;
    sisaltoJaTekniikatHTML += `<td>${data.opintojakso.tekniikat[i].aihe}</td>`;
    sisaltoJaTekniikatHTML += `<td><a href=${data.opintojakso.tekniikat[i].linkki}>${data.opintojakso.tekniikat[i].linkki}</a></td>`;
    sisaltoJaTekniikatHTML += "</tr>";
  }
  sisaltoJaTekniikatHTML += "</table>";

  // Esitetään data ja taulukko oikeassa kohtaa sivua
  document.getElementById("sisaltojatekniikat").innerHTML = sisaltoJaTekniikatHTML;
}

function haeKurssiData() {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  const URL = "https://devaajanne.github.io/json.github.io/json/kurssi.json";

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään naytaData-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      naytaKurssiData(responseJSON);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      document.getElementById("kurssiVirhe").innerHTML = "<h1 class='text-center'>Tietoa ei pystytä hakemaan</h1>";
    });
}
