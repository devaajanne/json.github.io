function naytaSaaData(data) {
  let saaTiedot = '<div class="card-body"><h2>' + data.name + "</h2><ul>";
  saaTiedot += "<li>Sää: " + data.weather[0].description + "</li>";
  saaTiedot += "<li>Lämpötila: " + data.main.temp + " °C</li>";
  saaTiedot += "<li>Tuulen nopeus: " + data.wind.speed + " m/s</li></ul>";
  saaTiedot += "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'></div>";

  // Tässä määritetään json-datan perusteella mihin HTML-elementtiin saadut tiedot sijoitetaan
  let HTMLid = (data.name + "saa").toLowerCase();

  document.getElementById(HTMLid).innerHTML = saaTiedot;
}

function haeSaaData(lat, lon) {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä säädata
  const APIKEY = "665ecd56dfc08dbb50feb8b8f5034e28";
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKEY +
    "&units=metric&lang=fi";

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään naytaData-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      naytaSaaData(responseJSON);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      document.getElementById("virhe").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
}
