function naytaJunaData(data) {
  // Päivämäärä muuttujaan ja oikeaan formaattiin
  let paivamaara = data[0].departureDate;
  let junaTaulukko = `<h2>${dayjs(paivamaara).format("D.M.YYYY")} juna-aikataulu Helsinki-Tampere</h2>`;

  // Taulukon alustus
  junaTaulukko += "<table class='table table-hover'><thead><tr>";
  junaTaulukko += "<th>Juna</th>";
  junaTaulukko += "<th>Lähtöpaikka</th>";
  junaTaulukko += "<th>Lähtöaika</th>";
  junaTaulukko += "<th>Kohde</th>";
  junaTaulukko += "<th>Saapumisaika</th>";
  junaTaulukko += "</tr></thead>";
  junaTaulukko += "<tbody>";

  // Iteroidaan JSON data läpi ja sijoitetaan halutut tiedot taulukkoon
  for (let i = 0; i < data.length; i++) {
    if (data[i].departureDate === paivamaara) {
      for (let j = 0; j < data[i].timeTableRows.length; j++) {
        if (data[i].timeTableRows[j].stationShortCode === "HKI" && data[i].timeTableRows[j].type === "DEPARTURE") {
          junaTaulukko += "<tr>";
          // Etsitään kaukojunan numero tai lähijunan kirjain
          if (data[i].trainCategory === "Commuter") {
            junaTaulukko += `<td>${data[i].commuterLineID}</td>`;
          } else {
            junaTaulukko += `<td>${data[i].trainType + data[i].trainNumber}</td>`;
          }
          junaTaulukko += `<td>Helsinki</td>`;
          // Aika oikeaan formaattiin
          junaTaulukko += `<td>${dayjs(data[i].timeTableRows[j].scheduledTime).format("HH.mm")}</td>`;
        }
        if (data[i].timeTableRows[j].stationShortCode === "TPE" && data[i].timeTableRows[j].type === "ARRIVAL") {
          junaTaulukko += `<td>Tampere</td>`;
          // Aika oikeaan formaattiin
          junaTaulukko += `<td>${dayjs(data[i].timeTableRows[j].scheduledTime).format("HH.mm")}</td>`;
          junaTaulukko += "</tr>";
        }
      }
    }
  }
  junaTaulukko += "</tbody></table>";

  // Esitetään data ja taulukko oikeassa kohtaa sivua
  document.getElementById("junataulukko").innerHTML = junaTaulukko;
}

function haeJunaData() {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  const URL = "https://rata.digitraffic.fi/api/v1/live-trains/station/HKI/TPE?include_nonstopping=false";

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään naytaData-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      naytaJunaData(responseJSON);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      document.getElementById("junatVirhe").innerHTML = "<h1 class='text-center'>Tietoa ei pystytä hakemaan</h1>";
    });
}
