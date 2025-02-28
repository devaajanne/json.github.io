function naytaJunaData(data) {
  let paivamaara = data[0].departureDate;
  let junaTaulukko = `<h2>${dayjs(paivamaara).format("DD.M.YYYY")} lähtevät junat</h2>`;
  junaTaulukko +=
    "<table class='table table-hover'><thead><tr><th>Juna</th><th>Lähtöpaikka</th><th>Lähtöaika</th><th>Kohde</th><th>Saapumisaika</th></tr></thead>";
  junaTaulukko += "<tbody>";
  for (let i = 0; i < data.length; i++) {
    if (data[i].departureDate === paivamaara) {
      for (let j = 0; j < data[i].timeTableRows.length; j++) {
        if (data[i].timeTableRows[j].stationShortCode === "HKI" && data[i].timeTableRows[j].type === "DEPARTURE") {
          junaTaulukko += "<tr>";
          junaTaulukko += `<td>${data[i].trainNumber}</td>`;
          junaTaulukko += `<td>Helsinki</td>`;
          junaTaulukko += `<td>${dayjs(data[i].timeTableRows[j].scheduledTime).format("HH.mm")}</td>`;
        }
        if (data[i].timeTableRows[j].stationShortCode === "TPE" && data[i].timeTableRows[j].type === "ARRIVAL") {
          junaTaulukko += `<td>Tampere</td>`;
          junaTaulukko += `<td>${dayjs(data[i].timeTableRows[j].scheduledTime).format("HH.mm")}</td>`;
          junaTaulukko += "</tr>";
        }
      }
    }
  }
  junaTaulukko += "</tbody></table>";
  document.getElementById("junataulukko").innerHTML = junaTaulukko;
}

function haeJunaData() {
  const URL = "https://rata.digitraffic.fi/api/v1/live-trains/station/HKI/TPE?include_nonstopping=false";
  console.log(URL);

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
      document.getElementById("virhe").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
}
