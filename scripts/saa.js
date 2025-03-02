function naytaSaaData(data) {
  // Etsitään OpenWeatherMapista oikea ikoni säädatalle
  let iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  // Luodaan sääkortit JSON-datan pohjalta
  let saaTiedot = '<div class="card-body">';
  saaTiedot += `<h2>${data.name}</h2>`;
  saaTiedot += "<ul>";
  saaTiedot += `<li>Sää: ${data.weather[0].description}</li>`;
  saaTiedot += `<li>Lämpötila: ${data.main.temp} °C</li>`;
  saaTiedot += `<li>Tuulen nopeus: ${data.wind.speed} m/s</li>`;
  saaTiedot += "</ul>";
  saaTiedot += `<img src=${iconURL}>`;
  saaTiedot += "</div>";

  // Tässä määritetään JSON-datan perusteella mihin HTML-elementtiin saadut tiedot sijoitetaan
  let HTMLid = `${data.name}saa`.toLowerCase(); // -> helsinkisaa, tamperesaa, oulusaa

  // Esitetään data ja säätiedot oikeissa korteissa
  document.getElementById(HTMLid).innerHTML = saaTiedot;
}

// Tämä funktio esittää tämän päivän päivämäärän
function naytaPaiva() {
  const date = new Date();
  let paiva = `<h2 class="text-center">Päivän sää ${dayjs(date).format("D.M.YYYY")}</h2>`;
  document.getElementById("paiva").innerHTML = paiva;
}

function haeSaaData(lat, lon) {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  const APIKEY = "665ecd56dfc08dbb50feb8b8f5034e28";
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&lang=fi`;

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
      document.getElementById("saaVirhe").innerHTML = "<h1 class='text-center'>Tietoa ei pystytä hakemaan</h1>";
    });
}
