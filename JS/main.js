"use strict";

async function getAmadeusToken(clientId, clientSecret) {
  try {
    // URL de autenticación de Amadeus (puede variar en producción)
    const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!response.ok) {
      // Visualizarlo en la página HTML
      throw new Error("Error al obtener el token de Amadeus");
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    // Visualizarlo en la página HTML
    console.error("Error:", error.message);
    return null;
  }
}

const searchForm = document.getElementById("flight-search-form");
searchForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  // Obtén los valores de entrada del formulario
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  console.log(origin);
  console.log(destination);

  const outputDiv = document.getElementById("output");

  async function searchFlights(token, origin, destination, departureDate) {
    // Define la URL de la solicitud de búsqueda de vuelo aquí
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${passengers}&nonStop=false&max=250`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });

      if (!response.ok) {
        // Visualizarlo en la página HTML
        throw new Error("Error al obtener el vuelo");
      }

      const datosVuelo = await response.json();
      console.log(datosVuelo);

      const vueloBarato = datosVuelo.data[0];
      console.log(vueloBarato);

    } catch (error) {
      // Visualizar el error en la consola
      console.error("Error:");
    }
  }

  // Uso de la función para obtener un token
  const clientId = "vFAgjkG4GNw4o8as9aSdlqhYHWvbFt9s"; // Reemplaza con tu cliente ID de Amadeus
  const clientSecret = "GNNN7muQQqXqLjRz"; // Reemplaza con tu cliente secret de Amadeus

  let token = await getAmadeusToken(clientId, clientSecret);
  if (token !== null) console.log(token);

  // Variable para pasajeros y obtención de fecha de mañana para el buscador de billetes
  const passengers = 1;

  function tomorrow() {
    const actualDate = new Date();
    const day = actualDate.getDate() + 1;
    const month = actualDate.getMonth() + 1;
    const year = actualDate.getFullYear();

    const departureDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    return departureDate;
  }

  const departureDate = tomorrow();

  console.log(departureDate);

  searchFlights(token, origin, destination, departureDate);
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("flight-search-form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (event) {
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");

    const originValue = originInput.value.trim(); 
    const destinationValue = destinationInput.value.trim();

    
    const uppercaseRegex = /^[A-Z]{3}$/;

    if (!uppercaseRegex.test(originValue) || !uppercaseRegex.test(destinationValue)) {
      event.preventDefault();

     
      errorMessage.textContent = "¡¡¡Los campos de origen y destino deben tener exactamente 3 letras mayúsculas!!!";
    } else {
      
      errorMessage.textContent = "";
    }
  });
});



/*
// Obtén el formulario de búsqueda y agrega un controlador de eventos para la búsqueda
const searchForm = document.getElementById('flight-search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtén los valores de entrada del formulario
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    
    const departureDate = document.getElementById('departure-date').value;
    

    // Por ejemplo:
    fetch(`/search-flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Limpia los resultados anteriores
            data.forEach(result => {
                // Crea y agrega elementos HTML para mostrar cada resultado de vuelo
                // resultsContainer.appendChild(...);
            });
        })
        .catch(error => {
            console.error(error);
        });
});*/
