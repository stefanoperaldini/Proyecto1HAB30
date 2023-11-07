"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("flight-search-form");
  const errorMessage = document.getElementById("error-message");
  const resultDiv = document.getElementById("flight-result");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");

    const originValue = originInput.value.trim();
    const destinationValue = destinationInput.value.trim();

    const uppercaseRegex = /^[A-Z]{3}$/;

    if (!uppercaseRegex.test(originValue) || !uppercaseRegex.test(destinationValue)) {
      errorMessage.textContent = "¡¡¡Los campos de origen y destino deben tener exactamente 3 letras mayúsculas!!!";
    } else {
      errorMessage.textContent = "";
      document.getElementById("loading-message").style.display = "block";

      // Continúa con la búsqueda de vuelos aquí
      const token = await getAmadeusToken("vFAgjkG4GNw4o8as9aSdlqhYHWvbFt9s", "GNNN7muQQqXqLjRz");
      const passengers = 1;
      const departureDate = tomorrow();
      
      searchFlights(token, originValue, destinationValue, departureDate, passengers);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const resultDiv = document.getElementById("flight-result");

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", function () {
    resultDiv.classList.add("hidden");
    document.getElementById("error-message").textContent = "";
  });
});

async function searchFlights(token, origin, destination, departureDate, passengers) {
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${passengers}&nonStop=false&max=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });

    if (!response.ok) {
      document.getElementById("error-message").textContent = "Error al obtener el vuelo";
      return;
    }

    const datosVuelo = await response.json();

    if (datosVuelo.data === 0) {
      document.getElementById("error-message").textContent = "No se han encontrado ningún vuelo";
      return;
    }

    const vueloBarato = datosVuelo.data[0];
    
    document.getElementById("flight-origin").textContent = origin;
    document.getElementById("flight-destination").textContent = destination;
    document.getElementById("flight-departure").textContent = vueloBarato.itineraries[0].segments[0].departure.at;
    document.getElementById("flight-arrival").textContent = vueloBarato.itineraries[0].segments[0].arrival.at;
    document.getElementById("flight-airline").textContent = vueloBarato.itineraries[0].segments[0].carrierCode;
    document.getElementById("flight-price").textContent = vueloBarato.price.total;
    document.getElementById("flight-currency").textContent = vueloBarato.price.currency;

    document.getElementById("loading-message").style.display = "none";
    document.getElementById("flight-result").classList.remove("hidden");
  } catch (error) {
    console.error("Error:", error);
  }
}

function tomorrow() {
  const actualDate = new Date();
  const day = actualDate.getDate() + 1;
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();

  const departureDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
  return departureDate;
}

async function getAmadeusToken(clientId, clientSecret) {
  try {
    const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!response.ok) {
      throw new Error("Error al obtener el token de Amadeus");
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};
