function kerro() {
  fetch("Tähän edellisessä kohdassa kopioimasi linkki")
    // Muunnetaan vastaus JSON muotoon

    .then(function (response) {
      return response.json();
    })

    //Käsitellään muunnettu (eli JSON muotoinen) vastaus

    // Kutsutaan funktiota kerro()ja välitetään sille json-vastaus
    .then(function (responseJson) {
      kerro(responseJson);
    })

    // Jos tuli jokin virhe

    .catch(function (error) {
      document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
}
