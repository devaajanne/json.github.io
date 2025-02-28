function naytaKurssiData(data) {
  document.getElementById("otsikko").textContent = data.otsikko;
  document.getElementById("kuvaus").textContent = data.kuvaus;
  document.getElementById("kuva").src = data.kuva;

  let opintojaksonTiedot = "<h2>Opintojakson tiedot:</h2><ul>";
  opintojaksonTiedot += `<li>Nimi: ${data.opintojakso.nimi}</li>`;
  opintojaksonTiedot += `<li>Tunnus: ${data.opintojakso.tunnus}</li>`;
  opintojaksonTiedot += `<li>Tunnus: ${data.opintojakso.opintopisteet}</li></ul>`;
  document.getElementById("opintojakso").innerHTML = opintojaksonTiedot;

  let sisaltoJaTekniikatHTML = "<h2>Tekniikat</h2><table class='table table-hover'>";
  sisaltoJaTekniikatHTML += "<tr><th>Viikko</th><th>Aihe</th><th>Tekniikka</th><th>Linkki</th></tr>";
  for (let i = 0; i < Object.keys(data.opintojakso.tekniikat).length; i++) {
    sisaltoJaTekniikatHTML += "<tr>";
    sisaltoJaTekniikatHTML += `<td>${i}</td>`;
    sisaltoJaTekniikatHTML += `<td>${data.opintojakso.sisalto[i]}</td>`;
    sisaltoJaTekniikatHTML += `<td>${data.opintojakso.tekniikat[i].aihe}</td>`;
    sisaltoJaTekniikatHTML += `<td><a href=${data.opintojakso.tekniikat[i].linkki}>${data.opintojakso.tekniikat[i].linkki}</a></td></tr>`;
  }
  sisaltoJaTekniikatHTML += "</table>";
  document.getElementById("sisaltojatekniikat").innerHTML = sisaltoJaTekniikatHTML;
}

function haeKurssiData() {
  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch("https://devaajanne.github.io/json.github.io/json/kurssi.json")
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
      document.getElementById("virhe").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
}
